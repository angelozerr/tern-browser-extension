(function(mod) {
    if (typeof exports == "object" && typeof module == "object") // CommonJS
        return mod(require("tern/lib/infer"), require("tern/lib/tern"), require("acorn/dist/acorn"), require("sax"));
    if (typeof define == "function" && define.amd) // AMD
        return define([ "tern/lib/infer", "tern/lib/tern", "acorn/dist/acorn", "sax" ], mod);
    mod(tern, tern, acorn, sax);
})(function(infer, tern, acorn, sax) {
    "use strict";
      
  function isScriptTag(tagName) {
    return tagName.toLowerCase() == "script";
  }
  
  function DOM(file, xml) {
    this.xml = xml;
    var ids = this.ids = {};
    var newxml = "", scriptParsing = false, from = 0, to = xml.length, 
    parser = sax.parser(true);
    parser.onopentag = function (node) {
      if (isScriptTag(node.name)) {
        scriptParsing = true;
        to = this.position;          
        newxml = newxml + spaces(xml, from, to);
        from = to;
        to = xml.length;        
      }
    };
    parser.onclosetag = function (tagName) {
      if (isScriptTag(tagName)) {
        scriptParsing = false;
        to = this.position;
        var endElement = "</" + tagName + ">";
        newxml = newxml + xml.substring(from, to  - endElement.length);
        newxml = newxml + spaces(endElement, 0, endElement.length);
        from = to;
        to = xml.length;
      }
    };
    parser.onattribute = function (attr) {
      if (attr.name.toLowerCase() == "id") {
        var originNode = new acorn.Node();
        originNode.start = this.position - attr.value.length - 1;
        originNode.end = this.position - 1;
        originNode.sourceFile = file;
        ids[attr.value] = {"originNode": originNode, "ownerElement": this.tagName};
      }
    };
    parser.write(xml);
    if (from != to) {
      if (scriptParsing) {
        newxml = newxml + xml.substring(from, to);
      } else {
        newxml = newxml + spaces(from, to);
      }
    }
    this.scripts = newxml;
    
  }
  
  function spaces(text, from, to) {
    var spaces = "";
    for (var i = from; i < to; i++) {
      var c = text.charAt(i);
      switch(c) {
        case "\r":
        case "\n":
        case "\t":
          spaces += c;
          break;
        default:
          spaces += " ";
      }
    }
    return spaces;
  }
  
  function isHTML(file) {
    var endsWith = function(str, suffix) {
      return str.slice(-suffix.length) == suffix;
    }
    return file.name == "[doc]" || endsWith(file.name, ".html"); 
  }
    
  infer.registerFunction("Browser_getElementById", function(_self, args, argNodes) {
    if (!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string" || !(argNodes[0].sourceFile && argNodes[0].sourceFile.dom))
      return new infer.Obj(cx.paths["HTMLElement.prototype"]);
    var cx = infer.cx(), id = argNodes[0].value, dom = argNodes[0].sourceFile.dom, attr = dom.ids[id];
    if (attr) {
      argNodes[0].dom = attr;
      return createElement(attr.ownerElement);
    }
    return new infer.Obj(cx.paths["HTMLElement.prototype"]);
  });
  
  function createElement(tagName) {
    if (!tagName || tagName.length < 1) return new infer.Obj(infer.def.parsePath("HTMLElement.prototype"));
    var cx = infer.cx(), server = cx.parent, name = 'HTML' + tagName.substring(0, 1).toUpperCase() + tagName.substring(1, tagName.length) + "Element", 
        locals = infer.def.parsePath(name + ".prototype");
    if (locals && locals != infer.ANull) return new infer.Obj(locals);    
    return new infer.Obj(infer.def.parsePath("HTMLElement.prototype"));
  }
  
  infer.registerFunction("Browser_createElement", function(_self, args, argNodes) {
    if (!argNodes || !argNodes.length || argNodes[0].type != "Literal" || typeof argNodes[0].value != "string")
      return createElement();
    return createElement(argNodes[0].value);
  });
  
  tern.registerPlugin("browser-extension", function(server, options) {
    return {passes: {
             preParse: preParse,
             preLoadDef: preLoadDef,
             typeAt: findTypeAt,
             completion: findCompletions
           }};
  });
  
  function preLoadDef(data) {
    var cx = infer.cx(), browser = cx.definitions[data["!name"]]["browser"];
    if (data["!name"] == "browser") {
      // Override Document#getElementById !type
      data["Document"]["prototype"]["getElementById"]["!type"] = "fn(id: string) -> !custom:Browser_getElementById";
      // Override Document#createElement !type
      data["Document"]["prototype"]["createElement"]["!type"] = "fn(tagName: string) -> !custom:Browser_createElement";
    }
  }
  
  function preParse(file, text) {
    if (!isHTML(file)) return;
    var dom = file.dom = new DOM(file, text);          
    return dom.scripts;
  }

  function findTypeAt(_file, _pos, expr, type) {
    if (!expr) return type;
    var isStringLiteral = expr.node.type === "Literal" &&
       typeof expr.node.value === "string";
    var isDOMArg = !!expr.node.dom;

    if (isStringLiteral && isDOMArg) {
      // The `type` is a value shared for all string literals.
      // We must create a copy before modifying `origin` and `originNode`.
      // Otherwise all string literals would point to the last jump location
      type = Object.create(type);
      type.origin = expr.node.dom.originNode.sourceFile.name; 
      type.originNode = expr.node.dom.originNode;
    }

    return type;
  }

  function findCompletions(file, query) {
    var wordEnd = tern.resolvePos(file, query.end);
    var callExpr = infer.findExpressionAround(file.ast, null, wordEnd, file.scope, "CallExpression");
    if (!callExpr) return;
    var callNode = callExpr.node;
    if (!callNode.callee.object || callNode.callee.object.name != "document" ||
        callNode.callee.type != "MemberExpression" || !callNode.callee.property || callNode.callee.property.name != "getElementById" ||
        callNode.arguments.length < 1) return;
    // here completion for document.getElementById('Ctrl+Space'
    var argNode = findAttrValue(callNode.arguments, wordEnd);
    if (!argNode) return;
    var word = argNode.raw.slice(1, wordEnd - argNode.start), quote = argNode.raw.charAt(0);
    if (word && word.charAt(word.length - 1) == quote)
      word = word.slice(0, word.length - 1);
    var completions = completeAttrValue(query, file, word);
    if (argNode.end == wordEnd + 1 && file.text.charAt(wordEnd) == quote)
      ++wordEnd;
    return {
      start: tern.outputPos(query, file, argNode.start),
      end: tern.outputPos(query, file, wordEnd),
      isProperty: false,
      isObjectKey: false,
      completions: completions.map(function(rec) {
        var name = typeof rec == "string" ? rec : rec.name;
        var string = JSON.stringify(name);
        if (quote == "'") string = quote + string.slice(1, string.length -1).replace(/'/g, "\\'") + quote;
        if (typeof rec == "string") return string;
        rec.displayName = name;
        rec.name = string;
        return rec;
      })
    };
  }
  
  function findAttrValue(argsNode, wordEnd) {
    for (var i = 0; i < argsNode.length; i++) {
      var argNode = argsNode[i];
      if (argNode.type == "Literal" && typeof argNode.value == "string" &&
          argNode.start < wordEnd && argNode.end > wordEnd) return argNode;
    }
  }
  
  function completeAttrValue(query, file, word) {
    var completions = [];
    var cx = infer.cx(), server = cx.parent, dom = file.dom, attrs = dom ? dom.ids : null;
    if (!attrs) return completions;
    var wrapAsObjs = query.types || query.depths || query.docs || query.urls || query.origins;

    function maybeSet(obj, prop, val) {
      if (val != null) obj[prop] = val;
    }
    
    function gather(attrs) {
      for (var name in attrs) {
        if (name &&
            !(query.filter !== false && word &&
              (query.caseInsensitive ? name.toLowerCase() : name).indexOf(word) !== 0)) {
          var rec = wrapAsObjs ? {name: name} : name;
          completions.push(rec);

          /*if (query.types || query.docs || query.urls || query.origins) {
            var val = modules[name];          
            if (query.types)
              rec.type = isSubModule ? "submodule" : "module";
            if (query.docs)
              maybeSet(rec, "doc", val.doc);
            if (query.urls)
              maybeSet(rec, "url", val.url);
            if (query.origins)
              maybeSet(rec, "origin", val.origin);
          }*/
        }
      }
    }

    if (query.caseInsensitive) word = word.toLowerCase();
    gather(attrs);
    return completions;
  }
  
})  
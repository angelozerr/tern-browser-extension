function update () {
  var textarea = document.getElementById('dom')
  var dom = new DOMDocument(textarea.value)
  document.getElementById('scripts').value = dom.scripts
  document.getElementById('ids').value = JSON.stringify(dom.ids, null, ' ')
}

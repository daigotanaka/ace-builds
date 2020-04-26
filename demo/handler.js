var md = window.markdownit();

function readSingleFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function loadFromBuffer() {
  text = localStorage.getItem("buffer");
  displayContents(text);
}

function displayContents(contents) {
  env.editor.setValue(contents);
  updateSaveBuffer();
}

function updateSaveBuffer() {
  var text = editor.getValue();
  var html = md.render(text);
  document.getElementById("preview").innerHTML = html;


  localStorage.setItem("buffer", text);

  // Download
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  var link=window.URL.createObjectURL(blob);
  var a = document.getElementById("save-link");
  a.href = link;

  files = document.getElementById("file-input").files
  if (files.length > 0) {
    var filename = files[0].name;
    a.download = filename;
  }
}

document.getElementById('file-input')
  .addEventListener('change', readSingleFile, false);

document.getElementById("load-buffer")
  .addEventListener('click', loadFromBuffer, false);

document.getElementById("editor-container")
  .addEventListener("change", updateSaveBuffer);


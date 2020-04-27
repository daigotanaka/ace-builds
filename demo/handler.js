// It's safe to update the buffer only when buffer or file is loaded 
// at least once in this session.
isSafeToUpdateBuffer = false;

function updatePreview() {
  var md = window.markdownit();
  var text = env.editor.getValue();
  var html = md.render(text);
  document.getElementById("preview").innerHTML = html;
}

function updateBuffer() {
  if (!isSafeToUpdateBuffer) return;

  var text = env.editor.getValue();
  localStorage.setItem("buffer", text);

  var files = document.getElementById("file-input").files
  var filename = null;
  if (files.length > 0) {
    filename = files[0].name;
    localStorage.setItem("filename", filename);
  } else {
    filename = localStorage.getItem("filename");
  }
  
  // Update download link
  var blob = new Blob([text], {type: "text/plain;charset=utf-8"});
  var link = window.URL.createObjectURL(blob);
  var a = document.getElementById("save-link");
  a.href = link;
  a.download = filename;
}

function updateEditor(text) {
  if (text === null) return;
  env.editor.setValue(text);
}

function readFromFile(e) {
  var file = e.target.files[0];
  if (!file) {
    return;
  }

  var reader = new FileReader();
  reader.onload = function(e) {
    var text = e.target.result;
    updateEditor(text);
    updatePreview();
    updateBuffer();
    isSafeToUpdateBuffer = true;
  };
  reader.readAsText(file);
}

function loadFromBuffer() {
  var text = localStorage.getItem("buffer");
  updateEditor(text);
  isSafeToUpdateBuffer = true;
  updatePreview();
  updateBuffer();
}

document.getElementById('file-input')
  .addEventListener('change', readFromFile, false);

document.getElementById("load-buffer")
  .addEventListener('click', loadFromBuffer, false);

document.getElementById("editor-container")
  .addEventListener("change", (function() {updateBuffer(); updatePreview();}));

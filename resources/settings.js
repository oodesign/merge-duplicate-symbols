// disable the context menu (eg. the right click menu) to have a more native feel
document.addEventListener('contextmenu', (e) => {
  e.preventDefault()
});


window.AssignSettings = (logs, libraries) => {
  document.getElementById('checkLogs').checked = logs;
  document.getElementById('checkEnableLibraries').checked = libraries;
  UpdateSettings();
};


window.UpdateSettings = () => {
  document.getElementById('checkLogs').checked ? document.getElementById('txtLogs').innerHTML = "Logs are enabled" : document.getElementById('txtLogs').innerHTML = "Logs are disabled";
};

window.cancelAssignation = () => {
  window.postMessage('Cancel');
}

document.getElementById('checkLogs').addEventListener("change", () => {
  UpdateSettings();
});

document.getElementById('btnCancel').addEventListener("click", () => {
  cancelAssignation();
});

document.getElementById('btnAccept').addEventListener("click", () => {
  window.postMessage('AcceptSettings', document.getElementById('checkLogs').checked, document.getElementById('checkEnableLibraries').checked);
});

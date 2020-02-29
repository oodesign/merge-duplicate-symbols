function documentation() {
  NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("http://www.mergeduplicates.com/"));
}

function report_issue() {
  NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://github.com/oodesign/merge-duplicate-symbols/issues"));
}

module.exports = { documentation,report_issue };


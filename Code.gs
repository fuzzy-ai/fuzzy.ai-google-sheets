function FUZZIFY(input) {
  var inputs = {};

  var docProperties = PropertiesService.getDocumentProperties();

  var apiKey = docProperties.getProperty('FUZZYAI_API_KEY');
  var agentID = docProperties.getProperty('FUZZYAI_AGENT_ID');

  if (apiKey == "" || agentID == "") {
    return "Settings required. See Fuzzy.ai > Settings";
  }

  for (var i = 0; i < arguments.length; i += 2) {
    inputs[arguments[i]] = arguments[i+1];
  }
  if (inputs["version"]) {
    delete inputs["version"];
  }
  var payload = JSON.stringify(inputs);
  var headers = {
    'Authorization': 'Bearer ' + apiKey,
    'Content-type': 'application/json'
  };
  var url = 'https://api.fuzzy.ai/agent/' + agentID;
  var options = {
    'method': 'post',
    'headers': headers,
    'payload': payload
  };
  var response = UrlFetchApp.fetch(url, options);
  if (response.getResponseCode() != 200) {
    throw new Error("Error using the fuzzy.ai API");
  }
  var outputs = JSON.parse(response.getContentText("UTF-8"));
  var results = [[]];
  for (var output in outputs) {
    results[0].push(outputs[output]);
  }
  return results;
}

// Add custom menu option
function onOpen() {
  SpreadsheetApp.getUi()
      .createMenu('Fuzzy.ai')
      .addItem('Settings', 'showSettingsDialog')
      .addToUi();
}

// Loads Settings.html as a template and populates existing values
function getSettings() {
  var docProperties = PropertiesService.getDocumentProperties();

  t = HtmlService.createTemplateFromFile('Settings');

  t.apiKey = docProperties.getProperty('FUZZYAI_API_KEY');
  t.agentID = docProperties.getProperty('FUZZYAI_AGENT_ID');

  return t.evaluate();
}

// Show settings dialog from template above.
function showSettingsDialog() {
  var html = getSettings();

  html.setWidth(400);
  html.setHeight(300);

  SpreadsheetApp.getUi()
      .showModalDialog(html, 'Fuzzy.ai Settings');
}

// Save handler for settings form.
function saveSettings(formObject) {
  var docProperties = PropertiesService.getDocumentProperties();
  docProperties.setProperty('FUZZYAI_API_KEY', formObject.apiKey);
  docProperties.setProperty('FUZZYAI_AGENT_ID', formObject.agentID);
}

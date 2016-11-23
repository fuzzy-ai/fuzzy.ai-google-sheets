function getAPIKey_() {
  return "API KEY GOES HERE";
}

function FUZZIFY(input) {
  var inputs = {};
  var agentID = arguments[0];
  for (var i = 1; i < arguments.length; i += 2) {
    inputs[arguments[i]] = arguments[i+1];
  }
  if (inputs["version"]) {
    delete inputs["version"];
  }
  var payload = JSON.stringify(inputs);
  var headers = {
    'Authorization': 'Bearer ' + getAPIKey_(),
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
    throw new Error("Error using the fuzzy.io API");
  }
  var outputs = JSON.parse(response.getContentText("UTF-8"));
  var results = [[]];
  for (var output in outputs) {
    results[0].push(outputs[output]);
  }
  return results;
}

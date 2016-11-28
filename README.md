# Fuzzy.ai for Google Sheets.

This is the source code for the "Fuzzy.ai" Google Sheets add-on.

## Usage

To use this add-on you must have an account at https://fuzzy.ai/ and have
[created an agent](https://fuzzy.ai/agents/new).

Update the settings at "Fuzzy.ai > Settings" (under the add-ons menu) to include your API KEY and Agent ID.

Use the FUZZIFY() function in any cell passing input names and cell values. For example: `=FUZZIFY("input1", A1, "input2", A2)`. You can include as many inputs as your agent has.

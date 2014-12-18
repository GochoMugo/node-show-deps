/**
* Registers all the tables available.
*
* All Table Classes must implement the following interface.
*
*   Interface-> Table
*   Constructor-> new NewTable([header1, header2]): Table
*   Pushing a single row-> table.push([cell1, cell2])
*   Converting to a String representation-> table.toString(): String
*   Checks if table is empty-> isEmpty(): Boolean
*/


exports = module.exports = {
  CliTable:  {
    shorthand: "cli",
    description: "Command-Line Table",
    Table: require("./CliTable")
  },
  HtmlTable: {
    shorthand: "html",
    description: "HTML Table",
    Table: require("./HtmlTable")
  },
  MarkdownTable: {
    shorthand: "md",
    description: "Markdown Table",
    Table: require("./MarkdownTable")
  }
};

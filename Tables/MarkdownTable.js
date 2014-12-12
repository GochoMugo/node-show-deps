/**
* Output as Markdown
*
* Implements the Table Interface as specified in ./index.js
*/


// Module variables
var MarkdownTable;


MarkdownTable = (function() {
  // Constructor for tables
  function table(heads) {
    this.head = heads;
    this.rows = [];
  }

  // Pushing a single row
  table.prototype.pushRow = function(row) {
    this.rows.push(row);
  }

  // Return string representation of the table
  table.prototype.toString = function() {
    var output = rowToString(this.head);
    output += rowToString(this.head, "-----");
    for (var row in this.rows) {
      output += rowToString(this.rows[row]);
    }
    return output;
  }

  // Returns true/false whether the table has some rows
  table.prototype.isEmpty = function() {
    return this.rows.length === 0 ? true : false;
  };

  /**
  * Converts a row of the table into a string
  * e.g. a row [cell1, cell2] turns into "|cell1|cell2|"
  * when replacement is passed, the cell contents are replaced with the
  * replacement
  *
  * @param  {Array} row
  * @param  {any variable} replacement
  * @return  {String}
  */
  function rowToString(row, replacement) {
    var output = "|";
    for (var cell in row) {
      output += (replacement || row[cell]) + "|";
    }
    return output + "\n";
  }

  return table;
})();


// Module exports
exports = module.exports = MarkdownTable;

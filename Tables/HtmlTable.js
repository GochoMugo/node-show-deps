/**
* Output as HTML
*
* Implements the Table Interface as specified in ./index.js
*/


// Module variables
var tableify = require("tableify");
var HtmlTable;


HtmlTable = (function() {
  // Constructor for tables
  function table(heads) {
    this.objs = [];
    this.pushRow(heads);
    this.hasRows = false; // MUST be after pushing the head row.
  }

  // Pushing a single row
  table.prototype.pushRow = function(rowValues) {
    var row = {};
    Object.defineProperty(row, rowValues[0], {
      value: rowValues[0],
      enumerable: true
    });
    Object.defineProperty(row, rowValues[1], {
      value: rowValues[1],
      enumerable: true
    });
    this.objs.push(row);
    this.hasRows = true;
  };

  // Returning string representation of the table
  table.prototype.toString = function() {
    console.log(this.objs);
    return tableify(this.objs);
  };

  // Return true/false whether the table has some rows
  table.prototype.isEmpty = function() {
    return ! this.hasRows;
  };

  return table;
})();


// Module exports
exports = module.exports = HtmlTable;

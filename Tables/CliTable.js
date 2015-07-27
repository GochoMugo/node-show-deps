/**
* Output to Command line
*
* Implements the Table Interface as specified in ./index.js
*/


"use strict";


// Module imports
var cliTable = require("cli-table");


// Module Variables
var CliTable;


CliTable = (function() {
  // Constructor for the tables.
  function table(head) {
    this.table = new cliTable({
      head: head,
    });
    this.hasRows = false;
  }

  // Pushing a single row
  table.prototype.pushRow = function(row) {
    this.hasRows = true;
    this.table.push(row);
  };

  // Return string representation of the table
  table.prototype.toString = function() {
    return this.table.toString();
  };

  // Returns true/false whether the table has some rows
  table.prototype.isEmpty = function() {
    return !this.hasRows;
  };

  return table;
})();


// Module exports
exports = module.exports = CliTable;

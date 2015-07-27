/**
* Tests all the available Tables and ensure they are compatible
* with the interface specified in ../Tables/index.js
*
* PLEASE NOTE that this tests do NOT guarantee the correct visual
* output
*/


"use strict";


// Module imports
var should = require("should");
var Tables = require("../Tables");


/**
* A high-order function that executes the function "func" on each imported
* Table format while passing the Table class
*
* @param  {Function}  func
*/
function eachTable(func) {
  for (var table in Tables) {
    func(Tables[table].Table);
  }
}


describe("All Tables", function() {
  it("should allow an array of [head1, head2] when instantiating", function() {
    eachTable(function(Table) {
      should(function() {
        new Table(["head1", "head2"]); // eslint-disable-line
      }).not.throw();
    });
  });

  it("should have a .pushRow method that accepts an array of [cell1, cell2]", function() {
    eachTable(function(Table) {
      var table = new Table(["head1", "head2"]);
      table.pushRow.should.be.a.Function;
      should(function() {
        table.pushRow(["cell1", "cell2"]);
      }).not.throw();
    });
  });

  it("should have a .toString method that returns a string representation the table", function() {
    eachTable(function(Table) {
      var table = new Table(["head1", "head2"]);
      table.pushRow(["cell1", "cell2"]);
      table.toString.should.be.a.Function;
      var string = table.toString();
      string.should.be.a.String;
    });
  });

  it("should have a .isEmpty method that returns true if no row is pushed. Otherwise false.", function() {
    eachTable(function(Table) {
      var table = new Table(["head1", "head2"]);
      table.isEmpty.should.be.a.Function;
      table.isEmpty().should.be.true;
      table.pushRow(["cell1", "cell2"]);
      table.isEmpty().should.be.false;
    });
  });

});

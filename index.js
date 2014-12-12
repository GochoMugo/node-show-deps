/**
* Using a package.json, generates output about the dependencies of
* a module
*/


// Module imports
var fs = require("fs");
var program = require("commander");
var pkg = require("./package.json");
var Tables = require("./Tables");


// Module Variables
var debug;
var depsTable;
var devDepsTable;
var inputJSON;
var outputString;
var Table;


// Command-line options
program
  .version(pkg.version)
  .option("-i, --input [file]", "which JSON File to read from")
  .option("-o, --output [file]", "where to write to")
  .option("-t, --table [shorthand]", "which kind of table")
  .option("--tables", "what kind of tables are there")
  .option("-v, --verbose", "do print output")
  .option("-d, --debug", "show debug information")
  .parse(process.argv);


// Allow debug information
if (program.debug) {
  process.env.DEBUG = process.env.DEBUG
    ? (process.env.DEBUG + ", show-deps:*")
    : "show-deps:*";
}
debug = require("debug")("show-deps:cli");


// More important tasks should be handled first, right? Yeah!
if (program.tables) {
  debug("showing the Guy the available tables");
  var tables = "";
  console.log("> Available Tables:");
  for (var table in Tables) {
    console.log("\t%s:\t%s", Tables[table].shorthand,
      Tables[table].description);
  }
  process.exit(0);
}


/**
* Read the the input JSON file. Returns the JSON if successful. Returns
* null on error
*
* @param  {String}  filePath
* @return  {JSON|null}
*/
function readJSON(filePath) {
  try {
    var input = fs.readFileSync(filePath);
    input = JSON.parse(input);
    return input;
  } catch (error) {
    return null;
  }
}


/**
* Processing program inputs.
* If input is provided:
*   -we try read it as JSON as is.
*   - If that fails, we assume it is a direcotry with a package.json
*   - If that also fails, we fucked. Exit asap!
* If no input is provided:
*   - we assume it is the current working directory with the package.json
*/
if (program.input) {
  debug("looking for json file from path directly");
  inputJSON = readJSON(program.input);
  if (! inputJSON) {
    debug("looking for json file from path, assumed as a directory");
    inputJSON = readJSON(program.input + "/package.json");
  }
  if (! inputJSON) {
    debug("FAILURE acquiring json file from %s", program.input);
    console.log("> No package.json in %s", program.input);
  }
} else {
  debug("looking for package.json in current working directory");
  inputJSON = readJSON("./package.json");
  if (! inputJSON) {
    debug("FAILURE acquiring json file from cwd");
    console.log("> No package.json in cwd!");
  }
}


// Exit with an error code 1 if we have no input json
if (! inputJSON) {process.exit(1);}


/**
* we try guess what kind of table user wants. How?
* if no table option specified, its a fucking CLI table, unless there is no
*   output file then we make it a Markdown Table
* if there is a table option specified, we look for it
* if we have no such table, we exit asap. Oooh! we tell the dummy which
* kind of tables we have
*/
debug("finding correct table");
if (! program.table) {
  debug("Assuming its a CLI nerd!");
  Table = program.output
    ? Tables.MarkdownTable.Table
    : Tables.CliTable.Table;
} else {
  debug("Some people have Options. We looking for the right table");
  var tableOptions = "";
  for (var table in Tables) {
    tableOptions += Tables[table].shorthand + " ";
    if (program.table === Tables[table].shorthand) {
      Table = Tables[table].Table;
    }
  }
  if (! Table) {
    debug("The guy mistyped? Nope. He doesn't know!'");
    console.log("> Available table options: %s", tableOptions);
    process.exit(1);
  }
}


/**
* Generate the string
* - pushing the dependencies into its own table and devDependencies
*   into another.
*  - then call .toString() cause it is the safest function I have ever seen! :-)
*/
debug("creating tables");
depsTable = new Table(["Depedency", "Version"]);
devDepsTable = new Table(["Dev-Depedency", "Version"]);

function fillTable(propsObj, table) {
  debug("filling a table");
  if (! propsObj) {return "";}
  var gotProps = false;
  for (var prop in propsObj) {
    gotProps = true;
    table.pushRow([prop, propsObj[prop]]);
  }
}


// preparing for concatenation
outputString = "";


// if there are dependencies, add to output
debug("Processing dependencies table");
fillTable(inputJSON.dependencies, depsTable);
if (depsTable.isEmpty()) {
  console.log("> No Dependencies");
} else {
  outputString += depsTable.toString();
  outputString += "\n\n";
}


// if there are dev-dependencies, add them too
debug("Processing dev-dependencies table");
fillTable(inputJSON.devDependencies, devDepsTable);
if (devDepsTable.isEmpty()) {
  console.log("> No Dev-Dependencies");
} else {
  outputString += devDepsTable.toString();
}


// if there are no dependencies && dev dependencies, we get the fuck out
if (depsTable.isEmpty() && devDepsTable.isEmpty()) {
  debug("Nothing meaningful to output");
  process.exit(0);
}


// Outputting the read JSON into some file if option is given
if (program.output) {
  debug("writing to file now");
  fs.writeFile(program.output, outputString, function(error) {
    if (error) {
      debug("file writing FAILED! We all hate I/O!!!");
      console.log("> Could not output to File: %s. Error: %s", program.output,
        error.code);
      process.exit(1);
    }
  });
}


//  We are either running in CLI mode or we are needed to be verbose
if (! program.output || program.verbose) {
  console.log("\n%s\n", outputString);
}


# show-deps

[![Build Status](https://travis-ci.org/forfuture-dev/node-show-deps.svg?branch=master)](https://travis-ci.org/forfuture-dev/node-show-deps)

A command-line utility for showing dependencies from a project's
`package.json` in a fashionable way.

|aspect|detail|
|-------|-----:|
|version|0.0.0-alpha.4.0|
|dependencies|none|
|node|0.11, 0.10|
|last updated|15th December, 2014|


## Installation

We require [Node.js][nodejs], which comes bundled with [npm][npmjs]:

```shell
⇒ npm install --global show-deps
```

__Note:__ You may require some `sudo` powers to install globally. So try
use `sudo npm install --global show-deps` if necessary.


## Basic Usage

__I want to see all the dependencies stated in my current directory__

```shell
⇒  show-deps

┌───────────┬─────────┐
│ Dependency │ Version │
├───────────┼─────────┤
│ cli-table │ ^0.3.1  │
├───────────┼─────────┤
│ commander │ ^2.5.0  │
├───────────┼─────────┤
│ debug     │ ^2.1.0  │
└───────────┴─────────┘

┌───────────────┬─────────┐
│ Dev-Dependency │ Version │
├───────────────┼─────────┤
│ mocha         │ ^2.0.1  │
└───────────────┴─────────┘

```

__I want to see the dependencies for the project in that directory__

```shell
⇒  show-deps --input ../github/node-sequential-ids/
> No Dependencies

┌───────────────┬─────────┐
│ Dev-Dependency │ Version │
├───────────────┼─────────┤
│ mocha         │ 1.21.4  │
└───────────────┴─────────┘
```

__I want to see the dependencies stated in that `package.json`__

```shell
⇒  show-deps --input ../github/node-simple-argparse/package.json
> No Dependencies

┌───────────────┬─────────┐
│ Dev-Dependency │ Version │
├───────────────┼─────────┤
│ mocha         │ 1.21.5  │
├───────────────┼─────────┤
│ should        │ 4.0.4   │
└───────────────┴─────────┘
```


## Tables

The previous examples have shown some Guy typing all over the shell....
BAZINGA! A table appeared! Those are CLI-tables. It is possible to produce
the table in other formats.

```shell
⇒ show-deps --tables
```

You will get to see all the available table formats. If I wanted to generate
a Markdown table and save it to a `Dependencies.md` file, I would:

```shell
⇒ show-deps --table md --output Dependencies.md
```

If interested in hacking a new table format, [fork][fork] me and don't keep
me waiting. :-)


## Help Information

```shell
⇒  show-deps -h

  Usage: index.js [options]

  Options:

    -h, --help               output usage information
    -V, --version            output the version number
    -i, --input [file]       which JSON File to read from
    -o, --output [file]      where to write to
    -t, --table [shorthand]  which kind of table
    --tables                 what kind of tables are there
    -v, --verbose            do print output
    -d, --debug              show debug information
```


## TODO

This is where we need help :-)

* add comprehensive tests for table formats and integrations
* add more table formats
* feel good about it!


## LICENSE

The MIT License (MIT)

Copyright (c) 2014 Forfuture LLC <we@forfuture.co.ke>

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software
is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.


[fork]:https://github.com/forfuture-dev/node-show-deps/fork "Fork Me!"
[nodejs]:https://nodejs.org
[npmjs]:https://npmjs.org

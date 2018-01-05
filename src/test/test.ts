#!/usr/bin/env node
"use strict";

var fs = require('fs');
import * as commonmark from "../main/index";
//var util = require("util");

// Home made mini-version of the npm ansi module:
var escSeq = function(s : string) {
    return function (this : any) {
        process.stdout.write('\u001b' + s);
        return this;
    };
};

var repeat = function(pattern : string, count : number) {
    if (count < 1) {
        return '';
    }
    var result = '';
    while (count > 1) {
        if (count & 1) {
            result += pattern;
        }
        count >>= 1;
        pattern += pattern;
    }
    return result + pattern;
};

var cursor = {
    write: function (s : string) {
        process.stdout.write(s);
        return this;
    },
    green: escSeq('[0;32m'),
    red: escSeq('[0;31m'),
    cyan: escSeq('[0;36m'),
    reset: escSeq('[0m')
};

var writer = new commonmark.HtmlRenderer();


import {documentParser} from "../main/refactored/document";
import {listParser} from "../main/refactored/list";
import {blockquoteParser} from "../main/refactored/blockquote";
import {itemParser} from "../main/refactored/item";
import {thematicBreakParser} from "../main/refactored/thematic-break";
import {htmlBlockParser} from "../main/refactored/html-block";
import {ParagraphParser} from "../main/refactored/paragraph";
import {atxHeadingParser} from "../main/refactored/atx-heading";
import {setextHeadingParser} from "../main/refactored/setext-heading";
import {fencedCodeBlockParser} from "../main/refactored/fenced-code-block";
import {latexBlockParser} from "../main/refactored/latex-block";
import {indentedCodeBlockParser} from "../main/refactored/indented-code-block";
import {BlockParserCollection} from "../main/refactored/BlockParserCollection";
//import {Node} from "../main/refactored/Node";
import {ParagraphNode} from "../main/refactored/ParagraphNode";
import {tableParser, ThParser, TdParser, TrParser, TheadParser, TbodyParser} from "../main/refactored/table";

import {RefMap} from "../main/refactored-misc/RefMap";
const refMap : RefMap = {};

const blockParserCollection = new BlockParserCollection(
    documentParser,
    new ParagraphParser("paragraph", ParagraphNode, refMap)
)
    .add(blockquoteParser)
    .add(atxHeadingParser)
    .add(fencedCodeBlockParser)

    .add(latexBlockParser)

    .add(htmlBlockParser)
    .add(setextHeadingParser)
    .add(thematicBreakParser)
    .add(itemParser)
    .add(indentedCodeBlockParser)

    .add(tableParser)
    .add(new ThParser())
    .add(new TdParser())
    .add(new TrParser())
    .add(new TheadParser())
    .add(new TbodyParser())

    .add(listParser);

import {DelimiterCollection} from "../main/refactored-misc/DelimiterCollection";
import {BracketCollection} from "../main/refactored-misc/BracketCollection";
const delimiters = new DelimiterCollection();
const brackets = new BracketCollection(delimiters);

import {InParser} from "../main/refactored-inline/InParser";
import {NewlineParser} from "../main/refactored-inline/NewlineParser";
import {EscapeCharacterParser} from "../main/refactored-inline/EscapeCharacterParser";
import {InlineCodeParser} from "../main/refactored-inline/InlineCodeParser";
import {DelimiterParser} from "../main/refactored-delimiter/DelimiterParser";
import {EmphasisParser} from "../main/refactored-delimiter/EmphasisParser";
import {SmartQuoteParser} from "../main/refactored-delimiter/SmartQuoteParser";
import {OpenBracketParser} from "../main/refactored-inline/OpenBracketParser";
import {BangParser} from "../main/refactored-inline/BangParser";
import {CloseBracketParser} from "../main/refactored-inline/CloseBracketParser";
import {AutolinkParser} from "../main/refactored-inline/AutolinkParser";
import {HtmlTagParser} from "../main/refactored-inline/HtmlTagParser";
import {LessThanLiteralParser} from "../main/refactored-inline/LessThanLiteralParser";
import {EntityParser} from "../main/refactored-inline/EntityParser";
import {StringParser} from "../main/refactored-inline/StringParser";
import {InlineParser} from "../main/inlines";

import {SuperscriptParser} from "../main/custom/SuperscriptParser";
import {SmartStringParser} from "../main/refactored-inline/SmartStringParser";
import {StrikethroughParser} from "../main/custom/StrikethroughParser";
import {CheckboxParser} from "../main/refactored-inline/CheckboxParser";
import {ExtendedWwwAutolinkParser} from "../main/refactored-inline/ExtendedWwwAutolinkParser";
import {ExtendedEmailAutolinkParser} from "../main/refactored-inline/ExtendedEmailAutolinkParser";
import {InlineLatexParser} from "../main/refactored-inline/InlineLatexParser";

const delimParser = new DelimiterParser(delimiters, [
    new EmphasisParser(),
    new SuperscriptParser(),
    new StrikethroughParser(),
]);
const inParsers : InParser[] = [
    new NewlineParser(),
    new EscapeCharacterParser(),

    new CheckboxParser(),

    new InlineCodeParser(),
    new InlineLatexParser(),
    delimParser,
    new OpenBracketParser(brackets),
    new BangParser(brackets),
    new CloseBracketParser(delimParser, brackets, refMap),
    new AutolinkParser(),
    new HtmlTagParser(),
    new LessThanLiteralParser(),
    new EntityParser(),

    new StringParser(), //Should this be a default parser that cannot be removed?
];


let reader = new commonmark.Parser(blockParserCollection, new InlineParser(inParsers));

const flavorDelimParser = new DelimiterParser(delimiters, [
    new EmphasisParser(),
    new SuperscriptParser(),
    new StrikethroughParser(),
]);
const flavorInParsers : InParser[] = [
    new NewlineParser(),
    new EscapeCharacterParser(),

    new CheckboxParser(),

    new InlineCodeParser(),
    flavorDelimParser,
    new OpenBracketParser(brackets),
    new BangParser(brackets),
    new CloseBracketParser(flavorDelimParser, brackets, refMap),
    new AutolinkParser(),
    new HtmlTagParser(),
    new LessThanLiteralParser(),
    new EntityParser(),

    new ExtendedWwwAutolinkParser(),
    new ExtendedEmailAutolinkParser(),

    new StringParser(), //Should this be a default parser that cannot be removed?
];


let flavorReader = new commonmark.Parser(blockParserCollection, new InlineParser(flavorInParsers));


const smartDelimParser = new DelimiterParser(delimiters, [
    new EmphasisParser(),
    new SmartQuoteParser(),
]);
const smartInParsers : InParser[] = [
    new NewlineParser(),
    new EscapeCharacterParser(),
    new InlineCodeParser(),
    smartDelimParser,
    new OpenBracketParser(brackets),
    new BangParser(brackets),
    new CloseBracketParser(smartDelimParser, brackets, refMap),
    new AutolinkParser(),
    new HtmlTagParser(),
    new LessThanLiteralParser(),
    new EntityParser(),

    new SmartStringParser(),
    new StringParser(), //Should this be a default parser that cannot be removed?
];
let readerSmart = new commonmark.Parser(blockParserCollection, new InlineParser(smartInParsers));

var results : { passed : number, failed : number } = {
    passed: 0,
    failed: 0
};

var showSpaces = function(s : string) {
    var t = s;
    return t.replace(/\t/g, '→')
        .replace(/ /g, '␣');
};

var extractSpecTests = function(testfile : string) {
    var data = fs.readFileSync(testfile, 'utf8');
    var examples : {markdown: string,
                   html: string,
                   section: string,
                   number: number}[] = [];
    var current_section = "";
    var example_number = 0;
    var tests = data
        .replace(/\r\n?/g, "\n") // Normalize newlines for platform independence
        .replace(/^<!-- END TESTS -->(.|[\n])*/m, '');

tests.replace(/^`{32} example\n([\s\S]*?)^\.\n([\s\S]*?)^`{32}$|^#{1,6} *(.*)$/gm,
              function(_ : string, markdownSubmatch : string, htmlSubmatch : string, sectionSubmatch : string){
                  if (sectionSubmatch) {
                      current_section = sectionSubmatch;
                  } else {
                      example_number++;
                      examples.push({markdown: markdownSubmatch,
                                     html: htmlSubmatch,
                                     section: current_section,
                                     number: example_number});
                  }
              });
    return examples;
};

var specTest = function(testcase:{markdown: string,
               html: string,
               section: string,
               number: number}, res : { passed : number, failed : number }, converter : (str : string) => string) {
    var markdown = testcase.markdown.replace(/→/g, '\t');
    var expected = testcase.html.replace(/→/g, '\t');
    var actual = converter(markdown);
    if (actual === expected) {
        res.passed++;
        cursor.green().write('✓').reset();
    } else {
        res.failed++;
        cursor.write('\n');

        cursor.red().write('✘ Example ' + testcase.number + '\n');
        cursor.cyan();
        cursor.write('=== markdown ===============\n');
        cursor.write(showSpaces(markdown));
        cursor.write('=== expected ===============\n');
        cursor.write(showSpaces(expected));
        cursor.write('=== got ====================\n');
        cursor.write(showSpaces(actual));
        cursor.reset();
    }
};

var specTests = function(testfile : string, _res : { failed : number, passed : number }, converter : (str : string) => string) {
    cursor.write('Spec tests [' + testfile + ']:\n');

    var current_section = "";
    var examples = extractSpecTests(testfile);

    console.time("Elapsed time");
    for (var i = 0; i < examples.length; i++) {
        var testcase = examples[i];
        if (testcase.section !== current_section) {
            if (current_section !== '') {
                cursor.write('\n');
            }
            current_section = testcase.section;
            cursor.reset().write(current_section).reset().write('  ');
        }
        specTest(testcase, results, converter);
    }
    cursor.write('\n');
    console.timeEnd("Elapsed time");
    cursor.write('\n');
};

var pathologicalTest = function(testcase : { name: string,
  input: string,
  expected: string }, res : { failed : number, passed : number }, converter : (str : string) => string) {
    cursor.write(testcase.name + ' ');
    console.time('  elapsed time');
    var actual = converter(testcase.input);
    if (actual === testcase.expected) {
        cursor.green().write('✓\n').reset();
        res.passed += 1;
    } else {
        cursor.red().write('✘\n');
        cursor.cyan();
        cursor.write('=== markdown ===============\n');
        cursor.write(showSpaces(testcase.input));
        cursor.write('=== expected ===============\n');
        cursor.write(showSpaces(testcase.expected));
        cursor.write('=== got ====================\n');
        cursor.write(showSpaces(actual));
        cursor.write('\n');
        cursor.reset();
        res.failed += 1;
    }
    console.timeEnd('  elapsed time');
};
/*
pathologicalTest(
    { name: 'basic',
      input: '  - foo\n\n\tbar\n',
      expected: '<ul>\n<li>\n<p>foo</p>\n<p>bar</p>\n</li>\n</ul>\n' },
    results,
    function(z) {
        const x = reader.parse(z);
        var walker = x.walker();
        var event;

        while (event = walker.next()) {
            if(event.entering) {
                console.log(event.entering, event.node.type);
                if (event.node.type == "list") {
                    console.log(util.inspect(event.node, true, 5, true));
                }
            }
        }
        return writer.render(x);
    }
)
process.exit();*/
/*pathologicalTest(
    { name: 'raw html - illegal whitespace',
      input: '< a><\nfoo><bar/ >\n',
      expected: '<p>&lt; a&gt;&lt;\nfoo&gt;&lt;bar/ &gt;</p>\n' },
    results,
    function(z) {
        const x = reader.parse(z);

        return writer.render(x);
    }
)
process.exit();*/
specTests('src/test/latex.txt', results, function(z : string) {
    return writer.render(reader.parse(z));
});
//process.exit();
specTests('src/test/extended-email-autolink.txt', results, function(z : string) {
    return writer.render(flavorReader.parse(z));
});
//process.exit();
specTests('src/test/extended-www-autolink.txt', results, function(z : string) {
    return writer.render(flavorReader.parse(z));
});
//process.exit();
specTests('src/test/checkbox.txt', results, function(z : string) {
    return writer.render(reader.parse(z));
});
//process.exit();
specTests('src/test/table.txt', results, function(z : string) {
    return writer.render(reader.parse(z));
});
//process.exit();
specTests('src/test/strikethrough.txt', results, function(z : string) {
    return writer.render(reader.parse(z));
});
//process.exit();
specTests('src/test/smart.txt', results, function(z : string) {
    return writer.render(readerSmart.parse(z));
});
//process.exit();
specTests('src/test/superscript.txt', results, function(z : string) {
    return writer.render(reader.parse(z));
});
//process.exit();
specTests('src/test/spec.txt', results, function(z : string) {
        return writer.render(reader.parse(z));
    });

specTests('src/test/smart_punct.txt', results, function(z : string) {
        return writer.render(readerSmart.parse(z));
    });

specTests('src/test/regression.txt', results, function(z : string) {
        return writer.render(reader.parse(z));
    });
// pathological cases
cursor.write('Pathological cases:\n');

var cases = [
    { name: 'U+0000 in input',
      input: 'abc\u0000xyz\u0000\n',
      expected: '<p>abc\ufffdxyz\ufffd</p>\n' },
    { name: 'alternate line endings',
      input: '- a\n- b\r- c\r\n- d',
      expected: '<ul>\n<li>a</li>\n<li>b</li>\n<li>c</li>\n<li>d</li>\n</ul>\n'
    }
];

var x;
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: 'nested strong emph ' + x + ' deep',
          input: repeat('*a **a ', x) + 'b' + repeat(' a** a*', x),
          expected: '<p>' + repeat('<em>a <strong>a ', x) + 'b' +
          repeat(' a</strong> a</em>', x) + '</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: x + ' emph closers with no openers',
          input: repeat('a_ ', x),
          expected: '<p>' + repeat('a_ ', x - 1) + 'a_</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: x + ' emph openers with no closers',
          input: repeat('_a ', x),
          expected: '<p>' + repeat('_a ', x - 1) + '_a</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: x + ' link closers with no openers',
          input: repeat('a] ', x),
          expected: '<p>' + repeat('a] ', x - 1) + 'a]</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: x + ' link openers with no closers',
          input: repeat('[a ', x),
          expected: '<p>' + repeat('[a ', x - 1) + '[a</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: x + ' link openers and emph closers',
          input: repeat('[ a_ ', x),
          expected: '<p>' + repeat('[ a_ ', x - 1) + '[ a_</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: x + ' mismatched openers and closers',
          input: repeat('*a_ ', x),
          expected: '<p>' + repeat('*a_ ', x - 1) + '*a_</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: 'nested brackets ' + x + ' deep',
          input: repeat('[', x) + 'a' + repeat(']', x),
          expected: '<p>' + repeat('[', x) + 'a' + repeat(']', x) +
          '</p>\n' });
}
for (x = 1000; x <= 10000; x *= 10) {
    cases.push(
        { name: 'nested block quote ' + x + ' deep',
          input: repeat('> ', x) + 'a\n',
          expected: repeat('<blockquote>\n', x) + '<p>a</p>\n' +
          repeat('</blockquote>\n', x) });
}

var parse_and_render = function(z : string) {
    return writer.render(reader.parse(z));
};

for (var j = 0; j < cases.length; j++) {
    pathologicalTest(cases[j], results, parse_and_render);
}
cursor.write('\n');

cursor.write(results.passed.toString() + ' tests passed, ' +
             results.failed.toString() + ' failed.\n');

process.exit(results.failed);

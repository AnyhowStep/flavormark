import {TestResult, cursor, specTests, pathologicalTest, repeat} from "./test-func";

const results : TestResult = {
    passed : 0,
    failed : 0,
};

import * as commonmark from "../main/index";
//var util = require("util");

import {BlockquoteHtmlRenderer} from "../main/commonmark/block/render/html/BlockquoteHtmlRenderer";
import {DocumentHtmlRenderer} from "../main/commonmark/block/render/html/DocumentHtmlRenderer";
import {FencedCodeBlockHtmlRenderer} from "../main/commonmark/block/render/html/FencedCodeBlockHtmlRenderer";
import {HeadingHtmlRenderer} from "../main/commonmark/block/render/html/HeadingHtmlRenderer";
import {HtmlBlockHtmlRenderer} from "../main/commonmark/block/render/html/HtmlBlockHtmlRenderer";
import {IndentedCodeBlockHtmlRenderer} from "../main/commonmark/block/render/html/IndentedCodeBlockHtmlRenderer";
import {ItemHtmlRenderer} from "../main/commonmark/block/render/html/ItemHtmlRenderer";
import {ListHtmlRenderer} from "../main/commonmark/block/render/html/ListHtmlRenderer";
import {ParagraphHtmlRenderer} from "../main/commonmark/block/render/html/ParagraphHtmlRenderer";
import {ThematicBreakHtmlRenderer} from "../main/commonmark/block/render/html/ThematicBreakHtmlRenderer";

import {CodeSpanHtmlRenderer} from "../main/commonmark/inline/render/html/CodeSpanHtmlRenderer";
import {EmphasisHtmlRenderer} from "../main/commonmark/inline/render/html/EmphasisHtmlRenderer";
import {HardbreakHtmlRenderer} from "../main/commonmark/inline/render/html/HardbreakHtmlRenderer";
import {HtmlTagHtmlRenderer} from "../main/commonmark/inline/render/html/HtmlTagHtmlRenderer";
import {ImageHtmlRenderer} from "../main/commonmark/inline/render/html/ImageHtmlRenderer";
import {LinkHtmlRenderer} from "../main/commonmark/inline/render/html/LinkHtmlRenderer";
import {SoftbreakHtmlRenderer} from "../main/commonmark/inline/render/html/SoftbreakHtmlRenderer";
import {StrongHtmlRenderer} from "../main/commonmark/inline/render/html/StrongHtmlRenderer";

import {TexBlockHtmlRenderer} from "../main/flavormark/block/render/html/TexBlockHtmlRenderer";

import {SubscriptHtmlRenderer} from "../main/flavormark/inline/render/html/SubscriptHtmlRenderer";
import {SuperscriptHtmlRenderer} from "../main/flavormark/inline/render/html/SuperscriptHtmlRenderer";
import {TexSpanHtmlRenderer} from "../main/flavormark/inline/render/html/TexSpanHtmlRenderer";

import {TableHtmlRenderer} from "../main/gfm/block/render/html/TableHtmlRenderer";
import {TbodyHtmlRenderer} from "../main/gfm/block/render/html/TbodyHtmlRenderer";
import {TdHtmlRenderer} from "../main/gfm/block/render/html/TdHtmlRenderer";
import {TheadHtmlRenderer} from "../main/gfm/block/render/html/TheadHtmlRenderer";
import {ThHtmlRenderer} from "../main/gfm/block/render/html/ThHtmlRenderer";
import {TrHtmlRenderer} from "../main/gfm/block/render/html/TrHtmlRenderer";

import {CheckboxHtmlRenderer} from "../main/gfm/inline/render/html/CheckboxHtmlRenderer";
import {StrikethroughHtmlRenderer} from "../main/gfm/inline/render/html/StrikethroughHtmlRenderer";

import {TextHtmlRenderer} from "./../main/commonmark/inline/render/html/TextHtmlRenderer";

import {HtmlRenderer as BetterHtmlRenderer} from "../main/render/html/HtmlRenderer";
const betterHtmlRenderer = new BetterHtmlRenderer([
    //Lazy to do this right
    new BlockquoteHtmlRenderer(),
    new DocumentHtmlRenderer(),
    new FencedCodeBlockHtmlRenderer(),
    new HeadingHtmlRenderer(),
    new HtmlBlockHtmlRenderer(),
    new IndentedCodeBlockHtmlRenderer(),
    new ItemHtmlRenderer(),
    new ListHtmlRenderer(),
    new ParagraphHtmlRenderer(),
    new ThematicBreakHtmlRenderer(),
    new CodeSpanHtmlRenderer(),
    new EmphasisHtmlRenderer(),
    new HardbreakHtmlRenderer(),
    new HtmlTagHtmlRenderer(),
    new ImageHtmlRenderer(),
    new LinkHtmlRenderer(),
    new SoftbreakHtmlRenderer(),
    new StrongHtmlRenderer(),
    new TexBlockHtmlRenderer(),
    new SubscriptHtmlRenderer(),
    new SuperscriptHtmlRenderer(),
    new TexSpanHtmlRenderer(),
    new TableHtmlRenderer(),
    new TbodyHtmlRenderer(),
    new TdHtmlRenderer(),
    new TheadHtmlRenderer(),
    new ThHtmlRenderer(),
    new TrHtmlRenderer(),
    new CheckboxHtmlRenderer(),
    new StrikethroughHtmlRenderer(),
    new TextHtmlRenderer(),
]);

import {Node} from "../main/Node";

var writer : { render(n : Node) : string } = betterHtmlRenderer;

import {DocumentParser} from "./../main/commonmark/block/parser/DocumentParser";
import {ListParser} from "./../main/commonmark/block/parser/ListParser";
import {BlockquoteParser} from "./../main/commonmark/block/parser/BlockquoteParser";
import {ItemParser} from "./../main/commonmark/block/parser/ItemParser";
import {ThematicBreakParser} from "./../main/commonmark/block/parser/ThematicBreakParser";
import {HtmlBlockParser} from "./../main/commonmark/block/parser/HtmlBlockParser";
import {ParagraphParser} from "./../main/commonmark/block/parser/ParagraphParser";
import {AtxHeadingParser} from "./../main/commonmark/block/parser/AtxHeadingParser";
import {SetextHeadingParser} from "./../main/commonmark/block/parser/SetextHeadingParser";
import {FencedCodeBlockParser} from "./../main/commonmark/block/parser/FencedCodeBlockParser";
import {TexBlockParser} from "./../main/flavormark/block/parser/TexBlockParser";
import {IndentedCodeBlockParser} from "./../main/commonmark/block/parser/IndentedCodeBlockParser";
import {BlockParserCollection} from "../main/BlockParserCollection";
import {TextParser} from "./../main/commonmark/block/parser/TextParser";
import {LinkReferenceDefinitionParser} from "../main/commonmark/block/parser/LinkReferenceDefinitionParser";
import {TableParser} from "./../main/gfm/block/parser/TableParser";
import {TbodyParser} from "./../main/gfm/block/parser/TbodyParser";
import {TdParser} from "./../main/gfm/block/parser/TdParser";
import {TheadParser} from "./../main/gfm/block/parser/TheadParser";
import {ThParser} from "./../main/gfm/block/parser/ThParser";
import {TrParser} from "./../main/gfm/block/parser/TrParser";

const tbodyParser = new TbodyParser();
const tdParser = new TdParser();
const theadParser = new TheadParser();
const thParser = new ThParser();
const trParser = new TrParser();
const tableParser = new TableParser({
    tbodyParser,
    tdParser,
    theadParser,
    thParser,
    trParser,
})

import {RefMap} from "./../main/commonmark/RefMap";
const refMap : RefMap = {};

const listParser = new ListParser();

const blockParserCollection = new BlockParserCollection(
    new DocumentParser(),
    new ParagraphParser([
        new LinkReferenceDefinitionParser(refMap)
    ])
)
    .add(new BlockquoteParser())
    .add(new AtxHeadingParser())
    .add(new FencedCodeBlockParser())

    .add(new TexBlockParser())

    .add(new HtmlBlockParser())
    .add(new SetextHeadingParser())
    .add(new ThematicBreakParser())
    .add(new ItemParser(listParser))
    .add(new IndentedCodeBlockParser())

    .add(tableParser)
    .add(tbodyParser)
    .add(tdParser)
    .add(theadParser)
    .add(thParser)
    .add(trParser)

    .add(listParser)
    .add(new TextParser());

import {DelimiterCollection} from "../main/DelimiterCollection";
import {BracketCollection} from "./../main/commonmark/inline/parser/BracketCollection";
const delimiters = new DelimiterCollection();
const brackets = new BracketCollection(delimiters);

import {InlineParser} from "../main/InlineParser";
import {NewlineParser} from "./../main/commonmark/inline/parser/NewlineParser";
import {EscapeCharacterParser} from "./../main/commonmark/inline/parser/EscapeCharacterParser";
import {CodeSpanParser} from "./../main/commonmark/inline/parser/CodeSpanParser";
import {DelimitedInlineParser} from "../main/DelimitedInlineParser";
import {EmphasisParser} from "./../main/commonmark/inline/parser/EmphasisParser";
import {SmartQuoteParser} from "./../main/misc/inline/parser/SmartQuoteParser";
import {LinkStartParser} from "./../main/commonmark/inline/parser/LinkStartParser";
import {ImageStartParser} from "./../main/commonmark/inline/parser/ImageStartParser";
import {CloseBracketParser} from "./../main/commonmark/inline/parser/CloseBracketParser";
import {EmailAutolinkParser} from "./../main/commonmark/inline/parser/EmailAutolinkParser";
import {UriAutolinkParser} from "./../main/commonmark/inline/parser/UriAutolinkParser";
import {HtmlTagParser} from "./../main/commonmark/inline/parser/HtmlTagParser";
import {EntityParser} from "./../main/commonmark/inline/parser/EntityParser";
import {StringParser} from "./../main/commonmark/inline/parser/StringParser";
import {InlineContentParser} from "../main/InlineContentParser";

import {SuperscriptParser} from "./../main/flavormark/inline/parser/SuperscriptParser";
import {SubscriptParser} from "./../main/flavormark/inline/parser/SubscriptParser";
import {SmartStringParser} from "./../main/misc/inline/parser/SmartStringParser";
import {StrikethroughParser} from "./../main/gfm/inline/parser/StrikethroughParser";
import {CheckboxParser} from "./../main/gfm/inline/parser/CheckboxParser";
import {ExtendedWwwAutolinkParser} from "./../main/gfm/inline/parser/ExtendedWwwAutolinkParser";
import {ExtendedEmailAutolinkParser} from "./../main/gfm/inline/parser/ExtendedEmailAutolinkParser";
import {TexSpanParser} from "./../main/flavormark/inline/parser/TexSpanParser";

const delimParser = new DelimitedInlineParser(delimiters, [
    new EmphasisParser(),
    new SuperscriptParser(),
    new StrikethroughParser(),
]);
const inParsers : InlineParser[] = [
    new NewlineParser(),
    new EscapeCharacterParser(),

    new CheckboxParser(),

    new CodeSpanParser(),
    new TexSpanParser(),
    delimParser,
    new LinkStartParser(brackets),
    new ImageStartParser(brackets),
    new CloseBracketParser(delimParser, brackets, refMap),
    new EmailAutolinkParser(),
    new UriAutolinkParser(),
    new HtmlTagParser(),
    new EntityParser(),

    new StringParser(), //Should this be a default parser that cannot be removed?
];


let reader = new commonmark.Parser({
    blockParsers : blockParserCollection,
    inlineParser : new InlineContentParser({inParsers})
});

const flavorDelimParser = new DelimitedInlineParser(delimiters, [
    new EmphasisParser(),
    new SuperscriptParser(),
    new SubscriptParser(), //Interferes with GFM strikethrough
]);
const flavorInlineParsers : InlineParser[] = [
    new NewlineParser(),
    new EscapeCharacterParser(),

    new CheckboxParser(),

    new CodeSpanParser(),
    flavorDelimParser,
    new LinkStartParser(brackets),
    new ImageStartParser(brackets),
    new CloseBracketParser(flavorDelimParser, brackets, refMap),
    new EmailAutolinkParser(),
    new UriAutolinkParser(),
    new HtmlTagParser(),
    new EntityParser(),

    new ExtendedWwwAutolinkParser(),
    new ExtendedEmailAutolinkParser(),

    new StringParser(), //Should this be a default parser that cannot be removed?
];


let flavorReader = new commonmark.Parser({
    blockParsers : blockParserCollection,
    inlineParser : new InlineContentParser({
        inParsers : flavorInlineParsers
    })
});


const smartDelimParser = new DelimitedInlineParser(delimiters, [
    new EmphasisParser(),
    new SmartQuoteParser(),
]);
const smartInlineParsers : InlineParser[] = [
    new NewlineParser(),
    new EscapeCharacterParser(),
    new CodeSpanParser(),
    smartDelimParser,
    new LinkStartParser(brackets),
    new ImageStartParser(brackets),
    new CloseBracketParser(smartDelimParser, brackets, refMap),
    new EmailAutolinkParser(),
    new UriAutolinkParser(),
    new HtmlTagParser(),
    new EntityParser(),

    new SmartStringParser(),
    new StringParser(), //Should this be a default parser that cannot be removed?
];
let readerSmart = new commonmark.Parser({
    blockParsers : blockParserCollection,
    inlineParser : new InlineContentParser({
        inParsers : smartInlineParsers
    })
});

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
specTests('src/test/tight-list.txt', results, function(z : string) {
    return writer.render(reader.parse(z));
});
//process.exit();
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
specTests('src/test/subscript.txt', results, function(z : string) {
    return writer.render(flavorReader.parse(z));
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

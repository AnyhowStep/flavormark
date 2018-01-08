import * as fm from "../main/index";
import {TestResult, cursor, specTests, pathologicalTest, repeat} from "./test-func";

const results : TestResult = {
    passed : 0,
    failed : 0,
};

const htmlRenderer = new fm.HtmlRenderer([
    new fm.CommonMark.Block.BlockquoteHtmlRenderer(),
    new fm.CommonMark.Block.DocumentHtmlRenderer(),
    new fm.CommonMark.Block.FencedCodeBlockHtmlRenderer(),
    new fm.CommonMark.Block.HeadingHtmlRenderer(),
    new fm.CommonMark.Block.HtmlBlockHtmlRenderer(),
    new fm.CommonMark.Block.IndentedCodeBlockHtmlRenderer(),
    new fm.CommonMark.Block.ItemHtmlRenderer(),
    new fm.CommonMark.Block.ListHtmlRenderer(),
    new fm.CommonMark.Block.ParagraphHtmlRenderer(),
    new fm.CommonMark.Block.ThematicBreakHtmlRenderer(),
    new fm.CommonMark.Inline.CodeSpanHtmlRenderer(),
    new fm.CommonMark.Inline.EmphasisHtmlRenderer(),
    new fm.CommonMark.Inline.HardbreakHtmlRenderer(),
    new fm.CommonMark.Inline.HtmlTagHtmlRenderer(),
    new fm.CommonMark.Inline.ImageHtmlRenderer(),
    new fm.CommonMark.Inline.LinkHtmlRenderer(),
    new fm.CommonMark.Inline.SoftbreakHtmlRenderer(),
    new fm.CommonMark.Inline.StrongHtmlRenderer(),
    new fm.FlavorMark.Block.TexBlockHtmlRenderer(),
    new fm.FlavorMark.Inline.SubscriptHtmlRenderer(),
    new fm.FlavorMark.Inline.SuperscriptHtmlRenderer(),
    new fm.FlavorMark.Inline.TexSpanHtmlRenderer(),
    new fm.Gfm.Block.TableHtmlRenderer(),
    new fm.Gfm.Block.TbodyHtmlRenderer(),
    new fm.Gfm.Block.TdHtmlRenderer(),
    new fm.Gfm.Block.TheadHtmlRenderer(),
    new fm.Gfm.Block.ThHtmlRenderer(),
    new fm.Gfm.Block.TrHtmlRenderer(),
    new fm.Gfm.Inline.CheckboxHtmlRenderer(),
    new fm.Gfm.Inline.StrikethroughHtmlRenderer(),
    new fm.CommonMark.Inline.TextHtmlRenderer(),
]);

var writer : { render(n : fm.Node) : string } = htmlRenderer;

const tbodyParser = new fm.Gfm.Block.TbodyParser();
const tdParser = new fm.Gfm.Block.TdParser();
const theadParser = new fm.Gfm.Block.TheadParser();
const thParser = new fm.Gfm.Block.ThParser();
const trParser = new fm.Gfm.Block.TrParser();
const tableParser = new fm.Gfm.Block.TableParser({
    tbodyParser,
    tdParser,
    theadParser,
    thParser,
    trParser,
})

const refMap : fm.CommonMark.RefMap = {};

const listParser = new fm.CommonMark.Block.ListParser();

const blockParserCollection = new fm.BlockParserCollection(
    new fm.CommonMark.Block.DocumentParser(),
    new fm.CommonMark.Block.ParagraphParser([
        new fm.CommonMark.Block.LinkReferenceDefinitionParser(refMap)
    ])
)
    .add(new fm.CommonMark.Block.BlockquoteParser())
    .add(new fm.CommonMark.Block.AtxHeadingParser())
    .add(new fm.CommonMark.Block.FencedCodeBlockParser())

    .add(new fm.FlavorMark.Block.TexBlockParser())

    .add(new fm.CommonMark.Block.HtmlBlockParser())
    .add(new fm.CommonMark.Block.SetextHeadingParser())
    .add(new fm.CommonMark.Block.ThematicBreakParser())
    .add(new fm.CommonMark.Block.ItemParser(listParser))
    .add(new fm.CommonMark.Block.IndentedCodeBlockParser())

    .add(tableParser)
    .add(tbodyParser)
    .add(tdParser)
    .add(theadParser)
    .add(thParser)
    .add(trParser)

    .add(listParser)
    .add(new fm.CommonMark.Block.TextParser());

const delimiters = new fm.DelimiterCollection();
const brackets = new fm.CommonMark.Inline.BracketCollection(delimiters);

const delimParser = new fm.DelimitedInlineParser(delimiters, [
    new fm.CommonMark.Inline.EmphasisParser(),
    new fm.FlavorMark.Inline.SuperscriptParser(),
    new fm.Gfm.Inline.StrikethroughParser(),
]);
const inParsers : fm.InlineParser[] = [
    new fm.CommonMark.Inline.NewlineParser(),
    new fm.CommonMark.Inline.EscapeCharacterParser(),

    new fm.Gfm.Inline.CheckboxParser(),

    new fm.CommonMark.Inline.CodeSpanParser(),
    new fm.FlavorMark.Inline.TexSpanParser(),
    delimParser,
    new fm.CommonMark.Inline.LinkStartParser(brackets),
    new fm.CommonMark.Inline.ImageStartParser(brackets),
    new fm.CommonMark.Inline.CloseBracketParser(delimParser, brackets, refMap),
    new fm.CommonMark.Inline.EmailAutolinkParser(),
    new fm.CommonMark.Inline.UriAutolinkParser(),
    new fm.CommonMark.Inline.HtmlTagParser(),
    new fm.CommonMark.Inline.EntityParser(),

    new fm.CommonMark.Inline.StringParser(),
];


let reader = new fm.Parser({
    blockParsers : blockParserCollection,
    inlineParser : new fm.InlineContentParser({inParsers})
});

const flavorDelimParser = new fm.DelimitedInlineParser(delimiters, [
    new fm.CommonMark.Inline.EmphasisParser(),
    new fm.FlavorMark.Inline.SuperscriptParser(),
    new fm.FlavorMark.Inline.SubscriptParser(), //Interferes with GFM strikethrough
]);
const flavorInlineParsers : fm.InlineParser[] = [
    new fm.CommonMark.Inline.NewlineParser(),
    new fm.CommonMark.Inline.EscapeCharacterParser(),

    new fm.Gfm.Inline.CheckboxParser(),

    new fm.CommonMark.Inline.CodeSpanParser(),
    flavorDelimParser,
    new fm.CommonMark.Inline.LinkStartParser(brackets),
    new fm.CommonMark.Inline.ImageStartParser(brackets),
    new fm.CommonMark.Inline.CloseBracketParser(flavorDelimParser, brackets, refMap),
    new fm.CommonMark.Inline.EmailAutolinkParser(),
    new fm.CommonMark.Inline.UriAutolinkParser(),
    new fm.CommonMark.Inline.HtmlTagParser(),
    new fm.CommonMark.Inline.EntityParser(),

    new fm.Gfm.Inline.ExtendedWwwAutolinkParser(),
    new fm.Gfm.Inline.ExtendedEmailAutolinkParser(),

    new fm.CommonMark.Inline.StringParser(), //Should this be a default parser that cannot be removed?
];


let flavorReader = new fm.Parser({
    blockParsers : blockParserCollection,
    inlineParser : new fm.InlineContentParser({
        inParsers : flavorInlineParsers
    })
});


const smartDelimParser = new fm.DelimitedInlineParser(delimiters, [
    new fm.CommonMark.Inline.EmphasisParser(),
    new fm.Misc.Inline.SmartQuoteParser(),
]);
const smartInlineParsers : fm.InlineParser[] = [
    new fm.CommonMark.Inline.NewlineParser(),
    new fm.CommonMark.Inline.EscapeCharacterParser(),
    new fm.CommonMark.Inline.CodeSpanParser(),
    smartDelimParser,
    new fm.CommonMark.Inline.LinkStartParser(brackets),
    new fm.CommonMark.Inline.ImageStartParser(brackets),
    new fm.CommonMark.Inline.CloseBracketParser(smartDelimParser, brackets, refMap),
    new fm.CommonMark.Inline.EmailAutolinkParser(),
    new fm.CommonMark.Inline.UriAutolinkParser(),
    new fm.CommonMark.Inline.HtmlTagParser(),
    new fm.CommonMark.Inline.EntityParser(),

    new fm.Misc.Inline.SmartStringParser(),
    new fm.CommonMark.Inline.StringParser(), //Should this be a default parser that cannot be removed?
];
let readerSmart = new fm.Parser({
    blockParsers : blockParserCollection,
    inlineParser : new fm.InlineContentParser({
        inParsers : smartInlineParsers
    })
});

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

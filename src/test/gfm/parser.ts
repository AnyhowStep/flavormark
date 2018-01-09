import * as fm from "../../main/index";
import {renderer} from "./renderer";

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
    new fm.Gfm.Inline.StrikethroughParser(),
]);
const inParsers : fm.InlineParser[] = [
    new fm.CommonMark.Inline.NewlineParser(),
    new fm.CommonMark.Inline.EscapeCharacterParser(),

    new fm.Gfm.Inline.CheckboxParser(),
    //This breaks some CommonMark Autolink tests
    new fm.Gfm.Inline.ExtendedWwwAutolinkParser(),
    //This breaks some CommonMark Autolink tests
    new fm.Gfm.Inline.ExtendedEmailAutolinkParser(),

    new fm.CommonMark.Inline.CodeSpanParser(),
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

const parser = new fm.Parser({
    blockParsers : blockParserCollection,
    inlineContentParser : new fm.InlineContentParser({
        inlineParsers : inParsers
    })
});

export function parseAndRender (md : string) {
    return renderer.render(parser.parse(md));
}

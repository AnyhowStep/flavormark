import * as fm from "../../main/index";
import {renderer} from "./renderer";

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

    .add(new fm.FlavorMark.Block.TexBlockParser())

    .add(listParser)
    .add(new fm.CommonMark.Block.TextParser());

const delimiters = new fm.DelimiterCollection();
const brackets = new fm.CommonMark.Inline.BracketCollection(delimiters);

const delimParser = new fm.DelimitedInlineParser(delimiters, [
    new fm.CommonMark.Inline.EmphasisParser(),
    new fm.FlavorMark.Inline.SubscriptParser(),
    new fm.FlavorMark.Inline.SuperscriptParser(),
]);
const inParsers : fm.InlineParser[] = [
    new fm.CommonMark.Inline.NewlineParser(),
    new fm.CommonMark.Inline.EscapeCharacterParser(),

    new fm.CommonMark.Inline.CodeSpanParser(),
    delimParser,
    new fm.CommonMark.Inline.LinkStartParser(brackets),
    new fm.CommonMark.Inline.ImageStartParser(brackets),
    new fm.CommonMark.Inline.CloseBracketParser(delimParser, brackets, refMap),
    new fm.CommonMark.Inline.EmailAutolinkParser(),
    new fm.CommonMark.Inline.UriAutolinkParser(),
    new fm.CommonMark.Inline.HtmlTagParser(),
    new fm.CommonMark.Inline.EntityParser(),

    new fm.FlavorMark.Inline.TexSpanParser(),

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

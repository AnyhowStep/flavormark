import * as fm from "../../main/index";

export const renderer = new fm.HtmlRenderer([
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
    new fm.CommonMark.Inline.TextHtmlRenderer(),

    new fm.FlavorMark.Block.TexBlockHtmlRenderer(),
    new fm.FlavorMark.Inline.SubscriptHtmlRenderer(),
    new fm.FlavorMark.Inline.SuperscriptHtmlRenderer(),
    new fm.FlavorMark.Inline.TexSpanHtmlRenderer(),
]);

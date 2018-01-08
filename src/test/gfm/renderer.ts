import * as fm from "../../main/index";

export const renderer = new fm.HtmlRenderer([
    new fm.CommonMark.Block.BlockquoteHtmlRenderer(),
    new fm.CommonMark.Block.DocumentHtmlRenderer(),
    new fm.CommonMark.Block.FencedCodeBlockHtmlRenderer(),
    new fm.CommonMark.Block.HeadingHtmlRenderer(),
    //Disables some tags
    //This breaks some CommonMark Html Block tests
    new fm.Gfm.Block.HtmlBlockHtmlRenderer(),
    new fm.CommonMark.Block.IndentedCodeBlockHtmlRenderer(),
    new fm.CommonMark.Block.ItemHtmlRenderer(),
    new fm.CommonMark.Block.ListHtmlRenderer(),
    new fm.CommonMark.Block.ParagraphHtmlRenderer(),
    new fm.CommonMark.Block.ThematicBreakHtmlRenderer(),
    new fm.CommonMark.Inline.CodeSpanHtmlRenderer(),
    new fm.CommonMark.Inline.EmphasisHtmlRenderer(),
    new fm.CommonMark.Inline.HardbreakHtmlRenderer(),
    //Disables some tags
    //This breaks some CommonMark Html Tag tests
    new fm.Gfm.Inline.HtmlTagHtmlRenderer(),
    new fm.CommonMark.Inline.ImageHtmlRenderer(),
    new fm.CommonMark.Inline.LinkHtmlRenderer(),
    new fm.CommonMark.Inline.SoftbreakHtmlRenderer(),
    new fm.CommonMark.Inline.StrongHtmlRenderer(),
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

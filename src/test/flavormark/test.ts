import {parseAndRender} from "./parser";
import * as t from "../test-func";
import {doPathologicalTests} from "../commonmark/pathological-test";

export function testFlavorMark (results : t.TestResult) {
    t.specTests(`${__dirname}/subscript.md`, results, parseAndRender);
    t.specTests(`${__dirname}/superscript.md`, results, parseAndRender);
    t.specTests(`${__dirname}/tex-block.md`, results, parseAndRender);
    t.specTests(`${__dirname}/tex-span.md`, results, parseAndRender);

    //From CommonMark
    t.specTests(`${__dirname}/../commonmark/regression.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/../commonmark/spec.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/../commonmark/tight-list.txt`, results, parseAndRender);
    doPathologicalTests(parseAndRender, results);
}

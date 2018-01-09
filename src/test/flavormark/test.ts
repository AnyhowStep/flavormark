import {parseAndRender} from "./parser";
import * as t from "../test-func";
import {doPathologicalTests} from "../commonmark/pathological-test";

export function testFlavorMark (results : t.TestResult) {
    t.specTests(`${__dirname}/latex.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/subscript.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/superscript.txt`, results, parseAndRender);

    //From CommonMark
    t.specTests(`${__dirname}/../commonmark/regression.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/../commonmark/spec.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/../commonmark/tight-list.txt`, results, parseAndRender);
    doPathologicalTests(parseAndRender, results);
}

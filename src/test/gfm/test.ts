import {parseAndRender} from "./parser";
import * as t from "../test-func";
import {doPathologicalTests} from "../commonmark/pathological-test";

export function testGfm (results : t.TestResult) {
    t.specTestsHtml(`${__dirname}/spec.html`, results, parseAndRender);

    //From CommonMark
    t.specTests(`${__dirname}/../commonmark/tight-list.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/../commonmark/regression.txt`, results, parseAndRender);
    doPathologicalTests(parseAndRender, results);
}

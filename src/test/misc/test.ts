import {parseAndRender} from "./parser";
import * as t from "../test-func";
//import {doPathologicalTests} from "../commonmark/pathological-test";

export function testMisc (results : t.TestResult) {
    t.specTests(`${__dirname}/smart_punct.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/smart.txt`, results, parseAndRender);

    //Smart stuff breaks on commonmark spec
    //because it modifies characters like dashes, ellipsis, quotes

    //From CommonMark
    //t.specTests(`${__dirname}/../commonmark/regression.txt`, results, parseAndRender);
    //t.specTests(`${__dirname}/../commonmark/spec.txt`, results, parseAndRender);
    //t.specTests(`${__dirname}/../commonmark/tight-list.txt`, results, parseAndRender);
    //doPathologicalTests(parseAndRender, results);
}

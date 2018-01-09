import {parseAndRender} from "./parser";
import * as t from "../test-func";
import {doPathologicalTests} from "../commonmark/pathological-test";

export function testGfm (results : t.TestResult) {
    t.specTestsHtml(`${__dirname}/spec.html`, results, parseAndRender);
    t.specTests(`${__dirname}/checkbox.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/extended-email-autolink.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/extended-www-autolink.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/strikethrough.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/table.txt`, results, parseAndRender);

    //From CommonMark
    t.specTests(`${__dirname}/../commonmark/tight-list.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/../commonmark/regression.txt`, results, parseAndRender);
    doPathologicalTests(parseAndRender, results);
}

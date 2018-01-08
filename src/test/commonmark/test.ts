import {parseAndRender} from "./parser";
import * as t from "../test-func";
import {doPathologicalTests} from "./pathological-test";

export function testCommonMark (results : t.TestResult) {
    t.specTests(`${__dirname}/tight-list.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/spec.txt`, results, parseAndRender);
    t.specTests(`${__dirname}/regression.txt`, results, parseAndRender);
    doPathologicalTests(parseAndRender, results);

    //Uncomment to see breaking changes between GFM and CommonMark
    //t.specTestsHtml(`${__dirname}/../gfm/spec.html`, results, parseAndRender);
}

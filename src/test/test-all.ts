import * as t from "./test-func";
import {testCommonMark} from "./commonmark/test";
import {testGfm} from "./gfm/test";

const results : t.TestResult = {
    passed : 0,
    failed : 0,
};

testCommonMark(results);
testGfm(results);

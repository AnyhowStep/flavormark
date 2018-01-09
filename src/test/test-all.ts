import * as t from "./test-func";
import {testCommonMark} from "./commonmark/test";
import {testFlavorMark} from "./flavormark/test";
import {testGfm} from "./gfm/test";
import {testMisc} from "./misc/test";

const results : t.TestResult = {
    passed : 0,
    failed : 0,
};

console.log();
console.log("== COMMONMARK ==");
testCommonMark(results);
console.log();
console.log("== FLAVORMARK ==");
testFlavorMark(results);
console.log();
console.log("== GFM ==");
testGfm(results);
console.log();
console.log("== MISC ==");
testMisc(results);


//Print results last
t.printResult(results);

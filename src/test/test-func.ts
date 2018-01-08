import * as fs from "fs";
import {decodeHTML} from "entities";

export interface TestResult {
    passed : number;
    failed : number;
}

function showSpaces (s : string) : string {
    return s
        .replace(/\t/g, '→')
        .replace(/ /g, '␣');
}

// Home made mini-version of the npm ansi module:
function escSeq (s : string) {
    return function (this : any) {
        process.stdout.write('\u001b' + s);
        return this;
    };
}

export const cursor = {
    write: function (s : string) {
        process.stdout.write(s);
        return this;
    },
    green: escSeq('[0;32m'),
    red: escSeq('[0;31m'),
    cyan: escSeq('[0;36m'),
    reset: escSeq('[0m')
};

export interface TestCase {
    markdown : string;
    html     : string;
    section  : string;
    number   : number;
}

export function extractSpecTests (testfile : string) {
    const data = fs.readFileSync(testfile, 'utf8');
    const examples : TestCase[] = [];
    let current_section = "";
    let example_number = 0;
    const tests = data
        .replace(/\r\n?/g, "\n") // Normalize newlines for platform independence
        .replace(/^<!-- END TESTS -->(.|[\n])*/m, '');

    tests.replace(
        /^`{32} example\n([\s\S]*?)^\.\n([\s\S]*?)^`{32}$|^#{1,6} *(.*)$/gm,
        function (_ : string, markdownSubmatch : string, htmlSubmatch : string, sectionSubmatch : string) {
            if (sectionSubmatch) {
                current_section = sectionSubmatch;
            } else {
                example_number++;
                examples.push({
                    markdown : markdownSubmatch,
                    html     : htmlSubmatch,
                    section  : current_section,
                    number   : example_number
                });
            }
            return "";
        }
    );
    return examples;
}
export function extractSpecTestsHtml (testfile : string) {
    const data = fs.readFileSync(testfile, 'utf8');
    const examples : TestCase[] = [];
    let current_section = "";
    let example_number = 0;
    const tests = data
        .replace(/\r\n?/g, "\n") // Normalize newlines for platform independence
        .replace(/^<!-- END TESTS -->(.|[\n])*/m, '');
    tests.replace(
        /\<div class\=\"column\"\>\n\<pre\>\<code class\=\"language\-markdown\"\>([^]*?)\<\/code\>\<\/pre\>\n\<\/div\>\n\<div class\=\"column\"\>\n\<pre\>\<code class\=\"language-html\"\>([^]*?)\<\/code\>\<\/pre\>\n\<\/div\>|\<span class\=\"number\"\>\d+\.\d+\<\/span\>([^]+?)\<\/h2\>/g,
        function (_ : string, markdownSubmatch : string, htmlSubmatch : string, sectionSubmatch : string) {
            if (sectionSubmatch) {
                current_section = sectionSubmatch;
            } else {
                const spaceRegex = /\<span class\=\"space\"\> \<\/span\>/g;
                example_number++;
                examples.push({
                    markdown : decodeHTML(markdownSubmatch.replace(spaceRegex, " ")),
                    html     : decodeHTML(htmlSubmatch.replace(spaceRegex, " ")),
                    section  : current_section,
                    number   : example_number
                });
            }
            return "";
        }
    );
    return examples;
}

export function specTest (testcase : TestCase, res : TestResult, converter : (str : string) => string) {
    const markdown = testcase.markdown.replace(/→/g, '\t');
    const expected = testcase.html.replace(/→/g, '\t');
    const actual = converter(markdown);
    if (actual === expected) {
        res.passed++;
        cursor.green().write('✓').reset();
    } else {
        res.failed++;
        cursor.write('\n');

        cursor.red().write('✘ Example ' + testcase.number + '\n');
        cursor.cyan();
        cursor.write('=== markdown ===============\n');
        cursor.write(showSpaces(markdown));
        cursor.write('=== expected ===============\n');
        cursor.write(showSpaces(expected));
        cursor.write('=== got ====================\n');
        cursor.write(showSpaces(actual));
        cursor.reset();
        console.log("");
        console.log(JSON.stringify(markdown));
        console.log(JSON.stringify(expected));
        console.log(JSON.stringify(actual));
    }
}

export function doSpecTests (testfile : string, examples : TestCase[], results : TestResult, converter : (str : string) => string) {
    cursor.write('Spec tests [' + testfile + ']:\n');

    let current_section = "";

    console.time("Elapsed time");
    for (let i = 0; i < examples.length; i++) {
        const testcase = examples[i];
        if (testcase.section !== current_section) {
            if (current_section !== '') {
                cursor.write('\n');
            }
            current_section = testcase.section;
            cursor.reset().write(current_section).reset().write('  ');
        }
        specTest(testcase, results, converter);
    }
    cursor.write('\n');
    console.timeEnd("Elapsed time");
    cursor.write('\n');
}

export function specTests (testfile : string, results : TestResult, converter : (str : string) => string) {
    const examples = extractSpecTests(testfile);
    doSpecTests(testfile, examples, results, converter);
}
export function specTestsHtml (testfile : string, results : TestResult, converter : (str : string) => string) {
    const examples = extractSpecTestsHtml(testfile);
    doSpecTests(testfile, examples, results, converter);
}
export interface PathologicalTestCase {
    name     : string;
    input    : string;
    expected : string;
}

export function pathologicalTest (testcase : PathologicalTestCase, res : TestResult, converter : (str : string) => string) {
    cursor.write(testcase.name + ' ');
    console.time('  elapsed time');
    const actual = converter(testcase.input);
    if (actual === testcase.expected) {
        cursor.green().write('✓\n').reset();
        res.passed += 1;
    } else {
        cursor.red().write('✘\n');
        cursor.cyan();
        cursor.write('=== markdown ===============\n');
        cursor.write(showSpaces(testcase.input));
        cursor.write('=== expected ===============\n');
        cursor.write(showSpaces(testcase.expected));
        cursor.write('=== got ====================\n');
        cursor.write(showSpaces(actual));
        cursor.write('\n');
        cursor.reset();
        res.failed += 1;
    }
    console.timeEnd('  elapsed time');
}

export function repeat (str : string, count : number) {
    return str.repeat(count);
}

export function printResult (results : TestResult) {
    cursor.write('\n');

    cursor.write(results.passed.toString() + ' tests passed, ' +
                 results.failed.toString() + ' failed.\n');

    process.exit(results.failed);
}

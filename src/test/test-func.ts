import * as fs from "fs";

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
    }
}

export function specTests (testfile : string, results : TestResult, converter : (str : string) => string) {
    cursor.write('Spec tests [' + testfile + ']:\n');

    let current_section = "";
    const examples = extractSpecTests(testfile);

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
};

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

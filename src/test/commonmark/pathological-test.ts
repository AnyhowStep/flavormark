import {TestResult, cursor, pathologicalTest, repeat} from "../test-func";

export function doPathologicalTests (parseAndRender : (md : string) => string, results : TestResult) {
    cursor.write('Pathological cases:\n');

    const cases = [
        { name: 'U+0000 in input',
          input: 'abc\u0000xyz\u0000\n',
          expected: '<p>abc\ufffdxyz\ufffd</p>\n' },
        { name: 'alternate line endings',
          input: '- a\n- b\r- c\r\n- d',
          expected: '<ul>\n<li>a</li>\n<li>b</li>\n<li>c</li>\n<li>d</li>\n</ul>\n'
        }
    ];

    var x;
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: 'nested strong emph ' + x + ' deep',
              input: repeat('*a **a ', x) + 'b' + repeat(' a** a*', x),
              expected: '<p>' + repeat('<em>a <strong>a ', x) + 'b' +
              repeat(' a</strong> a</em>', x) + '</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: x + ' emph closers with no openers',
              input: repeat('a_ ', x),
              expected: '<p>' + repeat('a_ ', x - 1) + 'a_</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: x + ' emph openers with no closers',
              input: repeat('_a ', x),
              expected: '<p>' + repeat('_a ', x - 1) + '_a</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: x + ' link closers with no openers',
              input: repeat('a] ', x),
              expected: '<p>' + repeat('a] ', x - 1) + 'a]</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: x + ' link openers with no closers',
              input: repeat('[a ', x),
              expected: '<p>' + repeat('[a ', x - 1) + '[a</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: x + ' link openers and emph closers',
              input: repeat('[ a_ ', x),
              expected: '<p>' + repeat('[ a_ ', x - 1) + '[ a_</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: x + ' mismatched openers and closers',
              input: repeat('*a_ ', x),
              expected: '<p>' + repeat('*a_ ', x - 1) + '*a_</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: 'nested brackets ' + x + ' deep',
              input: repeat('[', x) + 'a' + repeat(']', x),
              expected: '<p>' + repeat('[', x) + 'a' + repeat(']', x) +
              '</p>\n' });
    }
    for (x = 1000; x <= 10000; x *= 10) {
        cases.push(
            { name: 'nested block quote ' + x + ' deep',
              input: repeat('> ', x) + 'a\n',
              expected: repeat('<blockquote>\n', x) + '<p>a</p>\n' +
              repeat('</blockquote>\n', x) });
    }

    for (var j = 0; j < cases.length; j++) {
        pathologicalTest(cases[j], results, parseAndRender);
    }

}

const { Mark } = require('slate');
const { toFormattingAttributes, toSlateMarks } = require('../src');

const tests = [
    ['Bold', [Mark.create({ type: 'strong' })], { strong: 'true' }],
    ['Italics', [Mark.create({ type: 'em' })], { em: 'true' }],
    ['Underline', [Mark.create({ type: 'underline' })], { underline: 'true' }],
    ['Strikethrough', [Mark.create({ type: 'del' })], { del: 'true' }],
    [
        'Bold and italics',
        [Mark.create({ type: 'strong' }), Mark.create({ type: 'em' })],
        {
            strong: 'true',
            em: 'true',
        },
    ],
    [
        'Text color',
        [Mark.create({ type: 'text_color', data: { value: '#123456' } })],
        { 'text_color:#123456': 'true' },
    ],
    [
        'Highlight color',
        [Mark.create({ type: 'highlight_color', data: { value: '#edcba9' } })],
        { 'highlight_color:#edcba9': 'true' },
    ],
    [
        'Text and highlight colors',
        [
            Mark.create({ type: 'text_color', data: { value: '#234567' } }),
            Mark.create({ type: 'highlight_color', data: { value: '#dcba98' } }),
        ],
        {
            'text_color:#234567': 'true',
            'highlight_color:#dcba98': 'true',
        },
    ],
];

describe('toFormattingAttributes', () => {
    tests.forEach(([testName, slateMarks, yjsFormattingAttributes]) => {
        it(`${testName}`, () => {
            expect(toFormattingAttributes(slateMarks)).toEqual(yjsFormattingAttributes);
            expect(toFormattingAttributes(slateMarks, true)).toEqual(yjsFormattingAttributes);
        });
    });

    it('Clear mark', () => {
        expect(toFormattingAttributes([Mark.create({ type: 'strong' })], false)).toEqual({
            strong: null,
        });
    });
});

describe('toSlateMarks', () => {
    tests.forEach(([testName, slateMarks, yjsFormattingAttributes]) => {
        it(`${testName}`, () => {
            expect(toSlateMarks(yjsFormattingAttributes)).toEqual(slateMarks);
        });
    });

    it('Clear mark', () => {
        expect(toSlateMarks({ em: null })).toEqual([Mark.create({ type: 'em' })]);
    });
});

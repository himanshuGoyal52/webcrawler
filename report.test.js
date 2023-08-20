const {sortPages} = require('./report.js');
const {test , expect} = require('@jest/globals');

test('sortPages' , () => {
    const input = {
        "https://www.woodsleaf.com" : 3,
        "https://www.woodsleaf.com/shop" : 5,
    };
    const actual = sortPages(input);
    const expected = [
        ["https://www.woodsleaf.com/shop" , 5],
        ["https://www.woodsleaf.com" , 3]
    ];
    expect(actual).toEqual(expected);
})
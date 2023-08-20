const {normalizeURL , getURLsFromHTML} = require('./crawl.js');
const {test , expect} = require('@jest/globals');

/********************** normalizeURL ****************************/

test('normalizeURL strip protocol' , () => {
    const input = "https://www.woodsleaf/path";
    const actual = normalizeURL(input);
    const expected = "www.woodsleaf/path";
    expect(actual).toEqual(expected);
})

test('normalizeURL strip trailing slash' , () => {
    const input = "https://www.woodsleaf/path/";
    const actual = normalizeURL(input);
    const expected = "www.woodsleaf/path";
    expect(actual).toEqual(expected);
})

test('normalizeURL capitals' , () => {
    const input = "https://www.WOODSLEAF/path/";
    const actual = normalizeURL(input);
    const expected = "www.woodsleaf/path";
    expect(actual).toEqual(expected);
})

test('normalizeURL http protocol' , () => {
    const input = "http://www.woodsleaf/path";
    const actual = normalizeURL(input);
    const expected = "www.woodsleaf/path";
    expect(actual).toEqual(expected);
})

/********************** getURLsFromHTML ****************************/

test('getURLsFromHTML absolute' , () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="https://www.woodsleaf.com/shop">Our Shop</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://www.woodsleaf.com";
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL);
    const expected = ["https://www.woodsleaf.com/shop"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML relative' , () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/shop">Our Shop</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://www.woodsleaf.com";
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL);
    const expected = ["https://www.woodsleaf.com/shop"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML both' , () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="/shop">Our Shop</a>
                <a href="https://www.woodsleaf.com/blogs">Our Blogs</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://www.woodsleaf.com";
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL);
    const expected = ["https://www.woodsleaf.com/shop" , "https://www.woodsleaf.com/blogs"];
    expect(actual).toEqual(expected);
})

test('getURLsFromHTML invalid' , () => {
    const inputHTMLBody = `
        <html>
            <body>
                <a href="invalid">Invalid url</a>
            </body>
        </html>
    `;
    const inputBaseURL = "https://www.woodsleaf.com";
    const actual = getURLsFromHTML(inputHTMLBody , inputBaseURL);
    const expected = [];
    expect(actual).toEqual(expected);
})
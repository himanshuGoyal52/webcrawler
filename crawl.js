/*
Three steps in test wala development env.
1) stub out the function that you want to test
2) write the test for the fuction
3) go back and implement the meat of function
*/


const {JSDOM} = require('jsdom'); // for getURLsFromHTMl

function getURLsFromHTML(htmlBody , baseURL){
    const urls = [];
    const dom = new JSDOM(htmlBody);
    const linkElements = dom.window.document.querySelectorAll('a');
    for(const linkElement of linkElements){
        if(linkElement.href.slice(0,1) === '/'){
            // relative url
            try{
                const urlObj = new URL(`${baseURL}${linkElement}`);
                urls.push(urlObj.href);
            }catch(err){
                console.log(`error with relative url: ${err.message}`);
            }
        }else{
            try{
                const urlObj = new URL(linkElement.href);
                urls.push(urlObj.href);
            }catch(err){
                console.log(`error with absolute url: ${err.message}`);
            }
        }
    }
    return urls;
}

function normalizeURL(urlString){
    /*  (normalization)
        https://www.woodsleaf.com/ -> https://www.woodsleaf.com
        http://www.woodsleaf.com -> https://www.woodsleaf.com
        https://www.Woodsleaf.com -> https://www.woodsleaf.com
    */
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0 , -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL,
    getURLsFromHTML
}
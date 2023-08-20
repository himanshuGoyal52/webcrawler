/*
Three steps in test wala development env.
1) stub out the function that you want to test
2) write the test for the fuction
3) go back and implement the meat of function
*/

/*  (normalization)
    https://woodsleaf.com/ -> https://woodsleaf.com
    http://woodsleaf.com -> https://woodsleaf.com
    https://Woodsleaf.com -> https://woodsleaf.com
*/

function normalizeURL(urlString){
    const urlObj = new URL(urlString);
    const hostPath = `${urlObj.hostname}${urlObj.pathname}`;
    if(hostPath.length > 0 && hostPath.slice(-1) === '/'){
        return hostPath.slice(0 , -1);
    }
    return hostPath;
}

module.exports = {
    normalizeURL
}
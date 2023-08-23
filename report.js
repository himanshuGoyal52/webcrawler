var pdf = require("pdf-creator-node");
var fs = require("fs");
const { normalizeURL } = require("./crawl");

function genratePdf(pages , baseURL){
    var html = fs.readFileSync("template.html", "utf8");

    const sortedPages = sortPages(pages);
    const normalURL = normalizeURL(baseURL);

    const newPages = [];
    for(let sortedPage of sortedPages){
        let x = {
            url : sortedPage[0],
            hits : sortedPage[1]
        };
        newPages.push(x);
    }

    var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm",
        header: {
            height: "45mm",
            contents: `<div style="text-align: center; font-size:2rem;">Website Crawler Report (${normalURL})</div><div style="text-align: center; font-size:1rem;">(By Himanshu Goyal)</div>`
        },
        footer: {
            height: "28mm",
            contents: {
                default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>',
            }
        }
    };

    var document = {
        html: html,
        data: {
          pages: newPages,
        },
        path: `./report_${normalURL}.pdf`,
        type: "",
    };

    pdf.create(document, options)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.error(error);
    });

}

function sortPages(pages){
    const pagesArr = Object.entries(pages);

    pagesArr.sort((a , b) => {
        const aHits = a[1];
        const bHits = b[1];

        return bHits - aHits;
    })
    return pagesArr;
}

function printReport(pages){
    console.log("====================");
    console.log("REPORT (By Himanshu Goyal)");
    console.log("====================");

    const sortePages = sortPages(pages);


    for(const sortedPage of sortePages){
        const url = sortedPage[0];
        const hits = sortedPage[1];

        console.log(`Found ${hits} links to page : ${url}`);
    }

    console.log("====================");
    console.log("END REPORT (By Himanshu Goyal)");
    console.log("====================");

}

module.exports = {
    sortPages,
    printReport,
    genratePdf,
}
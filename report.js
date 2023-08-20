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
    printReport
}
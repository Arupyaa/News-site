let newsUrl = "https://newsdata.io/api/1/latest?apikey=pub_0546c8c8de6c4c79913850dd3d5a7843"

function buildNewsUrl(country, category, language = "en", searchword = undefined) {
    // let words = searchword.trim('').split(' ');
    if (searchword == undefined || searchword == null) {
        return `${newsUrl}&country=${country}&category=${category}&language=${language}`;
    } else if (words <= 1) {
        return `${newsUrl}&country=${country}&category=${category}&language=${language}&q=${searchword}`;
    }
    else {
        return `${newsUrl}&country=${country}&category=${category}&language=${language}&q="${searchword}"`;
    }
}

let politicsImages = document.querySelectorAll(".politics .img-section img");
let politicsTitles = document.querySelectorAll(".politics h3");
let politicsDescription = document.querySelectorAll(".politics .card-text");
let politicsDate = document.querySelectorAll(".politics .date");
let politicsLogos = document.querySelectorAll(".politics .card-body img");

updateNewsElement();

//politics section
async function updateNewsElement() {
    let politicsNews = await fetch(buildNewsUrl("eg", "politics")).then((result) => result.json());

    politicsImages.forEach((node, nodeIndex) => node.setAttribute("src", politicsNews.results[nodeIndex].image_url));
    politicsTitles.forEach((node, nodeIndex) => node.innerText = politicsNews.results[nodeIndex].title);
    politicsDescription.forEach((node, nodeIndex) => node.innerText = politicsNews.results[nodeIndex].description);
    politicsDate.forEach((node, nodeIndex) => node.innerText = politicsNews.results[nodeIndex].pubDate); //remove extra details later
    politicsLogos.forEach((node, nodeIndex) => node.setAttribute("src", politicsNews.results[nodeIndex].source_icon));
}


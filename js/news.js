let newsUrl = "https://newsdata.io/api/1/latest?apikey=pub_0546c8c8de6c4c79913850dd3d5a7843&removeduplicate=1"

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


updateNewsElement("politics",true);
updateNewsElement("sports",true);
updateNewsElement("entertainment",true);

//politics section
async function updateNewsElement(category,isForceUpdate) {
    let NewsImages = document.querySelectorAll(`.${category} .img-section img`);
    let NewsTitles = document.querySelectorAll(`.${category} h3`);
    let NewsDescription = document.querySelectorAll(`.${category} .card-text`);
    let NewsDate = document.querySelectorAll(`.${category} .date`);
    let NewsLogos = document.querySelectorAll(`.${category} .card-body img`);
    
    let news = localStorage.getItem(`news${category}Json`);
    if(news == null || isForceUpdate){
        news = await fetch(buildNewsUrl("gb", category,"en")).then((result) => result.json());
        localStorage.setItem(`news${category}Json`,JSON.stringify(news));
        console.log(`sent api request for ${category} category to news api`);
    }else{
        news = JSON.parse(news);
    }

    NewsImages.forEach((node, nodeIndex) => node.setAttribute("src", news.results[nodeIndex].image_url));
    NewsTitles.forEach((node, nodeIndex) => node.innerText = news.results[nodeIndex].title);
    NewsDescription.forEach((node, nodeIndex) => node.innerText = news.results[nodeIndex].description);
    NewsDate.forEach((node, nodeIndex) => node.innerText = news.results[nodeIndex].pubDate); //remove extra details later
    NewsLogos.forEach((node, nodeIndex) => node.setAttribute("src", news.results[nodeIndex].source_icon));
}


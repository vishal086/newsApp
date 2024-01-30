const API_KEY = "64c6418291ca4a5fa2c941a1e88a4777"
const URL = "https://newsapi.org/v2/everything?q="

window.addEventListener('load',fetchNews('india'))

function reload()
{
    window.location.reload()
}
async function fetchNews(query)
{
    const response = await fetch(`${URL}${query}&apiKey=${API_KEY}`)
    const data = await response.json();
    console.log(data)
    bindData(data.articles)
}

function bindData(articles)
{
      let cardContainer = document.getElementById('card-container')
      let cardTemplate = document.getElementById('template-news-card')


      cardContainer.innerHTML ='';

      articles.forEach(element => {
        if(!(element.urlToImage))
           return ;
        const cardClone = cardTemplate.content.cloneNode(true)
        fillDataInCard(cardClone,element)
        cardContainer.appendChild(cardClone)
      });
}

function fillDataInCard(cardClone,element)
{
    const newsImg = cardClone.getElementById('news-img')
    const newsTitle = cardClone.getElementById('news-title')
    const newsDesc = cardClone.getElementById('news-desc')
    const newsSrc = cardClone.getElementById('news-src')
    const more = cardClone.getElementById('more')

    newsImg.src = element.urlToImage
    newsTitle.innerHTML = element.title
    newsDesc.innerHTML = element.description

    const date = new Date(element.publishedAt).toLocaleDateString()
    newsSrc.innerHTML = `${element.source.name} : ${date}`

    more.addEventListener('click',()=>{
        window.open(element.url,"_blank")
    })
}


let curSelectedNav = null;
function selectNav(id)
{
    fetchNews(id)
}


const searchBtn = document.getElementById('search-btn')
const searchTxt = document.getElementById('input-value')

searchBtn.addEventListener('click',()=>{
      const data = searchTxt.value;
      if(!data) return 
      fetchNews(data)
})
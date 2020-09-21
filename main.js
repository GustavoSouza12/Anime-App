const base_url = "https://api.jikan.moe/v3"

function searchAnime(event){

    event.preventDefault()

    const form = new FormData(this);
    const query = form.get("search");

    fetch(`${base_url}/search/anime?q=${query}&page=1`)
    .then(res=>res.json())
    .then(updateDom)
    .catch(err=>console.warn(err.message)) 
}

function updateDom(data){

    const searchResults = document.querySelector('#search-results');

  
    const animeByCategories = data.results
        .reduce((acc,anime)=>{

            const {type} = anime;
            if(acc[type] === undefined) acc[type] = [];
            acc[type].push(anime);
            return acc;
        }, {})

       searchResults.innerHTML = Object.keys(animeByCategories).map(key=>{

           const animesHTML = animeByCategories[key] 
            .sort((a,b)=>a.episode-b.episode)
            .map(anime=>{
            return `
                    <div class="col s12 m7">
                        <div class="card">
                                <div class="card-image">
                                <img src="${anime.image_url}">
                                <span class="card-title">${anime.title}</span>
                                </div>
                                <div class="card-content">
                                <p>${anime.synopsis}</p>
                            </div>
                            <div class="card-action">
                                <a href="${anime.url}" target="_blank">AAAAAAA</a>
                            </div>
                        </div>
                    </div>`
        }).join("")

        return `
            <section>
                <h3>${key.toUpperCase()}</h3>
                <div class="row">${animesHTML}</div>
            </section>`
        }).join("")


    data.results
        .sort((a,b)=>a.episode-b.episode)
        .forEach(anime=>console.log(anime))
}


function pageLoaded(){
    const form = document.querySelector("#search_form");
    form.addEventListener("submit", searchAnime)

}

window.addEventListener("load", pageLoaded)
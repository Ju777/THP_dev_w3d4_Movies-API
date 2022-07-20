const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');

// var url = 'http://www.omdbapi.com/?s=prout&apikey=1903931a';

try {
    getData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
        return data;
    }
} catch(error) {
    console.log("Erreur dans le fetch => " + error);
}

getInput = () => {
    
    searchButton.addEventListener('click', async () => {
        console.clear();
        console.log(searchInput.value);
        let url = inputToURL(searchInput.value);
        let data = await getData(url);
        displayResults(data);
    });
}

inputToURL = (input) => {
    console.log('http://www.omdbapi.com/?s=' + input + '&apikey=1903931a')
    return 'http://www.omdbapi.com/?s=' + input + '&apikey=1903931a'
}

displayResults = (data) => {
    // log de vérif
    // console.log("on est dans displayResults, la paramètre est");
    // console.log(data.Search[0]);
    let results = data.Search;
    let html = '';

    results.map(movie => {
        let htmlSegment =
            `
            <div>${movie.Title}</div>
            `
        html += htmlSegment;
    });

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = html;


}

perform = () => {
  
    getInput();
}

perform();
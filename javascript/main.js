const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const dataContainer = document.getElementById('data-container');

    // Variables de l'observateur d'intersection
    var numSteps = 100.0;
    var boxElement;
    // FIN


try {
    getData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
} catch(error) {
    console.log("Erreur dans le fetch => " + error);
}

getInput = () => {
    
    searchButton.addEventListener('click', async () => {
        //Log de vérif
        // console.log(searchInput.value);
        dataContainer.innerHTML = '';
        let userInput = searchInput.value;
        let url = inputToURL(userInput);
        data = await getData(url);

        displayResults(data);

    });

}

inputToURL = (input) => {
    console.log('https://www.omdbapi.com/?s=' + input + '&apikey=1903931a')
    return 'https://www.omdbapi.com/?s=' + input + '&apikey=1903931a'
}

idToURL = (id) => {
    return 'https://www.omdbapi.com/?i=' + id + '&apikey=1903931a'
}

displayResults = (data) => {
    let moviesList = data.Search;
    let html = '';

    // Affichage de la liste des fims correspondant à l'input de l'utilisateur
    moviesList.map(movie => {     

        // On crée la div qui sera une nouvelle ligne
        const row = document.createElement('div');
        row.setAttribute('id', `row-${movie.imdbID}`);
        row.classList.add('row');
        dataContainer.appendChild(row);  
        
        // On crée la div qui contiendra l'image miniature du film
        const poster = document.createElement('div');
        poster.classList.add('poster');
        row.appendChild(poster);
        poster.innerHTML = `<img src="${movie.Poster}" alt="poster of ${movie.Title}" class="img-miniature"/>`

        // On crée la div qui contiendra les informations du film
        const content = document.createElement('div');
        content.classList.add('content');
        row.appendChild(content);
        content.innerHTML = `<p><span class="badge text-warning bg-dark">${movie.Year}</span> ${movie.Title}</p>`;

        // On crée le bouton qui affichera la modal du film
        const button = document.createElement('button');
        button.setAttribute('id', `button-${movie.imdbID}`);
        button.classList.add("btn-danger", "rounded-pill", "text-light", "p-1");
        button.innerHTML = "read more";
        content.appendChild(button);
        button.addEventListener('click', () => {
            getMovieData(movie.imdbID);
        });

        // Application de l'observateur d'intersection à la ligne créée
        window.addEventListener("scroll", function(event) {
        // boxElement = document.querySelector("#box"); ORIGINAL
        boxElement = document.getElementById(`row-${movie.imdbID}`);
    
        createObserver();
        }, false);
    });
}

getMovieData = async (movieID) => {
    console.log(movieID);
    // On fetch d'abord les données du film sélectionné
    let url = idToURL(movieID);
    let fetching = await getData(url);
    console.log(fetching);
    displayModal(fetching);
}

displayModal = (fetching) => {
    // Création de chaque élément HTML de la modal
    const modal = document.getElementById('modal');
    modal.style.display = 'grid';

    const modalPoster = document.getElementById('modal-poster');
    modalPoster.innerHTML =  `
                        <img src="${fetching.Poster} alt="affiche du film" class="modal-img"/>
                        `;

    const modalContent = document.getElementById('modal-content');
    modalContent.innerHTML = `
                        <h1><span class="badge text-warning bg-dark">${fetching.Year}</span> ${fetching.Title}</h1>
                        <p>${fetching.Plot}</p>
                        `;
    // FIN

    // Faire un bouton pour fermer la modal
    let closingButton = document.createElement('button');
    modalContent.appendChild(closingButton);
    closingButton.classList.add("btn-warning");
    closingButton.innerHTML = "close";
    
    closingButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    // FIN

}

// L'observateur d'intersection
createObserver = () => {
    var observer;
  
    var options = {
      root: null,
      rootMargin: "0px",
      threshold: buildThresholdList()
    };
  
    observer = new IntersectionObserver(handleIntersect, options);
    observer.observe(boxElement);
}

buildThresholdList = () => {
    var thresholds = [];
  
    for (var i=1.0; i<=numSteps; i++) {
      var ratio = i/numSteps;
      thresholds.push(ratio);
    }
  
    thresholds.push(0);
    return thresholds;
}

handleIntersect = (entries, observer) =>  {
    entries.forEach(function(entry) {
        if(entry.intersectionRatio > 0.75) {
            entry.target.style.opacity = entry.intersectionRatio;
        }
        else {
            entry.target.style.opacity = 0;
        }
    });
}

// FIN

perform = () => {
    console.clear();
    getInput();
    

}

perform();
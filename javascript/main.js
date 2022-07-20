// l'url pour fetch a été trouvée ici (?)
var url = 'https://api.weatherbit.io/v2.0/current?&city=Anchorage&key=df1ba2df7a47434abe4fef3dd726212a&include=minutely';

try {
    getData = async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        return data;
    }
} catch(error) {
    console.log("Erreur dans le fetch => " + error);
}



perform = () => {

}

perform();
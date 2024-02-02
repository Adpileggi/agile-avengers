
var recipeH = document.getElementById('recipe-title')
var recipeEl = document.getElementById('recipe-el')
var recipeNameEl = document.getElementById('recipename')

var apiUrl;

// connect map api
// display map in the map-el div
// have pins in the map which when cliked will populate recipes

async function initMap() {
    // const position = {lat: 39.9189401873852259, lng:-75.39188801916205};
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker",);

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: { lat: 39.808536548559815, lng: -96.71355656849755 },
        mapId: "Demo-map",
    });

    // object with the lat and lon for the different pins
    const regions = [
        {
            position: { lat: 42.291293354419, lng: -75.64535346629418 },
            title: 'North East',
        },
        {
            position: { lat: 42.46742473274198, lng: -90.666763450537 },
            title: 'Mid West',
        },
        {
            position: { lat: 34.454022890282005, lng: -89.1765442060685 },
            title: 'South',
        },
        {
            position: { lat: 40.77426863219933, lng: -113.85457489348826 },
            title: 'West',
        },
    ];

    const infoWindow = new google.maps.InfoWindow();

    regions.forEach(({ position, title }, i) => {
        const pin = new PinElement({
            glyph: `${i + 1}`,
        });
        const marker = new AdvancedMarkerElement({
            position,
            map,
            title: `${i + 1}. ${title}`,
            content: pin.element,
        });

        marker.addListener("click", function (event) {

            console.log(this.title)

        });
    });
}

initMap();


// connect recipe api
// have the recipe api search for state recipe when click event happens on the map?

// populate search results to the recipe div
recipeNorthEast()
function recipeNorthEast() {
    var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=New%20England&app_id=3ee8fae0&app_key=88364411228c6da4b3e3a5deb40e8840&cuisineType=American&imageSize=REGULAR'

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        
        .then(function (data) {
            console.log(data);
        
            for (var i = 0; i < data.hits.length; i++) {
            console.log(data.hits[i].recipe.label)
            
            var origin = document.createElement('h3')
            origin.textContent = 'These recipes are typical of the North Eastern United States'
            
            var recipeName = document.createElement('p')
            recipeName.textContent = ('Recipe Name: ' + data.hits[i].recipe.label)
            // use line below to add classes
            // recipeName.classList = 'add any classes that we want'
                        
            var portionsCalories = document.createElement('p')
            portionsCalories.textContent = ('Serves: ' + data.hits[i].recipe.yield + ' Total Calories: ' + data.hits[i].recipe.calories);

            for (var j = 0; j < data.hits[i].recipe.healthLabels.length; j++) {
            var allergyInfo = document.createElement('p')
                console.log(data.hits[i].recipe.healthLabels[j])
            allergyInfo.textContent = ('This recipe is: ' + data.hits[i].recipe.healthLabels[j])
            };

            var source = document.createElement('p')
            source.textContent = ('Recipe by: ' + data.hits[i].recipe.source)

            var recipeUrl = document.createElement('a')
            recipeUrl.setAttribute('href', data.hits[i].recipe.url)

            var urlText = document.createElement('p')
            urlText.textContent = 'Check out the recipe here!'

            recipeUrl.appendChild(urlText)
            
            recipeEl.append(recipeName, portionsCalories, allergyInfo, source, recipeUrl)
            
            recipeH.appendChild(origin)

            }
        })
};
        

            // for (var j = 0; j < data.hits[i].recipe.healthLabels; j++) {
            // console.log(data.hits[i].recipe.healthLabels[j]);
            // // ingredients.textContent = data.hits[i].recipe.ingredients.text
            // }            
        

recipeMidWest()
function recipeMidWest() {
    var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=Mid%20West&app_id=3ee8fae0&app_key=88364411228c6da4b3e3a5deb40e8840&cuisineType=American&imageSize=REGULAR'

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        
        .then(function (data) {
            console.log(data);
        })
};

recipeSouth()
function recipeSouth() {
    var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=Southern&app_id=3ee8fae0&app_key=88364411228c6da4b3e3a5deb40e8840&cuisineType=American&imageSize=REGULAR'

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        
        .then(function (data) {
            console.log(data);
        })
};

recipeWest()
function recipeWest() {
    var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=Western&app_id=3ee8fae0&app_key=88364411228c6da4b3e3a5deb40e8840&cuisineType=American&imageSize=REGULAR'

    fetch(apiUrl)
        .then(function (response) {
            return response.json();
        })
        
        .then(function (data) {
            console.log(data);
        })
};


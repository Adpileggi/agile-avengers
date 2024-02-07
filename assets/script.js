
var recipeH = document.getElementById('recipe-title')
var recipeEl = document.getElementById('recipe-el')
var recipeNameEl = document.getElementById('recipename')
var favEl = document.getElementById('fav-el')


var apiQ;
var apiUrl;
var regionTitle;

var saveName;
var saveUrl;


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

            if (this.title === '1. North East') {
                regionTitle = 'North Eastern'
                apiQ = 'New%20England'

            } else if (this.title === '2. Mid West') {
                regionTitle = 'Mid West'
                apiQ = 'Mid%20West'

            } else if (this.title === '3. South') {
                regionTitle = 'Southern'
                apiQ = 'Southern'

            } else {
                regionTitle = 'Western'
                apiQ = 'Western'
            }

            initRecipeInfo()
        });
    });

}

initMap();


// connect recipe api
// have the recipe api search for state recipe when click event happens on the map?

// populate search results to the recipe div

function initRecipeInfo() {
    var apiUrl = 'https://api.edamam.com/api/recipes/v2?type=public&q=' + apiQ + '&app_id=3ee8fae0&app_key=88364411228c6da4b3e3a5deb40e8840&cuisineType=American&imageSize=REGULAR'

    fetch(apiUrl)
        .then(function (response) {
            if (response.status >= 400) {

                console.log(response)

                var errorMsg = document.createElement('h3')
                errorMsg.textContent = ('Sorry, Error: ' + response.status + '. Please try again.')

                console.log(errorMsg)

                recipeH.appendChild(errorMsg)

                throw new Error()
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // clears inner HTML
            recipeEl.classList.remove('hide');
            recipeH.innerHTML = '';
            recipeEl.innerHTML = '';
            // title of appended section
            var origin = document.createElement('h3')
            origin.textContent = 'These recipes are typical of the ' + regionTitle + ' United States'

            recipeH.appendChild(origin)

            // loop fetch data
            for (let i = 0; i < data.hits.length; i++) {
                // create and append elements

                var Name = document.createElement('p')
                // send to local storage on click event
                var recipeName = data.hits[i].recipe.label
                Name.textContent = ('Recipe Name: ' + recipeName)
                // use line below to add classes
                // recipeName.classList = 'add any classes that we want'

                var portionsCalories = document.createElement('p')
                portionsCalories.textContent = ('Serves: ' + data.hits[i].recipe.yield + ' Total Calories: ' + Math.floor(data.hits[i].recipe.calories));

                var allergy = document.createElement('p')
                allergy.textContent = ('This recipe is: ');

                for (var j = 0; j < data.hits[i].recipe.healthLabels.length; j++) {
                    var allergyList = data.hits[i].recipe.healthLabels[j]

                    var span = document.createElement('span')
                    span.textContent = (allergyList + ' ');

                    allergy.append(span)
                };

                var source = document.createElement('p')
                source.textContent = ('Recipe by: ' + data.hits[i].recipe.source)

                var url = document.createElement('a')
                // get recipe url for local storage
                var recipeUrl = data.hits[i].recipe.url;
                url.setAttribute('href', recipeUrl);

                var urlText = document.createElement('p')
                urlText.textContent = 'Check out the recipe here!'

                var btn = document.createElement('button')
                btn.textContent = 'Favorite this recipe!'
                btn.classList = 'fav-btn'

                // get recipe name and url from current loop iteration
                function getCurrentIndex(recipeName, recipeUrl) {

                    // add event lisiner for button
                    btn.addEventListener('click', function (event) {
                        saveName = recipeName;
                        saveUrl = recipeUrl;

                        console.log(saveName)
                        console.log(saveUrl)

                        renderFav();

                    })
                } getCurrentIndex(recipeName, recipeUrl)

                url.append(urlText)

                recipeEl.append(Name, portionsCalories, allergy, source, url, btn)

            }


        })
};

function renderFav() {
    var saveInfo = {
        name: saveName,
        url: saveUrl
    };

    var favInfo = JSON.parse(localStorage.getItem('fav-info')) || []
    console.log(saveInfo);
    console.log(favInfo);

    for (var i = 0; i < favInfo.length; i++) {
        console.log(favInfo[i])
        if (favInfo[i].url === saveInfo.url) {
            console.log('doubles')
            return
        }
    }

    favInfo.push(saveInfo)
    console.log(favInfo)

    localStorage.setItem('fav-info', JSON.stringify(favInfo));
    displayFavs();
}

function displayFavs() {

    var favInfo = JSON.parse(localStorage.getItem('fav-info'))
    console.log(favInfo)
    favEl.innerHTML = '';

    if (favInfo === null) {
        return;
    }


    var a = document.createElement('a')
    a.textContent = "Click to see favorite recipes!"

    favEl.append(h3)

    for (var i = 0; i < favInfo.length; i++) {
        var displayInfo = [];
        displayInfo = favInfo[i];

        console.log(displayInfo)

        var a = document.createElement('a')
        a.setAttribute('href', favInfo[i].url)

        var p = document.createElement('p');
        p.textContent = favInfo[i].name

        a.append(p)

        h3.append(a)
    }
}

displayFavs()
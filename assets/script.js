// connect map api
// display map in the map-el div
// have pins in the map which when cliked will populate recipes

async function initMap() {
    // const position = {lat: 39.9189401873852259, lng:-75.39188801916205};
    const { Map, InfoWindow } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker", );

    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 4,
        center: {lat: 39.808536548559815, lng: -96.71355656849755},
        mapId: "Demo-map",
    });

    // object with the lat and lon for the different pins
    const regions = [
        {
        position: {lat:42.291293354419, lng:-75.64535346629418}, 
        title: 'North East',  
        },
        {
        position: {lat:42.46742473274198, lng:-90.666763450537},
        title: 'Mid West',   
        },
        {
        position: {lat: 34.454022890282005, lng: -89.1765442060685},
        title: 'South',
        },
        {
        position: {lat: 40.77426863219933, lng: -113.85457489348826}, 
        title: 'West',
        },
    ];

    const infoWindow = new google.maps.InfoWindow();

        regions.forEach(({position, title}, i) => {
        const pin = new PinElement({
            glyph:  `${i + 1}`,
        });
        const marker = new AdvancedMarkerElement({
            position,
            map,
            title: `${i + 1}. ${title}`,
            content: pin.element,
        });  

        marker.addListener("click", ({ domEvent, latLng }) => {
            const { target } = domEvent;
            
            console.log('something')
    });
});
}

initMap();

// connect recipe api
// have the recipe api search for state recipe when click event happens on the map?

// populate search results to the recipe div

// https://maps.googleapis.com/maps/api/staticmap?center=USA,markers=
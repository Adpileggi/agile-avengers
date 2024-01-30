// connect map api
// display map in the map-el div
// have pins in the map which when cliked will populate recipes
var map;
async function initMap() {
    const position = {lat: 39.9189401873852259, lng:-75.39188801916205 };
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    map = new Map(document.getElementById("map"), {
        zoom: 3,
        center: position,
        mapId: "Demo-map",
    });

    const marker = AdvancedMarkerElement({
        map: map,
        position: position,
        title: "USA",
      });
}

initMap();

// connect recipe api
// have the recipe api search for state recipe when click event happens on the map?

// populate search results to the recipe div

// https://maps.googleapis.com/maps/api/staticmap?center=USA,markers=
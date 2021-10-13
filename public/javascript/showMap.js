mapboxgl.accessToken =
  "pk.eyJ1IjoibTNyY2hlbCIsImEiOiJja3VtajgwaTMwazk3MzJwZnA1NWI2Mmk5In0.5dHaComs63mxUr7HdMSINw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: event.geometry.coordinates,
  zoom: 10,
});

new mapboxgl.Marker()
.setLngLat(event.geometry.coordinates)
.setPopup(new mapboxgl.Popup({offset: 25})
.setHTML(`<h2>${event.title}`))
.addTo(map);
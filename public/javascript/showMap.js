mapboxgl.accessToken =
  "pk.eyJ1IjoibTNyY2hlbCIsImEiOiJja3VtajgwaTMwazk3MzJwZnA1NWI2Mmk5In0.5dHaComs63mxUr7HdMSINw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: event.geometry.coordinates,
  zoom: 4,
});

new mapboxgl.Marker()
.setLngLat(event.geometry.coordinates)
.addTo(map);
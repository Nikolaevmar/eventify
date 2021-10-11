mapboxgl.accessToken =
  "pk.eyJ1IjoibTNyY2hlbCIsImEiOiJja3VtajgwaTMwazk3MzJwZnA1NWI2Mmk5In0.5dHaComs63mxUr7HdMSINw";
const map = new mapboxgl.Map({
  container: "map",
  style: "mapbox://styles/mapbox/streets-v11",
  center: [-74.5, 40],
  zoom: 4,
});

new mapboxgl.Marker()
.setLngLat([-74.5, 40])
.addTo(map);
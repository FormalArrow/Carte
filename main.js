import './style.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

/* Creating a new style for the icon. */
var iconStyle = new ol.style.Style({
  image: new ol.style.Icon({
    anchor: [0.5, 46],
    anchorXUnits: 'fraction',
    anchorYUnits: 'pixels',
    src: 'https://icon-library.net/images/google-maps-gps-icon/google-maps-gps-icon-14.jpg',
    scale: 0.1,
  }),
});
/* Creating a new style for the text. */

var labelStyle = new ol.style.Style({
  text: new ol.style.Text({
    font: '12px Calibri,sans-serif',
    overflow: true,
    fill: new ol.style.Fill({
      color: '#000',
    }),
    stroke: new ol.style.Stroke({
      color: '#fff',
      width: 3,
    }),
    offsetY: -12,
  }),
});
/* Creating a new style for the icon and the text. */
var style = [iconStyle, labelStyle];

///////////////////
/* Creating a new map. */
var map = new ol.Map({
  controls: [],
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
    new ol.layer.Vector({
      style: function (feature) {
        labelStyle.getText().setText(feature.get('name'));
        return style;
      },
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([-54.99, 4.0]),
    zoom: 8,
  }),
});

var container = document.getElementById('popup');
var content = document.getElementById('popup-content');
var closer = document.getElementById('popup-closer');

var overlay = new ol.Overlay({
  element: container,
  autoPan: true,
  autoPanAnimation: {
    duration: 250,
  },
});
map.addOverlay(overlay);

closer.onclick = function () {
  overlay.setPosition(undefined);
  closer.blur();
  return false;
};

//BOUTON
document.getElementById('boot').onclick = (e) => {
  var x = document.getElementById('x').value;
  var y = document.getElementById('y').value;
  var nom = document.getElementById('nom').value;
  content.innerHTML = document.getElementById('commentaire').value;
  var layer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [
        new ol.Feature({
          geometry: new ol.geom.Point(
            ol.proj.fromLonLat([parseFloat(x), parseFloat(y)])
          ),
          name: nom,
        }),
      ],
    }),
    style: function (feature) {
      labelStyle.getText().setText(feature.get('name'));
      return style;
    },
  });
  map.addLayer(layer);

  //TABLEAU
  var table = document.getElementById('myTable');

  // Create a line of coordonnees in the table
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);

  var row = table.insertRow(1);
  var num = row.insertCell(0);
  var coordonnee = row.insertCell(1);
  var commentaire = row.insertCell(2);
  num.innerHTML = document.getElementById('nom').value;
  coordonnee.innerHTML = x + ',' + y;
  commentaire.innerHTML = document.getElementById('commentaire').value;

  e.preventDefault();
};

//ZOOM
document.getElementById('zoom-out').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom - 1);
};

document.getElementById('zoom-in').onclick = function () {
  const view = map.getView();
  const zoom = view.getZoom();
  view.setZoom(zoom + 1);
};

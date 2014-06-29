var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .add(po.interact())
    .add(po.hash());
    
map.add(po.image()
    .url(po
            .url("http://a.tiles.mapbox.com/v3/mile89janev.ihdmc2k1/{Z}/{X}/{Y}.png")
            .hosts(["a.", "b.", "c.", ""])
        )
    );
    
map.add(po.geoJson()
    .url("json/mile.geojson")
    .on("load", load)
    );
    
map.add(po.compass()
    .pan("none"));
    
function load(e) {
  for (var i = 0; i < e.features.length; i++) {
    var feature = e.features[i];
    feature.element.setAttribute("id", "id"+i);
  }
}

//map.add(po.image()
//    .url(po
//            .url("http://{S}tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/998/256/{Z}/{X}/{Y}.png")
//            .hosts(["a.", "b.", "c.", ""])
//        )
//    );
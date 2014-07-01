var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 41.918, lon: 22.120})
    .zoom(8.50)
    .add(po.interact())
    .add(po.hash());
    
map.add(po.image()
    .url(po
            .url("http://a.tiles.mapbox.com/v3/mile89janev.ihdmc2k1/{Z}/{X}/{Y}.png")
            .hosts(["a.", "b.", "c.", ""])
        )
    );
    
map.add(po.geoJson()
    .url("json/json.geojson")
    .on("load", load)
    );
    
map.add(po.compass()
    .pan("none"));
    
    map.container().setAttribute("class", "YlOrRd");
    
/* Mile */
var mile = tsv("json/mile.tsv")
    .key(function(l) { return l[1]; })
    .value(function(l) { return l[2].replace(/,/g, ""); })
    .map();
    
function load(e) {
  for (var i = 0; i < e.features.length; i++) {
    
    var feature = e.features[i],
        region = feature.data.properties.title
        coeficient = mile[region]/mile['Vkupno'];
        
//        feature.element.setAttribute("class", "q" + ~~(coeficient*8) + "-" + 8);
      
    console.log(region);
//    console.log(mile[region]);
    console.log(coeficient);
    console.log(~~(coeficient*10));
//    console.log(mile[region]);
//    console.log(mile['Vkupno']);
//    feature.element.setAttribute("id", "id"+i);
  }
}


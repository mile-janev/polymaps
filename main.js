var fileName = "mile.tsv";

var myFile = tsv("json/" + fileName)
    .key(function(l) { return l[1]; })
    .value(function(l) { return l[2].replace(/,/g, ""); })
    .map();

var orderArray = new Array();

var po = org.polymaps;

var svg = po.svg("svg"); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
var map = po.map()
    .container(document.getElementById("map").appendChild(svg))
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
    
function load(e) {

    var orderArray = new Array();//Ponovo ja reinicijaliziram bidejki funkcijata se povikuva pri zoom
    
    for (var i = 0; i < e.features.length; i++) {
        var feature = e.features[i],
        region = feature.data.properties.title;

        orderArray.push({name: region.trim(), val: myFile[region].trim()});
    }
        
    orderArray.sort(function(a,b) { return a.val - b.val; });

    for (var j=0; j<orderArray.length; j++){

        for (var i = 0; i < e.features.length; i++) {
            var feature = e.features[i],
                regionName = feature.data.properties.title;

            if (regionName == orderArray[j].name){
                feature.element.setAttribute("class", "q" + j + "-" + 8 + " " + "regionArea");
                feature.element.setAttribute("title", regionName + ": " + orderArray[j].val);
                feature.element.setAttribute("rel", $("#user").html() + ":" + regionName + ":" + orderArray[j].val);
            }
        }
    }
}

$(document).ready(function() {
    
    $("#mapSwitcher a").click(function(e){
        e.preventDefault();
        $("#user").html($(this).html());
        
        fileName = $(this).attr("rel");
        
        myFile = tsv("json/" + fileName)
            .key(function(l) { return l[1]; })
            .value(function(l) { return l[2].replace(/,/g, ""); })
            .map();
            
        map.add(po.geoJson()
            .url("json/json.geojson")
            .on("load", load)
            );
    })
    
});
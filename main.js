var fileName = "mile.tsv";

var myFile = tsv("names/" + fileName)
    .key(function(l) { return l[1]; })
    .value(function(l) { return l[2].replace(/,/g, ""); })
    .map();

var orderArray = new Array();

var po = org.polymaps;

var svg = po.svg("svg"); svg.setAttribute('width', '100%'); svg.setAttribute('height', '100%');
var map = po.map()
    .container(document.getElementById("map").appendChild(svg))
    .center({lat: 41.6225, lon: 21.7820})
    .zoom(8.50)
    .add(po.interact())
    .add(po.hash());//Za parametrite da se prenesuvat so url, na toj nacin mozeme da go kopirame zumot, centarot i slicno
    
map.add(po.image()
    .url(po
            .url("http://a.tiles.mapbox.com/v3/mile89janev.ihdmc2k1/{Z}/{X}/{Y}.png")
            .hosts(["a.", "b.", "c.", ""])
        )
    );
    
map.add(po.geoJson()
    .url("json.geojson")
    .on("load", load)
    );
    
map.add(po.compass()
    .pan("none"));//Drag, zoom support se ovozmozuva
    
    map.container().setAttribute("class", "YlOrRd");//Ja setirame klasata od colorbrewer na elementot mapa
    
function load(e) {

//Kreirame niza od objekti (region->vrednost) i gi podreduvame po golemina (start)
    var orderArray = new Array();//Ponovo ja reinicijaliziram bidejki funkcijata se povikuva pri zoom
    
    for (var i = 0; i < e.features.length; i++) {
        var feature = e.features[i],
        region = feature.data.properties.title;

        orderArray.push({name: region.trim(), val: myFile[region].trim()});
    }
    
    orderArray.sort(function(a,b) { return a.val - b.val; });
//Kreirame niza od objekti (region->vrednost) i gi podreduvame po golemina (end)

    for (var j=0; j<orderArray.length; j++){//Ja izminuvame prethodno kreiranata niza od objekti

        for (var i = 0; i < e.features.length; i++) {//Gi izminuvame elementite od mapata (regionite)
            var feature = e.features[i],
                regionName = feature.data.properties.title;

            if (regionName == orderArray[j].name){//Dokolku se sovpagjaat regionot od podredenata niza i od mapata, dodaj mu klasa za da se oboi
                feature.element.setAttribute("class", "q" + j + "-" + 8 + " " + "regionArea");
                feature.element.setAttribute("rel", $("#user").html() + ":" + regionName + ":" + orderArray[j].val);
                
                feature.element.setAttribute("onmouseover", "showTooltip('" + $("#user").html() + "', '" + feature.data.properties.description + "', '" + orderArray[j].val + "', '" + myFile["Vkupno"] + "')");
                feature.element.setAttribute("onmouseout", "hideTooltip();");
            }
        }
        
    }
    
}

function showTooltip(user, region, current, total){
    $("#myBalloon .content").html(
        "Статистика за: " + user + "<br />" +
        "Регион: " + region + "<br />" +
        "Застапеност: " + current + " од " + total
    );
    
    $( "body" ).mousemove(function( event ) {
        $("#myBalloon").css("left", event.pageX-33);
        $("#myBalloon").css("top", event.pageY-93);
    });
    $("#myBalloon").show();
}

function hideTooltip(){
    $("#myBalloon").hide();
}

$(document).ready(function() {
    
    $("#mapSwitcher a").click(function(e){
        e.preventDefault();
        
        $("#mapSwitcher a").removeClass("active");
        $(this).addClass("active");
        
        $("#user").html($(this).html());
        
        fileName = $(this).attr("rel");
        
        myFile = tsv("names/" + fileName)
            .key(function(l) { return l[1]; })
            .value(function(l) { return l[2].replace(/,/g, ""); })
            .map();
            
        map.add(po.geoJson()
            .url("json.geojson")
            .on("load", load)
            );
    })
    
});
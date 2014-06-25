var po = org.polymaps;

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .add(po.interact())
    .add(po.hash());
    
map.add(po.image()
    .url(po
            .url("https://{S}.tiles.mapbox.com/v3/mapbox.geography-class/{Z}/{X}/{Y}.png")
            .hosts(["a.", "b.", "c.", ""])
        )
    );
    
//map.add(po.image()
//    .url(po
//            .url("http://{S}tile.cloudmade.com/1a1b06b230af4efdbb989ea99e9841af/998/256/{Z}/{X}/{Y}.png")
//            .hosts(["a.", "b.", "c.", ""])
//        )
//    );
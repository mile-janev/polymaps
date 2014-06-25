var po = org.polymaps;

/* Mile */
var mile = tsv("mile.tsv")
    .key(function(l) { return l[1]; })
    .value(function(l) { return l[2].replace(/,/g, ""); })
    .map();
    
/* Suzana. */
var suzana = tsv("suzana.tsv")
    .key(function(l) { return l[1]; })
    .value(function(l) { return l[2].replace(/,/g, ""); })
    .map();

/* Country name -> population (July 2010 Est.). */
var population = tsv("population.tsv")
    .key(function(l) { return l[1]; })
    .value(function(l) { return l[2].replace(/,/g, ""); })
    .map();

/* Country name -> internet users (2008). */
var internet = tsv("internet.tsv")
    .key(function(l) { return l[1]; })
    .value(function(l) { return l[2].replace(/,/g, ""); })
    .map();

var map = po.map()
    .container(document.getElementById("map").appendChild(po.svg("svg")))
    .center({lat: 40, lon: 0})
    .zoomRange([1, 4])
    .zoom(2)
    .add(po.interact());

map.add(po.image()
//        .url("http://s3.amazonaws.com/com.modestmaps.bluemarble/{Z}-r{Y}-c{X}.jpg")
        .url("http://localhost/polymaps/map.png")
    );

map.add(po.geoJson()
    .url("main.json")
    .tile(false)
    .zoom(3)
    .on("load", load));

map.add(po.compass()
    .pan("none"));

map.container().setAttribute("class", "YlOrRd");

/** Set feature class and add tooltip on tile load. */
function load(e) {
  for (var i = 0; i < e.features.length; i++) {
//      console.log(mile['Vkupno']);
    var feature = e.features[i],
        n = feature.data.properties.name,
        v = mile[n] / mile['Vkupno'];
//        v = internet[n] / population[n];
    n$(feature.element)
        .attr("class", isNaN(v) ? null : "q" + ~~(v * 9) + "-" + 9)
      .add("svg:title")
        .text(n + (isNaN(v) ? "" : ":  " + percent(v)));
console.log(n$(feature.element));
  }
}

/** Formats a given number as a percentage, e.g., 10% or 0.02%. */
function percent(v) {
  return (v * 100).toPrecision(Math.min(2, 2 - Math.log(v) / Math.LN2)) + "%";
}

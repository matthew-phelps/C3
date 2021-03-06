HTMLWidgets.widget({

  name: 'C3Bar',

  type: 'output',

  factory: function(el, width, height) {

    // create empty chart
    var chart = null;

    return {

      renderValue: function(x) {

        // if chart does not exist, create via c3.generate
        if(chart === null){

          var keys = _.keys(x.dataset);

          // create a pie chart, see htp:////c3js.org/samples/chart_pie.html
          chart = c3.generate({
            padding: {
              bottom: x.chartPaddingBottom
            },
            bindto: el,
            data: {
              json : [],
              keys: {
                // use categories as x-axis
                x: "categories",
                value: keys,
              },
              type : 'bar',
              colors : {
                'female' : '#104e8b',
                'male'   : '#cd8500'
              }
          },
          legend: {
            position: x.legendPosition,
            padding: x.legendPadding,
              item: {
                // define custom height and width for the legend item tile
                tile: {
                  width: x.legendTileWidth,
                  height: x.legendTileHeight
                }
              }
           },
           tooltip: {
             grouped: x.groupedToolTip
           },
           axis: {
             x: {
               type: 'category'
             }
           }
          });
        }

        // at this stage the chart always exists
        // get difference in keys
        var old_keys = _.keys(chart.x());
        var new_keys = _.keys(x.dataset);
        var diff     = _.difference(old_keys, new_keys);




        // load the new data (stored in x.values)
        chart.load({
          json:
            x.dataset,

            // unload data the we don't want
            unload: diff
        });
      },


      // This code comes from:
      // https://github.com/mrjoh3/c3/blob/master/inst/htmlwidgets/c3.js

      // I don't yet understand what's going on here any why can't just use chart.resize
      // and why this has to be outside the renderValue function.s

      resize: function(width, height) {
        var w = el.getBoundingClientRect().width;
        var h = el.getBoundingClientRect().height;

        // code to re-render the widget with a new size
        chart.resize({
          height: h,
          width: w
        });

        }






    };
  }
});

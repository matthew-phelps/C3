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
            bindto: el,
            data: {
              json : [],
              keys: {
                // use categories as x-axis
                x: "categories",
                value: keys,
              },
              type : 'bar'
          },
          legend: {
            position: x.legendPosition
           },
           tooltip: {
             grouped: false
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
      }

    };
  }
});

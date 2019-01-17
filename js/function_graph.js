var function_graph = {};

// ************************************************************************************** //
// Create

function_graph.createCanvasElements = function(count) {
  function_graph.width = 0.9*canvas_width, function_graph.height = 0.3*canvas_height;
  // var tempX = 0.05*canvas_width, tempY = 0.5*function_graph.height + 20;
  var tempX = 0.05*canvas_width, tempY = 1*function_graph.height + 10;
  function_graph.origin =  d3.select('#canvas').append('g').attrs({ transform: 'translate(' +tempX+ ',' +tempY+ ')' });
  
  function_graph.zero = function_graph.origin.append('path').attrs({ id: 'function_graph_path_zero' });
  function_graph.paths = [];
  for (var i = 0; i < 3; i++)
    function_graph.paths.push( function_graph.origin.append('path').attrs({ id: 'function_graph_path_' + i }));
  function_graph.path = function_graph.origin.append('path').attrs({ id: 'function_graph_path' });

  function_graph.xAxis = function_graph.origin.append('g');
  function_graph.yAxis = function_graph.origin.append('g');
  
  // dots
  function_graph.dots = [];
  for (var i = 0; i < count; i++){
    function_graph.dots.push(function_graph.origin.append('circle').attrs({ r: 8, class: 'function_graph_dot' }));
  }
}

// ************************************************************************************** //
// Update

function_graph.updatePath = function(index) {
  var temp_arr = time.map((d,i) => { return { 
    x: function_graph.xScale(time[i]), 
    y: function_graph.yScale(values[index][i]) } });
  function_graph.paths[index].attrs({ d: lineGen(temp_arr) });
}

function_graph.updateGraph = function(){
  function_graph.xScale = d3.scaleLinear().domain(d3.extent(time)).range([0, function_graph.width]);
  
  var minimum = d3.min(mag);
  var maximum = d3.max(mag);
  for (var i = 0; i < values.length; i++)
  {
    var tmp_min = d3.min(values[i]);
    var tmp_max = d3.max(values[i]);
    if(tmp_min < minimum)
      minimum = tmp_min;
    if(tmp_max > maximum)
      maximum = tmp_max;
  }
  
  function_graph.yScale = d3.scaleLinear().domain([minimum, maximum]).range([0*function_graph.height, -1*function_graph.height]);

  function_graph.xAxis.call( d3.axisBottom(function_graph.xScale).ticks(8) );
  function_graph.yAxis.call( d3.axisLeft(function_graph.yScale).ticks(4) );
  d3.select('.tick').select('text').styles({ 'display': 'none' });
  
  for (var i = 0; i < values.length; i++)
    function_graph.updatePath(i);

  var temp_arr = time.map((d,i) => { return { 
    x: function_graph.xScale(time[i]), 
    y: function_graph.yScale(mag[i]) } });
  function_graph.path.attrs({ d: lineGen(temp_arr) });
  
  function_graph.zero.attrs({d: 
"M" + function_graph.xScale(0) + " " + function_graph.yScale(0) + 
" L" + function_graph.xScale(d3.max(time)) + " " + function_graph.yScale(0) });
  
  for (var i = 0; i < function_graph.dots.length; i++) {
    function_graph.dots[i].attrs({ 
      cx: function_graph.xScale(d_time[i]),
      cy: function_graph.yScale(d_mag[i])
    });
  }
}
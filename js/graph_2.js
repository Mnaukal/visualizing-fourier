var graph_2 = {};

// ************************************************************************************** //
// Create

graph_2.createCanvasElements = function(){
  graph_2.width = 0.4*canvas_width, graph_2.height = 0.6*canvas_height;
  var tempX = 0.05*canvas_width + 0.5*graph_2.width, tempY = graph_1.height + 40 + 0.5*graph_2.height;
  graph_2.origin =  d3.select('#canvas').append('g').attrs({ transform: 'translate(' +tempX+ ',' +tempY+ ')' });

  graph_2.xAxis = graph_2.origin.append('line');
  graph_2.yAxis = graph_2.origin.append('line');
  graph_2.path = graph_2.origin.append('path').attrs({ id: 'graph_2_path' });

  graph_2.circle = graph_2.origin.append('circle').attrs({ r: 5 }).styles({ 'fill': 'red' });

  graph_2.windin_freq_ctlr = {};
  graph_2.windin_freq_ctlr.div = d3.select('#container').append('div').styles({ 'position': 'absolute', 'top': graph_2.height+graph_1.height+30, 'left': 0 });
  graph_2.windin_freq_ctlr.slider = graph_2.windin_freq_ctlr.div.append('input').attrs({ type: 'range', min: 0.2, max: 2, step: 0.01, value: waves[0].freq }).styles({ width: '10em' });
  graph_2.windin_freq_ctlr.text = graph_2.windin_freq_ctlr.div.append('text').attrs({ class: 'ml-2' }).styles({ 'font-size': '1.5em', 'color': '#bbb', 'vertical-align': 'text-bottom' }).html('Winding Frequency = ' + winding_freq + ' Hz');
  graph_2.windin_freq_ctlr.slider.on('change', function(){
    winding_freq = this.value;
    graph_2.windin_freq_ctlr.text.html('Winding Frequency = ' + winding_freq + ' Hz');
    update();
  })
}

// ************************************************************************************** //
// Update

graph_2.updateGraph = function(){
  var axis_length = 0.4*graph_2.height;
  graph_2.xAxis.attrs({ x1: -axis_length, y1: 0, x2: axis_length, y2: 0, class: 'axis' });
  graph_2.yAxis.attrs({ y1: -axis_length, x1: 0, y2: axis_length, x2: 0, class: 'axis' });

  graph_2.scale = d3.scaleLinear().domain([0, math.max(d3.extent(mag))]).range([0, axis_length]);

  var temp_mag = mag.map(d => { return graph_2.scale(d) });
  var temp_angle = numeric.mul(2*Math.PI*winding_freq, time);
  var temp_x = numeric.mul(temp_mag, numeric.cos(temp_angle));
  var temp_y = numeric.mul(temp_mag, numeric.sin(temp_angle));

  var temp_arr = temp_x.map((d,i) => {
    return { x: temp_x[i], y: temp_y[i] }
  })

  graph_2.path.attrs({ d: lineGen(temp_arr) });

  // Calculating the centre of mass
  var com_x = math.mean(temp_x);
  var com_y = math.mean(temp_y);
  graph_2.circle.attrs({ cx: com_x, cy: com_y });
}

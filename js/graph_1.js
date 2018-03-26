var graph_1 = {};

// ************************************************************************************** //
// Create

graph_1.createCanvasElements = function(){
  graph_1.width = 0.9*canvas_width, graph_1.height = 0.3*canvas_height;
  var tempX = 0.05*canvas_width, tempY = 0.5*graph_1.height + 20;
  graph_1.origin =  d3.select('#canvas').append('g').attrs({ transform: 'translate(' +tempX+ ',' +tempY+ ')' });

  graph_1.path = graph_1.origin.append('path').attrs({ id: 'graph_1_path' }); // Path is added first so that the numbers are clearly visible
  graph_1.xAxis = graph_1.origin.append('g');
  graph_1.yAxis = graph_1.origin.append('g');

  graph_1.freq_ctlr = {};
  graph_1.freq_ctlr.div = d3.select('#container').append('div').styles({ 'position': 'absolute', 'top': graph_1.height+30, 'left': 80 });
  graph_1.freq_ctlr.slider = graph_1.freq_ctlr.div.append('input').attrs({ type: 'range', min: 0.2, max: 2, step: 0.01, value: waves[0].freq }).styles({ width: '10em' });
  graph_1.freq_ctlr.text = graph_1.freq_ctlr.div.append('text').attrs({ class: 'ml-2' }).styles({ 'font-size': '1.4em', 'color': '#bbb', 'vertical-align': 'text-bottom' }).html('Frequency of wave = ' + waves[0].freq + ' Hz');
  graph_1.freq_ctlr.slider.on('change', function(){
    waves[0].freq = this.value;
    graph_1.freq_ctlr.text.html('Frequency of wave = ' + waves[0].freq + ' Hz');
    update();
  })

  graph_1.timeSpan_ctlr = {};
  graph_1.timeSpan_ctlr.div = d3.select('#container').append('div').styles({ 'position': 'absolute', 'top': graph_1.height+30, 'left': 550 });
  graph_1.timeSpan_ctlr.slider = graph_1.timeSpan_ctlr.div.append('input').attrs({ type: 'range', min: 1, max: 50, step: 1, value: timeSpan }).styles({ width: '10em' });
  graph_1.timeSpan_ctlr.text = graph_1.timeSpan_ctlr.div.append('text').attrs({ class: 'ml-2' }).styles({ 'font-size': '1.4em', 'color': '#bbb', 'vertical-align': 'text-bottom' }).html('Duration of signal = ' + timeSpan + ' s');
  graph_1.timeSpan_ctlr.slider.on('change', function(){
    timeSpan = this.value;
    graph_1.timeSpan_ctlr.text.html('Duration of signal = ' + timeSpan + ' s');
    update();
  })
}

// ************************************************************************************** //
// Update

graph_1.updateGraph = function(){
  graph_1.xScale = d3.scaleLinear().domain(d3.extent(time)).range([0, graph_1.width]);
  graph_1.yScale = d3.scaleLinear().domain(d3.extent(mag)).range([0.5*graph_1.height, -0.5*graph_1.height]);

  graph_1.xAxis.call( d3.axisBottom(graph_1.xScale).ticks(3) );
  graph_1.yAxis.call( d3.axisLeft(graph_1.yScale).ticks(2) );
  d3.select('.tick').select('text').styles({ 'display': 'none' });

  var temp_arr = time.map((d,i) => { return { x: graph_1.xScale(time[i]), y: graph_1.yScale(mag[i]) } });
  graph_1.path.attrs({ d: lineGen(temp_arr) });
}

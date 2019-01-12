var frequency_graph = {};

// ************************************************************************************** //
// Create

frequency_graph.create = function(){
  this.width = 0.48*canvas_width, 
  this.height = 0.45*canvas_height;
  this.origin_x = 0.45*canvas_width + 0.2*this.width; 
  this.origin_y = 0.45*canvas_height + 0.9*this.height;

  this.origin =  d3.select('#canvas').append('g').attrs({ transform: 'translate(' +this.origin_x+ ',' +this.origin_y+ ')' });
  this.xAxis = this.origin.append('g').attrs({ transform: 'translate(0,' + -this.height*0.45 + ')'});;
  this.yAxis = this.origin.append('g')

  this.path = this.origin.append('path').attrs({ id: 'frequency_graph_path' });
  this.path_x = this.origin.append('path').attrs({ id: 'frequency_graph_path_x' });
  this.path_y = this.origin.append('path').attrs({ id: 'frequency_graph_path_y' });
  this.circle = this.origin.append('circle').attrs({ r: 5, id: 'frequency_graph_dot_x' });
}

// ************************************************************************************** //
// Update

frequency_graph.update = function(){
  this.xScale = d3.scaleLinear().domain([0.2,2]).range([0, 0.9*this.width]);
  this.yScale = d3.scaleLinear().domain([-1,1]).range([0, -0.9*this.height]);

  this.xAxis.call(d3.axisBottom(this.xScale).ticks(3));
  this.yAxis.call(d3.axisLeft(this.yScale).ticks(3));

  this.data_path = wind_freq_arr.map((d,i) => { return { 
    x: this.xScale(wind_freq_arr[i]), 
    y: this.yScale(com_amp_arr[i]) } });
  this.path.attrs({ d: lineGen(this.data_path) });
  
  this.data_path_x = wind_freq_arr.map((d,i) => { return { 
    x: this.xScale(wind_freq_arr[i]), 
    y: this.yScale(com_x_arr[i]) } });
  this.path_x.attrs({ d: lineGen(this.data_path_x) });
  
  this.data_path_y = wind_freq_arr.map((d,i) => { return { 
    x: this.xScale(wind_freq_arr[i]), 
    y: this.yScale(com_y_arr[i]) } });
  this.path_y.attrs({ d: lineGen(this.data_path_y) });  

  var temp_y_index = Math.round( wind_freq_to_index_scale(wind_freq) );
  console.log(wind_freq_to_index_scale(wind_freq));
  this.circle.attrs({ cx: this.xScale(wind_freq), cy: this.yScale(com_x_arr[temp_y_index]) });
  // this.circle.attrs({ cx: this.xScale(wind_freq), cy: com_amp });
}

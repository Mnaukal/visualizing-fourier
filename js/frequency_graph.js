var frequency_graph = {};
frequency_graph.domain = [0.2,2];

// ************************************************************************************** //
// Create

frequency_graph.create = function(w, h, x, y, show_dot, show_imaginary = false){
  this.width = w*canvas_width, 
  this.height = h*canvas_height;
  this.origin_x = x*canvas_width;// + 0.2*this.width; 
  this.origin_y = y*canvas_height;// + 0.9*this.height;

  this.origin =  d3.select('#canvas').append('g').attrs({ transform: 'translate(' +this.origin_x+ ',' +this.origin_y+ ')', id: "frequency_graph"   });
  this.xAxis = this.origin.append('g').attrs({ transform: 'translate(0,' + -this.height*0.45 + ')'});;
  this.yAxis = this.origin.append('g')

  this.path = this.origin.append('path').attrs({ id: 'frequency_graph_path' });
  this.path_x = this.origin.append('path').attrs({ id: 'frequency_graph_path_x' });
  this.path_y = this.origin.append('path').attrs({ id: 'frequency_graph_path_y' });
  this.circle = this.origin.append('circle').attrs({ r: 5, id: 'frequency_graph_dot_x' });
  if(!show_dot)
    this.circle.styles({display:'none'});
  
  // graph control
  // real
  frequency_graph.check_real = {};
  frequency_graph.check_real.div = d3.select('#container').append('div').attrs({class: 'frequency_graph_checkbox_real_continuous'}).styles({ 
    position: 'absolute', 
    top:  700,
    left: 600
  });
  frequency_graph.check_real.checkbox = frequency_graph.check_real.div.append('input').attrs({type: 'checkbox', checked: true, id: 'frequency_graph_checkbox_real_continuous'});
  frequency_graph.check_real.text = frequency_graph.check_real.div.append('label').attrs({class: 'ml-2', for: 'frequency_graph_checkbox_real_continuous' }).html('Real part');
  frequency_graph.check_real.checkbox.on('input', function() {
    if(frequency_graph.check_real.checkbox.property("checked") == true)
      d3.select("#frequency_graph_path_x").styles({display: 'block' });
    else
      d3.select("#frequency_graph_path_x").styles({display: 'none' });
  })
  // imaginary
  frequency_graph.check_imaginary = {};
  frequency_graph.check_imaginary.div = d3.select('#container').append('div').attrs({class: 'frequency_graph_checkbox_imaginary_continuous'}).styles({ 
    position: 'absolute', 
    top:  700, //frequency_graph.height + frequency_graph.height, 
    left: 700 //frequency_graph.width + 200
  });
  frequency_graph.check_imaginary.checkbox = frequency_graph.check_imaginary.div.append('input').attrs({type: 'checkbox', id: 'frequency_graph_checkbox_imaginary_continuous'});
  frequency_graph.check_imaginary.text = frequency_graph.check_imaginary.div.append('label').attrs({class: 'ml-2', for: 'frequency_graph_checkbox_imaginary_continuous'}).html('Imaginary part');
  frequency_graph.check_imaginary.checkbox.on('input', function() {
    if(frequency_graph.check_imaginary.checkbox.property("checked") == true)
      d3.select("#frequency_graph_path_y").styles({display: 'block' });
    else
      d3.select("#frequency_graph_path_y").styles({display: 'none' });
  })
  if(show_imaginary)
    frequency_graph.check_imaginary.checkbox.attrs({checked: true});
    
  // magnitude
  frequency_graph.check_magnitude = {};
  frequency_graph.check_magnitude.div = d3.select('#container').append('div').attrs({class: 'frequency_graph_checkbox_magnitude_continuous'}).styles({ 
    position: 'absolute', 
    top:  700, //frequency_graph.height + frequency_graph.height, 
    left: 850 //frequency_graph.width + 350
  });
  frequency_graph.check_magnitude.checkbox = frequency_graph.check_magnitude.div.append('input').attrs({type: 'checkbox', id: 'frequency_graph_checkbox_magnitude_continuous'});
  frequency_graph.check_magnitude.text = frequency_graph.check_magnitude.div.append('label').attrs({class: 'ml-2',for: 'frequency_graph_checkbox_magnitude_continuous'}).html('Magnitude');
  frequency_graph.check_magnitude.checkbox.on('input', function() {
    if(frequency_graph.check_magnitude.checkbox.property("checked") == true)
      d3.select("#frequency_graph_path").styles({display: 'block' });
    else
      d3.select("#frequency_graph_path").styles({display: 'none' });
  })
  
}

frequency_graph.setDomain = function(dom)
{
  frequency_graph.domain = dom;
}

// ************************************************************************************** //
// Update

frequency_graph.update = function(){
  this.xScale = d3.scaleLinear().domain(frequency_graph.domain).range([0, 0.9*this.width]);
  this.yScale = d3.scaleLinear().domain([-1,1]).range([0, -0.9*this.height]);

  this.xAxis.call(d3.axisBottom(this.xScale).ticks(5));
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

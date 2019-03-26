var discrete_frequency_graph = {};
discrete_frequency_graph.domain = [0,32];

// ************************************************************************************** //
// Create

discrete_frequency_graph.create = function(w, h, x, y, show_dot, count){
  this.width = w*canvas_width, 
  this.height = h*canvas_height;
  this.origin_x = x*canvas_width;// + 0.2*this.width; 
  this.origin_y = y*canvas_height;// + 0.9*this.height;

  this.origin =  d3.select('#canvas').append('g').attrs({ transform: 'translate(' +this.origin_x+ ',' +this.origin_y+ ')', id: "discrete_frequency_graph"  });
  this.xAxis = this.origin.append('g').attrs({ transform: 'translate(0,' + -this.height*0.45 + ')'});;
  this.yAxis = this.origin.append('g')

  // dots
  discrete_frequency_graph.dots_x = [];
  for (var i = 0; i < count; i++){
    discrete_frequency_graph.dots_x.push(discrete_frequency_graph.origin.append('circle').attrs({ r: 8, class: 'discrete_frequency_graph_dot_x' }));
  }
  discrete_frequency_graph.dots_y = [];
  for (var i = 0; i < count; i++){
    discrete_frequency_graph.dots_y.push(discrete_frequency_graph.origin.append('circle').attrs({ r: 8, class: 'discrete_frequency_graph_dot_y' }));
  }
  
  // graph control
  // real
  discrete_frequency_graph.check_real = {};
  discrete_frequency_graph.check_real.div = d3.select('#container').append('div').attrs({class: 'frequency_graph_checkbox_real_discrete'}).styles({ 
    position: 'absolute', 
    top:  700,
    left: 600
  });
  discrete_frequency_graph.check_real.checkbox = discrete_frequency_graph.check_real.div.append('input').attrs({type: 'checkbox', checked: true, id: 'frequency_graph_checkbox_real_discrete'});
  discrete_frequency_graph.check_real.text = discrete_frequency_graph.check_real.div.append('label').attrs({class: 'ml-2', for: 'frequency_graph_checkbox_real_discrete' }).html('Real part');
  discrete_frequency_graph.check_real.checkbox.on('input', function() {
    if(discrete_frequency_graph.check_real.checkbox.property("checked") == true)
      d3.selectAll(".discrete_frequency_graph_dot_x").styles({display: 'block' });
    else
      d3.selectAll(".discrete_frequency_graph_dot_x").styles({display: 'none' });
  })
  // imaginary
  discrete_frequency_graph.check_imaginary = {};
  discrete_frequency_graph.check_imaginary.div = d3.select('#container').append('div').attrs({class: 'frequency_graph_checkbox_imaginary_discrete'}).styles({ 
    position: 'absolute', 
    top:  700, //frequency_graph.height + frequency_graph.height, 
    left: 700 //frequency_graph.width + 200
  });
  discrete_frequency_graph.check_imaginary.checkbox = discrete_frequency_graph.check_imaginary.div.append('input').attrs({type: 'checkbox', checked: true, id: 'frequency_graph_checkbox_imaginary_discrete'});
  discrete_frequency_graph.check_imaginary.text = discrete_frequency_graph.check_imaginary.div.append('label').attrs({class: 'ml-2', for: 'frequency_graph_checkbox_imaginary_discrete'}).html('Imaginary part');
  discrete_frequency_graph.check_imaginary.checkbox.on('input', function() {
    if(discrete_frequency_graph.check_imaginary.checkbox.property("checked") == true)
      d3.selectAll(".discrete_frequency_graph_dot_y").styles({display: 'block' });
    else
      d3.selectAll(".discrete_frequency_graph_dot_y").styles({display: 'none' });
  })
}

discrete_frequency_graph.setDomain = function(dom)
{
  discrete_frequency_graph.domain = dom;
}

// ************************************************************************************** //
// Update

discrete_frequency_graph.update = function(){
  this.xScale = d3.scaleLinear().domain(discrete_frequency_graph.domain).range([0, 0.9*this.width]);
  
  var minimum = d3.min(dft_x_arr);
  var maximum = d3.max(dft_x_arr);
  var minimum_y = d3.min(dft_y_arr);
  var maximum_y = d3.max(dft_y_arr);
  if(minimum_y < minimum)
    minimum = minimum_y;
  if(maximum_y > maximum)
    maximum = maximum_y;
  var range = maximum > -minimum ? maximum : -minimum;
  
  this.yScale = d3.scaleLinear().domain([-range, range]).range([0, -0.9*this.height]);

  this.xAxis.call(d3.axisBottom(this.xScale).ticks(32));
  this.yAxis.call(d3.axisLeft(this.yScale).ticks(3));
  
  for (var i = 0; i < discrete_frequency_graph.dots_x.length; i++) {
    discrete_frequency_graph.dots_x[i].attrs({ 
      cx: discrete_frequency_graph.xScale(i),
      cy: discrete_frequency_graph.yScale(dft_x_arr[i])
    });
  }
  
  for (var i = 0; i < discrete_frequency_graph.dots_y.length; i++) {
    discrete_frequency_graph.dots_y[i].attrs({ 
      cx: discrete_frequency_graph.xScale(i),
      cy: discrete_frequency_graph.yScale(dft_y_arr[i])
    });
  }
}

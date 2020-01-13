import { Component, OnInit } from '@angular/core';
import { ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';
import { FormServiceService } from '../../form-service.service';
@Component({
  selector: 'app-scatter',
  templateUrl: './scatter.component.html',
  styleUrls: ['./scatter.component.css']
})
export class ScatterComponent implements OnInit {
  @ViewChild('chart', { static: true }) private chartContainer: ElementRef;

  constructor(private formService: FormServiceService) { }
  ngOnInit() {
    this.formService.getResultData().subscribe(res => { console.log(res) }, err => { console.log(err) });
    this.createChart()
  }

  createChart() {
    var chocolates = [{
      "name": "Dairy Milk",
      "manufacturer": "cadbury",
      "price": 45,
      "rating": 2
    }, {
      "name": "Galaxy",
      "manufacturer": "Nestle",
      "price": 42,
      "rating": 3
    }, {
      "name": "Lindt",
      "manufacturer": "Lindt",
      "price": 80,
      "rating": 4
    }, {
      "name": "Hershey",
      "manufacturer": "Hershey",
      "price": 40,
      "rating": 1
    }, {
      "name": "Dolfin",
      "manufacturer": "Lindt",
      "price": 90,
      "rating": 5
    }, {
      "name": "Bournville",
      "manufacturer": "cadbury",
      "price": 70,
      "rating": 2
    }];
    let element = this.chartContainer.nativeElement;
    // set the dimensions and margins of the graph
    var margins = {
      "left": 40,
      "right": 30,
      "top": 30,
      "bottom": 30
    };
    var width = 500;
    var height = 400;

    // Color scale: give me a specie name, I return a color
    var color = d3.scaleOrdinal()
      .domain(["setosa", "versicolor", "virginica"])
      .range(["#440154ff", "#21908dff", "#fde725ff"]);

    // append the svg object to the body of the page
    var svg = d3.select(element)
      .append("svg")
      .attr("width", width + margins.left + margins.right)
      .attr("height", height + margins.top + margins.bottom)
      .append("g")
      .attr("transform",
        "translate(" + margins.left + "," + margins.top + ")");

    // Read the data:
    var x = d3.scaleLinear()
      .domain(d3.extent(chocolates, function (d) {
        return d.price;
      }))
      .range([0, width - margins.left - margins.right]);

    // this does the same as for the y axis but maps from the rating variable to the height to 0. 
    var y = d3.scaleLinear()
      .domain(d3.extent(chocolates, function (d) {
        return d.rating;
      }))
      // Note that height goes first due to the weird SVG coordinate system
      .range([height - margins.top - margins.bottom, 0]);

    // we add the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
    svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")").call(d3.axisBottom(x));
    svg.append("g").attr("class", "y axis").call(d3.axisLeft(y));

    // this is our X axis label. Nothing too special to see here.
    svg.append("text")
      .attr("fill", "#414241")
      .attr("text-anchor", "end")
      .attr("x", width / 2)
      .attr("y", height - 15)
      .text("Price in pence (£)");
    // // this is the actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
    // var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
    // var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2);
    //     // this is where we select the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.    
    //     svg.selectAll("g.y.axis").call(yAxis);
    //     svg.selectAll("g.x.axis").call(xAxis);


    // now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
    var chocolate = svg.selectAll("g.node").data(chocolates, function (d) {
      return d.name;
    });
    var chocolateGroup = chocolate.enter().append("g").attr("class", "node")
      // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items 
      .attr('transform', function (d) {
        return "translate(" + x(d.price) + "," + y(d.rating) + ")";
      });
    chocolateGroup.append("circle")
      .attr("r", 5)
      .attr("class", "dot")
      .style("fill", function (d) {
        // remember the ordinal scales? We use the colors scale to get a colour for our manufacturer. Now each node will be coloured
        // by who makes the chocolate. 
        return color(d.manufacturer);
      });
    // now we add some text, so we can see what each item is.
    chocolateGroup.append("text")
      .style("text-anchor", "middle")
      .attr("dy", -10)
      .attr("dx", +10)
      .text(function (d) {
        // this shouldn't be a surprising statement.
        return d.name;
      });

    // // Adding Line
    // var xScale = d3.scaleLinear()
    //   .domain([0, 200])
    //   .range([0, width]);

    // var yScale = d3.scaleLinear()
    //   .domain([3, 20])
    //   .range([height, 0]);

    // svg.append('line')
    //   .style('stroke', 'black')
    //   .attr('x1', xScale(0))
    //   .attr('y1', yScale(5))
    //   .attr('x2', xScale(90))
    //   .attr('y2', yScale(20));

    //GRID LINES:
    // add the X gridlines
    // function make_x_gridlines() {
    //   return d3.axisBottom(x)
    //     .ticks(5)
    // }

    // gridlines in y axis function
    // function make_y_gridlines() {
    //   return d3.axisLeft(y)
    //     .ticks(5)
    // }
    // svg.append("g")
    //   .attr("class", "grid")
    //   .attr("transform", "translate(0," + height + ")")
    //   .call(make_x_gridlines()
    //     .tickSize(-height)
    //     .tickFormat("")
    //   )


    // svg.append("g")
    //   .attr("class", "grid")
    //   .call(make_y_gridlines()
    //     .tickSize(-width)
    //     .tickFormat("")
    //   )

  }
}

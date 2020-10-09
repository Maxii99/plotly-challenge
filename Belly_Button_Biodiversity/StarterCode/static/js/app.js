// Use the D3 library to read in samples.json.
d3.json("data/samples.json").then((data)=> {
    console.log(data);

// Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
// Get a reference to the dropdown select element
function init() {
    var selector = d3.select("#selDataset");

// Add Ids #s from sample names to dropdown menu
    var subjectIds = data.names;
    Object.enteries(data).forEach((id)=> {
        selector
        .append("option")
        .text(id)
        .property("value", id);
    });

 // set up default plot and a function to update plots
function updatePlots(index) {
    // set up arrays for charts
    var sampleSubjectOTUs = data.samples[index].otu_ids;
    console.log(sampleSubjectOTUs);
    var sampleSubjectFreq = data.samples[index].sample_values;
    var otuLables = data.samples[index].out_labels
    var washFrequency =data.metadata[+index].wfreq;
    console.log(washFrequency);

    // Populate Demographic Data Card

    var demographicKeys= Object.keys(data.metadata[index]);
    var demographicValues = Object.values(data.metadata[index]);
    var demographicData = d3.select("#sample-metadata");

    //  Use `.html("")` to clear any existing demographicData.html
    demographicData.html("");

    // Use Object.entries to loop through data and append key and values
    Object.entries(data).forEach(([key, value])=> {
        demographicData.append("p").text(`${demographicKeys}: ${demographicValues}`);

    });

    // Slice and reserve data for horizontal bar chart
    var topTenOtus = sampleSubjectOTUs.slice(0,10).reverse();
    var topTenFreq = sampleSubjectFreq.slice(0,10).reverse();
    var TopTenTooTips = data.samples[0].out_labels.sllice(0,10).reverse();
    var TopTenLLabels = topTenOtus.map(otu => "OTU" + otu);
    var reversedLabels = TopTenLLabels.reverse();

    // Set up trace for chart
    var trace1 = {
        x: topTenFreq,
        y: reversedLabels,
        text: TopTenTooTips,
        name: "",
        type: "bar",
        orientation: "h"
    };
// Create data variable and apply layout

    var barData = [trace1];
    
    var barLayout = {
        title: "Top Ten OTU",
        margin: {
            l: 80,
            r: 80,
            t: 80,
            b: 50
        }
    }
// Display the horizontal bar chart
Plotly.newPlot("bar", barData, barLayout);

// Build bubble chart
var trace2 = {
    x: sampleSubjectOTUs,
    y: sampleSubjectFreq,
    text: otuLables,
    mode: "markers",
    marker: {
        color: sampleSubjectOTUs,
        size: sampleSubjectFreq,
        colorscale: "Earth",
        opacity: [1,0.8,0.6,0.4]
    }

};
// Create bubble chart variable and apply layout
var bubbleData = [trace2];

var bubbleLayout = {
    title: "OTU Frequency",
    height: 600,
    width: 1000,
    hovermode: "closest",
    showlegend: false
}
// Display bubble chart and render it to the div tag with id `bubble-plot`
Plotly.newPlot("bubble", bubbleData, bubbleLayout)
};
//  Build Gauge Chart
var gaugeData = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: washFrequency,
      title: { text: "Belly Button Washing Frequency Scrubs Per Week" },
      type: "indicator",
      mode: "gauge+number+delta",
      delta: { reference: 9, increasing: { color: "green"} },
      gauge: {
        axis: { range: [0, 10] },
        steps: [
          { range: [0, 5], color: "lightgray" },
          { range: [5, 8], color: "gray" }
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: 9
        }
      }
    }
  ];
  
  var gaugeLayout = { width: 600, height: 450, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', gaugeData, gaugeLayout);

//   Create function for change event

// Use first subject ID from names
//  Use first subject ID from names for initial plots

 function init() {
    var selector = d3.select("#selDataset");

// Add Ids #s from sample names to dropdown menu
    var subjectIds = data.names;
    Object.enteries(data).forEach((id)=> {
        selector
        .append("option")
        .text(id)
        .property("value", id);
    });
const firstSubject = subjectIds[0];
updateplots(firstSubject);
updataMetadata(firstSubject)
console.log(firstSubject)

function optionChanged(newSample) {
    updatePlots(newSample);
    updataMetadata(newSample);
}

// Initialize the dashboard
init();

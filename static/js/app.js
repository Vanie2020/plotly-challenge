// FUNCTION #1 of 5
function buildCharts(selectedPatientID) {
    d3.json("samples.json").then(dataOtu => {
        console.log(dataOtu)
        // Make a list of all the data in names
        var names_list = dataOtu.names;

        // fetch the index value based on the name input by user
        var sample_id = names_list.findIndex(i => i == selectedPatientID);

        // Adding data for the graphs and placing data to relevent variables
        var otu_IDs = dataOtu.samples[sample_id].otu_ids;
        var samp_Values = dataOtu.samples[sample_id].sample_values;
        var otu_Labels = dataOtu.samples[sample_id].otu_labels;

        // Getting top ten values from data and reversing the data order
        otuIDs = otu_IDs.slice(0, 10);
        otuIDs = otuIDs.map(s => `OTU ${s}`).reverse();
        sampValues = samp_Values.slice(0, 10).reverse();
        otuLabels = otu_Labels.slice(0, 10).reverse();

        // Making the Bar Chart
        var trace = {
            x: sampValues,
            y: otuIDs,
            text: otuLabels,
            type: "bar",
            orientation: "h"
        };
        var layout = {
        };
        var data = [trace];
        Plotly.newPlot("barDiv", data, layout);

        // Making the Bubble Chart
        var trace1 = {
            x: otu_IDs,
            y: samp_Values,
            text: otu_Labels,
            mode: 'markers',
            marker: {
                size: samp_Values,
                color: otu_IDs,
                colorscale: [[0, '#4b4ba9'], [.2, '#54d2b0'], [.2, '#7fe36b'], [.5, '#c0ea6e'], [.5, '#99752b'], [1, '#d7c7b9']]
            }
        };
        var data = [trace1];
        var layout = {
            xaxis: { title: 'OTU ID' },
            showlegend: false,
        };
        Plotly.newPlot('bubbleDiv', data, layout);

        // Removing all data in metadata box before printing new data
        d3.select("#sample-metadata").selectAll("p").remove();

        // Fetch Metadata based on userinput
        var meta_text = dataOtu.metadata[sample_id];

        // Cereating a list of object in the User MetaData
        var m_keys = Object.entries(meta_text);

        // Selecting MetaData HTML for data input
        var meta_data = d3.select("#sample-metadata");

        // Creating loop to input data in Demographic Info
        m_keys.forEach(function (m_data) {
            meta_data.append("p").text(`${m_data[0]}: ${m_data[1]}`)
        });

        // Setting wash frequency variable for guage
        var wash_freq = meta_text.wfreq

        var data = [
            {
              domain: { x: [0, 1], y: [0, 1] },
              value: wash_freq,
              title: { text: "Weekly Washing Frequency" },
              type: "indicator",
              mode: "gauge+number",
              delta: { reference: 400 },
              gauge: { axis: { range: [null, 8] } }
            }
          ];
          
          var layout = { width: 600, height: 400 };
          Plotly.newPlot('gaugeDiv', data, layout);

        // Initiating guage function with wash_frequency
        //  guage(wash_freq)
    })
};

// FUNCTION #2 of 5
function populateDemographicInfo(selectedPatientID) {
    var demographicInfoBox = d3.select("#sample-metadata");
    d3.json("samples.json").then(data => {
        console.log(data)
        // ADD APPROXIMATELY 3-6 LINE OF CODE
    })
}

// FUNCTION #3 of 5
function optionChanged(selectedPatientID) {
    console.log(selectedPatientID);
    buildCharts(selectedPatientID);
    populateDemographicInfo(selectedPatientID);
}

// FUNCTION #4 of 5
function populateDropdown() {
    var dropdown = d3.select("#selDataset")
    d3.json("samples.json").then(data => {
        var patientIDs = data.names;
        patientIDs.forEach(patientID => {
            dropdown.append("option").text(patientID).property("value", patientID)
        })
    })
}

// FUNCTION #5 of 5
function buildWebsiteOnStartup() {
    populateDropdown();
    d3.json("samples.json").then(data => {
        buildCharts(data.names[0]);
        populateDemographicInfo(data.names[0]);
    })
};

buildWebsiteOnStartup();
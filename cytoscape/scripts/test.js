window.addEventListener("load", function(){
    var initial_nodes = [];

    $.ajax({
        type: "GET",
        url: "input/nodes.json",
        dataType: "json",
        async: false,
        success: function (data) {
            initial_nodes = data;
        }})
        .fail(function(xhr, status, error) {
            var err = status + ", " + error;
            console.log("Request failed: " + err)
    });
    var row_count = Math.floor(Math.sqrt(initial_nodes.length)) + 1;

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        ready: function(){ },

        //RB 11/15/16: This should be recalculated dynamically based on the nodes.
        layout: {
            name: 'grid',
            //cols: column_count,
            rows: row_count
        },

        wheelSensitivity: 0.3,

        style: [
            {
                selector: 'node',
                css: {
                    'content': 'data(name)',
                    'height': 100,
                    'width': 100,
                    'text-valign': 'center',
                    'text-halign': 'center',
                    'text-align': 'justify',
                    'background-color': '#eee',
                    'text-wrap': 'wrap',
                    'text-max-width': 200,
                    'text-outline-color': '#eee',
                    'text-outline-width': 3,
                    'border-width': 1,
                    'border-color': '#ccc'
                }
            },

            {
                selector: 'node.why-hard',
                css: {
                    'shape': 'triangle'
                }
            },

            {
                selector: 'edge',
                css: {
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    //'line-color': '#eee',
                    'width': 8
                }
            },

            // some style for the ext

            {
                selector: '.edgehandles-hover',
                css: {
                    //'background-color': 'green'
                }
            },

            {
                selector: '.edgehandles-source',
                css: {
                    'border-width': 2,
                    'border-color': 'maroon'
                }
            },

            {
                selector: '.edgehandles-target',
                css: {
                    'border-width': 2,
                    'border-color': 'maroon'
                }
            },

            {
                selector: '.edgehandles-preview, .edgehandles-ghost-edge',
                css: {
                    'line-color': 'maroon',
                    'target-arrow-color': 'maroon',
                    'source-arrow-color': 'maroon'
                }
            }
        ],

        elements: {
            nodes: initial_nodes,
            edges: []
        },
    });

    cy.on('click', 'edge', function(evnt) {
        var target = evnt.cyTarget;
        console.log(target.json());
        target.remove();
    });

    cy.edgehandles({
        toggleOffOnLeave: true,
        handleNodes: "node",
        handleSize: 10,
        handleColor: 'maroon',
        handleIcon: false,
        edgeType: function(){ return 'flat'; }
    });

    document.querySelector('#draw-mode').addEventListener('click', function(e) {
        var draw_button = e.target;
        var draw_mode = draw_button.getAttribute("data-draw-mode");
        console.log(draw_mode);
        if (draw_mode === "drawon") {
            draw_mode = "drawoff";
            draw_button_switch = "OFF";
        }
        else {
            draw_mode = "drawon";
            draw_button_switch = "ON";
        }
        cy.edgehandles(draw_mode);
        draw_button.setAttribute("data-draw-mode", draw_mode);
        draw_button.innerHTML = "Draw mode: " + draw_button_switch;
    });

    document.getElementById('record').addEventListener('click', function(){
        //this is an object, not an iterable
        var nodes = cy.nodes();
        var nodes_arr = [];
        for (var i = 0; i < nodes.length; i++) {
          nodes_arr.push(nodes[i].data());
        }
	var edges = cy.edges();
        var edges_arr = [];
	for (var i = 0; i < edges.length; i++) {
          edges_arr.push(edges[i].data());
        }

        //console.log(edges.json());
        console.log(JSON.stringify(nodes_arr));
        console.log(JSON.stringify(edges_arr));
        //export the graph in a JSON format comparable to that
        //when initialized
        console.log(JSON.stringify(cy.json()));
    });

});

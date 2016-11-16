var edges = {}

window.addEventListener("load", function(){

    var cy = window.cy = cytoscape({
        container: document.getElementById('cy'),

        ready: function(){
        },

        //RB 11/15/16: This should be recalculated dynamically based on the nodes.
        layout: {
            name: 'grid',
            rows: 4,
            cols: 2
        },

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
                    'border-width': 1,
                    'border-color': '#ccc'
                }
            },

            {
                selector: 'edge',
                css: {
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    'background-color': '#eee',
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

        //RB 11/15/16: Nodes should come from input. No starting edges.
        elements: {
            nodes: [
                { data: { id: 'node-1', name: 'Support exploratory search and discovery of "who is doing X at CMU"' } },
                { data: { id: 'node-2', name: 'Construct a map of the problems that people are working on' } },
                { data: { id: 'node-3', name: 'Re-represent each paper as a problem graph' } },
                { data: { id: 'node-4', name: 'Extract them from the paper' } },
                { data: { id: 'node-5', name: 'Specify relationships between problem nodes' } },
                { data: { id: 'node-6', name: 'Distributed approach: infer hierarchy from local "path" questions' } },
                { data: { id: 'node-7', name: 'Ensure accuracy' } },
                { data: { id: 'node-8', name: 'Model and account for noise rates' } },
                { data: { id: 'node-9', name: 'Understand workers\' error rates' } }
            ],
            edges: [
            /*
             *    { data: { source: 'node-1', target: 'node-2' } },
             *    { data: { source: 'node-2', target: 'node-3' } },
             */
            ]
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
        handleColor: '#DF0085',
        handleIcon: false,
        edgeType: function(){ return 'flat'; }
    });

    document.querySelector('#draw-on').addEventListener('click', function(){
        cy.edgehandles('drawon');
    });

    document.querySelector('#draw-off').addEventListener('click', function(){
        cy.edgehandles('drawoff');
    });
    
    document.getElementById('record').addEventListener('click', function(){
        console.log(cy.collection("edge"));
    });

});

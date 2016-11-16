$(function(){
    //INITIALIZATION
    var domContainer = $(".cy");
    var cy = cytoscape({
        container: domContainer,
        style: [
            {
                selector: 'node[type="type1"]',
                style: {
                    'background-color': '#FFEB12',
                }
            },
            {
                selector: 'node[type="type2"]',
                style: {
                    'background-color': '#2CE8F2',
                }
            },
            {
                selector: 'edge',
                style: {
                    'width': 3,
                    'target-arrow-shape': 'triangle'
                }
            },
            {
                selector: 'edge[type="default"]',
                style: {
                    'line-color': 'green',
                    'target-arrow-color': 'green',
                }
            },
            {
                selector: 'edge[type="yes"]',
                style: {
                    'line-color': '#48FF00',
                    'target-arrow-color': '#48FF00',
                }
            },
            {
                selector: 'edge[type="no"]',
                style: {
                    'line-color': '#ED1000',
                    'target-arrow-color': '#ED1000',
                }
            }
        ]
    });
    cy.on('click', 'edge', function(evnt) {
        var target = evnt.cyTarget;
        console.log(evnt);
        console.log(target.id());
        target.remove();
    });

    var handles = new CytoscapeEdgeEditation;
    handles.init(cy);

    handles.registerHandle({
        positionX: "center",
        positionY: "bottom",
        color: "green",
        type: "default",
        single: false,
        nodeTypeNames: ["type1"]
    });

    handles.registerHandle({
        positionX: "center",
        positionY: "top",
        color: "green",
        type: "default",
        single: false,
        nodeTypeNames: ["type1"]
    });

    handles.registerHandle({
        positionX: "left",
        positionY: "center",
        color: "green",
        type: "default",
        single: false,
        nodeTypeNames: ["type1"]
    });

    handles.registerHandle({
        positionX: "right",
        positionY: "center",
        color: "green",
        type: "default",
        single: false,
        nodeTypeNames: ["type1"]
        //  noMultigraph: true
    });

    handles.registerHandle({
        positionX: "left",
        positionY: "center",
        color: "#48FF00",
        type: "yes",
        single: true,
        nodeTypeNames: ["type2"]
    });

    handles.registerHandle({
        positionX: "right",
        positionY: "center",
        color: "#ED1000",
        type: "no",
        single: true,
        nodeTypeNames: ["type2"]
    });


    //ADD NODES
    cy.add({
        data: { id: 'n1', type: "type1"},
    });

    cy.add({
        data: { id: 'n2', type: "type1"},
    });

    cy.add({
        data: { id: 'n3', type: "type1"},
    });

    cy.add({
        data: { id: 'n4', type: "type2"},
    });


    //ADJUST HEIGHT
    var resizeViewport = function(){
        $(".cy").height($(window).height());
        cy.resize();
    };

    $(window).resize(resizeViewport);
    resizeViewport();

    //LAYOUT
    cy.layout({
        name: 'random',
        fit: true,
        padding: 40,
        boundingBox:  {x1: -200, y1:-200, x2:300, y2: 200}
    });
});

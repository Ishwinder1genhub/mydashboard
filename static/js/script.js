$(function () {
    var options = {
   cellHeight:'auto'
    };
    $('.grid-stack').gridstack(options);


    // Load the SerializedData from Database
    new function () {
        this.serializedData = [
            {x: 0, y: 0, width: 2, height: 2, div_id: "a1"},
            {x: 3, y: 1, width: 1, height: 2, div_id: "b1"},
            {x: 4, y: 1, width: 1, height: 1, div_id: "a2"},
            {x: 2, y: 3, width: 3, height: 1, div_id: 1},
            {x: 1, y: 4, width: 1, height: 1, div_id: 2},
            {x: 1, y: 3, width: 1, height: 1, div_id: "3"},
            {x: 2, y: 4, width: 1, height: 1, div_id: "sdfsdfa2"},
            {x: 2, y: 5, width: 1, height: 1, div_id: "a2sssss"}
        ];

        this.grid = $('.grid-stack').data('gridstack');

        this.loadGrid = function () {
            this.grid.removeAll();
            var items = GridStackUI.Utils.sort(this.serializedData);
            _.each(items, function (node, i) {
// addWidget(el[, x, y, width, height, autoPosition, minWidth, maxWidth, minHeight, maxHeight, id])
                this.grid.addWidget($('<div id="gridDiv' + node.div_id + '"><div id="gridDiv' + node.div_id + 'child" class="grid-stack-item-content panel" /></div></div>'),
                    node.x, node.y, node.width, node.height, 0,1, 12, 1, 12, node.div_id);
                    if (node.div_id=="a1" || node.div_id=="b1"){
                        $('#gridDiv' + node.div_id +'child').load('/myth.html');
                    }
                    if (node.div_id==1 || node.div_id==2){
                        $('#gridDiv' + node.div_id +'child').load('/symbol.html');
                    }
                    
            }, this);
            return false;
        }.bind(this);

        this.saveGrid = function () {

            this.serializedData = _.map($('.grid-stack > .grid-stack-item:visible'), function (el) {
                el = $(el);
                var node = el.data('_gridstack_node');
                return {
                    x: node.x,
                    y: node.y,
                    width: node.width,
                    height: node.height,
                    div_id: node.id
                };
            }, this);
            $('#saved-data').val(JSON.stringify(this.serializedData, null, '    '));
            return false;
        }.bind(this);

        this.clearGrid = function () {
            this.grid.removeAll();
            return false;
        }.bind(this);

        this.stopGrid = function() {
        var grid = $('.grid-stack').data('gridstack');
        grid.enableMove(false);
        grid.enableResize(false);
        }.bind(this);
        
        this.startGrid = function() {
        var grid = $('.grid-stack').data('gridstack');
        grid.enableMove(true);
        grid.enableResize(true);
        }.bind(this);
        
        $('#save-grid').click(this.saveGrid);
        $('#load-grid').click(this.loadGrid);
        $('#clear-grid').click(this.clearGrid);
        $('#stop-grid').click(this.stopGrid);
        $('#start-grid').click(this.startGrid);
        this.loadGrid();
    };
});
define( [
		"qlik"
		,"./properties"
		,"text!./screen_resizer.css"
],
function ( qlik, props, cssContent) {

	$( '<style>' ).html( cssContent ).appendTo( 'head' );

  	var app = qlik.currApp(this);
  	var sheetId = qlik.navigation.getCurrentSheetId().sheetId;

  	function resizeGrid(rows, cols) {

			app.getObject(sheetId).then(function(obj) {
		  	obj.applyPatches([{
					qOp: 'replace',
				  	qPath: '/columns',
					qValue: '"'+cols+'"'
				},
				{
					qPath : '/rows',
					qOp : 'replace',
					qValue : '"'+rows+'"'
				}
				],false);

		}).then(function() {
			app.doSave();
		});
  	}

	return {
		initialProperties : {
			version : 1.0
		},
	  	definition: ( props )
	  	,
		paint: function ($element, layout) {

		  	var html = "";

		  	//Check if Button is to be shown or hidden
		  	if (layout.show_button) {
				html = "<button id='changegrid' class='resize_grid_btn' >Resize Grid</button>";
		  	} else {
		  		html = "<div style='color: #5F6062; font-size:14px'>" + layout.ext_text + "</div>";
		  	}

			if (window.matchMedia('screen and (min-width:640px)').matches) {

					// Fixed to work on QS3.2SR4
					$('div.qvt-sheet-container').css('height',layout.height+"%");
					$('div.qv-panel-properties.ng-scope').css('height',layout.height+"%");

			 		//Center: Panel Content
			  	$('div.qv-panel-content.flex-row').css('height',layout.height+"%");

			  	//Center: Panel Sheet
			  	$('div.qvt-sheet.qv-panel-sheet.ng-scope.ng-isolate-scope').css('height',layout.height+"%");

			  	//Left: Tab Container
			  	$('#assets-tab-container').css('top','44px');

		 	 		//Right: Panel Properties
			  	$('div.qv-panel-properties.ng-scope.ng-isolate-scope').css('height',layout.height+"%");

			  	//Right: Property Header
			  	$('div.property-header').css('position','fixed');
			  	$('div.property-header').css('top','43.9931px');

			}

		  	//Render html
			$element.html(html).find('#changegrid').on('qv-activate', function(event) {
			    event.preventDefault();
	  			resizeGrid(layout.rows, layout.columns);
			});

			// Get Sheet ID
			var sheet_id = qlik.navigation.getCurrentSheetId()["sheetId"];

			// Check if noresize flag is on
			if($("span#noresize-" + sheet_id)[0]) {
				// Do nothing
			} else {
				// Resize objects
				qlik.resize();

				// Set a flag to avoid resizing this extension itself
				$('div#qv-toolbar-container').append("<span id='noresize-" + sheet_id + "'></span>");
			}
		}
	};
} );

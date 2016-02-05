define([], function () {
	'use strict';

	// ****************************************************************************************
	// Properties Definition
	// ****************************************************************************************
	//Screen Height
	var screen_height = {
		ref : "height",
		label : "Screen Height (%)",
		type : "integer",
		defaultValue : "100"
	};
  
    //Number of Grid Rows
  	var grid_rows = {
		ref : "rows",
		label	 : "Number of Rows",
		type : "integer",
		defaultValue : "12"
	};

    //Number of Grid Columns
	var grid_columns = {
		ref : "columns",
		label	 : "Number of Columns",
		type : "integer",
		defaultValue : "24"
	};

    //Show Hide Botton Switch
	var show_button = {
		ref : "show_button",
		label	 : "Show 'Resize Grid' Button",
		type : "boolean",
		component: "switch",
		options: [{
				value: true,
				label: "Shown"
			}, {
				value: false,
				label: "Hidden"
			}],
			defaultValue: true
	};

    //Text
	var ext_text = {
		ref : "ext_text",
		label	 : "Text (Displayed when the button is hidden)",
		type : "string",
		defaultValue : "Screen Resizer"
	};

	// ****************************************************************************************
	// Property Panel Definition
	// ****************************************************************************************
	// Settings -Properties 
	//		  |--Style
	var myCustomSection = {
		component : "expandable-items",
		label : "Settings",
		items : {
			header1 : {
				type : "items",
				label : "Properies",
				items : {
					screen_height : screen_height ,
				  	grid_rows : grid_rows,
				  	grid_columns : grid_columns
				}
			},
			header2 : {
				type : "items",
				label : "Style",
				items : {
				  	show_button: show_button,
				  	ext_text: ext_text
				}
			}
		}
	};

	//Return values
	return {
		type : "items",
		component : "accordion",
		items : {
			customSection : myCustomSection
		}
	};
});

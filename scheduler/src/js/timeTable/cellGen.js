import React, { Component }  from 'react';
var moment = require('moment');
import {GenTimeColumns} from "./ColumnsGen/TimeCGen";
import {GenDayColumns} from "./ColumnsGen/DayCGen";


export class TableGen extends Component{
	constructor(props) {
    	super(props);
    	this.state = {    		
    		//display time from xx:xx to yy:yy
    		//TODO
    		//change Time format later!    		
    		TimeRange: [props.TimeRange[0], props.TimeRange[1]],
    		
    		//A time array 
    		//eg: 6:00, 6:30 .....
    		TimeArr : this.InitTime(props.TimeRange),

    		//Class list
    		//TODO
    		//should get from server
    		//Define a fromate later
    		Class: [{Name: "Eng",
    				 Code: 101,
    				 TimeFrom: moment('06:30 am', "HH:mm"),
    				 TimeTo: moment('07:30 am', "HH:mm"),
    				 Date: ["Monday", "Wednesday", "Friday"]},
    				{Name: "Math",
    				 Code: 102,
    				 TimeFrom: moment('11:30 am', "HH:mm"),
    				 TimeTo: moment('1:30 pm', "HH:mm"),
    				 Date: ["Tuesday", "Thursday"]}
    				],
    		CellHeight: 20	    
    	}    	
    }

	InitTime(vars){

		var start = vars[0];
		var end = vars[1];
		var TmpTimeArr = [];
		var time = moment('06:00 am', "HH:mm");

		for(var i = start; i <= end; i++){
			
			var TmpTime = moment(time);
			TmpTimeArr.push(TmpTime);
			time = time.add(30, 'minutes');
			var TmpTime2 = moment(time);
			TmpTimeArr.push(TmpTime2);
			time = time.add(30, 'minutes');
			//console.log()
		}
		return TmpTimeArr
	}


	GenClassCell(props){
		var divStyle = {
			position: 'absolute',
			top: '0px',
			left: '0px'
		};

		var classCell = React.createElement("div", 
			{
				style:divStyle
			},
			props.Class.Name + ' ' + props.Class.Code
		)

		return classCell;
	}

	GenClassCells(){
		var classCells = this.state.Class.map((Class1) =>
			this.GenClassCell({Class: Class1})
		)

		return classCells;
	}



    CreateTimeCells(){
    	return React.createElement("div", 
    		{
    			className: "TimeTable"
    		},
    		<GenTimeColumns 
    			TimeArr={this.state.TimeArr}
    		/>,
    		React.createElement("div", 
    			{
    				className: "TimeTableDayColumns"
    			},
    			<GenDayColumns
	    			TimeArr={this.state.TimeArr}
	    		/>,	    		
	    		this.GenClassCells()    		
    		)    		
    	)
    }

    render() {
		return this.CreateTimeCells()
	}	
}

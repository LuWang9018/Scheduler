import React, { Component }  from 'react';
import update from 'immutability-helper';
var moment = require('moment');
import {GenTimeColumns} from "./ColumnsGen/TimeCGen";
import {GenDayColumns} from "./ColumnsGen/DayCGen";
import {GenClassCellForAllDays} from "./ClassGen/ClassCellGen";


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
    				 Section: "001",
    				 TimeFrom: moment('06:40 am', "HH:mm"),
    				 TimeTo: moment('07:30 am', "HH:mm"),
    				 Date: ["Monday", "Wednesday", "Friday"],
    				 LocationB: ["AAA"],
    				 LocationR: ["111"],
    				 Prof: "SB",
    				 Type: ["LEC"], 
    				 Color: ["red"],
    				},
    				{Name: "Math",
    				 Code: 102,
    				 Section: "001",
    				 TimeFrom: moment('9:30 am', "HH:mm"),
    				 TimeTo: moment('11:00 pm', "HH:mm"),
    				 Date: ["Tuesday", "Thursday"],
    				 LocationB: ["AAA"],
    				 LocationR: ["111"],
    				 Prof: "SB",
    				 Type: ["LEC"], 
    				 Color: ["red"],    				 
    				},
    				],
    		CellHeight: 30,
    		AddClassWindowOn: false	    
    	}    	
    }

	InitTime(vars){

		var start = vars[0];
		var end = vars[1];
		var TmpTimeArr = [];
		var time = moment('06:00 am', "HH:mm");
		//time = time.add(-30, 'minutes')

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
	    			onClick={props => this.handleWhiteCellClick(props)}
	    		/>,	    		
	    		<GenClassCellForAllDays
	    			Class = {this.state.Class}
	    			form = {this.state.AddClassWindowOn}
	    		/>    		
    		)    		
    	)
    }

	//turn add class window on/off
	//props: {
	//	OnOff: true/flase	
	//}
    handleWhiteCellClick(props){
    	var NewState = update(this.state, {AddClassWindowOn: {$set: props.OnOff}});
    	this.setState(NewState);
    }

    render() {
		return this.CreateTimeCells()
	}	
}

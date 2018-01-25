import React, { Component }  from 'react';
import update from 'immutability-helper';
var moment = require('moment');
import {GenTimeColumns} from "./ColumnsGen/TimeCGen";
import {GenDayColumns} from "./ColumnsGen/DayCGen";
import {GenClassCellForAllDays} from "./ClassGen/ClassCellGen";
import {ClassPanel} from "./Pops/classPanel";

export class TableGen extends Component{
	constructor(props) {
    	super(props);
    	this.state = {  
    		//display time from xx:xx to yy:yy
    		//TODO
    		//change Time format later!    		
    		TimeRange: this.FindMinMaxTime(props.Data),
    		
    		//A time array 
    		//eg: 6:00, 6:30 .....
    		TimeArr : this.InitTime({Class: props.Data.Class
    								}),

    		//Class list
    		//TODO
    		//should get from server
    		//Define a fromate later
    		Class: props.Data.Class,

    		CellHeight: 30,
    		AddClassWindowOn: false,	    
    	}    	
    }

	InitTime(props){

		var TimeRange = this.FindMinMaxTime({Class:props.Class})

		var start = TimeRange.MinTime.clone();
		//console.log(start);
		var end = TimeRange.MaxTime.clone();

		var TmpTimeArr = [];
		//time = time.add(-30, 'minutes')
		    	//console.log(start);
		    	//console.log(end);  		

		for(var i = start.clone(); i.isBefore(end); i.add(30, "minutes")){
			
			var tmp = moment().hour(i.hour()).minute(i.minute());
			TmpTimeArr.push(tmp);
			//console.log(tmp);

		}
		
		return TmpTimeArr
	}

	FindMinMaxTime(props){

		var min = moment('10:00 am', 'HH:mm A');
		var max = moment('04:30 pm', 'HH:mm A');


		for(var i = 0; i < props.Class.length; i++){
			var start = props.Class[i].TimeFrom.clone();
			var end = props.Class[i].TimeTo.clone();
			if(start.isBefore(min)){
				min = start.clone();
				//console.log("min");
				//console.log(min);

			}
			if(end.isAfter(max)){
				max = end.clone();
				//console.log("end");
				//console.log(end);

			}
		}

		var remainder = min.minute() % 30;

		min.subtract(remainder, 'minutes');

		remainder = 30 - max.minute() % 30;
		max.add(remainder, "minutes").format("HH:mm A");

		return {MinTime: min, MaxTime:max}
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
	    			onClick={(i) => this.handleWhiteCellClick(i)}
	    		/>,	    		
	    		<GenClassCellForAllDays
	    			TimeRange={this.state.TimeRange}
	    			Class = {this.state.Class}
	    			form = {this.state.AddClassWindowOn}
	    		/>  		
    		),
    		<ClassPanel
    			OnOff= {this.state.AddClassWindowOn}
    			onClick={(i) => this.handleWhiteCellClick(i)}
    		/>     		
    	)
    }

	//turn add class window on/off
	//props: {
	//	OnOff: true/flase	
	//}
    handleWhiteCellClick(props){
    	var newState = update(this.state, {AddClassWindowOn: {$set: true}});
    	//console.log(this.state.AddClassWindowOn);
    	this.setState({AddClassWindowOn: props.OnOff});
    }

    render() {
		return this.CreateTimeCells()
	}	
}

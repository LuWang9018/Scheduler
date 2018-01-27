import React, { Component }  from 'react';
var moment = require('moment');

function GendayCell(props){

	var DayCell = React.createElement("div",
		{
			time: props.time.format("HH:mm").toString() + " " + props.Day,
			className: 'DataCell',
			key : props.time.format("HH:mm").toString() + " " + props.Day,
			onClick : props.onClick
		}
    )

	return DayCell;
}


function GenDayCells(props){


	var DayCells = props.TimeArr.map(
		function(time){
			var classtimed = {Name: "",
						 Code: '',
						 Section: "",
						 TimeFrom: [time],
						 TimeTo: [moment('00:00 am', "HH:mm A")],
						 Date: [[]],
						 LocationB: [],
						 LocationR: [],
						 Prof: "",
						 Type: [""], 
						 Color: [""],
						};

			var cell = <GendayCell
				key = {time} 
				time = {time} 
				onClick = {() => props.onClick({AddClassWindowOn: true,
																Class: classtimed})}
			/>

			return cell;
		}


		//<div key = {Time.format("HH:mm") + " " + props.Day} className="DataCell"> </div>
	);
	
	return DayCells;
}

export function GenDayColumns(props){
	const DayArr = ["Monday", "Tuesday", "Wednesday",
				    "Thursday", "Friday", "Saturday",
				    "Sunday"];



	var DayColumns = DayArr.map((Day) => 
		React.createElement("div", {className: "Cellcolumns", key: Day+"Columns"},
			<div key = {Day} className="DayCell">{Day}</div>,
			<GenDayCells 
				Day={Day} 
				TimeArr={props.TimeArr}	
				onClick={(i) => props.onClick(i)}			
			/>
		)
	);


	return DayColumns;	
}
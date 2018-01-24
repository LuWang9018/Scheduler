import React, { Component }  from 'react';
var moment = require('moment');


function GenClassCell(props){
	const DayArr = ["Monday", "Tuesday", "Wednesday",
				    "Thursday", "Friday", "Saturday",
				    "Sunday"];

	const unityPX = 1;
	const timeStart = moment('06:30 am', "HH:mm");

	var divStyle = {
		position: 'absolute',
		top: '0px',
		left: '0px',
		margin: '0px',
		padding: '0px 0px',
		border: '0',
		height: '0px',
		width: '14%',
		'backgroundColor': 'red', 
		color: 'black',
		border: '0.1px solid black',
		'boxSizing':'border-box',
	};

	
	var timeDiff = props.Class.TimeFrom.diff(timeStart);
	var duration = moment.duration(timeDiff);
	var minutes = duration.asMinutes();

	var timeDiff2 = props.Class.TimeTo.diff(props.Class.TimeFrom);
	var duration2 = moment.duration(timeDiff2);
	var minutes2 = duration2.asMinutes();

	divStyle.left = (DayArr.indexOf(props.Date) * 14).toString() + "%";
	divStyle.top = (60 + minutes * unityPX).toString() + "px";
	divStyle.height = (minutes2 * unityPX).toString() + "px";

	var classCell = React.createElement("div", 
		{
			style:divStyle,
			key:props.Class.Name + " " + props.Date
		},
		props.Class.Name + ' ' + props.Class.Code + ' ' + minutes2
	)

	return classCell;
}


function GenClassCells(props){

	var classCells = props.Class.Date.map((Date, index) =>
		<GenClassCell	
			Class={props.Class}
			Date={Date}
			key = {Date+index}
		/>
	)


	return classCells;
}
export function GenClassCellForAllDays(props){
	var classCellDays = props.Class.map((Class, index) =>
		<GenClassCells	
			Class={Class}
			key= {Class + index}
		/>
	)

	return classCellDays;
}
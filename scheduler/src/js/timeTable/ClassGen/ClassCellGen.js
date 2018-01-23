import React, { Component }  from 'react';
var moment = require('moment');


function GenClassCell(props){
	const DayArr = ["Monday", "Tuesday", "Wednesday",
				    "Thursday", "Friday", "Saturday",
				    "Sunday"];

	const unityPX = 30.00 / 60;
	const timeStart = moment('06:30 am', "HH:mm");

	var divStyle = {
		position: 'absolute',
		top: '0px',
		left: '0px'
	};

	divStyle.left = (DayArr.indexOf(props.Date) * 80).toString() + "px";
	//divStyle.top = 30 + props.Class.timeStart.duration(timeStart).duration().asMinutes()*unityPX;
	var classCell = React.createElement("div", 
		{
			style:divStyle
		},
		props.Class.Name + ' ' + props.Class.Code
	);

	return classCell;
}


function GenClassCells(props){

	var classCells = props.Class.Date.map((Date) =>
		<GenClassCell	
			Class={props.Class}
			Date={Date}
		/>
	);


	return classCells;
}
export function GenClassCellForAllDays(props){
	var classCellDays = props.Class.map((Class) =>
		<GenClassCells	
			Class={Class}
		/>
	);

	return classCellDays;
}
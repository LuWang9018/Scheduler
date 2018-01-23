import React, { Component }  from 'react';
var moment = require('moment');

function GenDayCells(props){

    const buttonStyle = {
        position: 'relative',
        height: '20px',
        width: '70px',
        //opacity: '100',
    };

	var DayCells = props.TimeArr.map((Time) =>
        React.createElement("div", {Time: Time.format("HH:mm") + " " + props.Day, className: 'DataCell', type: 'button'})
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
			/>
		)
	);


	return DayColumns;	
}
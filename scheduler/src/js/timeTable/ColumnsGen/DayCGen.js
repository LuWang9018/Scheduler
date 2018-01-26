import React, { Component }  from 'react';
var moment = require('moment');

function GenDayCells(props){

    const buttonStyle = {
        position: 'relative',
        height: '20px',
        width: '70px',
        //opacity: '100',
    };

	var DayCells = props.TimeArr.map((time) =>
        React.createElement("div",
			{
				time: time.format("HH:mm").toString() + " " + props.Day,
				className: 'DataCell',
				key : time.format("HH:mm").toString() + " " + props.Day,
				onClick : props.onClick
			}
        )

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
				onClick={() => props.onClick({OnOff: true,
											  Class: null})}			
			/>
		)
	);


	return DayColumns;	
}
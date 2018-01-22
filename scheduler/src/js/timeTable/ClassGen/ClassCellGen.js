import React, { Component }  from 'react';
var moment = require('moment');


function GenClassCell(props){

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


function GenClassCells(props){

	var classCells = props.Date.map((Date1) =>
		<GenClassCell	
			Class={props}
			Date={Date1}
		/>
	)


	return classCells;
}
export function GenClassCellForAllDays(props){
	var classCellDays = props.Class.map((Class) =>
		<GenClassCells	
			Class={Class}
		/>
	)

	return classCellDays;
}
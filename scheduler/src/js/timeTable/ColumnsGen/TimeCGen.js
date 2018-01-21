import React, { Component }  from 'react';
var moment = require('moment');


export function GenTimeColumns(props){
	const TimeCells = React.createElement("div", {className: "Cellcolumns"},
		<div key = "top-left" className="TimeCell"></div>,
		props.TimeArr.map((time) => 
			<div key = {time.format("HH:mm")} className="TimeCell"> 
				{time.format("HH:mm")}
			</div>
		)
	)

	return TimeCells;	
}
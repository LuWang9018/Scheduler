import React, { Component }  from 'react';
var moment = require('moment');


function GenClassCells(props){
	const DayArr = ["Monday", "Tuesday", "Wednesday",
				    "Thursday", "Friday", "Saturday",
				    "Sunday"];

	const unityPX = 1;

	var divStyle = {
		position: 'absolute',
		top: '0px',
		left: '0px',
		margin: '0px',
		padding: '0px 0px',
		border: '0',
		height: '0px',
		width: (100.00/7).toString()+"%",
		'backgroundColor': 'red', 
		color: 'black',
		border: '0.1px solid black',
		'boxSizing':'border-box',
		"marginLeft":"0px",
	};
	var startTime = props.TimeRange.MinTime;
	var timeDiff = props.Class.TimeFrom[0].diff(startTime);

// console.log("startTime: ");
// console.log(props);
// console.log("timeDiff: ");
// console.log(timeDiff);

	var duration = moment.duration(timeDiff);
	var minutes = duration.asMinutes();

	var timeDiff2 = props.Class.TimeTo[0].diff(props.Class.TimeFrom[0]);
	var duration2 = moment.duration(timeDiff2);
	var minutes2 = duration2.asMinutes();

	divStyle.left = ((DayArr.indexOf(props.Date) * (100.00/7))).toString() + "%";
	divStyle.top = (30 + minutes * unityPX).toString() + "px";
	divStyle.height = (minutes2 * unityPX).toString() + "px";
	//divStyle.marginLeft = DayArr.indexOf(props.Date).toString() + "px";

	var classCells = React.createElement("div", 
		{
			style:divStyle,
			key:props.Class.Name + " ",
			onClick: props.onClick
		},
		props.Class.Name + ' ' + props.Class.Code + ' ' + minutes2
	)

	return classCells;
}

class GenAClassForATimeRange extends Component{
	constructor(props) {
    	super(props);
    	
    }

    GenAClassForATimeRange(){
		const GenAClassForATimeRange = 
		this.props.Class.Date[this.props.index].map((Date, index) =>
			<GenClassCells	
				Class={this.props.Class}
				Date={Date}
				key = {Date+index}
				TimeRange= {this.props.TimeRange}
				onClick = {() => this.props.onClick({AddClassWindowOn: true,
													  Class: this.props.Class})}
			/>
		);   

		return GenAClassForATimeRange;
    }

    render(){
		return this.GenAClassForATimeRange();
	}
}

class GenClassForAllDay extends Component{
	constructor(props) {
    	super(props);
    	
    }

	ClassForAllDay() {

		const ClassForAllDay = 
		this.props.Class.Date.map((Date, index) =>
			<GenAClassForATimeRange	
				Class={this.props.Class}
				Date={Date}
				key = {Date+index}
				TimeRange= {this.props.TimeRange}
				index= {index}
				onClick = {(i) => this.props.onClick({AddClassWindowOn: true,
													  Class: this.props.Class
													  })}
			/>
		);

		return ClassForAllDay;
	}

	render(){
		return this.ClassForAllDay();
	}
	
}

export function GenAllClasses(props){
	var AllClasses = props.Class.map((Class, index) =>
		<GenClassForAllDay
			TimeRange= {props.TimeRange}	
			Class={Class}
			key= {Class + index}
			onClick = {(i) => props.onClick(i)}
		/>
	)

	return AllClasses;
}
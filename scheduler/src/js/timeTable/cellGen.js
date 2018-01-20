import React, { Component }  from 'react';
var moment = require('moment');

export class TableGen extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		DayArr: ["","Monday", "Tuesday", "Wednesday",
				    "Thursday", "Friday", "Saturday",
				    "Sunday"],
    		
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
    				 TimeFromH: 6,
    				 TimeFromMin: 30,
    				 TimeToH: 7,
    				 TimeToMin: 30,
    				 Date: ["Monday", "Wednesday", "Friday"]},
    				{Name: "Math",
    				 Code: 102,
    				 TimeFromH: 9,
    				 TimeFromMin: 30,
    				 TimeToH: 10,
    				 TimeToMin: 30,
    				 Date: ["Tuesday", "Thursday"]}
    				],
    		CellHeight: 20	    
    	}
    	
    }

    //generate time array
    //take: TimeRange
    //return: TimeArr
	InitTime(vars){

		var start = vars[0];
		var end = vars[1];
		var TmpTimeArr = [];

		for(var i = start; i <= end; i++){
			var time1 = new Date();
			time1.setHours(i);
			time1.setMinutes(0);
			var time2 = new Date();
			time2.setHours(i);
			time2.setMinutes(30);

			TmpTimeArr.push(time1);
			TmpTimeArr.push(time2);
			//console.log()
		}
		return TmpTimeArr
	}

	//See if that day has a class or not
	//TODO
	//When class format changes, change it!
	//Take: Time and date
	//Return: String of cell data
	FindClass(Time, Day){
		var match = "";
		var height = 20; 
		if(Day === ""){
			var h = Time.getHours();
			var min = Time.getMinutes();
			match = h.toString() + ":" + min.toString();
		}else{
			var Classes = this.state.Class.slice()
			for(var i = 0; i < Classes.length; i++){
				if(Classes[i].TimeFromH === Time.getHours() &&
				   Classes[i].TimeFromMin === Time.getMinutes() &&
				   Classes[i].Date.includes(Day)
				   ){
					match = Classes[i].Name + "\n" + Classes[i].Code;
				}
			}
		}
		var key = Time + Day;
		var ClassVar, cell

		if(Day === ""){//time Cell
			ClassVar = "TimeCell";
			cell = React.createElement("td", {key: key },
				<button className={ClassVar}>{match}</button>
			)
		} else {//Dtat Cell
			ClassVar = "DataCell";
			
			cell = React.createElement("td", {key: key,},
				<button className={ClassVar}>{match}</button>
			)
		}
		
		return cell;	
	}

	//Gen Row to each time given
	//Take time
	//Return: that row
	CreateRowData(Time){
		const listHeader = this.state.DayArr.map((Day) =>
			this.FindClass(Time, Day)
			
		); 

		return listHeader;
	}

	//Gen the whole table
    CreateRow(){

    	//table header
		const listHeader = this.state.DayArr.map((Day) =>
			<th key={Day}>
				{<button className="DayCell">{Day}</button>}
			</th>
		);   

		//table body
		const listItems = this.state.TimeArr.map((time) => 
		 	<tr key = {time}> 
		 		{this.CreateRowData(time)}
		 	</tr>
		);

		return (
			React.createElement("table", {id: "TimeTable"},
				React.createElement("thead", {id: "TimeTableHead"},
					<tr>{listHeader}</tr>
				),
				React.createElement("tbody", {id: "TimeTableBody"},
					listItems
				)				
			)
		);   	
    }

	render() {
		return this.CreateRow()
	}
}

export class NewTableGen extends Component{
	constructor(props) {
    	super(props);
    	this.state = {
    		DayArr: ["Monday", "Tuesday", "Wednesday",
				    "Thursday", "Friday", "Saturday",
				    "Sunday"],
    		
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
    				 TimeFromH: 6,
    				 TimeFromMin: 30,
    				 TimeToH: 7,
    				 TimeToMin: 30,
    				 Date: ["Monday", "Wednesday", "Friday"]},
    				{Name: "Math",
    				 Code: 102,
    				 TimeFromH: 9,
    				 TimeFromMin: 30,
    				 TimeToH: 10,
    				 TimeToMin: 30,
    				 Date: ["Tuesday", "Thursday"]}
    				],
    		CellHeight: 20	    
    	}    	
    }

	InitTime(vars){

		var start = vars[0];
		var end = vars[1];
		var TmpTimeArr = [];
		var time = moment('06:00 am', "HH:mm");

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

	GenTimeCells(props){
		const TimeCells = React.createElement("div", {className: "Cellcolumns"},
			<div key = "top-left" className="TimeCell"></div>,
			this.state.TimeArr.map((time) => 
				<div key = {time.format()} className="TimeCell"> 
					{time.format("HH:mm")}
				</div>
			)
		)

		return TimeCells;	
	}

	GenDayCells(props){
		
		var DayCells = this.state.TimeArr.map((Day) => 
			[<div key = {Day+"1"} className="DataCell"> </div>]			
		)	
		
		return DayCells;
	}

	GenDayColumns(props){		
		var DayColumns = this.state.DayArr.map((Day) => 
			React.createElement("div", {className: "Cellcolumns", key: Day+"Columns"},
				<div key = {Day} className="DayCell">{Day}</div>,
				this.GenDayCells({Day: {Day}})
			)
		)


		return DayColumns;	
	}


    CreateTimeCells(props){
    	return React.createElement("div", {className: "TimeTable"},
    		this.GenTimeCells(),
    		this.GenDayColumns()
    	)
    }

    render() {
		return this.CreateTimeCells()
	}	
}

import React, { Component }  from 'react';

export class TableGen extends Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		DayArr: [" ", "Monday", "Tuesday", "Wednesday",
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
    				 TimeFromH: "6",
    				 TimeFromMin: "30",
    				 TimeToH: "7",
    				 TimeToMin: "30",
    				 Date: ["Monday", "Wednesday", "Friday"]},
    				{Name: "Math",
    				 Code: 102,
    				 TimeFromH: "9",
    				 TimeFromMin: "30",
    				 TimeToH: "10",
    				 TimeToMin: "30",
    				 Date: ["Tuesday", "Thursday"]}
    				],	    
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
	//Take: Time and date
	//Return: String of cell data
	FindClass(Time, Day){
		var match = " ";
		if(Day === " "){
			var h = Time.getHours();
			var min = Time.getMinutes();
			match = h.toString() + ":" + min.toString();
		}else{
			var Classes = this.state.Class.slice()
			for(var i = 0; i < Classes.length; i++){
				if(Classes[i].TimeFromH == Time.getHours() &&
				   Classes[i].TimeFromMin == Time.getMinutes() &&
				   Classes[i].Date.includes(Day)
				   ){
					match = Classes[i].Name + "\n" + Classes[i].Code;
				}
			}
		}
		return match;
	}

	//Gen Row to each time given
	//Take time
	//Return: that row
	CreateRowData(Time){
		const listHeader = this.state.DayArr.map((Day) =>
			<td key={Time + Day}>
				{<button>{this.FindClass(Time, Day)}</button>}
			</td>
		); 

		return listHeader;
	}

	//Gen the whole table
    CreateRow(){

    	//table header
		const listHeader = this.state.DayArr.map((Day) =>
			<th key={Day}>
				{<button>{Day}</button>}
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
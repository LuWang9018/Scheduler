import React from 'react';
import ReactDOM from 'react-dom';
var moment = require('moment');


export function RequestData(props){
	var Data = {    				
		//Class list
		//TODO
		//should get from server
		//Define a fromate later
		Class: [
					{Name: "Eng",
					 Code: 101,
					 Section: "001",
					 TimeFrom: [moment('06:10 am', "HH:mm A")],
					 TimeTo: [moment('07:30 am', "HH:mm A")],
					 Date: [["Monday", "Wednesday", "Friday"]],
					 LocationB: ["AAA"],
					 LocationR: ["111"],
					 Prof: "SB",
					 Type: ["LEC"], 
					 Color: ["red"],
					},
					{Name: "Math",
					 Code: 102,
					 Section: "001",
					 TimeFrom: [moment('09:30 am', "HH:mm A")],
					 TimeTo: [moment('11:00 am', "HH:mm A")],
					 Date: [["Tuesday", "Thursday"]],
					 LocationB: ["AAA"],
					 LocationR: ["111"],
					 Prof: "SB",
					 Type: ["LEC"], 
					 Color: ["red"],    				 
					},
				],       	
	}

	return Data

}
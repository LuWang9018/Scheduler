import React from 'react';
import ReactDOM from 'react-dom';
var moment = require('moment');
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8090');


var Data = {    				
	//Class list
	//TODO
	//should get from server
	//Define a fromate later
	Class: [
				{Name: "Eng",
				 Code: 101,
				 Section: "001",
				 TimeFrom: [moment('06:10 am', "HH:mm A"),
				            moment('08:10 am', "HH:mm A")],
				 TimeTo: [moment('07:30 am', "HH:mm A"),
				 		  moment('9:10 am', "HH:mm A")],
				 Date: [["Monday", "Wednesday", "Friday"],
				        ["Monday", "Wednesday"]],
				 LocationB: ["MC", "MC"],
				 LocationR: ["3003", "3006"],
				 Prof: "SB",
				 Type: ["LEC", "TUT"], 
				 Color: ["Red", "Green"],
				},
				{Name: "Math",
				 Code: 102,
				 Section: "001",
				 TimeFrom: [moment('09:30 am', "HH:mm A")],
				 TimeTo: [moment('11:00 am', "HH:mm A")],
				 Date: [["Tuesday", "Thursday"]],
				 LocationB: ["RCH"],
				 LocationR: ["160A"],
				 Prof: "SB",
				 Type: ["LEC"], 
				 Color: ["Red"],    				 
				},
			],       	
}

export function RequestData(props){

<<<<<<< HEAD
	socket.on('Hello', function (msg) {
		console.log(msg);
		socket.emit('RequestData', { my: 'data' });
		socket.on('Data', function(data){
			console.log(data)
		})
	});
=======
  socket.on('state', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
>>>>>>> 74abd919d7b8040673ab052834a3edc866b8adbd

	return Data

}

export function UpdateData(props){
	console.log("update called");
	console.log(props);
}

export function AddData(props){
	console.log("add called");
	console.log(props);
	// props.TimeFrom = [moment('11:30 am', "HH:mm A")]
	// props.TimeTo = [moment('12:30 pm', "HH:mm A")]
	// props.Date = [["Monday"]]
	// props.LocationB = ["AAA"]
	// props.LocationR = ["AAA"]
	// console.log(props);
	props.Color = ["Red"]
	Data.Class.push(props);

	console.log(Data);
}
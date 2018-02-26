import Server from 'socket.io';
var mysql = require('mysql')
import {List, Map, Set} from 'immutable';


var db = mysql.createConnection({
	host     : 'scheduler.c28vblzxtoba.ca-central-1.rds.amazonaws.com',
	user     : 'wl9001180',
	password : 'WLtc9018',
	port     : '3305',
	database : 'SchedulerTest'
})

export function Search_Class_General(props){
	var notes = List();

	db.query('SELECT * FROM Class_General', function (err, result, fields) {
	    if (err) throw err;
	    console.log(result);
		notes.push(result);
		return result;
	});	         
}


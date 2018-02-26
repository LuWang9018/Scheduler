import Server from 'socket.io';
var mysql = require('mysql')

var db = mysql.createConnection({
	host     : 'scheduler.c28vblzxtoba.ca-central-1.rds.amazonaws.com',
	user     : 'wl9001180',
	password : 'WLtc9018',
	port     : '3305',
	database : 'SchedulerSchema'
})

function GetClass(){
	db.query('SELECT * FROM Classes', function(err, rows, fields){
		if(err){
			console.log('[query] - :'+err);
			return;
		}
		console.log('Return1:', rows[0].ID);
		console.log(typeof rows);
		return rows[0].ID;
	}).on('end', function(err, rows, fields){
        // Only emit notes after query has been completed
		console.log('Return2:', rows);

		socket.emit('initial notes', notes)
	});	
}


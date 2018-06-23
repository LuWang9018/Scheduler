import Server from 'socket.io';
var mysql = require('mysql')


var db = mysql.createConnection({
	host     : 'scheduler.c28vblzxtoba.ca-central-1.rds.amazonaws.com',
	user     : 'wl9001180',
	password : 'WLtc9018',
	port     : '3305',
	database : 'SchedulerSchema'
})

var user_id = 1;
var semester_id = 1;

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


export function startServer(store) {

	const io = new Server().attach(8090);


	db.connect(function(err){
		if (err) console.log(err)
	})


	store.subscribe(
		() => io.emit('state', store.getState().toJS())
	);


	io.on('connection', function (socket) {

		socket.emit('Hello', { Msg: 'Connect Success' });


	            
		socket.on('RequestData', function(prop) {
			var notes = [];
			db.query("call SchedulerTest.GetAllClass(" + semester_id.toString() + ")" )
			.on('result', function(data){
                // Push results onto the notes array
                notes.push(data)
            })
            .on('end', function(){
                // Only emit notes after query has been completed
                socket.emit('Data', notes)
            })
	    })

		
		socket.on('my other event', function (data) {
			console.log(data);
		});
	});
}

  
import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
  	console.log("connection")

  	store.dispatch({
	  type: 'GET_CLASS_DATA'
	});

    socket.emit('state', store.getState()

    );
    socket.on('action', store.dispatch.bind(store));
  });

}
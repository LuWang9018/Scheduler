import Server from 'socket.io';

export function startServer(store) {
  const io = new Server().attach(8092);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
}

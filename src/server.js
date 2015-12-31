import Server from 'socket.io';

export default function startServer() {
    const io = new Server().attach(8090);

    store.subscribe(emitChange);
    io.on('connection', (socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });

    function emitChange() {
        io.emit('state', store.getState().toJS());
    }
}

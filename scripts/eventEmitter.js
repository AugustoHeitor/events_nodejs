const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();

myEmitter.on('nomeDoEvento', () => {
    console.log('ExemploTexto');
});

myEmitter.emit('nomeDoEvento');
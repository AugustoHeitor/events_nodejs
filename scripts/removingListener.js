const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();

function ExemploFuncao() {
    console.log('Evento recebido!');
}

myEmitter.on('removeListener', (nomeDoEvento, nomeDoOuvinte) => {
    console.log(`Ouvinte ${nomeDoOuvinte} removido do evento: ${nomeDoEvento}`);
});

myEmitter.on('nomeDoEvento', ExemploFuncao);

myEmitter.removeListener('nomeDoEvento', ExemploFuncao);
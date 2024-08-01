const EventEmitter = require('node:events');

const myEmitter = new EventEmitter();

// O método once no módulo events do Node.js é usado para registrar um ouvinte que será chamado no máximo uma vez para um evento específico. Depois que o evento é disparado, o ouvinte é removido automaticamente.

myEmitter.once('nomeDoEvento', () => {
    console.log('ExemploTexto');
});

// O método on no módulo events do Node.js é usado para registrar um ouvinte que será chamado sempre que um evento específico for emitido. Ao contrário de once, que registra um ouvinte que será chamado apenas uma vez, on registra um ouvinte que permanece ativo e será chamado cada vez que o evento for emitido.

myEmitter.on('nomeDoEvento', () => {
    console.log('ExemploTexto');
});

// O método emit do módulo events no Node.js é usado para emitir um evento específico. Quando um evento é emitido, todos os ouvintes (listeners) registrados para esse evento são chamados na ordem em que foram registrados.

myEmitter.emit('nomeDoEvento');

// O método addListener do módulo events no Node.js é uma forma alternativa de registrar ouvintes para um evento específico. Internamente, ele é um alias para o método on, então eles funcionam de maneira idêntica.

myEmitter.addListener('nomeDoEvento', () => {
    console.log('ExemploTexto');
});


// O evento newListener é um evento especial no módulo events do Node.js que é emitido sempre que um novo ouvinte é adicionado a um evento. Isso permite que você monitore a adição de ouvintes e execute ações específicas quando isso ocorrer.

// newListener é um evento especial e não uma palavra-chave reservada. Ele é um nome de evento predefinido no sistema de eventos do Node.js. Quando você adiciona um ouvinte para newListener, o Node.js automaticamente emite este evento sempre que um novo ouvinte é adicionado a qualquer outro evento no EventEmitter.

myEmitter.on('newListener', (event) => {
    console.log(`Novo ouvinte adicionado para o evento: ${event}`);
});

// O evento removeListener é outro evento especial no módulo events do Node.js. Ele é emitido sempre que um ouvinte é removido de um evento. Isso permite que você monitore a remoção de ouvintes e execute ações específicas quando isso ocorrer.

myEmitter.on('removeListener', (nomeDoEvento, nomeDoOuvinte) => {
    console.log(`Ouvinte ${nomeDoOuvinte} removido do evento: ${nomeDoEvento}`);
});

// Remove dinamicamente ouvintes de eventos, útil para liberar recursos ou mudar o comportamento da aplicação conforme necessário.

function ExemploFuncao() {
    console.log('Evento recebido!');
}

myEmitter.on('nomeDoEvento', ExemploFuncao);

myEmitter.removeListener('nomeDoEvento', ExemploFuncao);

// O evento error é outro evento especial no módulo events do Node.js. 

// Se você estiver usando EventEmitter e emitir erros, sempre defina um listener para o evento error. Isso evita que o processo do Node.js feche inesperadamente quando ocorrer um erro.

// O evento error do EventEmitter só será disparado se você explicitamente emitir o evento com myEmitter.emit('error', ...).

myEmitter.on('error', (err) => {
    console.error('Erro capturado:', err.message);
});

myEmitter.emit('error', new Error('Um erro ocorreu!'));

// O método eventNames() faz parte do módulo events e é usado para obter uma lista dos nomes dos eventos que um objeto de eventos pode emitir.

// Ele foi criado para ajudar a descobrir quais eventos foram registrados em um objeto de eventos

myEmitter.on('start', () => console.log('Started'));
myEmitter.on('stop', () => console.log('Stopped'));

console.log(myEmitter.eventNames()); // Saída [ 'start', 'stop' ]

// O método getMaxListeners() retorna o número máximo de ouvintes (listeners) que podem ser registrados para um evento específico em um objeto de eventos.

myEmitter.on('event1', () => console.log('Listener 1'));
myEmitter.on('event1', () => console.log('Listener 2'));

console.log(myEmitter.getMaxListeners()); // Saída padrão: 10

// O método listenerCount retorna o número de ouvintes (listeners) registrados para um evento específico em um objeto de eventos.

function listener1() {
    console.log('Listener 1');
}

function listener2() {
    console.log('Listener 2');
}

// Adiciona ouvintes
myEmitter.on('event1', listener1);
myEmitter.on('event1', listener2);

// Obtém a contagem de ouvintes.
console.log(myEmitter.listenerCount('event1')); // Saída: 2

// O método listeners retorna uma cópia da matriz de ouvintes (listeners) para o evento especificado em um objeto de eventos.

const listeners = myEmitter.listeners('nomeDoEvento');

console.log(listeners);

// O método remove um ouvinte específico que foi previamente registrado para um evento. É funcionalmente equivalente ao método removeListener.

myEmitter.off('nomeDoEvento', ExemploFuncao);

// O método pode ser usado como uma alternativa para adicionar um ouvinte de eventos, equivalente ao método on.

myEmitter.prependListener('nomeDoEvento', ExemploFuncao);

// O método pode ser usado como uma alternativa para adicionar um ouvinte de eventos que é chamado apenas uma vez. Este método é equivalente ao método once.

myEmitter.prependOnceListener('nomeDoEvento', ExemploFuncao);

// O método remove todos os ouvintes (listeners) registrados para o evento especificado. Se nenhum evento for especificado, ele remove todos os ouvintes de todos os eventos.

myEmitter.removeAllListeners('nomeDoEvento');

// O método setMaxListeners define o número máximo de ouvintes (listeners) permitidos para serem adicionados a um evento específico no objeto EventEmitter. O valor padrão é 10 ouvintes por evento.

myEmitter.setMaxListeners(5);

// O método rawListeners(eventName) retorna uma matriz de ouvintes (listeners) brutos para o evento especificado. Isso inclui tanto os ouvintes normais quanto os ouvintes que foram adicionados com once (que são removidos após serem executados).

function listener1() {
    console.log('Listener 1');
}

function listener2() {
    console.log('Listener 2');
}

myEmitter.on('event1', listener1);

myEmitter.once('event1', listener2);

const listeners2 = myEmitter.rawListeners('event1');

console.log(listeners2); // [ [Function: listener1], [Function (anonymous)] ]

listeners2[1](); // Executa o segundo ouvinte manualmente

myEmitter.emit('event1'); // Saída: Listener 1 Listener 2

// O método defaultMaxListeners é usado para definir o limite global de ouvintes para todas as instâncias.

const EventEmitter = require('events');

EventEmitter.defaultMaxListeners = 20;

// Utilizada para obter uma lista de ouvintes (listeners) para um evento específico em um EventEmitter. Este método é útil para depuração e análise, permitindo que você veja quais funções estão registradas para um evento.

myEmitter.on('event1', () => {
    console.log('Listener para event1');
});
myEmitter.on('event2', () => {
    console.log('Listener para event2');
});

// Obtém ouvintes para 'event1'
const listeners3 = getEventListeners(myEmitter, 'event1');

console.log('Ouvintes para event1:', listeners3);

// O método captureRejections é uma funcionalidade do módulo events no Node.js que controla como rejeições de promessas não tratadas são tratadas.

captureRejections(myEmitter, true);


// É uma propriedade no módulo events do Node.js que fornece um símbolo usado internamente pelo sistema de eventos para identificar se a captura de rejeições de promessas está habilitada.

const { captureRejectionSymbol } = require('events');

console.log('captureRejectionSymbol:', captureRejectionSymbol);
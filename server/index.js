import express from 'express';
import expressWs from 'express-ws';

import Words from './Words/index.js';
import * as constants from './constants.js';

const app = express();

const wsServer = expressWs(app);

const aWss = wsServer.getWss();

app.use(express.json());

const broadCastConnection = (ws, msg) => {
  aWss.clients.forEach(client => {
    if (client.id === msg.id) {
      client.send(`User ${msg.user} connected`);
      console.log(msg.user);
    }
  })
}

app.ws('/', (ws) => {
  let words;

  ws.on('message', (msg) => {
    msg = JSON.parse(msg);

    switch (msg.method) {
      case constants.CONNECTION_METHOD: {
        ws.id = msg.id;

        broadCastConnection(ws, msg);
        break;
      };
      case constants.TEXT_METHOD: {
        words = new Words(msg.value);
        words.doMagic();
    
        ws.send(JSON.stringify(words.words));
        break;
      }
      default: {
        ws.close();
      }
    }
  });
})

app.listen(constants.PORT, () => (
  console.log(`server is on ${constants.PORT}`)
));

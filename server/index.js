import express from 'express';
import expressWs from 'express-ws';

import Words from './Words/index.js';

const app = express();

const wsServer = expressWs(app);

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.ws('/', (ws) => {
  let words;

  ws.on('message', (msg) => {
    if (!msg) {
      ws.close();
    }

    words = new Words(msg);
    words.doMagic();

    ws.send(JSON.stringify(words.words));
  });
})

app.listen(PORT, () => console.log(`server is on ${PORT}`));

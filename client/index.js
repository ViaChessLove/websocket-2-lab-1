import {
  WS_URL,
  ENTER_KEY,
  INITIAL_LAYOUT,
} from './constants';

const app = document.querySelector('#app');

app.innerHTML = INITIAL_LAYOUT;

const socket = new WebSocket(WS_URL);

let words = [];


socket.onopen = () => {
  alert('Connected');
};

socket.onmessage = ({ data }) => {
  if (words.length !== 0) {
    app.innerHTML = INITIAL_LAYOUT;
  }

  alert(data);
  words = JSON.parse(data);

  const sortedWords = words
    .map((word) => `
      <div style="margin-top: 20px; margin-bottom: 20px">
        ${word}
        <hr />
      </div>
    `).join('');
  
  console.log(sortedWords);

  app.insertAdjacentHTML(
    'beforeend',
    `
      <div style="display: flex; flex-flow: column nowrap;">
        ${sortedWords}
      </div>  
    `
  );
}

const sendValue = ({ value }) => {
  socket.send(value);

  if (!value) {
    socket.close();
  }
}

window.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('.input');
  const button = document.querySelector('.button');

  button.addEventListener('click', () => {
    sendValue(input);
  });

  addEventListener('keydown', ({ key }) => {
    if (key === ENTER_KEY) {
      sendValue(input);
    }
  })
});

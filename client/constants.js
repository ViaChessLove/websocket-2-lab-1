const WS_URL = 'ws://localhost:5000/';
const ENTER_KEY = 'Enter';
const INITIAL_LAYOUT = `
  <div>
    <div>
      <input type="text" class="input" />
      <button class="button">
        Отправить
      </button>
    </div>
    <div class="words-sorted">
    </div>
  </div>
`;

export {
  ENTER_KEY,
  WS_URL,
  INITIAL_LAYOUT,
};

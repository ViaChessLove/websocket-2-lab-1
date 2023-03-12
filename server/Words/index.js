class Words {
  constructor(words) {
    this.words = words;
  }

  makeWords() {
    if (typeof this.words === 'string') {
      this.words = this.words
        .trim()
        .split(' ')
        .filter((word) => word !== '');
    }
  }

  sortWords() {
    if (!typeof this.words !== 'string') {
      this.words
        .sort((a, b) => a.localeCompare(b));
    }
  }

  doMagic() {
    this.makeWords();
    this.sortWords();
  }
}

export default Words;
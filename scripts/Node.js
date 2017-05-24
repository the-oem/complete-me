class Node {
  constructor(letter, children = {}) {
    this.letter = letter;
    this.children = children;
    this.isWordEnd = false;
  }
}

export default Node;

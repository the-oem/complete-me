class Node {
  constructor(letter, children = {}) {
    this.letter = letter;
    this.children = children;
    this.isWordEnd = false;
    this.selectedCount = 0;
  }
}

export default Node;

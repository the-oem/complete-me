class Node {
  constructor(name, left = null, right = null) {
    this.name = name;
    this.left = left;
    this.right = right;
    this.isCompleteWord = false;
  }
}

export default Node;

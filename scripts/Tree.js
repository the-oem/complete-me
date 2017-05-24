import Node from './Node.js';

class Tree {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  getCount() {
    // TODO Implement a true count function that looks for
    // all nodes that are EndOfWord.
    return this.count;
  }

  insert(input) {
    let arrInput = [...input.toLowerCase()];

    if (arrInput.length === 0) {
      return 'Input must be at least one character.';
    }

    let currentNode = this.root;

    arrInput.forEach(char => {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new Node(char);
      }
      currentNode = currentNode.children[char];
    })

    if (!currentNode.isWordEnd) {
      currentNode.isWordEnd = true;
      this.count++;
    }
  }

  find(input) {
    let arrInput = [...input.toLowerCase()];
    let currentNode = this.root;

    arrInput.forEach(char => {
      if (currentNode.children[char]) {
        currentNode = currentNode.children[char];
      }
    })

    return currentNode;
  }

  suggest(input) {
    let suggestions = [];
    let currentNode = this.find(input);

    return this.suggestHelper(currentNode, input, suggestions);
  }

  suggestHelper(currentNode, partialWord, suggestions) {
    if (currentNode.isWordEnd) {
      suggestions.push(partialWord);
    }

    Object.keys(currentNode.children).forEach(val => {
      let word = partialWord + val;

      this.suggestHelper(currentNode.children[val], word, suggestions);
    })
    return suggestions;
  }

  populate(dictionary) {
    // TODO validate that it's an array, and test for it
    dictionary.forEach(word => this.insert(word))
  }

}

export default Tree;

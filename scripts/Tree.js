import Node from './Node.js';

// Pseudocode
// A word gets passed to the insert method.
// The word is converted to an array of characters.
// The array is iterated...
//  - if index 0 isn't a child of the root node, make it one
//  - the child is added as

class Tree {
  constructor() {
    this.root = new Node();
    this.count = 0;
  }

  insert(input) {
    let arrInput = [...input.toLowerCase()];

    if (arrInput.length === 0) {
      return 'Input must be a word with at least one character.';
    }

    let currentNode = this.root;

    arrInput.forEach((char) => {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new Node(char);
      }
      currentNode = currentNode.children[char];
    })

    currentNode.isWordEnd = true;
    this.count++;
  }

  find(input) {
    let arrInput = [...input.toLowerCase()];
    let currentNode = this.root;

    arrInput.forEach((char) => {
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

  suggestHelper (currentNode, partialWord, suggestions) {
    if (currentNode.isWordEnd) {
      console.log(`Found end of a word, pushing ${partialWord}`);
      suggestions.push(partialWord);
    }

    Object.keys(currentNode.children).forEach((val) => {
      let word = partialWord + val;

      this.suggestHelper(currentNode.children[val], word, suggestions);
    })
    console.log(suggestions);
    return suggestions;
  }


}
export default Tree;

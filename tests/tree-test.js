import { expect } from 'chai';
import Tree from '../scripts/Tree.js';
import Node from '../scripts/Node.js';

describe('Tree : ', () => {
  let tree;

  beforeEach(() => {
    tree = new Tree();
  });

  it('should be an instance of Tree', () => {
    expect(tree).to.be.instanceOf(Tree);
  })

  it('should have a empty root node by default', () => {
    expect(tree.root).to.deep.equal(new Node());
  })

  it('should have a node as a root element', () => {
    tree.insert('r');
    expect(tree.root).to.be.instanceOf(Node);
    expect(tree.root.children['r'].letter).to.equal('r');
  })

  it('should reject an empty string', () => {
    expect(tree.insert('')).to.equal('Input must be a word with at least one character.');
  })

  it('should accept a complete word', () => {
    tree = new Tree();

    tree.insert('sam');
    let start = tree.root.children;

    expect(start['s'].letter).to.equal('s');
    expect(start['s'].children['a'].letter).to.equal('a');
    expect(start['s'].children['a'].children['m'].letter).to.equal('m');
    expect(start['s'].children['a'].children['m'].isWordEnd).to.equal(true);
  })

  it('should convert words to lowercase', () => {
    tree = new Tree();

    tree.insert('SAM');
    let start = tree.root.children;

    expect(start['s'].letter).to.equal('s');
    expect(start['s'].children['a'].letter).to.equal('a');
    expect(start['s'].children['a'].children['m'].letter).to.equal('m');
    expect(start['s'].children['a'].children['m'].isWordEnd).to.equal(true);
  })

  it('should be able to FIND a node', () => {
    tree.insert('SAMmy');
    let node = tree.find('SAM');

    expect(node.letter).to.equal('m');
  })

  it('should return nothing (root) if word isnt found', () => {
    expect(tree.find('foo')).to.equal(tree.root);
  })

  it('should suggest a set of words from the tree', () => {
    tree.insert('piza');
    tree.insert('pizza');
    tree.insert('pizzeria');

    let suggestions = tree.suggest('pizza');

    expect(suggestions).to.deep.equal(['pizza']);

    suggestions = tree.suggest('piz');

    expect(suggestions).to.be.instanceOf(Array);
    expect(suggestions.length).to.equal(3);
    expect(suggestions).to.deep.equal(['piza', 'pizza', 'pizzeria']);

  })

})

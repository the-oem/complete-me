import { expect } from 'chai';
import Tree from '../scripts/Tree.js';
import Node from '../scripts/Node.js';
import fs from 'fs';

describe('Prefix Tree : ', () => {
  const text = "/usr/share/dict/words";
  let dictionary = fs.readFileSync(text).toString().trim().split('\n')
  let tree;

  beforeEach(() => {
    tree = new Tree();
  })

  it('should be an instance of Tree', () => {
    expect(tree).to.be.instanceOf(Tree);
  })

  it('should have a empty root node by default', () => {
    expect(tree.root).to.deep.equal(new Node());
  })

  it('should have a count of zero by default', () => {
    expect(tree.count).to.equal(0);
  })

  describe('INSERT', () => {
    it('should have a node as a root element', () => {
      tree.insert('r');
      expect(tree.root).to.be.instanceOf(Node);
      expect(tree.root.children['r'].letter).to.equal('r');
    })

    it('should reject an empty string', () => {
      expect(tree.insert('')).to.equal('Input must be at least one character.');
    })

    it('should convert words to lowercase', () => {
      tree.insert('SAM');
      let start = tree.root.children;

      expect(start['s'].letter).to.equal('s');
      expect(start['s'].children['a'].letter).to.equal('a');
      expect(start['s'].children['a'].children['m'].letter).to.equal('m');
      expect(start['s'].children['a'].children['m'].isWordEnd).to.equal(true);
    })
  })

  describe('FIND', () => {
    it('should be able to FIND a node', () => {
      tree.insert('SAMmy');
      let node = tree.find('SAM');

      expect(node.letter).to.equal('m');
    })

    it('should return null if there is no matching word', () => {
      expect(tree.find('foo')).to.be.null;
    })
  })

  describe('POPULATE', () => {
    it('should return a count for the number of complete words', () => {
      tree.insert('pizza');
      tree.insert('suh');
      expect(tree.getCount()).to.equal(2);
      tree.insert('pizza');
      tree.insert('pizzeria');
      expect(tree.getCount()).to.equal(3);
    })

    it('should populate from a dictionary file', () => {
      // Was 235886, but filtering out duplicates based on capitalization.
      tree.populate(dictionary);
      expect(tree.getCount()).to.equal(234371);
    })

    it('should reject anything except an array', () => {
      let myString = 'string';

      expect(tree.populate(myString)).to.be.null;
      let myArray = ['string'];

      expect(tree.populate(myArray)).to.be.undefined;
    })
  })

  describe('SUGGEST', () => {
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

  describe('SELECT', () => {

    it('should select a word and have its selected count increase', () => {

      tree.insert('sam');
      tree.select('sam');
      expect(tree.root.children['s'].children['a'].children['m']
        .selectedCount).to.equal(1);
      tree.select('sam');
      expect(tree.root.children['s'].children['a'].children['m']
        .selectedCount).to.equal(2);
    })

    it('should sort suggestions based on frequency', () => {
      tree.insert('pizza');
      tree.insert('pizzeria');
      tree.insert('piza');

      tree.select('pizza');
      tree.select('pizza');
      tree.select('pizza');
      tree.select('pizza');
      tree.select('pizzeria');
      tree.select('pizzeria');
      tree.select('pizzeria');
      tree.select('piza');
      let suggestions = tree.suggest('piz');

      expect(suggestions.length).to.equal(3);
      expect(suggestions[0]).to.deep.equal('pizza');
      expect(suggestions[1]).to.deep.equal('pizzeria');
      expect(suggestions[2]).to.deep.equal('piza');

    })

  })

})

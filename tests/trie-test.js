import {expect} from 'chai';
import Trie from '../scripts/Trie.js';
import Node from '../scripts/Node.js';

describe('Trie : ', () => {

  it('should be an instance of Trie', () => {
    let trie = new Trie();

    expect(trie).to.be.instanceOf(Trie);
  })

  it('should have a null root by default', () => {
    let trie = new Trie();

    expect(trie.root).to.be.null;
  })

  it('should have a node as a root element', () => {
    let trie = new Trie();
    let node = new Node('r');

    trie.add(node);
    expect(trie.root).to.equal(node);
  })
})

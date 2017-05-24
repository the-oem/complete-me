import { expect } from 'chai';
import Node from '../scripts/Node.js';

describe('Node : ', () => {
  let node;

  beforeEach(() => {
    node = new Node();
  });

  it('should be an instance of Node', () => {
    expect(node).to.be.instanceOf(Node);
  });

  it('should have a letter name', () => {
    node = new Node('r');

    expect(node.letter).to.equal('r');
  });

  it('should have an empty children object by default', () => {
    expect(node.children).to.deep.equal({});
  });

  it('should not be a completed word, by default', () => {
    node = new Node();

    expect(node.isWordEnd).to.equal(false);
  });

});

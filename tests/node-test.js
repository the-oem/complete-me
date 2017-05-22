import { expect } from 'chai';
import Node from '../scripts/Node.js';

describe('Node : ', () => {

  it('should be an instance of Node', () => {
    let node = new Node();

    expect(node).to.be.instanceOf(Node);
  })

  it('should have a name', () => {
    let node = new Node('r');

    expect(node.name).to.equal('r');
  })

  it('should have a null left child node by default', () => {
    let node = new Node('r');

    expect(node.left).to.be.null;
  })

  it('should have a null right child node by default', () => {
    let node = new Node('r');

    expect(node.right).to.be.null;
  })

  it('should have a left and right child node', () => {
    let childNode1 = new Node('a');
    let childNode2 = new Node('m');
    let parentNode = new Node('s', childNode1, childNode2);

    expect(parentNode.left).to.be.instanceOf(Node);
    expect(parentNode.left).to.equal(childNode1);
    expect(parentNode.right).to.be.instanceOf(Node);
    expect(parentNode.right).to.equal(childNode2);
  })

  it('should not be a complete word, by default', () => {
    let node = new Node('r');

    expect(node.isCompleteWord).to.equal(false);
  })

})

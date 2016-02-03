/**
 * @param {GrammarGraph} grammarGraph
 * @param {string} startSymbol - a symbol in the graph from which to start
 */
function orderGrammar (grammarGraph, startSymbol) {
  var orderedGrammar = [];                                       // array of vertex symbols in order of reachability from start Symbol
  var unprocessedVertices = new Set(grammarGraph.vertices());    // set of vertices which have not been processed yet
  var vertexQueue = [];                                          // queue of vertices in line to be processed

  function enqueueVertex (vertex) {
    if (unprocessedVertices.has(vertex)) {
      vertexQueue.push(vertex);
    }
  }

  function selectFromQueue (vertex) {
    if (unprocessedVertices.has(vertex)) {
      unprocessedVertices.delete(vertex);
      orderedGrammar.push(vertex);
      grammarGraph.adj(vertex).forEach(enqueueVertex);
    }
  }

  enqueueVertex(startSymbol);
  while (vertexQueue.length > 0) {
    selectFromQueue(vertexQueue.shift());
  }

  // now, add verticies unreachable from the startSymbol
  unprocessedVertices.forEach(function (vertex) {
    orderedGrammar.push(vertex);
  });

  return orderedGrammar;
}

module.exports = orderGrammar;

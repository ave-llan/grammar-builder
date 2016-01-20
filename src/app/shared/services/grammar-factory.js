module.exports = [ '$http',
function grammarFactory ($http) {
  var grammars = {};  // dictionary of grammars
  var current;        // the currently active grammar

  function Grammar (name) {
    if (!(this instanceof Grammar)) {
      return new Grammar ();
    }
    this.grammar = {};        // the grammar defined as an object
    this.startSymbol = '';    // symbol at which to start construction
    this.orderedGrammar = []; // grammar symbols ordered by BFS from start symbol
    this.name = name;
  }

  var methods = {
    newGrammar: function (name) {
      if (name in grammars)
        throw new Error(name + ' grammar already exists.');
      grammars[name] = new Grammar(name);
    },

    /**
     * @returns {string} the name of the currently active grammar
     */
    current: function () {
      return current.name;
    },

    /**
     * @returns {string[]} the names of grammars
     */
    grammars: function () {
      return Object.keys(grammars);
    },

    setGrammar: function (name) {
      if (!(name in grammars))
        throw new Error(name + ' is not the name of a grammar');
      current = grammars[name];
    },

    setStartSymbol: function (startSymbol) {
      if (!(startSymbol in current.grammar))
        throw new Error(startSymbol + ' is not a symbol in ' + current.name);
      current.startSymbol = startSymbol;
    }

  };

  return methods;
}];

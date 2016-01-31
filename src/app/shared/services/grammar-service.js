module.exports = [ '$http',
function grammarService () {
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
      if (!current) current = grammars[name];
    },

    /**
     * @returns {string} the name of the currently active grammar
     */
    current: function () {
      return current;
    },

    setGrammar: function (name) {
      if (!(name in grammars))
        throw new Error(name + ' is not the name of a grammar');
      current = grammars[name];
    },

    /**
     * @returns {string[]} the names of grammars
     */
    getGrammars: function (cb) {
      return cb(null, Object.keys(grammars));
    },
    setStartSymbol: function (startSymbol) {
      if (!(startSymbol in current.grammar))
        throw new Error(startSymbol + ' is not a symbol in ' + current.name);
      current.startSymbol = startSymbol;
    }

  };

  return methods;
}];

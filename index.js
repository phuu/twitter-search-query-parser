const types = {
  Value: {
    reduce: function () {
      return this.value.reduce();
    }
  },
  Values: {
    reduce: function () {
      return this.elements.map(elem => types.Value.reduce.call(elem));
    }
  },
  Or: {
    reduce: function () {
      return [
        'OR',
        [this.orable.reduce()].concat(
          this.or_groups.reduce()
        )
      ];
    }
  },
  Including: {
    reduce: function () {
      return [
        'INCLUDING',
        this.text
      ];
    }
  },
  Excluding: {
    reduce: function () {
      return [
        'EXCLUDING',
        this.word.text
      ];
    }
  },
  KV: {
    reduce: function () {
      return [
        this.k.text.toUpperCase(),
        this.v.text
      ];
    }
  },
  List: {
    reduce: function () {
      return [
        'LIST',
        this.list_name.screen_name.text,
        this.list_name.list_slug.text
      ];
    }
  },
  IsQuestion: {
    reduce: function () {
      return [
        'QUESTION',
        true
      ];
    }
  }
};

export function parse(query) {
  return require('./query').parse(query, { types });
}
export function reduce(tree) {
  return tree.reduce();
}

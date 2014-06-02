var parse = function (serialized) {
  if (serialized === undefined || serialized === 'undefined')
    return undefined;
  return EJSON.parse(serialized);
};

stringify = function (value) {
  if (value === undefined)
    return 'undefined';
  return EJSON.stringify(value);
};

/**
 * A reactive value class with get() and set() methods.
 *
 * Calling get() returns the current value and tracks a dependency. The
 * dependency is changed() if the value changes by calling the set(value)
 * function.
 *
 */
ReactiveValue = function (value) {
  this._value = value;
  this._dep = new Deps.Dependency;
};

ReactiveValue.prototype = {
  constructor: ReactiveValue,

  /**
   * Return the current value and track a dependency.
   *
   */
  get: function () {
    this._dep.depend();
    return this._value;
  },

  /**
   * Set a new value and change the dependency if the new value is different
   * from the old value.
   */
  set: function (value) {
    if (!EJSON.equals(value, this._value)) {
      this._value = value;
      this._dep.changed();
    }
  },

  /**
   * Get a json representation of our value.
   */
  toJSON: function () {
    return stringify(this._value);
  }
};

/**
 * Create a new ReactiveValue from a json value.
 */
ReactiveValue.fromJSON = function (json) {
  return new ReactiveValue(parse(json));
};

/**
 * A ReactiveResult takes a value function as input and lets you get the result
 * of the value function by calling a get() method. Calling get() always gives
 * you the most current result. But an internal computation will also rerun and
 * invalidate any outer computations if the value function reruns and the result
 * changes. Of course, the value function won't rerun if it doesn't use any
 * reactive data sources.
 *
 */
ReactiveResult = function (valueFunc, thisArg) {
  // track dependencies on the value
  this._dep = new Deps.Dependency;

  // the last result assigned in the inner computation
  this._lastResult = null;

  // we can call the value function with a thisArg binding
  this._thisArg = thisArg;

  // store away the value function so we can call it later
  this._valueFunc = valueFunc;
};

ReactiveResult.prototype = {
  constructor: ReactiveResult,

  /**
   * Returns the result of calling the value function.
   *
   * This function always gives you the most current result without requiring a
   * flush cycle. It also adds a dependency if called inside a computation,
   * and returns the value function's value by calling the _compute method which
   * will set up the internal computation if it hasn't been set up yet.
   *
   */
  get: function (thisArg) {
    this._dep.depend();
    return this._compute(thisArg);
  },

  /**
   * Stop the internal computation if needed.
   *
   */
  stop: function () {
    if (this._computation)
      this._computation.stop();
  },

  /**
   * Sets up the internal computation and returns the most current value.
   *
   * This function calls the value function, returning its result. But it also
   * sets up an internal computation so that the value function is run inside of
   * a computation and can rerun if necessary. When this inner computation
   * reruns, if the new value is different from the old value, we'll invalidate
   * any outer computations by calling the changed method of this._dep.
   *
   */
  _compute: function (thisArg) {
    var self = this;
    var value;

    thisArg = thisArg || this._thisArg;

    // break any link to parent computations which could stop this one.
    Deps.nonreactive(function () {

      // only set up the internal computation once
      if (!self._computation || self._computation.stopped) {
        self._computation = Deps.autorun(function (c) {

          // get the new value
          value = self._valueFunc.call(thisArg);

          // if it's different from the last value and this isn't the first time
          // the computation is running, invalidate the outer computations.
          if (!EJSON.equals(value, self._lastResult)) {
            self._lastResult = value;

            if (!c.firstRun)
              self._dep.changed();
          }
        });
      } else {
        // if our internal computation is already set up, it must mean the
        // caller just wants the latest value without waiting for a flush cycle,
        // so go ahead and give it to them. We call the value function here
        // isntead of just returning a cached value so that we're guaranteed to
        // have the most current value.
        value = self._valueFunc.call(thisArg);
      }
    });

    // value and self._lastResult are potentially different for up to 1
    // flush cycle. This is because if someone calls this function we want to
    // give them the most current value without them having to wait for a
    // flush cycle for the value to become current. But, we need an old value to
    // compare to in order to decide whether to call changed() on our dep. So
    // that's what we use self._lastResult for.
    return value;
  }
};

/**
 * Returns a new function wrapped in a ReactiveResult.
 *
 * When you call the returned function, we call the get() method on the
 * ReactiveResult object, bound to the proper thisArg. Adds a stop method to the
 * returned function so we can stop the ReactiveResult when we want.
 *
 */
Deps.result = function (func, opts) {
  var value = new ReactiveResult(func);

  opts = _.defaults(opts || {}, {});

  var retFunc = function () {
    return value.get(opts.thisArg || this);
  };

  retFunc.stop = function () {
    value.stop();
  };

  return retFunc;
};

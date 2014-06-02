deps-ext
=======================

Extensions to the deps package and reactive data structures used by the
iron-router package.

### History
**Latest Version: 0.2.0**

### Install
mrt add deps-ext

### ReactiveResult
A ReactiveResult takes a value function as input and lets you get the result
of the value function by calling a get() method. Calling get() always gives
you the most current result. But an internal computation will also rerun and
invalidate any outer computations if the value function reruns and the result
changes. Of course, the value function won't rerun if it doesn't use any
reactive data sources.

```javascript
var result = new ReactiveResult(function () {
  return Items.findOne({_id: id});
});

Deps.autorun(function () {
 value = result.get();
});

// Call stop() when we're done with the ReactiveResult
// to stop the inner computation from running.
result.stop();
```

### Deps.result
Returns a new function wrapped in a ReactiveResult. When you call the returned
function, we call the get() method on the ReactiveResult object, bound to the
proper thisArg. Adds a stop method to the returned function so we can stop the
ReactiveResult when we want.

```javascript
var func = Deps.result(function () {
  return Items.findOne({_id: id});
});

// Call stop() when we're done with the function result.
func.stop();
```

### ReactiveValue
A reactive value class with get() and set() methods. Calling get() returns the
current value and tracks a dependency. The dependency is changed() if the value
changes by calling the set(value) function.

```javascript
  var value = new ReactiveValue(true);
  
  Deps.autorun(function () {
    console.log(value.get());
  });
  
  value.set(false);
  
  // prints the following to the console:
  // => true
  // => false
  
```

### Native Extensions

#### Function.prototype.reactive
A convenience method for wrapping a regular function, making it a reactive
function that uses ReactiveResult. Also adds a stop() method to the returned
function so that you can stop the ReactiveResult.

```javascript
var MyObject = {
  subs: [],
  ready: function () {
    return _.all(this.subs, function (sub) { return sub.ready(); });
  }.reactive()
};
```

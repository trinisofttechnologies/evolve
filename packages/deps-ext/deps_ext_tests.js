Tinytest.add('ReactiveResult', function (test) {
  var thisArg = {};
  var dep = new Deps.Dependency;
  var currentValue = 1;
  var resultValue;
  var actualThisArg;
  var runs = 0;

  var result = new ReactiveResult(function () {
    dep.depend();
    actualThisArg = this;
    return currentValue;
  }, thisArg);

  Deps.autorun(function (c) {
    runs++;
    resultValue = result.get();
  });

  test.equal(resultValue, 1, "get() should return the initial value");

  currentValue = 2;
  test.equal(result.get(), 2, "get() shouldn't require a flush for current value");

  dep.changed();
  Deps.flush();
  test.equal(runs, 2, "outer computation should have run twice by now");
  test.equal(resultValue, 2, "outer computation should be invalidated if inner function runs again and the result is different");

  test.equal(actualThisArg, thisArg, "thisArg not set from constructor");

  var newThisArg = {};
  result.get(newThisArg);
  test.equal(actualThisArg, newThisArg, "thisArg not settable from get(thisArg)");

  result.stop();
  test.isTrue(result._computation.stopped, "stop() should stop the inner computation");
});

Tinytest.add('Deps.result', function (test) {
  var dep = new Deps.Dependency;
  var currentValue = 1;
  var currentResult; 
  var runs = 0;

  var valueFunc = function () {
    dep.depend();
    return currentValue;
  };

  var func = Deps.result(valueFunc);

  Deps.autorun(function (c) {
    runs++;
    currentResult = func();
  });

  test.equal(currentResult, 1, "function should return initial result");
  
  currentValue = 2;
  test.equal(func(), 2, "calling the function should always return the current value");

  dep.changed();
  Deps.flush();
  test.equal(runs, 2, "outer computation should have run twice by now");
  test.equal(currentResult, 2, "outer computation should be invalidated if inner function runs again and the result is different");

  func.stop();
  dep.changed();
  test.equal(runs, 2, "stopped result function should not run the value function anymore");
});

Tinytest.add('Function.prototype.reactive', function (test) {
  var dep = new Deps.Dependency;
  var currentValue = 1;
  var currentResult; 
  var runs = 0;

  var func = function () {
    dep.depend();
    return currentValue;
  }.reactive();

  Deps.autorun(function (c) {
    runs++;
    currentResult = func();
  });

  test.equal(currentResult, 1, "function should return initial result");
  
  currentValue = 2;
  test.equal(func(), 2, "calling the function should always return the current value");

  dep.changed();
  Deps.flush();
  test.equal(runs, 2, "outer computation should have run twice by now");
  test.equal(currentResult, 2, "outer computation should be invalidated if inner function runs again and the result is different");

  func.stop();
  dep.changed();
  test.equal(runs, 2, "stopped result function should not run the value function anymore");
});

Tinytest.add('ReactiveValue', function (test) {
  var currentValue;
  var value = new ReactiveValue(true);
  var runs = 0;

  Deps.autorun(function (c) {
    runs++;
    currentValue = value.get();
  });

  test.isTrue(currentValue, "initial value is not correct");
  value.set(false);
  test.isFalse(value.get(), "new value is not set");

  Deps.flush();
  test.equal(runs, 2, "computation not rerun");
  test.isFalse(currentValue, "new value not set in computation");
});

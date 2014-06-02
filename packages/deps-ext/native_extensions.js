/**
 * A convenience method for wrapping a regular function, making it a reactive
 * function that uses ReactiveResult. Also adds a stop() method to the returned
 * function so that you can stop the ReactiveResult.
 *
 * Example:
 *
 *   var subs = {
 *     _subs: [... objects which have a reactive ready() method ... ],
 *
 *     ready: function () {
 *      // thisArg is the subs object
 *      return _.all(this._subs, function (sub) { return sub.ready(); });
 *     }.reactive()
 *   };
 *
 *   Deps.autorun(function () {
 *     if (subs.ready()) {
 *       console.log("all subs are ready");
 *     } else {
 *       console.log("all subs are not ready");
 *     }
 *   });
 *
 */

if (typeof Function.prototype.reactive !== 'undefined') {
  if (console && console.warn) {
    console.warn('"reactive" already existed on Function.prototype but deps-ext is going to override it!');
  }
}

Function.prototype.reactive = function (opts) {
  // "this" is the function this method was called on.
  return Deps.result(this, opts);
};

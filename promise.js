function Promise(onsuccess, onfail, successes, fails) {

  if (!successes) successes = [];
  if (!fails)     fails = [];

  if (onsuccess)  successes.push(onsuccess);
  if (onfail)     fails.push(onfail);

  function staticPromise() {
    return Promise(false, false, successes, fails);
  }

  function resolve(context) {

    if (!successes.length) {
      return staticPromise();
    }

    successes.shift().apply(context, Array.prototype.slice.call(arguments).slice(1));
    return staticPromise().resolve();

  }

  function reject(context) {

    if (!fails.length) {
      return staticPromise();
    }

    fails.shift().apply(context, Array.prototype.slice.call(arguments).slice(1));
    return staticPromise().reject();
  }

  function success(fn) {
    return Promise(fn, false, successes, fails);
  }

  function fail(fn) {
    return Promise(false, fn, successes, fails);
  }

  function then(fn) {
    return Promise(fn, fn, successes, fails);
  }

  return {
    then    : success,
    success : success,
    fail    : fail,
    resolve : resolve,
    reject  : reject
  };

}

function When(promises, deferred) {

  if (!deferred) deferred = Promise();
  if (!promises) promises = [];

  if (promises.length > 0) {
    promises.shift().success(function () {
      When(promises, deferred);
    }).fail(function () {
      deferred.reject();
    });
  } else {
    deferred.resolve();
  }

  return deferred;
}

function when() {
  return When(Array.prototype.slice.call(arguments));
}

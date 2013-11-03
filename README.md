puremise.js
===========

Yet another purely functional Promise Monad implementation

## Examples

```javascript
x = Promise(function () {
  console.log("x resolved");
})

x.success(function () {
  console.log("x resolved again..");
});

x.success(function () {
  console.log("x resolved again and again..");
});

y = Promise().success(function () {
  console.log("y resolved");
});

y.fail(function () {
  console.log("y rejected");
});

When([x, y]).success(function () {
  console.log("x and y all resolved");
});
```

Resolve the promises:

```javascript
x.resolve(); //=> "x resolved", "x resolved again..", "x resolved again and again.."

y.resolve(); //=> "y resolved", "x and y all resolved"
```

And it can be rejected, too:

```javascript
When([x, y]).success(function () {
  console.log("x and y all resolved");
}).fail(function () {
  console.log("something rejected!");
});

y.reject(); //=> "something rejected!"
```

## License
MIT License

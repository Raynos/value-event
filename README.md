# value-event

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Create DOM event handlers that write to sinks

## Example (event)

```html
<div id='foo'>
  <div class='name'>Bob Steve</div>
  <input class='name' value='Bob Steve'></input>
</div>
```

```js
var event = require('value-event/event')
var sink = {
  write: function (data) {
    console.log('data', data)
  }
}

var elem = document.getElementById('foo')
elem.querySelector('div.name')
  .addEventListener('click', event(sink, {
    clicked: true
  }))
elem.querySelector('input.name')
  .addEventListener('keypress', event(sink, {
    changed: true
  }))
```

## Installation

`npm install value-event`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/value-event.png
  [2]: https://travis-ci.org/Raynos/value-event
  [3]: https://badge.fury.io/js/value-event.png
  [4]: https://badge.fury.io/js/value-event
  [5]: https://coveralls.io/repos/Raynos/value-event/badge.png
  [6]: https://coveralls.io/r/Raynos/value-event
  [7]: https://gemnasium.com/Raynos/value-event.png
  [8]: https://gemnasium.com/Raynos/value-event
  [9]: https://david-dm.org/Raynos/value-event.png
  [10]: https://david-dm.org/Raynos/value-event
  [11]: https://ci.testling.com/Raynos/value-event.png
  [12]: https://ci.testling.com/Raynos/value-event

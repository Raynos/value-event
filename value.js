var extend = require('xtend')
var getFormData = require('form-data-set/element')

module.exports = ValueEventHandler

function ValueEventHandler(sink, data) {
    if (!(this instanceof ValueEventHandler)) {
        return new ValueEventHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.id = sink.id

    if (this.data && typeof this.data === 'object' &&
        'preventDefault' in this.data
    ) {
        this.preventDefault = this.data.preventDefault;
        delete this.data.preventDefault;
    } else {
        this.preventDefault = true;
    }
}

ValueEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    if (ev.type === 'submit') {
        ev.preventDefault();
    }

    if (typeof this.sink === 'function') {
        this.sink(data)
    } else {
        this.sink.write(data)
    }

    if (this.preventDefault && ev.preventDefault) {
        ev.preventDefault()
    }
}

var extend = require('xtend')

var getFormData = require('./lib/get-form-data.js')

module.exports = ValueEventHandler

function ValueEventHandler(sink, data) {
    if (!(this instanceof ValueEventHandler)) {
        return new ValueEventHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.id = sink.id
}

ValueEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var value = getFormData(ev.currentTarget)
    var data = extend(this.data, { currentValue: value })

    if (typeof this.sink === 'function') {
        this.sink(data)
    } else {
        this.sink.write(data)
    }
}

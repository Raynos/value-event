var extend = require('xtend')

var getFormData = require('./lib/get-form-data.js')

module.exports = ValueSinkHandler

function ValueSinkHandler(sink, data) {
    if (!(this instanceof ValueSinkHandler)) {
        return new ValueSinkHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.type = 'change'
    this.id = sink.id
}

ValueSinkHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var target = ev.target

    var isValid =
        (ev.type === 'change' && target.type === 'checkbox') ||
        (ev.type === 'keyup' && target.type === 'text')

    if (!isValid) {
        return
    }

    var value = getFormData(ev.currentTarget)
    var data = extend(this.data, { currentValue: value })
    this.sink.write(data)
}

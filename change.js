var extend = require('xtend')
var getFormData = require('form-data-set/element')

module.exports = ChangeSinkHandler

function ChangeSinkHandler(sink, data) {
    if (!(this instanceof ChangeSinkHandler)) {
        return new ChangeSinkHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.type = 'change'
    this.id = sink.id
}

ChangeSinkHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var target = ev.target

    var isValid =
        (ev.type === 'change' && target.type === 'checkbox') ||
        (ev.type === 'keyup' && target.type === 'text') ||
        (ev.type === 'change' && target.type === 'range')

    if (!isValid) {
        return
    }

    var value = getFormData(ev.currentTarget)
    var data = extend(value, this.data)

    if (typeof this.sink === 'function') {
        this.sink(data)
    } else {
        this.sink.write(data)
    }
}

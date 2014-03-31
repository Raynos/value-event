var extend = require('xtend')

var getFormData = require('./lib/get-form-data.js')

var ENTER = 13

module.exports = SubmitSinkHandler

function SubmitSinkHandler(sink, data) {
    if (!(this instanceof SubmitSinkHandler)) {
        return new SubmitSinkHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.id = sink.id
    this.type = 'submit'
}

SubmitSinkHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var target = ev.target

    var isValid =
        (ev.type === 'click' && target.tagName === 'BUTTON') ||
        (
            (target.type === 'text' || target.tagName === 'TEXTAREA') &&
            (ev.keyCode === ENTER && !ev.shiftKey && ev.type === 'keyup') &&
            (target.value.trim() !== '')
        )

    if (!isValid) {
        return
    }

    var value = getFormData(ev.currentTarget)
    var data = extend(this.data, { currentValue: value })

    if (typeof this.sink === 'function') {
        this.sink(data)
    } else {
        this.sink.write(data)
    }
}

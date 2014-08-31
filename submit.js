var extend = require('xtend')
var getFormData = require('form-data-set/element')

var setPreventDefault = require('./prevent-default.js');

var ENTER = 13

module.exports = SubmitSinkHandler

function SubmitSinkHandler(sink, data) {
    if (!(this instanceof SubmitSinkHandler)) {
        return new SubmitSinkHandler(sink, data)
    }

    this.sink = sink
    this.data = data
    this.type = 'submit'

    setPreventDefault(this, this.data)
}

SubmitSinkHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var target = ev.target

    var isValid =
        (ev.type === 'click' && target.tagName === 'BUTTON') ||
        (ev.type === 'click' && target.type === 'submit') ||
        (
            (target.type === 'text') &&
            (ev.keyCode === ENTER && ev.type === 'keydown')
        )

    // prevent forms from refreshing page
    if (ev.type === 'submit') {
        ev.preventDefault();
    }

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

    if (this.preventDefault && ev.preventDefault) {
        ev.preventDefault()
    }
}

module.exports = KeyEventHandler

function KeyEventHandler(fn, key, data) {
    if (!(this instanceof KeyEventHandler)) {
        return new KeyEventHandler(fn, key, data)
    }

    this.fn = fn
    this.data = data
    this.key = key
}

KeyEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    if (ev.keyCode === this.key) {
        this.fn(this.data)
    }
}

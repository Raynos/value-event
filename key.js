module.exports = KeyEventHandler

function KeyEventHandler(fn, key, data) {
    if (!(this instanceof KeyEventHandler)) {
        return new KeyEventHandler(fn, key, data)
    }

    this.fn = fn
    this.data = data
    this.key = key

    if (this.data && typeof this.data === 'object' &&
        'preventDefault' in this.data
    ) {
        this.preventDefault = this.data.preventDefault;
        delete this.data.preventDefault;
    } else {
        this.preventDefault = true;
    }
}

KeyEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    if (ev.keyCode === this.key) {
        this.fn(this.data)
    }

    if (this.preventDefault && ev.preventDefault) {
        ev.preventDefault()
    }
}

module.exports = SinkEventHandler

function SinkEventHandler(sink, data) {
    if (!(this instanceof SinkEventHandler)) {
        return new SinkEventHandler(sink, data)
    }

    this.sink = sink
    this.id = sink.id
    this.data = data
}

SinkEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    if (typeof this.sink === 'function') {
        this.sink(this.data)
    } else {
        this.sink.write(this.data)
    }
}

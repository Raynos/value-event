module.exports = BaseEvent

function BaseEvent(lambda) {
    return EventHandler;

    function EventHandler(fn, data, opts) {
        var handler = {
            fn: fn,
            data: data,
            opts: opts || {},
            handleEvent: handleEvent
        }

        setPreventDefault(handler, handler.opts);

        return handler;
    }

    function handleEvent(ev) {
        var value = lambda.call(this, ev)
        if (!value) {
            return
        }

        if (typeof this.fn === 'function') {
            this.fn(value)
        } else {
            this.fn.write(value)
        }

        if (this.preventDefault && ev.preventDefault) {
            ev.preventDefault()
        }
    }
}

function setPreventDefault(obj, data) {
    if (data && typeof data === 'object' &&
        'preventDefault' in data
    ) {
        obj.preventDefault = data.preventDefault;
        delete data.preventDefault;
    } else {
        obj.preventDefault = true;
    }
}

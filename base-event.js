var Delegator = require('dom-delegator')

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

        if (fn && fn.type === 'dom-delegator-handle') {
            return Delegator().transformHandle(fn, 
                handleLambda.bind(handler))
        }

        return handler;
    }

    function handleLambda(ev) {
        if (this.preventDefault && ev.preventDefault) {
            ev.preventDefault()
        }

        return lambda.call(this, ev)
    }

    function handleEvent(ev) {
        if (this.preventDefault && ev.preventDefault) {
            ev.preventDefault()
        }

        var value = lambda.call(this, ev)
        if (!value) {
            return
        }

        if (typeof this.fn === 'function') {
            this.fn(value)
        } else {
            this.fn.write(value)
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

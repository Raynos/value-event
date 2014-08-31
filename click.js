var setPreventDefault = require('./prevent-default.js');

module.exports = ClickEventHandler;

function ClickEventHandler(fn, opts, data) {
    if (!(this instanceof ClickEventHandler)) {
        return new ClickEventHandler(fn, opts, data)
    }

    this.fn = fn
    this.opts = opts || {}
    this.data = data

    setPreventDefault(this, this.opts)
}

ClickEventHandler.prototype.handleEvent = handleEvent

function handleEvent(ev) {
    var opts = this.opts;

    if (!opts.ctrl && ev.ctrlKey) {
        return;
    }

    if (!opts.meta && ev.metaKey) {
        return;
    }

    if (!opts.rightClick && ev.which === 2) {
        return;
    }

    var handler = this.fn;
    handler(this.data);

    if (this.preventDefault && ev.preventDefault) {
        ev.preventDefault();
    }
}

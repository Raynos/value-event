var Delegator = require('dom-delegator')
var document = require('global/document')
var test = require('tape')
var setImmediate = require('timers').setImmediate
var DataSet = require('data-set')

var Event = require('./lib/create-event.js')
var h = require('./lib/h.js')
var event = require('../event.js')


test('can add (function) event', function (assert) {
    var elem = h('div')
    document.body.appendChild(elem)

    var values = []
    Delegator(document.body) // listen to all the things
    var sink = function (data) {
        values.push(data)
    }
    DataSet(elem).click = event(sink, {
        some: 'data'
    })

    elem.addEventListener('click', event(sink, {
        some: 'data'
    }))

    var ev = Event('click')
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0].some, 'data')

        document.body.removeChild(elem)
        assert.end()
    })
})

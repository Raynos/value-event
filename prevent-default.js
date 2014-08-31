module.exports = setPreventDefault;

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

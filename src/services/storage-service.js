export const localStorage = {
    load,
    save
}

function load(key) {
    var val = localStorage.getItem(key)
    return JSON.parse(val)
}

function save(key, val) {
    localStorage.setItem(key, JSON.stringify(val))
}
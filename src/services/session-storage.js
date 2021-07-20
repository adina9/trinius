export const storageService = {
    load,
    save,
    clear
}

function load(key) {
    var val = sessionStorage.getItem(key)
    return JSON.parse(val)
}

function save(key, val) {
    sessionStorage.setItem(key, JSON.stringify(val))
}

function clear(){
    sessionStorage.clear()
}
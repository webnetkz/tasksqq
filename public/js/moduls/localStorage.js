export function get_json(name) {
    let tmp = localStorage.getItem(name);
    tmp = JSON.parse(tmp);
    return tmp;
}

export function set_json(name, json) {
    json = JSON.stringify(json);
    localStorage.setItem(name, json);
    return true;
}


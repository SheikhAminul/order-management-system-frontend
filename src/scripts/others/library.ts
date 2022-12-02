function getLocal(name: string) {
    return JSON.parse(localStorage[name] || '{}').value
}

function setLocal(name: string, value: any) {
    localStorage[name] = JSON.stringify({ value: value })
}

function deleteLocal(name: string) {
    localStorage.removeItem(name)
}

export { getLocal, setLocal, deleteLocal }
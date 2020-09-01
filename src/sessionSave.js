export function saveSession(state) {
    let localStorageName = [
        'courseGroups',
        'courseGroupsAvailable',
        'usingCourse',
        'timetableOptions',
        'user']
    for (let key of localStorageName) {
        localStorage.setItem(key, JSON.stringify(state[key]))
    }
    console.log('Session saved')
}

export function ezLoad(key) {
    let rawValue = localStorage.getItem(key)
    let objectValue = null
    try {
        objectValue = JSON.parse(rawValue)
    } catch (e) {
        objectValue = rawValue
    }
    return objectValue
}

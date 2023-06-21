export function getDateCurrent() {
    const date = new Date();
    let month = String(date.getMonth()+1).padStart(2, '0')
    let day = String(date.getDate()).padStart(2, '0')
    let year = String(date.getFullYear())
    
    return `${day}/${month}/${year}`
}

export function getTimeCurrent() {
    const date = new Date();
    let hour = String(date.getHours()).padStart(2, '0')
    let minute = String(date.getMinutes()).padStart(2, '0')
    let second = String(date.getSeconds())
    
    return `${hour}:${minute}:${second}`
}
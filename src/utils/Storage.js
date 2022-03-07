
export const setItems = (email, password) => {
    window.localStorage.setItem('email', email)
    window.localStorage.setItem('password', password)
}
export const getItem = (email, password) => {
    if (email !== undefined) {
        return window.localStorage.getItem(email)
    }
    if (password !== undefined) {
        return window.localStorage.getItem(password)
    }
}
export const removeItems = (email, password) => {
    if (email !== undefined) {
        return window.localStorage.removeItem(email)
    }
    if (password !== undefined) {
        return window.localStorage.removeItem(password)
    }
}

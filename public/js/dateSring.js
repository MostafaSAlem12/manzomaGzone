function getDate(date) {
    const month = date.getMonth()
    const day = date.getDate()
    const year = date.getFullYear()
    return `${day}/${month}/${year}`
}

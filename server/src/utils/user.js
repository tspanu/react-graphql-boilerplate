const isValidPassword = (password) => {
    return password.length >= 6 && !password.toLowerCase().includes('password')
}

export { getFirstName, isValidPassword }
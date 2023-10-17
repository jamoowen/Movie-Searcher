function validatePassword(password: string) {

    return true ? (password.length >= 8) : false;
}
function validateEmail(email: string) {
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
}

function confirmPassword(password: string, secondPassword: string) {
    return true ? (password === secondPassword) : false;
}

export { validatePassword, validateEmail, confirmPassword }
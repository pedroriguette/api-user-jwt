const HttpError = require("../errors/HttpErros")

function validateEmail(email) {
    const emailValidate = email.match(/\w{3,}@[a-zA-Z0-9]{3,}\.[a-zA-Z0-9]{3,}/)
    try {
        emailValidate[0]
    } catch {
        return new HttpError(404 , "The email must be xxx@xxx.xxx 1")
    }
}

module.exports = validateEmail
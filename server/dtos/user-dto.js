module.exports = class UserDto {
    fio;
    login;

    constructor(model) {
        this.fio=model.fio;
        this.login=model.login;
    }
}
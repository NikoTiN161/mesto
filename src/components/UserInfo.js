export default class UserInfo {
    constructor({ profileUsernameSelector, profileDescriptionSelector }) {
        this._usernameElement = document.querySelector(profileUsernameSelector);
        this._descriptionElement = document.querySelector(profileDescriptionSelector);
    }

    getUserInfo() {
        const user = {
            username: this._usernameElement.textContent,
            description: this._descriptionElement.textContent
        }
        return user;
    }

    setUserInfo({ username, description }) {
        this._usernameElement.textContent = username;
        this._descriptionElement.textContent = description;
    }
}
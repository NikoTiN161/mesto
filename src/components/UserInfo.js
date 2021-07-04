export default class UserInfo {
    constructor({ profileUsernameSelector, profileDescriptionSelector, profileAvatarSelector }) {
        this._usernameElement = document.querySelector(profileUsernameSelector);
        this._descriptionElement = document.querySelector(profileDescriptionSelector);
        this._avatarElement = document.querySelector(profileAvatarSelector);
    }

    getUserInfo() {
        const user = {
            name: this._usernameElement.textContent,
            about: this._descriptionElement.textContent,
            _id: this._id,
        }
        return user;
    }

    setUserInfo(data) {
        this._usernameElement.textContent = data.name;
        this._descriptionElement.textContent = data.about;
        this._avatarElement.style.backgroundImage = `url(${data.avatar})`;
        this._id = data._id;
    }
}
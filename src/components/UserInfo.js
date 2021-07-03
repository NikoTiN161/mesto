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
            avatar: this._avatarElement.src,
            _id: this._id,
        }
        return user;
    }

    setUserInfo(data) {
        this._usernameElement.textContent = data.name;
        this._descriptionElement.textContent = data.about;
        this._avatarElement.src = data.avatar;
        this._id = data._id;
    }
}
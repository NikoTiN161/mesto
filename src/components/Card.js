export default class Card {
    constructor({ data, handleCardClick, handleDeleteCard, like, removeLike }, cardSelector) {
        this._id = data._id;
        this._name = data.name;
        this._link = data.link;
        this._likes = data.likes;
        this._owner = data.owner;
        this._cardSelector = cardSelector;
        this._isLiked = data.isLiked;
        this._isCanDelete = data.isCanDelete;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._like = like;
        this._removeLike = removeLike;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content
            .querySelector('.elements__item').cloneNode(true);
        return cardElement;
    }
    _getCard() {
        return { _id: this._id, name: this._name, link: this._link, likes: this._likes, owner: this._owner };
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
            this._handleDeleteCard(this._element);
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleCardClick(this._getCard());
        });
    }

    _isLikeCard() {
        if (this._isLiked) {
            this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
        }
    }

    _canDelete() {
        if (!this._isCanDelete) {
            this._element.querySelector('.elements__delete-button').classList.add('elements__delete-button_disable');
        }
    }

    _toggleLike() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
        this._isLiked = !this._isLiked;
    }

    _handleLikeButtonClick() {
        (this._isLiked)
            ? this._removeLike(this._element)
            : this._like(this._element);
        this._toggleLike();
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = `фотография: ${this._name}`;
        this._element.querySelector('.elements__header').textContent = this._name;
        this._element.querySelector('.elements__counter-likes').textContent = this._likes.length;
        this._canDelete();
        this._isLikeCard();
        this._setEventListeners();
        return this._element;
    }
}


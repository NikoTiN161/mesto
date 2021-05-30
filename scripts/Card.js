import { openPopupImageHandler } from '../utils/utils.js'
export default class Card {
    constructor(data, cardSelector) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._isLiked = false;
    }

    _getTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content
            .querySelector('.elements__item').cloneNode(true);
        return cardElement;
    }
    _getCard() {
        return { name: this._name, link: this._link };
    }

    _setEventListeners() {
        this._element.querySelector('.elements__like-button').addEventListener('click', () => {
            this._handleLikeButtonClick();
        });

        this._element.querySelector('.elements__delete-button').addEventListener('click', () => {
            this._handleDeleteButtonClick();
        });

        this._element.querySelector('.elements__image').addEventListener('click', () => {
            this._handleImageButtonClick();
        });
    }

    _handleLikeButtonClick() {
        this._element.querySelector('.elements__like-button').classList.toggle('elements__like-button_liked');
        this._isLiked = !this._isLiked;
    }

    _handleDeleteButtonClick() {
        this._element.querySelector('.elements__delete-button').closest('.elements__item').remove();
    }

    _handleImageButtonClick() {
        openPopupImageHandler(this._getCard());
    }

    generateCard() {
        this._element = this._getTemplate();
        this._element.querySelector('.elements__image').src = this._link;
        this._element.querySelector('.elements__image').alt = `фотография: ${this._name}`;
        this._element.querySelector('.elements__header').textContent = this._name;
        this._setEventListeners();
        return this._element;
    }
}


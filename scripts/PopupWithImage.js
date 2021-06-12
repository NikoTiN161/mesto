import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
    }

    _getImageElement() {
        return this._popupElement.querySelector('.popup-image__image');
    }

    _getCaptionImageElement() {
        return this._popupElement.querySelector('.popup-image__caption');
    }

    open({ name, link }) {
        this._popupElement = super._getElement();
        this._image = this._getImageElement();
        this._caption = this._getCaptionImageElement();
        super.open();
        this._image.src = link;
        this._image.alt = name;
        this._caption.textContent = name;
    }

}
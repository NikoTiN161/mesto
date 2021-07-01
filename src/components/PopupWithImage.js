import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {

    _getImageElement() {
        return this._popupElement.querySelector('.popup-image__image');
    }

    _getCaptionImageElement() {
        return this._popupElement.querySelector('.popup-image__caption');
    }

    open(item) {
        super.open();
        this._image = this._getImageElement();
        this._caption = this._getCaptionImageElement();
        this._image.src = item.link;
        this._image.alt = item.name;
        this._caption.textContent = item.name;
    }
}
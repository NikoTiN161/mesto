import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector, popupImageSelector, popupCaptionSelector ) {
        super(popupSelector);
        this._image = this._popupElement.querySelector(popupImageSelector);
        this._caption = this._popupElement.querySelector(popupCaptionSelector);
    }

    open(item) {
        super.open();
        this._image.src = item.link;
        this._image.alt = item.name;
        this._caption.textContent = item.name;
    }
}
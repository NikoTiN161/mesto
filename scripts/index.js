import Card from './Card.js'
import * as Constants from '../utils/constants.js'


//добавление в список элементов
function createCards(arr, list) {
    arr.forEach((item) => {
        const card = new Card(item, '#element');
        const cardElement = card.generateCard();
        list.append(cardElement);
    });
}

function openPopup(popup) {
    popup.classList.add('overlay_opened');
    setEventListenerOnDocument('keydown', closeOpenedPopup);
}

function closePopup(popup) {
    popup.classList.remove('overlay_opened');
    removeEventListenerOnDocument('keydown', closeOpenedPopup);
}

function getOpenedPopup() {
    return document.querySelector('.overlay_opened');
}

function closeOpenedPopup(e) {
    if (e.key === 'Escape') {
        closePopup(getOpenedPopup());
    }
}

function setEventListenerOnDocument(event, nameFunction) {
    document.addEventListener(event, nameFunction);
}
function removeEventListenerOnDocument(event, nameFunction) {
    document.removeEventListener(event, nameFunction);
}

function openPopupEditProfileHandler() {
    openPopup(Constants.popupOverlayEditProfile);
    Constants.nameInput.value = Constants.profileUsername.textContent;
    Constants.jobInput.value = Constants.profileDescription.textContent;
    const buttonElement = Constants.formEditProfile.querySelector('.form__save-button');
    const listInput = [Constants.nameInput, Constants.jobInput];
    toggleButtonState(buttonElement, listInput, { Constants[inactiveButtonClass] } );
}

function openPopupAddCardHandler() {
    openPopup(Constants.popupOverlayAddCard);
}

function openPopupImageHandler(item) {
    openPopup(popupOverlayOpenImage);
    const thisImage = popupOverlayOpenImage.querySelector('.popup-image__image');
    thisImage.src = item.link;
    thisImage.alt = item.name;
    const thisCaption = popupOverlayOpenImage.querySelector('.popup-image__caption');
    thisCaption.textContent = item.name;
}

function closePopupHandler(e) {
    closePopup(e.target.closest('.overlay'));
}

function formEditProfileSubmitHandler(e) {
    e.preventDefault();
    Constants.profileUsername.textContent = Constants.nameInput.value;
    Constants.profileDescription.textContent = Constants.jobInput.value;
    closePopup(Constants.popupOverlayEditProfile);
}

function formAddCardSubmitHandler(e) {
    e.preventDefault();
    const buttonElement = Constants.formAddCard.querySelector('.form__save-button');
    const listInput = [Constants.titleInput, Constants.linkInput];
    const inactiveButtonClass = 'form__save-button_disabled';
    Constants.elementsItems.prepend(createCard({ name: Constants.titleInput.value, link: Constants.linkInput.value }));
    Constants.formAddCard.reset();
    closePopup(Constants.popupOverlayAddCard);
    toggleButtonState(buttonElement, listInput, { inactiveButtonClass });
}

createCards(Constants.initialCards, Constants.elementsItems);
Constants.profileEditButton.addEventListener('click', openPopupEditProfileHandler);
Constants.profileAddButton.addEventListener('click', openPopupAddCardHandler);

Constants.overlays.forEach((item) => {
    item.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('overlay')) {
            closePopupHandler(e);
        }
    })
})

Constants.overlayCloseButtons.forEach((item) => {
    item.addEventListener('click', closePopupHandler);
})
Constants.formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
Constants.formAddCard.addEventListener('submit', formAddCardSubmitHandler);

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
});

import {
    cardSelector,
    config, elementsItems, formAddCard, formEditProfile, initialCards, jobInput, linkInput, nameInput,
    overlayCloseButtons, overlays, popupOverlayAddCard, popupOverlayEditProfile, popupOverlayOpenImage,
    profileAddButton, profileDescription, profileEditButton, profileUsername, titleInput
} from '../utils/constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js'

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
    openPopup(popupOverlayEditProfile);
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
    formEditProfileValidator.toggleButtonState();
}

function openPopupAddCardHandler() {
    openPopup(popupOverlayAddCard);
}

export default function openPopupImageHandler(item) {
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
    profileUsername.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupOverlayEditProfile);
}

function formAddCardSubmitHandler(e) {
    e.preventDefault();
    elementsItems.prepend(new Card({ name: titleInput.value, link: linkInput.value }, cardSelector).generateCard());
    formAddCard.reset();
    closePopup(popupOverlayAddCard);
    formAddCardValidator.toggleButtonState();
}

createCards(initialCards, elementsItems);
profileEditButton.addEventListener('click', openPopupEditProfileHandler);
profileAddButton.addEventListener('click', openPopupAddCardHandler);

overlays.forEach((item) => {
    item.addEventListener('mousedown', (e) => {
        if (e.target.classList.contains('overlay')) {
            closePopupHandler(e);
        }
    })
})

overlayCloseButtons.forEach((item) => {
    item.addEventListener('click', closePopupHandler);
})
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

function createCards(arr, list) {
    arr.forEach((item) => {
        const card = new Card(item, cardSelector);
        list.append(card.generateCard());
    });
}

const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();



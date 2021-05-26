import { config, elementsItems, formAddCard, formEditProfile, initialCards, jobInput, linkInput, nameInput, overlayCloseButtons, overlays, popupOverlayAddCard, popupOverlayEditProfile, popupOverlayOpenImage, profileAddButton, profileDescription, profileEditButton, profileUsername, titleInput } from '../utils/constants.js';
import Card from './Card.js';


// const profileEditButton = document.querySelector('.profile__edit-button');
// const profileAddButton = document.querySelector('.profile__add-button');
// const overlayCloseButtons = Array.from(document.querySelectorAll('.overlay__close'));
// const profileUsername = document.querySelector('.profile__username');
// const profileDescription = document.querySelector('.profile__description');
// const formEditProfile = document.querySelector('.form_type_edit-profile');
// const formAddCard = document.querySelector('.form_type_add-card');
// const nameInput = formEditProfile.querySelector('.form__input_type_name');
// const jobInput = formEditProfile.querySelector('.form__input_type_description');
// const titleInput = formAddCard.querySelector('.form__input_type_title');
// const linkInput = formAddCard.querySelector('.form__input_type_link');
const inactiveButtonClass = 'form__save-button_disabled';
const cardSelector = '#element';

//добавление в список элементов
function createCards(arr, list) {
    arr.forEach((item) => {
        const card = new Card(item, cardSelector);
        list.append(card.generateCard());
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
    openPopup(popupOverlayEditProfile);
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
    const buttonElement = formEditProfile.querySelector('.form__save-button');
    const listInput = [nameInput, jobInput];
    toggleButtonState(buttonElement, listInput, { inactiveButtonClass } );
}

function openPopupAddCardHandler() {
    openPopup(popupOverlayAddCard);
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
    profileUsername.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(popupOverlayEditProfile);
}

function formAddCardSubmitHandler(e) {
    e.preventDefault();
    const buttonElement = formAddCard.querySelector('.form__save-button');
    const listInput = [titleInput, linkInput];
    const inactiveButtonClass = 'form__save-button_disabled';
    elementsItems.prepend(new Card({ name: titleInput.value, link: linkInput.value }, cardSelector).generateCard());
    formAddCard.reset();
    closePopup(popupOverlayAddCard);
    toggleButtonState(buttonElement, listInput, { inactiveButtonClass });
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

enableValidation(config);

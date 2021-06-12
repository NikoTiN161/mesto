import {
    cardSelector,
    config, elementsItems, formAddCard, formEditProfile, initialCards, jobInput, linkInput, nameInput,
    overlayCloseButtons, overlays, popupOverlayAddCard, popupOverlayEditProfile, popupOverlayOpenImage,
    profileAddButton, profileDescription, profileEditButton, profileUsername, titleInput, cardListSelector
} from '../utils/constants.js';
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import { openPopup, closePopup } from '../utils/utils.js';

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card(item, cardSelector);
        cardList.addItem(card.generateCard(), true);
    }
}, cardListSelector);

cardList.renderItems();

function openPopupEditProfileHandler() {
    openPopup(popupOverlayEditProfile);
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
    formEditProfileValidator.toggleButtonState();
}

function openPopupAddCardHandler() {
    openPopup(popupOverlayAddCard);
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
    cardList.addItem(new Card({ name: titleInput.value, link: linkInput.value }, cardSelector).generateCard());
    formAddCard.reset();
    closePopup(popupOverlayAddCard);
    formAddCardValidator.toggleButtonState();
}

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

const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();


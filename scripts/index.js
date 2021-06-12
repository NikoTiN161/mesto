import {
    cardSelector,
    config, formAddCard, formEditProfile, initialCards, jobInput, linkInput, nameInput,
    popupOverlayAddCard, popupOverlayEditProfile, popupWithImageSelector,
    profileAddButton, profileDescription, profileEditButton, profileUsername, titleInput, cardListSelector
} from '../utils/constants.js';
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick: ({name, link}) => {
                const popupWithImage = new PopupWithImage(popupWithImageSelector);
                popupWithImage.open({name, link});
                popupWithImage.setEventListeners();
            }}, cardSelector);
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

formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler);

const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();


import {
    cardSelector,
    config, initialCards, popupWithImageSelector, formAddCard, formEditProfile,
    profileAddButton, profileDescription, profileEditButton, profileUsername, cardListSelector, popupAddCardSelector, popupEditProfileSelector,
    profileUsernameSelector, profileDescriptionSelector
} from '../utils/constants.js';
import Card from './Card.js';
import Section from './Section.js';
import FormValidator from './FormValidator.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        const card = new Card({
            data: item,
            handleCardClick}, cardSelector);
        cardList.addItem(card.generateCard(), true);
    }
}, cardListSelector);


function handleCardClick({name, link}) {
    const popupWithImage = new PopupWithImage(popupWithImageSelector);
    popupWithImage.open({name, link});
    popupWithImage.setEventListeners();
}

function openPopupEditProfileHandler() {
    popupEditProfile.open();
    popupEditProfile.setInputValue(userInfo.getUserInfo());
    formEditProfileValidator.toggleButtonState();
}

function openPopupAddCardHandler() {
    popupAddCard.open();
}

function formEditProfileSubmitHandler(e, values) {
    e.preventDefault();
    userInfo.setUserInfo(values);
    popupEditProfile.close();
}

function formAddCardSubmitHandler(e, values) {
    e.preventDefault();
    cardList.addItem(new Card({ data : values, handleCardClick }, cardSelector).generateCard());
    popupAddCard.close();
    formAddCardValidator.toggleButtonState();
}

profileEditButton.addEventListener('click', openPopupEditProfileHandler);
profileAddButton.addEventListener('click', openPopupAddCardHandler);

cardList.renderItems();

const userInfo = new UserInfo({ profileUsernameSelector, profileDescriptionSelector });

const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, formEditProfileSubmitHandler);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm(popupAddCardSelector, formAddCardSubmitHandler);
popupAddCard.setEventListeners();
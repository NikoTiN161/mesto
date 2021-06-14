import './index.css'
import {
    config,
    initialCards,
    formAddCard,
    formEditProfile,
    profileAddButton,
    profileEditButton,
    cardSelector,
    cardListSelector,
    popupAddCardSelector,
    popupEditProfileSelector,
    popupWithImageSelector,
    profileUsernameSelector,
    profileDescriptionSelector
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const cardList = new Section({
    data: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item).generateCard(), true);
    }
}, cardListSelector);

function createCard(data) {
    return new Card({ data, handleCardClick }, cardSelector);
}

function handleCardClick(item) {
    popupWithImage.open(item);
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
    cardList.addItem(createCard(values).generateCard());
    popupAddCard.close();
    formAddCardValidator.toggleButtonState();
}

profileEditButton.addEventListener('click', openPopupEditProfileHandler);
profileAddButton.addEventListener('click', openPopupAddCardHandler);

cardList.renderItems();

const userInfo = new UserInfo({ profileUsernameSelector, profileDescriptionSelector });
const popupWithImage = new PopupWithImage(popupWithImageSelector);

const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, formEditProfileSubmitHandler);
popupEditProfile.setEventListeners();
const popupAddCard = new PopupWithForm(popupAddCardSelector, formAddCardSubmitHandler);
popupAddCard.setEventListeners();
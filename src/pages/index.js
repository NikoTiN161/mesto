import './index.css'
import {
    config,
    formAddCard,
    formEditProfile,
    formUpdateAvatarProfile,
    profileAddButton,
    profileEditButton,
    cardSelector,
    cardListSelector,
    popupAddCardSelector,
    popupEditProfileSelector,
    popupWithImageSelector,
    profileUsernameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
    options,
    popupUpdateAvatarSelector,
    profileAvatarButton,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let cardList;

const api = new Api(options);

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([user, cards]) => {
        userInfo.setUserInfo(user);

        cardList = new Section({
            data: cards,
            renderer: (card) => {
                card.isLiked = card.likes.some(item => item._id === user._id);
                card.isCanDelete = card.owner._id === user._id;
                cardList.addItem(createCard(card).generateCard(), true);
            }
        }, cardListSelector);

        cardList.renderItems();
    });



function createCard(data) {
    return new Card({ data, handleCardClick }, cardSelector);
}

function handleCardClick(item) {
    popupWithImage.open(item);
}

function openPopupEditProfileHandler() {
    popupEditProfile.open();
    popupEditProfile.setInputValue(userInfo.getUserInfo());
    formEditProfileValidator.toggleButtonState();
}

function openPopupAddCardHandler() {
    popupAddCard.open();
}
function openPopupUpdateAvatarHandler() {
    popupUpdateAvatar.open();
}

function formEditProfileSubmitHandler(e, values) {
    e.preventDefault();
    api.updateUserInfo(values)
        .then(user => {
            userInfo.setUserInfo(user);
        })
    popupEditProfile.close();
}

function formUpdateAvatarSubmitHandler(e, value) {
    e.preventDefault();
    api.updateUserAvatar(value)
        .then(user => {
            console.log(user);
        userInfo.setUserInfo(user);
    });
    popupUpdateAvatar.close();
}

function formAddCardSubmitHandler(e, values) {
    e.preventDefault();
    cardList.addItem(createCard(values).generateCard());
    popupAddCard.close();
    formAddCardValidator.toggleButtonState();
}

profileEditButton.addEventListener('click', openPopupEditProfileHandler);
profileAddButton.addEventListener('click', openPopupAddCardHandler);
profileAvatarButton.addEventListener('click', openPopupUpdateAvatarHandler);



const userInfo = new UserInfo({ profileUsernameSelector, profileDescriptionSelector, profileAvatarSelector });


const popupWithImage = new PopupWithImage(popupWithImageSelector);
popupWithImage.setEventListeners();

const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

const formUpdateAvatarProfileValidator = new FormValidator(config, formUpdateAvatarProfile);
formUpdateAvatarProfileValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, formEditProfileSubmitHandler);
popupEditProfile.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, formUpdateAvatarSubmitHandler);
popupUpdateAvatar.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, formAddCardSubmitHandler);
popupAddCard.setEventListeners();
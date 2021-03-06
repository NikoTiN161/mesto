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
    formInputSelector, 
    formSelector,
    popupAddCardSelector,
    popupEditProfileSelector,
    popupWithImageSelector,
    profileUsernameSelector,
    profileDescriptionSelector,
    profileAvatarSelector,
    popupImageSelector,
    popupCaptionSelector,
    options,
    popupUpdateAvatarSelector,
    profileAvatarButton,
    popupConfirmSelector,
} from '../utils/constants.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupConfirm from '../components/PopupConfirm.js';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

let cardList;
const userInfo = new UserInfo({ profileUsernameSelector, profileDescriptionSelector, profileAvatarSelector });
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
    })
    .catch(err => console.error(err));

function createCard(data) {
    return new Card({
        data,
        handleCardClick,
        handleDeleteCard: (element) => {
            popupConfirm.open();
            popupConfirm.setConfirmHandler(() => {
                popupConfirm.handleLoading(true);
                api.deleteCard(data._id)
                    .then(res => {
                        if (res.message === '???????? ????????????') {
                            popupConfirm.close();
                            popupConfirm.handleLoading(false);
                            element.remove();
                        }
                    })
                    .catch(err => console.error(err))
            });
        },
        like: (counter) => {
            api.likeCard(data._id)
                .then(card => {
                    updateLikesCounter(counter, card.likes);
                }).catch(err => console.error(err));
        },
        removeLike: (counter) => {
            api.removeLikeCard(data._id)
                .then(card => {
                    updateLikesCounter(counter, card.likes);
                }).catch(err => console.error(err));
        },
    }, cardSelector);
}

function handleCardClick(item) {
    popupWithImage.open(item);
}

function updateLikesCounter(counter, likes) {
    counter.textContent = likes.length;
}

function openPopupEditProfileHandler() {
    popupEditProfile.open();
    popupEditProfile.setInputValue(userInfo.getUserInfo());
    formEditProfileValidator.resetValidation();
}

function openPopupAddCardHandler() {
    popupAddCard.open();
    formAddCardValidator.resetValidation();
}
function openPopupUpdateAvatarHandler() {
    popupUpdateAvatar.open();
    formEditProfileValidator.resetValidation();
}

function formEditProfileSubmitHandler(e, values) {
    e.preventDefault();
    popupEditProfile.handleLoading(true);
    api.updateUserInfo(values)
        .then(user => {
            userInfo.setUserInfo(user);
            popupEditProfile.handleLoading(false);
            popupEditProfile.close();
        })
        .catch(err => console.error(err))
}

function formUpdateAvatarSubmitHandler(e, value) {
    e.preventDefault();
    popupUpdateAvatar.handleLoading(true);
    api.updateUserAvatar(value)
        .then(user => {
            userInfo.setUserInfo(user);
            popupUpdateAvatar.handleLoading(false);
            popupUpdateAvatar.close();
        })
        .catch(err => console.error(err))
}

function formAddCardSubmitHandler(e, values) {
    e.preventDefault();
    popupAddCard.handleLoading(true);
    api.addNewCard(values)
        .then(card => {
            card.isCanDelete = card.owner._id === userInfo._id;
            cardList.addItem(createCard(card).generateCard());
            popupAddCard.handleLoading(false);
            popupAddCard.close();
        })
        .catch(err => console.error(err))
}

profileEditButton.addEventListener('click', openPopupEditProfileHandler);
profileAddButton.addEventListener('click', openPopupAddCardHandler);
profileAvatarButton.addEventListener('click', openPopupUpdateAvatarHandler);


const popupWithImage = new PopupWithImage(popupWithImageSelector, popupImageSelector, popupCaptionSelector);
popupWithImage.setEventListeners();
const popupConfirm = new PopupConfirm(popupConfirmSelector);
popupConfirm.setEventListeners();

const formAddCardValidator = new FormValidator(config, formAddCard);
formAddCardValidator.enableValidation();

const formUpdateAvatarProfileValidator = new FormValidator(config, formUpdateAvatarProfile);
formUpdateAvatarProfileValidator.enableValidation();

const formEditProfileValidator = new FormValidator(config, formEditProfile);
formEditProfileValidator.enableValidation();

const popupEditProfile = new PopupWithForm(popupEditProfileSelector, formSelector, formInputSelector, formEditProfileSubmitHandler);
popupEditProfile.setEventListeners();

const popupUpdateAvatar = new PopupWithForm(popupUpdateAvatarSelector, formSelector, formInputSelector, formUpdateAvatarSubmitHandler);
popupUpdateAvatar.setEventListeners();

const popupAddCard = new PopupWithForm(popupAddCardSelector, formSelector, formInputSelector, formAddCardSubmitHandler);
popupAddCard.setEventListeners();


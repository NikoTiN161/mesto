export const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

export const config = {
    formSelector: '.form',
    inputSelector: '.form__input',
    submitButtonSelector: '.form__save-button',
    inactiveButtonClass: 'form__save-button_disabled',
    inputErrorClass: 'form__input_type_error',
    errorClass: 'form__input-error_active'
};

export const profileEditButton = document.querySelector('.profile__edit-button');
export const profileAddButton = document.querySelector('.profile__add-button');
export const profileUsername = document.querySelector('.profile__username');
export const profileDescription = document.querySelector('.profile__description');
export const formAddCard = document.querySelector('.form_type_add-card');
export const formEditProfile = document.querySelector('.form_type_edit-profile');
// export const nameInput = formEditProfile.querySelector('.form__input_type_name');
// export const jobInput = formEditProfile.querySelector('.form__input_type_description');
// export const titleInput = formAddCard.querySelector('.form__input_type_title');
// export const linkInput = formAddCard.querySelector('.form__input_type_link');
export const popupWithImageSelector = '.overlay_type_popup-image';
export const popupEditProfileSelector = '.overlay_type_edit-profile';
export const formEditProfileSelector = '.form_type_edit-profile';
export const popupAddCardSelector = '.overlay_type_add-card';
export const formAddCardSelector = '.form_type_add-card';
export const cardSelector = '#element';
export const cardListSelector = '.elements__items';
export const formInputSelector = '.form__input';
export const formSelector = '.form';

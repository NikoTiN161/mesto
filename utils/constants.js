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

export const elementsItems = document.querySelector('.elements__items');

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
export const popupOverlayEditProfile = document.querySelector('.overlay_type_edit-profile');
export const popupOverlayAddCard = document.querySelector('.overlay_type_add-card');
export const popupOverlayOpenImage = document.querySelector('.overlay_type_popup-image');
export const overlays = Array.from(document.querySelectorAll('.overlay'));
export const overlayCloseButtons = Array.from(document.querySelectorAll('.overlay__close'));
export const profileUsername = document.querySelector('.profile__username');
export const profileDescription = document.querySelector('.profile__description');
export const formEditProfile = document.querySelector('.form_type_edit-profile');
export const formAddCard = document.querySelector('.form_type_add-card');
export const nameInput = formEditProfile.querySelector('.form__input_type_name');
export const jobInput = formEditProfile.querySelector('.form__input_type_description');
export const titleInput = formAddCard.querySelector('.form__input_type_title');
export const linkInput = formAddCard.querySelector('.form__input_type_link');
// export const inactiveButtonClass = 'form__save-button_disabled';
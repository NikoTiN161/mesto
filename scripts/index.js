const initialCards = [
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

const elementsItems = document.querySelector('.elements__items');
const elementTemplate = document.querySelector('#element').content;

const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupOverlay = document.querySelector('.overlay');
const popupTypeEditProfile = document.querySelector('.overlay__container_type_edit-profile');
const popupTypeAddCard = document.querySelector('.overlay__container_type_add-card');
const popupTypeImage = document.querySelector('.overlay__container_type_popup-image');
const overlayCloseButtons = Array.from(document.querySelectorAll('.overlay__close'));
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.form_type_edit-profile');
const formAddCard = document.querySelector('.form_type_add-card');
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_description');
const titleInput = formAddCard.querySelector('.form__input_type_title');
const linkInput = formAddCard.querySelector('.form__input_type_link');

//создание элемента
function createCard(item) {
    const element = elementTemplate.querySelector('.elements__item').cloneNode(true);
    const imageElement = element.querySelector('.elements__image');
    imageElement.src = item.link;
    imageElement.alt = `фотография: ${item.name}`;

    imageElement.addEventListener('click', function (e) {
        e.preventDefault();
        openPopupImageHandler(e);
    });

    element.querySelector('.elements__header').textContent = item.name;

    const elementLikeButton = element.querySelector('.elements__like-button');
    elementLikeButton.addEventListener('click', function (e) {
        e.preventDefault();
        e.target.classList.toggle('elements__like-button_liked');
    });

    const elementDeleteButton = element.querySelector('.elements__delete-button');
    elementDeleteButton.addEventListener('click', function deleteElementHandler(e) {
        e.preventDefault();
        const elementRemove = elementDeleteButton.closest('.elements__item');
        elementRemove.remove();
    });

    return element;
}

//добавление в список элементов
function createCards(arr, list) {
    arr.forEach((item) => {
        list.append(createCard(item));
    });
}

function toggleStateVisible(...params) {
    if (!(params.length === undefined)) {
        params.forEach((item) => {
            item.classList.toggle('overlay_opened');
        })
    }
}

function openPopupEditProfileHandler(e) {
    e.preventDefault();
    toggleStateVisible(popupOverlay, popupTypeEditProfile);
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
}

function openPopupAddCardHandler(e) {
    e.preventDefault();
    toggleStateVisible(popupOverlay, popupTypeAddCard);
}

function openPopupImageHandler(e) {
    e.preventDefault();
    toggleStateVisible(popupOverlay, popupTypeImage);
    popupOverlay.classList.toggle('overlay_darker');
    popupTypeImage.querySelector('.popup-image__image').src = e.target.src;
    popupTypeImage.querySelector('.popup-image__caption').textContent = e.target.alt.slice(12);
}

function closePopupHandler(e) {
    e.preventDefault();
    e.target.closest('.overlay').classList.remove('overlay_darker');
    toggleStateVisible(e.target.closest('.overlay'), e.target.closest('.overlay__container'));
}

function formEditProfileSubmitHandler(e) {
    e.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopupHandler(e);
}

function formAddCardSubmitHandler(e) {
    e.preventDefault();
    elementsItems.prepend(createCard({ name: titleInput.value, link: linkInput.value }));
    titleInput.value = '';
    linkInput.value = '';
    closePopupHandler(e);
}

createCards(initialCards, elementsItems);
profileEditButton.addEventListener('click', openPopupEditProfileHandler);
profileAddButton.addEventListener('click', openPopupAddCardHandler);
overlayCloseButtons.forEach((item) => {
    item.addEventListener('click', closePopupHandler);
})
formEditProfile.addEventListener('submit', formEditProfileSubmitHandler);
formAddCard.addEventListener('submit', formAddCardSubmitHandler)


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

const profileEdit = document.querySelector('.profile__edit-button');
const popupOverlay = document.querySelector('.overlay');
const closePopupButton = document.querySelector('.overlay__close');
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.form_type_edit-profile');
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_description');

function createCard(item) {
    const element = elementTemplate.querySelector('.elements__item').cloneNode(true);
    const imageElement =  element.querySelector('.elements__image');
    imageElement.src = item.link;
    imageElement.alt = `фотография: ${item.name}`;

    imageElement.addEventListener('click', function(e) {
        e.preventDefault();
        console.log(`нажали на картинку ${e.target.alt} link: ${e.target.src}`);
    });

    element.querySelector('.elements__header').textContent = item.name;

    const elementLikeButton = element.querySelector('.elements__like-button'); 
    elementLikeButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.target.classList.toggle('elements__like-button_liked');
    });

    return element;
}

function createCards(arr, list) {
    arr.forEach((item) => {
        list.append(createCard(item));
    });
}

function openPopupHandler(e) {
    e.preventDefault();
    popupOverlay.classList.toggle('overlay_opened');
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopupHandler(e) {
    e.preventDefault();
    popupOverlay.classList.toggle('overlay_opened');
}

function formSubmitHandler(e) {
    e.preventDefault();
    profileUsername.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopupHandler(e);
}

createCards(initialCards, elementsItems);
profileEdit.addEventListener('click', openPopupHandler);
closePopupButton.addEventListener('click', closePopupHandler);
formEditProfile.addEventListener('submit', formSubmitHandler);


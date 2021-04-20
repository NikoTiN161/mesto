const profileEdit = document.querySelector('.profile__edit-button');
const popupOverlay = document.querySelector('.overlay');
const closePopupButton = document.querySelector('.overlay__close');
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.form');
const nameInput = formElement.querySelector('.form__username');
const jobInput = formElement.querySelector('.form__description');


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

profileEdit.addEventListener('click', openPopupHandler);
closePopupButton.addEventListener('click', closePopupHandler);
formElement.addEventListener('submit', formSubmitHandler);
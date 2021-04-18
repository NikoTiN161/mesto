const profileEdit = document.querySelector('.profile__edit-button');
const popupOverlay = document.querySelector('.overlay');
const closePopupButton = document.querySelector('.popup__close');
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
const formElement = document.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__username'); 
const jobInput = formElement.querySelector('.popup__description'); 


function openPopup(e) {
    e.preventDefault();
    popupOverlay.classList.toggle('overlay_opened');
    nameInput.value = profileUsername.textContent;
    jobInput.value = profileDescription.textContent;
}

function closePopup(e) {
    e.preventDefault();
    popupOverlay.classList.toggle('overlay_opened');
}

function formSubmitHandler(e) {
    e.preventDefault(); 
    profileUsername.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    closePopup(e);
}

profileEdit.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);
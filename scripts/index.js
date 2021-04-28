const profileEdit = document.querySelector('.profile__edit-button');
const popupOverlay = document.querySelector('.overlay');
const closePopupButton = document.querySelector('.overlay__close');
const profileUsername = document.querySelector('.profile__username');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('.form_type_edit-profile');
const nameInput = formEditProfile.querySelector('.form__input_type_name');
const jobInput = formEditProfile.querySelector('.form__input_type_description');
const ArrayLikeButtons = Array.from(document.querySelectorAll('.elements__like-button'));


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

function likeButtonsHandler(e) {
    e.preventDefault();
    e.target.classList.toggle('elements__like-button_liked');
}

function addEventListenerButtons(arr, action = 'click', functionName) {

    arr.forEach(element => {
        element.addEventListener(action, functionName);
    });

}

addEventListenerButtons(ArrayLikeButtons, 'click', likeButtonsHandler);
profileEdit.addEventListener('click', openPopupHandler);
closePopupButton.addEventListener('click', closePopupHandler);
formEditProfile.addEventListener('submit', formSubmitHandler);


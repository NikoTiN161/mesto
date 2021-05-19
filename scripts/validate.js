function showError(formElement, inputElement, config) {
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
}

function hideError(formElement, inputElement, config) {
    const { inputErrorClass, errorClass } = config;
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
}

const enableValidation = ({ formSelector, ...restConfig }) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        setEventListeners(formElement, restConfig);
    })
};

function toggleButtonState(buttonElement, inputList, { inactiveButtonClass }) {
    if (hasInvalidInputs(inputList)) {
        buttonElement.disabled = true;
        buttonElement.classList.add(inactiveButtonClass);
    } else {
        buttonElement.disabled = false;
        buttonElement.classList.remove(inactiveButtonClass);
    }
}

function setEventListeners(formElement, config) {
    const { inputSelector, submitButtonSelector, ...restConfig } = config;
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);

    formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
            checkInputValidity(formElement, inputElement, restConfig);
            toggleButtonState(buttonElement, inputList, restConfig);
        })
    });
    toggleButtonState(buttonElement, inputList, restConfig);
};

function hasInvalidInputs(inputList) {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

function checkInputValidity(formElement, inputElement, config) {
    if (inputElement.validity.valid) {
        hideError(formElement, inputElement, config);
    } else {
        showError(formElement, inputElement, config);
    }
}
const isValid = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (inputElement.validity.patternMismatch) {
    inputElement.setCustomValidity(inputElement.dataset.errorMessage);
    } else {
        inputElement.setCustomValidity("");
    }

    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputErrorClass, errorClass);
    } else {
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    }
}; 

const showInputError = (formElement, inputElement, errorMessage, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorClass);
};

const hideInputError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(inputErrorClass);
    errorElement.classList.remove(errorClass);
    errorElement.textContent = '';
};


const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    })
};
// 
const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass)
        buttonElement.disabled = true;
    }
    else  {
        buttonElement.classList.remove(inactiveButtonClass)
        buttonElement.disabled = false;
    }
}

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector)
    // чтобы проверить состояние кнопки в самом начале
    toggleButtonState(inputList, buttonElement, inactiveButtonClass);

    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', () => {
        isValid(formElement, inputElement, inputErrorClass, errorClass);
        // чтобы проверять его при изменении любого из полей
        toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

export const enableValidation = ({formSelector, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass}) => {
    const formList = Array.from(document.querySelectorAll(formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
        evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(inputSelector));
        fieldsetList.forEach((fieldSet) => {
            setEventListeners(formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputErrorClass, errorClass);
        });
    });
};

export const clearValidation = (formElement, {inputSelector, inputErrorClass, errorClass}) => {
    const inputElementList = Array.from(formElement.querySelectorAll(inputSelector));
    inputElementList.forEach((inputElement) => {   
        hideInputError(formElement, inputElement, inputErrorClass, errorClass);
    });
}
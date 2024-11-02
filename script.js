const textFields = document.querySelectorAll('input[type="text"], textarea'); 
const inputDivs = document.querySelectorAll('.input-div');
const emailField = document.querySelector('input[type="email"]');
const radioButtons = document.querySelectorAll('input[type="radio"]'); 
const radioLabels = document.querySelectorAll('.radio-div');
const radioField = document.getElementById('radio-wrapper');
const checkbox = document.querySelector('input[type="checkbox"]');
const checkboxDiv = document.getElementById('checkbox-div')
const submitButton = document.querySelector('button');

submitButton.addEventListener('click', (e) => {
    let isAllFilled = true;
    let isEmailValid = true;
    let isRadioChecked = true; 
    let isBoxChecked = true; 

    document.querySelectorAll('.error-message').forEach(msg => msg.remove());

    textFields.forEach((textField) => {
        if (textField.value.trim() === '' && textField.closest('#input-div')) {
            textField.classList.add('error-red-border');
            textField.insertAdjacentHTML('afterend', `
                <p class="error-message">This field is required</p>
            `);
            isAllFilled = false;
        } else {
            textField.classList.remove('error-red-border');
        }
    });

    function validateEmailFormat(email) {
    	const emailPattern = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;
    	return emailPattern.test(email);
	}

    if (!validateEmailFormat(emailField.value)) {
        emailField.insertAdjacentHTML('afterend', `
            <p class="error-message">Please enter a valid email address</p>
        `);
        emailField.classList.add('error-red-border');
        isEmailValid = false;
    }

    if (!Array.from(radioButtons).some(radio => radio.checked)) {
        radioButtons[0].closest('fieldset').insertAdjacentHTML('beforeend', `
            <p class="error-message">Please select a query type</p>
        `);
        isRadioChecked = false;
    }

    if (!checkbox.checked) {
        checkbox.closest('fieldset').insertAdjacentHTML('beforeend', `
            <p class="error-message">To submit this form, please consent to being contacted</p>
        `);
        isBoxChecked = false;
    }

    if (!isAllFilled || !isEmailValid || !isRadioChecked || !isBoxChecked) {
        e.preventDefault();
    } else {
    	e.preventDefault();

    	const popupDiv = document.getElementById('popup-div');
    	popupDiv.style.top = "25px";
    	setTimeout(() => {
    		popupDiv.style.top = "-500px";
    	}, 3000);
    }
});

textFields.forEach((textField) => {
    textField.addEventListener('change', () => {
        textField.classList.remove('error-red-border');
        if (textField.nextElementSibling) {
        	textField.nextElementSibling.remove();
        }
    });
});

emailField.addEventListener('change', () => {
    emailField.classList.remove('error-red-border');
    if (emailField.nextElementSibling) {
    	emailField.nextElementSibling.remove();
    }
});

radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
        if (radioField.nextElementSibling) {
        	radioField.nextElementSibling.remove();
        }
    });
});

checkbox.addEventListener('change', () => {
    if (checkboxDiv.nextElementSibling) {
    	checkboxDiv.nextElementSibling.remove();
    }
});

inputDivs.forEach(inputDiv => {
    inputDiv.addEventListener('click', () => {       
        inputDivs.forEach(div => div.classList.remove('change-border-color'));
        inputDiv.classList.add('change-border-color');
    });
});

radioLabels.forEach(radioDiv => {
    radioDiv.addEventListener('click', () => {       
        radioLabels.forEach(div => div.classList.remove('change-background-color', 'change-border-color'));
        radioDiv.classList.add('change-background-color', 'change-border-color');
    });
});
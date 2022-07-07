import throttle from 'lodash.throttle';
import LS from './storage'

const formRef = document.querySelector('.feedback-form')

initForm()

const handleSabmit = event => {
    event.preventDefault();
    const { email, message } = event.target.elements;
    const userData = {
        email: email.value,
        message: message.value,
    }
    event.currentTarget.rest();
    localStorage.removeItem('feedback-form-state')
}

const handleInput = (event) => {
    let persistedData = localStorage.getItem('feedback-form-state')
    if (persistedData) {
        persistedData = JSON.parse(persistedData)
    } else {
        persistedData = {}
    }

    persistedData[ email] = value
    const userData = {}
    const { name, value } = event.target
    userData[name] = value
    localStorage.setItem('feedback-form-state', JSON.stringify(userData))
}

formRef.addEventListener('submit', handleSabmit)
formRef.addEventListener('input', throttle(handleInput, 1000))

function initForm() {
    let persistedData = localStorage.getItem('feedback-form-state')
    if (persistedData) {
        persistedData = JSON.parse(persistedData)

        Object.entries(persistedData).forEach(([email, value]) => {
            formRef.elements[email].value = value;
        });
    }
}



import throttle from 'lodash.throttle';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import localStore from './storage'

const formRef = document.querySelector('.feedback-form')
const STORAGE_KEY = 'feedback-form-state'

initForm()

const handleSubmit = (event) => {
    event.preventDefault();
    const { email, message } = event.target.elements;
    
    if (email.value === '' || message.value === '') {
        Notify.failure('Please fill up all fields');
        return
    } else {
        Notify.success('Thanks for your feedback');
    }
    
    const userData = {}

    const formData = new FormData(formRef);
    formData.forEach((name, value) => {
        userData[name] = value
    });

    console.log('email:', email.value);
    console.log('message:', message.value);
    
    event.currentTarget.reset();
    localStore.remove(STORAGE_KEY)
}

const handleInput = (event) => {
    const { name, value } = event.target;
    
    let persistedData = localStore.load(STORAGE_KEY);
    if (!persistedData) {
        persistedData = {}
    } 

    persistedData[name] = value;
    
    localStore.save(STORAGE_KEY, persistedData)
}

formRef.addEventListener('submit', handleSubmit)
formRef.addEventListener('input', throttle(handleInput, 500))

function initForm() {
    let persistedData = localStore.load(STORAGE_KEY)
    if (persistedData) {
        Object.entries(persistedData).forEach(([name, value]) => {
            formRef.elements[name].value = value;
        });
    }
}



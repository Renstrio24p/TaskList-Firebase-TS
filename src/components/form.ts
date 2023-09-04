import styles from '../assets/sass/modules/app.module.scss';

export default function Form(DOM: HTMLFormElement){

    DOM.innerHTML = (`
        <input 
            type='text' 
            id='new-task-input'
            placeholder='What is your next plan?'
            class='${styles['new-task-input']}'
        />
        <input
            type='submit'
            id='new-task-submit'
            value='Add Task'
            class='${styles['new-task-submit']}'
        /> 
    `)

}
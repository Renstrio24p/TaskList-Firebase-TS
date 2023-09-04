import styles from '../assets/sass/modules/app.module.scss';

export default function Main(DOM: HTMLDivElement){

    DOM.innerHTML = (`
        <section class='${styles['task-list']}'>
            <h2>Tasks</h2>
        </section>
    `)

}
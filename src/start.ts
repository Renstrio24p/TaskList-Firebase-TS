import styles from './assets/sass/modules/app.module.scss';
import Render from "./assets/render/render";
import Main_Function from "./components/functions/main.function";


export default function Start(start: HTMLElement): void {
    start.innerHTML = (`
        <header>
            <h1>Task List 2023</h1>
            <form id='new-task-form'></form>
        </header>
        <main id='main'></main>
    `)

    Render();
    Main_Function();
  }
  

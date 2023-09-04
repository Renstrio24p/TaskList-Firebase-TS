import Start from "./start";
import './assets/sass/index.scss';
import UniqueHash from "./assets/security/hashes";

const DOM = document.querySelector('#app') as HTMLDivElement;
DOM!.id = UniqueHash();
Start(DOM!);
import { collection, addDoc, Timestamp, onSnapshot, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { firestore } from '../../firebase/firebaseDB';
import styles from '../../assets/sass/modules/app.module.scss';
import { MainTest_Function } from './main.test';
  
  export default function Main_Function() {
    if (MainTest_Function()) {
      const Form = document.querySelector('#new-task-form') as HTMLFormElement;
      const Input = document.querySelector('#new-task-input') as HTMLInputElement;
      const List_el = document.querySelector(`.${styles['task-list']}`) as HTMLDivElement;
  
      let currentInput: HTMLInputElement | null = null;
  
      function renderTask(docId: string, taskData: any) {
        const Task_el = document.createElement('div');
        Task_el.classList.add(styles['task-div']);
  
        const date = taskData.timestamp.toDate();
        const formattedDate = date.toLocaleDateString();
        const formattedTime = date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
  
        Task_el.innerHTML = `
          <p>${formattedDate} ${formattedTime}</p>
          <div class='${styles.task}'>
            <div class='${styles.content}'>
              <input
                type='text'
                class='${styles.text}'
                id='text'
                value='${taskData.task}'
                readonly
              />
            </div>
            <div class='${styles.actions}'>
              <button class='${styles.edit}'>Edit</button>
              <button class='${styles.delete}'>Delete</button>
            </div>
          </div>
        `;
  
        List_el?.appendChild(Task_el);
  
        const EditButton = Task_el.querySelector(`button.${styles.edit}`) as HTMLButtonElement | null;
        const DeleteButton = Task_el.querySelector(`button.${styles.delete}`) as HTMLButtonElement | null;
        const InputElement = Task_el.querySelector(
          `div .${styles.content} input.${styles.text}`
        ) as HTMLInputElement | null;
  
        EditButton?.addEventListener('click', () => {
          if (InputElement) {
            InputElement.readOnly = !InputElement.readOnly;
            InputElement.style.userSelect = 'none';
            InputElement.focus();
            if (!InputElement.readOnly) {
              currentInput = InputElement;
            } else {
              currentInput = null;
            }
          }
        });
  
        DeleteButton?.addEventListener('click', async () => {
          try {
            await deleteDoc(doc(collection(firestore, 'tasks'), docId));
            console.log('Document deleted: ', docId);
          } catch (error) {
            console.error('Error deleting document: ', error);
          }
        });
  
        InputElement?.addEventListener('keydown', async (event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            InputElement.readOnly = true;
            currentInput = null;
  
            try {
              await updateDoc(doc(collection(firestore, 'tasks'), docId), {
                task: InputElement.value,
              });
              console.log('Document updated: ', docId);
            } catch (error) {
              console.error('Error updating document: ', error);
            }
          }
        });
      }
  
      function loadTasks() {
        const tasksCollection = collection(firestore, 'tasks');
  
        onSnapshot(tasksCollection, (snapshot) => {
          List_el.innerHTML = '';
          snapshot.forEach((doc) => {
            const taskData = doc.data();
            renderTask(doc.id, taskData);
          });
        });
      }
  
      loadTasks();
  
      Form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const task = Input?.value;
        if (!task) {
          alert('Please add a task');
          return;
        } else {
          Input.value = '';
        }
  
        const TaskData = {
          task: task,
          timestamp: Timestamp.now(),
        };
  
        try {
          const docRef = await addDoc(collection(firestore, 'tasks'), TaskData);
          console.log('Document written with ID: ', docRef.id);
        } catch (error) {
          console.error('Error adding document: ', error);
        }
      });
  
      document.addEventListener('mousedown', (event) => {
        if (currentInput && !currentInput.contains(event.target as Node)) {
          currentInput.readOnly = true;
          currentInput = null;
        }
      });
  
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && currentInput) {
          currentInput.readOnly = true;
          currentInput = null;
        }
      });
    }
  }
  
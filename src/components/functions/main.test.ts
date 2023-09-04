import styles from '../../assets/sass/modules/app.module.scss';

// Will test each element if it is null or has a value to determine the right action to fix it.

const testElement = (element: HTMLElement | null, elementName: string) => {
  if (!element) {
    console.log(`test result: ${elementName} is null`);
    return false; // Return false if the element is null
  } else {
    console.log(`test result: ${elementName} is`, element);
    return true; // Return true if the element exists
  }
};

export const MainTest_Function = () => {
  let Proceed = true; // Initialize Proceed as true

  const Form = document.querySelector('#new-task-form') as HTMLFormElement | null;
  const Input = document.querySelector('#new-task-input') as HTMLInputElement | null;
  const List_el = document.querySelector(`.${styles['task-list']}`) as HTMLDivElement | null;

  // Update the Proceed variable based on the test results
  Proceed = testElement(Form, 'new-task-form') && Proceed;
  Proceed = testElement(Input, 'new-task-input') && Proceed;
  Proceed = testElement(List_el, 'task-list') && Proceed;

  // Return the final value of Proceed
  return Proceed;
};

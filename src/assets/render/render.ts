
import Form from "../../components/form";
import Main from "../../components/main";
import UniqueHash from "../security/hashes";

export default function Render() {
  // Get Render's ID

  const FormDiv = document.getElementById('new-task-form') as HTMLFormElement | null;
  const MainDiv = document.getElementById('main') as HTMLDivElement | null;

  // Hash Applied
  window.addEventListener('DOMContentLoaded', () => {
 
  });

  // Render the JS Component
 
  {FormDiv && Form(FormDiv)}
  {MainDiv && Main(MainDiv)}

}

import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import styles from './App.module.css'
import "./global.css";

function App() {
  return (
    <>
      <Header />
     <div className={styles.wrapper}>
      <Tasks />
    </div>
    </>
   
  );
}

export default App;

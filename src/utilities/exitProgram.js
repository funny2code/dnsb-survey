import { persistor } from "../store/configureStore";

const exitProgram = () => {
    persistor.purge();
    window.localStorage.clear();
    window.sessionStorage.clear();
}

export default exitProgram;
import './App.css';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Slide } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const App = () => {
    return (<>
        <Outlet />
        <ToastContainer transition={Slide} />
    </>);
}

export default App;
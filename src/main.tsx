import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, Navigate } from "react-router-dom";
import App from './App';
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import NavBar from './components/NavBar';
import Documents from './components/document/Documents';
import Login from './components/Login';
import Profile from './components/profile/Profile';
import NotFound from './components/NotFound';
import ProtectedRoute from './components/ProtectedRoute';
import User from './components/profile/User';
import Password from './components/profile/Password';
import Authorization from './components/profile/Authorization';
import Authentication from './components/profile/Authentication';
import Settings from './components/profile/Settings';
import Register from './components/Register';
import Restricted from './components/Restricted';
import DocumentDetails from './components/document/DocumentDetails';
import ResetPassword from './components/ResetPassword';
import VerifyAccount from './components/VerifyAccount';
import VerifyPassword from './components/VerifyPassword';
import Users from './components/users/Users';

const store = setupStore();
const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/" element={<App />}>
    <Route path="login" element={<Login />} />
    <Route path="register" element={<Register />} />
    <Route path="resetpassword" element={<ResetPassword />} />
    <Route path="verify/account" element={<VerifyAccount />} />
    <Route path="verify/password" element={<VerifyPassword />} />
    <Route element={<ProtectedRoute />}>
      <Route element={<NavBar />}>
        <Route index path='/documents' element={<Documents />} />
        <Route path='/' element={<Navigate to='/documents' />} />
        <Route path='documents/:documentId' element={<DocumentDetails />} />
        <Route element={<Restricted />}>
        <Route path='users' element={<Users />} />
        </Route>
        <Route path='/user' element={<User />}>
          <Route path='/user' element={<Navigate to='/user/profile' />} />
          <Route path='profile' element={<Profile />} />
          <Route path='password' element={<Password />} />
          <Route path='settings' element={<Settings />} />
          <Route path='authorization' element={<Authorization />} />
          <Route path='authentication' element={<Authentication />} />
        </Route>
      </Route>
    </Route>
    <Route path="*" element={<NotFound />} />
  </Route>
));

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
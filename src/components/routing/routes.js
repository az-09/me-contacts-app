import {lazy} from 'react';
import ContactsPage from '../../views/Contacts/ContactsPage';
import LoginPage from '../../views/Login/LoginPage';
import RegisterPage from '../../views/Register/RegisterPage';

// import CreateContactPage from '../../views/CreateContact/CreateContactPage';
const CreateContactPage = lazy(() => import('../../views/CreateContact/CreateContactPage'))

const routes = [
  {
    path: '/auth/register',
    component: RegisterPage,
    title: 'Register',
    needsAuth: false,
  },
  {
    path: '/auth/login',
    component: LoginPage,
    title: 'Login',
    needsAuth: false,
  },
  {
    path: '/contacts/create',
    component: CreateContactPage,
    title: 'Create Contact',
    needsAuth: true,
  },
  {
    path: '/',
    component: ContactsPage,
    title: 'Contacts',
    needsAuth: true,
  },

];

export default routes


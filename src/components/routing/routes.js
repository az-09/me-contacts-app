import ContactsPage from '../../views/Contacts/ContactsPage';
import CreateContactPage from '../../views/CreateContact/CreateContactPage';
import LoginPage from '../../views/Login/LoginPage';
import RegisterPage from '../../views/Register/RegisterPage';

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


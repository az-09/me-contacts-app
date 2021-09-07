/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Container } from "semantic-ui-react";
import NavBar from "../../components/layout/NavBar/NavBar";
import { Context } from "../../contexts/Provider";
import getContacts from "../../services/getContacts";
import FavoritesPage from "../Favorites/FavoritesPage";
import ContactListPage from "./ContactListPage";

const ContactsPage = () => {
  const {
    contactsDispatch,
    contactsState,
  } = useContext(Context);

  const history = useHistory();

  const {data} = contactsState

  useEffect(() => {
    if (data.length === 0) {
      getContacts(history)(contactsDispatch);
    }
  }, [contactsDispatch, data.length, history]);

  return (
      <Container>
          
          <NavBar />
          <FavoritesPage  {...contactsState}/>   
          <ContactListPage {...contactsState}/>
      </Container>
  );
};

export default ContactsPage;

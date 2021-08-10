/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/layout/NavBar/NavBar";
import { Context } from "../../contexts/Provider";
import getContacts from "../../services/getContacts";
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
  }, []);

  return (
      <div>
          
          <NavBar />
          <ContactListPage {...contactsState}/>
      </div>
  );
};

export default ContactsPage;

import { ADD_CONTACT_TO_CONTACTS } from "../contexts/contacts/contactsActions"

const addContactToContacts = (contact) => (dispatch) => {
    
    dispatch({
        type: ADD_CONTACT_TO_CONTACTS,
        payload: contact
    })
}

export default addContactToContacts
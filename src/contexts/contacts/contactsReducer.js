import {
  ADD_CONTACT_TO_CONTACTS,
  DELETE_CONTACT_ERROR,
  DELETE_CONTACT_LOADING,
  DELETE_CONTACT_SUCCESS,
  GET_CONTACTS_ERROR,
  GET_CONTACTS_LOADING,
  GET_CONTACTS_SUCCESS,
  SEARCH_CONTACTS,
} from "./contactsActions";

const contactsReducer = (state, { type, payload }) => {
  switch (type) {
    case GET_CONTACTS_LOADING:
    case DELETE_CONTACT_LOADING:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case GET_CONTACTS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: payload,
      };

    case DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        data: state.data.filter((contact) => contact.id !== payload),
      };

    case ADD_CONTACT_TO_CONTACTS:
      return {
        ...state,
        data: [...state.data, payload],
      };

    case GET_CONTACTS_ERROR:
    case DELETE_CONTACT_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };

    case SEARCH_CONTACTS:
      const searchText = payload?.toLowerCase();
      return {
        ...state,
        loading: false,
        isSearchActive: !!searchText, // https://betterprogramming.pub/10-modern-javascript-tricks-every-developer-should-use-377857311d79
        contactsFound: state.data.filter((contact) => {
          try { // to prevent special characters which result in breaking app
            return (
              contact.first_name.toLowerCase().search(searchText) !== -1 ||
              contact.last_name.toLowerCase().search(searchText) !== -1 ||
              contact.phone_number.toLowerCase().search(searchText) !== -1
            );
          } catch (error) {
            return [];
          }
        }),
      };

    default:
      return state;
  }
};

export default contactsReducer;

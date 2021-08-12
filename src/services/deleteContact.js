import { CONNECTION_ERROR } from "../contexts/authentication/authActions"
import { DELETE_CONTACT_ERROR, DELETE_CONTACT_LOADING, DELETE_CONTACT_SUCCESS } from "../contexts/contacts/contactsActions"
import axiosHelper from "../utils/helpers/axiosHelper"

const deleteContact = (id) => (dispatch) => {
    dispatch({
        type: DELETE_CONTACT_LOADING
    })

    axiosHelper()
    .delete(`/contacts/${id}`)
    .then(() => {
        dispatch({
            type: DELETE_CONTACT_SUCCESS,
            payload: id
        })
    })
    .catch((err) => {
        dispatch({
            type: DELETE_CONTACT_ERROR,
            payload: err.response ? err.response.data : CONNECTION_ERROR
        })
    })
}

export default deleteContact
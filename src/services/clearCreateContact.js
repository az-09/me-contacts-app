import { CLEAR_CREATE_CONTACT } from "../contexts/contact/contactActions"

const clearCreateContact = () => (dispatch) => {
    dispatch({
        type: CLEAR_CREATE_CONTACT
    })
}

export default clearCreateContact
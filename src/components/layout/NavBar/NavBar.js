import React, { useContext } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Button, Icon, Image, Input, Menu } from "semantic-ui-react";
import { Context } from "../../../contexts/Provider";
import logout from "../../../services/logout";
import { isAuthenticated } from "../../../utils/helpers/appHelpers";
import logo from "../../../assets/images/logo.png";
import { SEARCH_CONTACTS } from "../../../contexts/contacts/contactsActions";

const NavBar = () => {
  const {
    authDispatch,
    contactsDispatch
  } = useContext(Context);

  const history = useHistory();

  const { pathname } = useLocation();

  const onLogoutSubmit = () => {
    logout(history)(authDispatch);
  };

  const onSearchFieldChange = (e, {value}) => {
    // The g modifier is used to perform a global match (find all matches rather than stopping after the first match).
    const searchText = value.trim().replace(/' '/g, '')

    contactsDispatch({
      type: SEARCH_CONTACTS,
      payload: searchText
    })
  }

  return (
    <Menu secondary pointing>
      <Image src={logo} width={60} />
      <Menu.Item as={Link} to="/" style={{ fontSize: 24 }}>
        ME Contacts
      </Menu.Item>

      {isAuthenticated() && (
        <Menu.Item position="right">
          <Input style={{width:300}} placeholder="Search Contacts" onChange={onSearchFieldChange}/>
        </Menu.Item>
      )}

      {pathname === "/" && (
        <Menu.Item>
          <Button as={Link} to="/contacts/create" primary icon basic>
            <Icon name="add" />
            Create Contact
          </Button>
        </Menu.Item>
      )}

      {isAuthenticated() && (
        <Menu.Item position="right">
          {" "}
          <Button onClick={onLogoutSubmit} icon basic color="red">
            <Icon name="log out" />
            Logout
          </Button>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default NavBar;

import React, { useContext } from "react";
import {
  Button,
  Container,
  Header,
  Icon,
  List,
  Message,
  Placeholder,
} from "semantic-ui-react";
import ImageThumb from "../../components/ImageThumb/ImageThumb";
import { Context } from "../../contexts/Provider";
import deleteContact from "../../services/deleteContact";
import updateFavorite from "../../services/updateFavorite";

const ContactListPage = (state) => {
  const { contactsDispatch } = useContext(Context);
  const { loading, data, isSearchActive, contactsFound } = state;

  const handleDeleteContact = (id) => {
    deleteContact(id)(contactsDispatch);
  };

  const currentContacts = isSearchActive ? contactsFound : data;

  const handleUpdateFavorite = (id, is_favorite) => {
    updateFavorite(id, !is_favorite)(contactsDispatch)
    
  }


  return (
    <div>
      <Container>
      <Header>ALL</Header>
      {loading && (
        <>
          {" "}
          <Placeholder>
            <Placeholder.Header image>
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Header>
            <Placeholder.Paragraph>
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
              <Placeholder.Line />
            </Placeholder.Paragraph>
          </Placeholder>
        </>
      )}
      {!loading && currentContacts.length === 0 && (
        <Message content="No contacts to show." />
      )}

      <List>
        {currentContacts &&
          currentContacts.map((contact) => (
            <List.Item key={contact.id}>
              <List.Content floated="right">
                <span>
                  {contact.country_code} {contact.phone_number}
                </span>
                <Button
                  color="red"
                  size="tiny"
                  onClick={() => handleDeleteContact(contact.id)}
                >
                  <Icon name="delete" />
                </Button>
                <Button
                  onClick={() =>
                    handleUpdateFavorite(contact.id, contact.is_favorite)
                  }
                >
                  {contact.is_favorite ? "UnFavorite" : "Favorite"}
                </Button>
              </List.Content>
              <List.Content style={{ display: "flex", alignItems: "center" }}>
                <ImageThumb
                  firstName={contact.first_name}
                  lastName={contact.last_name}
                  src={contact.picture_url}
                />
                <span>
                  {contact.first_name} {contact.last_name}
                  {contact.is_favorite && <Icon name="heart" color="red" />}
                </span>
              </List.Content>
            </List.Item>
          ))}
      </List>
      </Container>
    </div>
    
  );
};

export default ContactListPage;

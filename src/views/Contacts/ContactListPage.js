import React from "react";
import { Header, Icon, List, Message, Placeholder } from "semantic-ui-react";
import ImageThumb from "../../components/ImageThumb/ImageThumb";

const ContactListPage = (state) => {
  const { loading, data } = state;

  return (
    <div>
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
      {!loading && data.length === 0 && (
        <Message content="No contacts to show." />
      )}

      <List>
        {data.length > 0 &&
          data.map((contact) => (
            <List.Item key={contact.id} disabled={contact.deleting}>
              <List.Content floated="right">
                <span>
                  {contact.country_code} {contact.phone_number}
                </span>
    
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
    </div>
  );
};

export default ContactListPage;

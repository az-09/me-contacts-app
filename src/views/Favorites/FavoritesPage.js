import React, { useRef } from "react";
import {
  Container,
  Header,
  Icon,
  Message,
  Placeholder,
} from "semantic-ui-react";
import ImageThumb from "../../components/ImageThumb/ImageThumb";
import "./FavoritesPage.css";

const FavoritesPage = (state) => {
  const { loading, data, isSearchActive, contactsFound } = state;

  const currentContacts = isSearchActive ? contactsFound : data;

  const favoriteContacts = currentContacts?.filter(
    (contact) => contact.is_favorite
  );

  const showIcons = favoriteContacts.length > 2;

  const listRef = useRef();

  const onScrollLeftClick = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: -500,
        behavior: "smooth",
      });
    }
  };

  const onScrollRightClick = () => {
    if (listRef.current) {
      listRef.current.scrollBy({
        top: 0,
        left: 500,
        behavior: "smooth",
      });
    }
  };

  return (
      <Container>
        <Header>Favorites</Header>
        {loading && (
          <>
            {" "}
            <Placeholder>
              <Placeholder.Header image>
                <Placeholder.Line />
              </Placeholder.Header>
              <Placeholder.Paragraph>
                <Placeholder.Line />
                <Placeholder.Line />
              </Placeholder.Paragraph>
            </Placeholder>
          </>
        )}
        {!loading && favoriteContacts.length === 0 && (
          <Message content="No contacts to display" />
        )}
        <div className="slide-container">
          {showIcons && (
            <Icon
              className="caret-cursor"
              name="caret left"
              size="huge"
              onClick={onScrollLeftClick}
            />
          )}
          {favoriteContacts.length > 0 && (
            <div className="items-container" ref={listRef}>
              {favoriteContacts?.map((contact) => (
                <div key={contact.id} className="item-container">
                  <ImageThumb
                    firstName={contact.first_name}
                    lastName={contact.last_name}
                    src={contact.picture_url}
                    style={{ width: 75, height: 75 }}
                  />
                  <p className="name">
                    {contact.first_name} {contact.last_name}
                  </p>
                </div>
              ))}
            </div>
          )}

          {showIcons && (
            <Icon
              className="caret-cursor"
              name="caret right"
              size="huge"
              onClick={onScrollRightClick}
            />
          )}
        </div>
      </Container>
  );
};

export default FavoritesPage;

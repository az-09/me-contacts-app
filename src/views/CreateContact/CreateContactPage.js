import React, { useContext, useEffect, useRef, useState } from "react";
import { Prompt, useHistory } from "react-router-dom";
import NavBar from "../../components/layout/NavBar/NavBar";
import {
  Button,
  Card,
  Container,
  Form,
  Grid,
  Header,
  Image,
  Select,
} from "semantic-ui-react";
import { Context } from "../../contexts/Provider";
import createContact from "../../services/createContact";
import countries from "../../utils/constants/countries";
import clearCreateContact from "../../services/clearCreateContact";
import addContactToContacts from "../../services/addContactToContacts";
import './CreateContactPage.css'

const CreateContactPage = () => {
  const {
    contactState: { loading, data },
    contactDispatch,
    contactsDispatch,
  } = useContext(Context);

  const history = useHistory();

  const [form, setForm] = useState({});
  const [tempFile, setTempFile] = useState(null);

  const imagePickRef = useRef(null);

  const onFieldChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const onFormSubmit = () => {
    createContact(form)(contactDispatch);
  };

  const onImageChange = (e) => {
    e.persist();
    const pictureURL = e.target.files[0];
    setForm({ ...form, pictureURL });

    // https://betterprogramming.pub/10-modern-javascript-tricks-every-developer-should-use-377857311d79
    //!pictureURL ?? setTempFile(URL.createObjectURL(pictureURL))

    pictureURL && setTempFile(URL.createObjectURL(pictureURL));
  };

  const onImageClick = () => {
    imagePickRef.current && imagePickRef.current.click();
  };

  useEffect(() => {
    if (data) {
      addContactToContacts(data)(contactsDispatch);
      history.push("/");
    }
    return () => {
      clearCreateContact()(contactDispatch);
    };
  }, [data, contactsDispatch, contactDispatch, history]);

  const createContactFormValid =
    !form.firstName?.length ||
    !form.lastName?.length ||
    !form.countryCode?.length ||
    !form.phoneNumber?.length;

  const formNotCompleted = Object.values(form).filter(value => value && value !== '')?.length > 0 && !data

  return (
    <Container>
      <NavBar />
      <Prompt
        when={formNotCompleted}
        message="You have unsaved changes, would you like to leave?"

      />
      <Grid centered>
        <Grid.Column className="form-column">
          <Header>Create Contact</Header>
          <Card fluid>
            <Card.Content>
              <Form unstackable>
                <input
                  onChange={onImageChange}
                  ref={imagePickRef}
                  type="file"
                  hidden
                />
                <div className="image-wrapper">
                  {tempFile && (
                    <Image src={tempFile} className="contact-picture" />
                  )}
                  {!tempFile && (
                    <div className="contact-picture">
                      <Image
                        onClick={onImageClick}
                        src="https://react.semantic-ui.com/images/wireframe/square-image.png"
                        size="medium"
                        rounded
                      />
                    </div>
                  )}
                </div>

                <Form.Group widths={2}>
                  <Form.Input
                    label="First name"
                    name="firstName"
                    onChange={onFieldChange}
                    placerholder="First name"
                  />
                  <Form.Input
                    label="Last name"
                    name="lastName"
                    onChange={onFieldChange}
                    placerholder="Last name"
                  />
                </Form.Group>
                <Form.Group widths={2}>
                  <Form.Input
                    label="Country"
                    name="countryCode"
                    onChange={onFieldChange}
                    placerholder="Country"
                    control={Select}
                    options={countries}
                  />
                  <Form.Input
                    label="Phone Number"
                    name="phoneNumber"
                    onChange={onFieldChange}
                    placerholder="Phone Number"
                  />
                </Form.Group>
                <Form.Checkbox
                  name="isFavorite"
                  onChange={(e, data) => {
                    onFieldChange(e, {
                      name: "isFavorite",
                      value: data.checked,
                    });
                  }}
                  label="Add to favorite"
                />
                <Button
                  loading={loading}
                  disabled={createContactFormValid || loading}
                  type="submit"
                  primary
                  onClick={onFormSubmit}
                >
                  Submit
                </Button>
              </Form>
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid>
    </Container>
  );
};

export default CreateContactPage;

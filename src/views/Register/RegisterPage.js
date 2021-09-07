import React, { useContext, useEffect, useState } from "react";

import { Button, Container, Form, Grid, Header, Segment } from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";

import { Context } from "../../contexts/Provider";
import postRegister from "../../services/postRegister";
import NavBar from "../../components/layout/NavBar/NavBar";
import logout from "../../services/logout";

const RegisterPage = () => {
  const {
    authDispatch,
    authState: { loading, error, data },
  } = useContext(Context);

  const [form, setForm] = useState({});

  const [fieldErrors, setFieldErrors] = useState({});

  const history = useHistory();

  useEffect(() => {
    if (data) {
      // to prevent endless loop after registered and then returned from login because data already exists, reinitialize state
      logout(history)(authDispatch); 

      history.push("/auth/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      Object.entries(error).forEach(([name, value]) => {
        setFieldErrors({ ...fieldErrors, [name]: value[0] });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const registerFormValid =
    !form.username?.length ||
    !form.firstName?.length ||
    !form.lastName?.length ||
    !form.email?.length ||
    !form.password?.length;

  const onSubmit = () => {
    setFieldErrors({});
    postRegister(form)(authDispatch);
  };

  return (
    <Container>
      <NavBar />
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
          <Header>Signup Here</Header>
          <Segment>
            <Form>
              <Form.Field>
                <Form.Input
                  value={form.username || ""}
                  onChange={onChange}
                  name="username"
                  placeholder="Username"
                  label="Username"
                  error={
                    fieldErrors.username && {
                      content: fieldErrors.username,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={form.firstName || ""}
                  onChange={onChange}
                  name="firstName"
                  placeholder="First Name"
                  label="First Name"
                  error={
                    fieldErrors.firstName && {
                      content: fieldErrors.firstName,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={form.lastName || ""}
                  onChange={onChange}
                  name="lastName"
                  placeholder="Last Name"
                  label="Last Name"
                  error={
                    fieldErrors.lastName && {
                      content: fieldErrors.lastName,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={form.email || ""}
                  onChange={onChange}
                  name="email"
                  type="email"
                  placeholder="Email"
                  label="Email"
                  error={
                    fieldErrors.email && {
                      content: fieldErrors.email,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>
              <Form.Field>
                <Form.Input
                  value={form.password || ""}
                  onChange={onChange}
                  name="password"
                  type="password"
                  placeholder="Password"
                  label="Password"
                  error={
                    fieldErrors.password && {
                      content: fieldErrors.password,
                      pointing: "below",
                    }
                  }
                />
              </Form.Field>

              <Button
                onClick={onSubmit}
                disabled={registerFormValid || loading}
                fluid
                loading={loading}
                primary
                type="submit"
              >
                Submit
              </Button>
              <Segment>
                Already have an account? <Link to="/auth/login">Login</Link>
              </Segment>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </Container>
  );
};
export default RegisterPage;

import React, { useContext, useEffect, useState } from "react";

import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
} from "semantic-ui-react";
import { Link, useHistory } from "react-router-dom";
import { Context } from "../../contexts/Provider";
import postLogin from "../../services/postLogin";
import NavBar from "../../components/layout/NavBar/NavBar";

const LoginPage = () => {
  const {
    authDispatch,
    authState: { loading, error, data },
  } = useContext(Context);
  const [form, setForm] = useState({});
  const history = useHistory();

  useEffect(() => {
    
    if (data && data.token) {
        history.push("/")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  const onChange = (e, { name, value }) => {
    setForm({ ...form, [name]: value });
  };

  const loginFormValid = !form.username?.length || !form.password?.length;

  const onSubmit = () => {
    postLogin(form)(authDispatch);
  };

  return (
    <div>
    <NavBar/>
      <Grid centered>
        <Grid.Column style={{ maxWidth: 550, marginTop: 20 }}>
          <Header>Login</Header>
          <Segment>
            <Form>
              {error && <Message content={error?.detail} negative />}
              <Form.Field>
                <Form.Input
                  value={form.username || ""}
                  onChange={onChange}
                  name="username"
                  placeholder="Username"
                  label="Username"
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
                />
              </Form.Field>

              <Button
                onClick={onSubmit}
                disabled={loginFormValid || loading}
                fluid
                loading={loading}
                primary
                type="submit"
              >
                Submit
              </Button>
              <Segment>
                Need an account <Link to="/auth/register">Register</Link>
              </Segment>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid>
    </div>
  );
};
export default LoginPage;

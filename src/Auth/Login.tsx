import React from "react";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';

interface LoginProps {
  name?: string;
  value?: string;
  updateToken: (newToken: string) => void
  handleToggle: () => void;
  updateTeacherOrStudent: (newTeacherOrStudent: string) => void; 
}
interface LoginState {
  email: string;
  password: string;
  errors: {
    email: string;
    password: string;
  };
}
const Regex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
);

export default class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);
        const initialState = {
          email: "",
          password: "",
          errors: {
            email: "",
            password: "",
          },
        };
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
      }

  handleChange = (event: any) => {
    event.preventDefault();
    const { name, value } = event.target;
    let errors = this.state.errors;
    switch (name) {
      case "email":
        errors.email = Regex.test(value) ? "" : "Email is not valid!";
        break;
      case "password":
        errors.password =
          value.length < 8 ? "Password must be eight characters long!" : "";
        break;
      default:
        break;
    }
    this.setState(Object.assign(this.state, { errors, [name]: value }));
    console.log(this.state.errors);
  };
  handleSubmit = (event: any) => {
      event.preventDefault();
      fetch('http://localhost:3000/user/login', {
         method: 'POST',
         body: JSON.stringify({user: {email: this.state.email, password: this.state.password}}),
         headers: new Headers({
             'Content-Type': 'application/json'
         })
      }).then(
          (response) => response.json()
      ).then((data) => {
        this.props.updateToken(data.sessionToken)
        this.props.updateTeacherOrStudent(data.teacherOrStudent)
        console.log(data.sessionToken)
      })
  };

 
  
  
  
  render() {
    console.log(this.props);
    const { errors } = this.state;
    return (
      <Container>
        <CssBaseline />
          <Typography>Login</Typography>
          <br/>
          <form onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="email"
                name="email"
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email"
                autoFocus
                onChange={this.handleChange}
              />
              {errors.email.length > 0 && (
                <span style={{ color: "red" }}>{errors.email}</span>
              )}
            </Grid>
        
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="password"
                name="password"
                variant="outlined"
                required
                fullWidth
                type="password"
                id="password"
                label="Password"
                autoFocus
                onChange={this.handleChange}
              />
              {errors.password.length > 5 && (
                <span style={{ color: "red" }}>{errors.password}</span>
              )}
            </Grid>
            
              <Button
              type="submit"
              onClick={this.handleSubmit}
              
              fullWidth
              variant="contained"
              color="primary"
              >Login</Button>
            <Grid item>
              <Button 
              onClick={this.props.handleToggle}
              >
                New to the App? Register Here! 
                
              </Button>
            </Grid>
            </Grid>
          </form>
      </Container>
    );
  }
}


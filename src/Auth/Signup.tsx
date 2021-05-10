import React from "react";

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';

import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';

import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

interface SignUpProps {
  name?: any;
  value?: any;
  updateToken: (newToken: string) => void;
  handleToggle: () => void;
  updateTeacherOrStudent: (newTeacherOrStudent: string) => void; 
}
interface SignUpState {
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    state: string,
    schoolName: string,
    contentArea: string,
    gradeLevel: string,
    teacherOrStudent: string,
    profileImage: string,
    errors: {
        email: string,
        password: string,
      },
  };

const Regex = RegExp(
  /^\s?[A-Z0–9]+[A-Z0–9._+-]{0,}@[A-Z0–9._+-]+\.[A-Z0–9]{2,4}\s?$/i
);

export default class SignUp extends React.Component<SignUpProps, SignUpState> {

    constructor(props: SignUpProps) {
        super(props);
        const initialState = {
            email: "",
            password: "",
            lastName: "",
            firstName: "",
            state: "",
            schoolName: "",
            contentArea: "",
            gradeLevel: "",
            teacherOrStudent: "",
            profileImage: "",
            errors: {
                email: "",
                password: "",
              },
          }
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
      fetch('http://localhost:3000/user/create', {
         method: 'POST',
         body: JSON.stringify({user: {
            email: this.state.email,
            password: this.state.password,
            lastName: this.state.lastName,
            firstName: this.state.firstName,
            state: this.state.state,
            schoolName: this.state.schoolName,
            contentArea: this.state.contentArea,
            gradeLevel: this.state.gradeLevel,
            teacherOrStudent: this.state.teacherOrStudent,
            profileImage: this.state.profileImage
        }}),
         headers: new Headers({
             'Content-Type': 'application/json'
         })
      }).then(
          (response) => response.json()
      ).then((data) => {
          console.log(data)
          this.props.updateToken(data.sessionToken)
          this.props.updateTeacherOrStudent(data.teacherOrStudent)
      })
  };

  
  render() {
    const { errors } = this.state;
    return (
      <Container>
        <CssBaseline />
          <Typography>Sign Up</Typography>
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
                type="email"
                id="email"
                label="Email Address"
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
            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="firstName"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                type="firstName"
                id="firstName"
                label="First Name"
                autoFocus
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="lastName"
                name="lastName"
                variant="outlined"
                required
                fullWidth
                type="lastName"
                id="lastName"
                label="Last Name"
                autoFocus
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="state"
                name="state"
                variant="outlined"
                required
                fullWidth
                type="state"
                id="state"
                label="State"
                autoFocus
                onChange={this.handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="contentArea"
                name="contentArea"
                variant="outlined"
                required
                fullWidth
                type="contentArea"
                id="contentArea"
                label="Content Area"
                autoFocus
                onChange={this.handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={4}>
            <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                autoComplete="gradeLevel"
                name="gradeLevel"
                variant="outlined"
                required
                fullWidth
                type="gradeLevel"
                label="Grade Level"
                autoFocus
                onChange={this.handleChange}
                >
                  <MenuItem value={1}>Early Elementary (K-3)</MenuItem>
                  <MenuItem value={2}>Elementary (4-6)</MenuItem>
                  <MenuItem value={3}>Middle (7-8)</MenuItem>
                  <MenuItem value={4}>High (9-12)</MenuItem>
                  <MenuItem value={5}>College</MenuItem>
                </Select>
                </Grid>

                <Grid item xs={12} sm={4}>
              <TextField
                autoComplete="schoolName"
                name="schoolName"
                variant="outlined"
                required
                fullWidth
                type="schoolName"
                id="schoolName"
                label="School Name"
                autoFocus
                onChange={this.handleChange}
              />
            </Grid>

                <Grid item xs={12} sm={4}>
            <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                autoComplete="teacherOrStudent"
                name="teacherOrStudent"
                variant="outlined"
                required
                fullWidth
                type="teacherOrStudent"
                label="Teacher or Student?"
                autoFocus
                onChange={this.handleChange}
                >
                  <MenuItem value={'Teacher'}>Teacher</MenuItem>
                  <MenuItem value={'Student'}>Student</MenuItem>
                
                </Select>
                </Grid>

              <Button
              type="submit"
              onClick={this.handleSubmit}
              fullWidth
              variant="contained"
              color="primary"
              >Register Me</Button>
            <Grid item>
              <Button 
              onClick={this.props.handleToggle}
              >
                Already a member? Login 
                
              </Button>
            </Grid>
            </Grid>
          </form>
      </Container>
    );
  }
}


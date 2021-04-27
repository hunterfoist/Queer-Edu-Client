import * as React from 'react';
import { Component } from 'react';

import APIURL from '../Helpers/environment';

import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import {Form, FormGroup, Label, Input}  from 'reactstrap';

export interface SignupProps {

}
 
export interface SignupState {
    email: string,
    password: string,
    lastName: string,
    firstName: string,
    state: string,
    schoolName: string,
    contentArea: string,
    gradeLevel: number,
    teacherOrStudent: boolean,
    profileImage: string
}
 
class Signup extends React.Component<SignupProps, SignupState> {
    constructor(props: SignupProps) {
        super(props);
        this.state = {
        email: "",
        password: "",
        lastName: "",
        firstName: "",
        state: "",
        schoolName: "",
        contentArea: "",
        gradeLevel: 0,
        teacherOrStudent: true,
        profileImage: ""
        };
    }

    handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        fetch(`${APIURL}/user/create`, {
            method: 'POST',
            body: JSON.stringify({
                user: {
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
                }
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
        })
    }

    render() { 
        return (
<Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
      
        <Typography component="h1" variant="h5">
          Sign up!
        </Typography>
        <br/>
        <Form onSubmit={this.handleSubmit}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
            <Label htmlFor='firstname'>First Name</Label>
              <Input
                placeholder='Enter your first name'
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ firstName: e.currentTarget.value })} 
              />
            </Grid>
            <Grid item xs={12}>
              <Label htmlFor='lastname'>Last Name</Label>
              <Input 
                placeholder='Enter your last name'
                required
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ lastName: e.currentTarget.value })} 
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
            <Grid item xs={12}>
            <Label htmlFor='username'>Email</Label>
              <Input type='email' placeholder='Enter a valid email address' pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.currentTarget.value })} />
            </Grid>

            <Grid item xs={12}>
            <Label htmlFor='password'>Password</Label>           
            <Input type='password' placeholder='Enter a valid password' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.currentTarget.value })} />
            </Grid>

            <Grid item xs={12}>
            <Label htmlFor='state'>State</Label>           
            <Input  placeholder='Enter a valid state'  title="Must be valid state abbreviation" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ state: e.currentTarget.value })} />
            </Grid>

            <Grid item xs={12}>
            <Label htmlFor='schoolName'>School Name</Label>           
            <Input  placeholder='Enter a valid state'  title="Enter your current school" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ schoolName: e.currentTarget.value })} />
            </Grid>

           

            
            
          </Grid>
          <Button
            type="submit"
          >
            Join QueerEdu!
          </Button>
        </Form>
      </div>

    </Container>

        );
    }
}
 
export default Signup;
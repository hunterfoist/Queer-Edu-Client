import * as React from 'react';
import { Component } from 'react';
import { Form, Label } from 'reactstrap';
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
              <Input type='email' placeholder='Enter valid email address' pattern="^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.currentTarget.value })} />
          
            <Label htmlFor='password'>Password</Label>           
            <Input type='password' placeholder='must contain' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 5 or more characters" required onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.currentTarget.value })} />
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



            // <Form onSubmit={this.handleSubmit}>
            //     <h3>RunJournal Signup</h3>

            //     <div className="form-group">
            //         <Label>First name</Label>
            //         <input type="text" className="form-control" placeholder="First name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ firstName: e.currentTarget.value })} required />
            //     </div>

            //     <div className="form-group">
            //         <label>Last name</label>
            //         <input type="text" className="form-control" placeholder="Last name" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ lastName: e.currentTarget.value })} required />
            //     </div>

            //     <div className="form-group">
            //         <label>Email address</label>
            //         <input type="email" className="form-control" placeholder="Enter email" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.currentTarget.value })} required />
            //     </div>

            //     <div className="form-group">
            //         <label>Password</label>
            //         <input type="password" className="form-control" placeholder="Enter password" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.currentTarget.value })} required />
            //     </div>

            //     <div className="form-group">
            //         <label>Birthdate</label>
            //         <input type="date" className="form-control" placeholder="01/01/1900" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ birthdate: e.currentTarget.value })} required />
            //     </div>

            //     <div className="form-group">
            //         <label htmlFor="weekstart">Start of Week:</label>
            //         <select className="form-control" id="weekstart" value={this.state.startOfWeek} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (e.currentTarget.value === "monday") ? this.setState({ startOfWeek: "monday"}) : this.setState({ startOfWeek: "sunday" })} >
            //             <option value="monday">Monday</option>
            //             <option value="sunday">Sunday</option>
            //         </select>
            //     </div>

            //     <div className="form-group">
            //         <label htmlFor="defaultunit">Default Unit:</label>
            //         <select className="form-control" id="defaultunit" value={this.state.defaultUnit} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => (e.currentTarget.value === "standard") ? this.setState({ defaultUnit: "standard"}) : this.setState({ defaultUnit: "metric" })}>
            //             <option value="standard">Standard</option>
            //             <option value="metric">Metric</option>
            //         </select>
            //     </div>

            //     <div className="form-group">
            //         <div className="custom-control custom-checkbox">
            //             <input type="checkbox" className="custom-control-input" id="coachcheck" onChange={(e: React.ChangeEvent<HTMLInputElement>) => (e.currentTarget.checked === true) ? this.setState({ coach: true }) : this.setState({ coach: false })}/>
            //             <label className="custom-control-label" htmlFor="coachcheck">Register as coach?</label>
            //         </div>
            //     </div>

            //     <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
            //     <p className="forgot-password text-right">
            //         Already registered <a href="#">sign in?</a>
            //     </p>
            // </Form>
        );
    }
}
 
export default Signup;
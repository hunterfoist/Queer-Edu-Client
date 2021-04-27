import React from 'react';

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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {Form, FormGroup, Label, Input}  from 'reactstrap';

export interface LoginProps {
    
}
 
export interface LoginState {
    email: string,
    password: string
}
 
class Login extends React.Component<LoginProps, LoginState> {
    constructor(props: LoginProps) {
        super(props);
        this.state = { 
            email: '', 
            password: ''  
        };
    }

    handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({user: {email: this.state.email, password: this.state.password}}),
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
          Login
        </Typography>
        <form noValidate>
          
        <Label htmlFor='username'>Email</Label>
                    <Input type='email' placeholder='Enter valid email address' pattern={"^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$"|| "(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" } onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ email: e.currentTarget.value })} required/>
          <Label htmlFor='password'>Password</Label>           
          <Input type='password' placeholder='Min 5 characters with Capital and Lowercase' pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}" onChange={(e: React.ChangeEvent<HTMLInputElement>) => this.setState({ password: e.currentTarget.value })} required/>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Lost your bird?
              </Link>
            </Grid>
            <Grid item>
              <Button>
              No account? Register today
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
            
        );
    }
}
 
export default Login;
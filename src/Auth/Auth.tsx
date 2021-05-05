import * as React from 'react';
import Container from '@material-ui/core/Container';
import Signup from './Signup';
import Login from './Login';
import { Jumbotron } from 'reactstrap';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

export interface AuthProps {
    updateToken: (newToken: string) => void; 
}
 
export interface AuthState {
    showLogin: boolean;
}
 
class Auth extends React.Component<AuthProps, AuthState> {
    constructor(props: AuthProps) {
        super(props);
        this.state = { showLogin: false };
    }

    handleToggle = () => {if(this.state.showLogin === true){
        this.setState({ showLogin: false })
    } else {
        this.setState({showLogin: true })
    }}
    

    render() { 
        return ( <Container className="auth-container">
        <div>
            <br/>
            <br/>
            <br/>
                    <Jumbotron  className="w-100 text-dark" style={{backgroundImage: `url('https://images.unsplash.com/photo-1501349800519-48093d60bde0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80')`  }}>
                <Container>
                  <Typography>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>  
                <h1 className="display-3 text-dark">Welcome to QueerEdu</h1>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  
                  
                  </Typography>
                </Container>
              </Jumbotron>
            </div>
            <div>
                <Jumbotron>
                    <Typography>
                    <h2 className="lead text-dark">The exclusive place for queer educators and students</h2>
                  <hr className="my-2" />
                  <br/>
                  <p className="text-dark">QueerEdu was created for the sole purpose of supporting and empowering queer educators. </p>
                  <br/>
                  <p className="text-dark">Whether you're a queer teacher, a queer student, or an ally, <br></br> this site is designed to give you the tools to bring queer culture into your classroom or school.<br></br></p>
                    </Typography>
                </Jumbotron>
                <br/>
                <br/>
            </div>
                        <Grid container> 
                            {this.state.showLogin === true ? <Login updateToken={this.props.updateToken} handleToggle={this.handleToggle} /> : <Signup updateToken={this.props.updateToken} handleToggle={this.handleToggle}/>}
                        </Grid>
                        
                        
                        
                </Container>
        );
    }}
 
export default Auth;

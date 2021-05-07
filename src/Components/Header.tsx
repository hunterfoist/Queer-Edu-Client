import * as React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';


export interface NavbarProps {
    
}
 
export interface NavbarState {
    isOpen: boolean;
}
//  type clearToken = {
//   new (): Location; prototype: Location; 
//  }

class Navbar extends React.Component<NavbarProps, NavbarState> {
    constructor(props: NavbarProps) {
        super(props);
        this.state = {isOpen: true};
    }

    Toggle = () => {
        this.setState({isOpen: !this.state.isOpen});
    }

    clearToken = () => {
        localStorage.clear();
        window.location.reload(true);
      }

    render() { 
        return ( <AppBar position="static" style={{backgroundColor: '#00000'}} >
        <Toolbar style={{color: '#00000'}}>
          <Typography>
            <h1>QueerEdu</h1>
          </Typography>
          <br/>
          <Typography>
                                <Link className="nav-link" to={"/"}>Home</Link>
                                <Link className="nav-link" to={"/create-lesson"}>Create a Lesson!</Link>
                                <Link className="nav-link" to={"/create-post"}>Create a Post!</Link>
                            </Typography>
          <Button onClick={this.clearToken}>Logout</Button>
        </Toolbar>
      </AppBar>
      );
    }
}
 
export default Navbar;



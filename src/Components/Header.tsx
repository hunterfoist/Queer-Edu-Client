import * as React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';
import logo from '../assets/Logo2_RedBadge (1).png'
import { withStyles } from "@material-ui/core/styles";


export interface NavbarProps {
    classes: any;
    theme: any;

}
 
export interface NavbarState {
    isOpen: boolean;
}
//  type clearToken = {
//   new (): Location; prototype: Location; 
//  }

const styles = (theme:any) => ({
 
    palette: {
      primary: {
        main: '##E79200',
      },
      secondary: {
        main: '#c2b092',
      },
    },    
    root: {
      flexGrow: 1, 
    },
    menuButton: {
      marginRight: theme.spacing(1),
      marginLeft: theme.spacing(120),
      color: '#000000'
    },
    title: {
      flexGrow: 1,
    },
    navItems: {
      maxWidth: 150,
      marginRight: theme.spacing(4),
      color: '#000000',
      
    
  },
  navBarSpacing: {
    padding: theme.spacing()
    
  
},
    logo: {
      maxWidth: 100,
      marginRight: theme.spacing(5),
      
    
  }
})

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
      const {classes} = this.props;
      
        return (
           <AppBar  position="static"  style={{backgroundColor: '#FFFFFF'}} >
        <Toolbar  style={{color: '#f0b459'}}>
        <img src={logo} alt="logo" className={classes.logo} />
          
          <Typography className={classes.navBarSpacing}>
         
                                 <Link className={classes.navItems} style={{ textDecoration: 'none' }}  to={"/home"}>Home</Link>
                                 
                                 <Link className={classes.navItems} style={{ textDecoration: 'none' }} to={"/create-lesson"}>Create a Lesson!</Link>
                                 
                                 <Link className={classes.navItems} style={{ textDecoration: 'none' }} to={"/create-post"}>Create a Post!</Link>

                                 <Link className={classes.navItems} style={{ textDecoration: 'none' }}  to={"/all-posts"}>All Posts</Link>

                                 <Link className={classes.navItems} style={{ textDecoration: 'none' }}  to={"/all-lessons"}>All Lessons</Link>
                             </Typography>
                             
          <Button className={classes.menuButton} variant='contained'   style={{backgroundColor: '#f0b459'}} onClick={this.clearToken}>Logout</Button>
        </Toolbar>
      </AppBar> );
    }
}
 
export default withStyles(styles, {withTheme: true}) (Navbar);






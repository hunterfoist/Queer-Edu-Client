import * as React from 'react';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import { withStyles } from "@material-ui/core/styles";
import {PostInterface} from './PostInterface'


export interface AllPostLogProps {
    sessionToken: string;
    fetchPosts: Function;
    post: PostInterface;
    posts: PostInterface[];
    classes: any;
    theme: any;
    

}
 
export interface AllPostLogState {
    open : boolean;
}
 
const styles = (theme:any) => ({
    card: {
        maxWidth: 350,
        margin: "1em",
        height: "100%",
      marginTop: "4em",
      transition: "0.3s",
      boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
      "&:hover": {
        boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)"
      },
      alignItems: "flex-start",
      padding: theme.spacing(3)
    },
    button: {
      background: "#f0b459",
      
    },
  
    buttonText: {
      color: "black",
      
    },
  
    
   
    
  })

class AllPostLog extends React.Component<AllPostLogProps, AllPostLogState> {
    constructor(props: AllPostLogProps) {
        super(props);
        this.state = { open : false };
    }

    handleClickOpen = () => {
        this.setState({open: true});
    }

    handleClickClose = () => {
        this.setState({open: false});
    }

    deletePost = (post: any) => {
        let token = this.props.sessionToken ? this.props.sessionToken: localStorage.getItem('token');
        fetch(`http://localhost:3000/post/deletepost/${post.id}`, {
  method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': token ? token : ''
      })
    })
    .then(() => this.props.fetchPosts())
    }

    render() { 
        const {classes} = this.props;
        return (
        
        <Card style={{ width: '100%' }} className={classes.card}>
        <CardActionArea>
          <CardContent>
            <Typography align='center' gutterBottom variant="h4" component="h4">
            {this.props.post.postTitle}
            </Typography>

            <Typography align='center' gutterBottom variant="h6" component="h6">
            {this.props.post.postDescription}
            </Typography>

            <Button color='inherit' component='button' className={classes.button}>
            <Link align='center' gutterBottom rel="noopener" target="_blank" href={this.props.post.fileUpload} className={classes.buttonText}>
            Link to Resource
            </Link>
            </Button>
            
          </CardContent>
        </CardActionArea>
        <CardActions style={{justifyContent: 'center'}}>
        
        </CardActions>
      </Card>


      
      );
    }
}
 
export default withStyles(styles, {withTheme: true}) (AllPostLog);
import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';


export interface CreatePostProps {
    
    sessionToken: string;
    fetchPosts: Function;
}
 
export interface CreatePostState {
    postTitle: string;
    postDescription: string;
    fileUpload: string;
    
}
 




class CreatePost extends React.Component<CreatePostProps, CreatePostState> {
    constructor(props: CreatePostProps) {
        super(props);
        this.state = {
            postTitle: "",
            postDescription: "",
            fileUpload: ""
        }

        
        this.handleSubmit = this.handleSubmit.bind(this);
    }

   


        handleSubmit = (event: any) => {
          let token = this.props.sessionToken ? this.props.sessionToken: localStorage.getItem('sessionToken');
    
            event.preventDefault();
            fetch('http://localhost:3000/post/createpost', {
              method: 'POST',
              headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': token ? token : ''
              }),
              body: JSON.stringify({ post: { postTitle: this.state.postTitle, postDescription: this.state.postDescription, fileUpload: this.state.fileUpload } })
            })
            .then(response => response.json())
            .then(postData => {
              console.table(postData);
              this.setState({ postTitle: ''});
              this.setState({ postDescription: ''});
              this.setState({ fileUpload: ''});
              this.props.fetchPosts();
            })
          }

    render() { 
      console.log(this.props.sessionToken)
        return ( 
            <Container>
            <br/>
            <br/>
            <br/>
            <h1>Create a post!</h1>
            <br/>
            <h2>Below, please name, describe, and provide a shared link to a queer-focused post you love to use!</h2>
            <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <TextField
                        autoComplete="post Name"
                        name="postTitle"
                        variant="outlined"
                        required
                        fullWidth
                        onChange={(e) => this.setState({postTitle: e.target.value})}
                        value={this.state.postTitle}
                        id="postTitle"
                        label="Post Title"
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="postDescription"
                        label="Post Description"
                        onChange={(e) => this.setState({postDescription: e.target.value})}
                        value={this.state.postDescription}
                        name="postDescription"
                        autoComplete="post Description"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="fileUpload"
                        label="Google Drive Link"
                        onChange={(e) => this.setState({fileUpload: e.target.value})}
                        value={this.state.fileUpload}
                        name="fileUpload"
                        autoComplete="Please insert a link to a Google Drive Document"
                      />
                    </Grid>
                    
                    
                  </Grid>
                  <br/>
                  <Grid>
                  <Button
                    type="submit"
                    onClick={this.handleSubmit}
                    fullWidth
                    variant="contained"
                  >
                    Create post!
                  </Button >
                  </Grid>
            </Container>
         );
    }
}
 
export default CreatePost;
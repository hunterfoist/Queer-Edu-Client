import * as React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import Container from '@material-ui/core/Container';


export interface PostEditProps {
    sessionToken: string;
    
    updateOff: Function;
    postToUpdate: any | null;
    updateOn: Function;
}
 
export interface PostEditState {
    postTitle: string;
    postDescription: string;
    fileUpload: string;
    id: number | null
}
 
class PostEdit extends React.Component<PostEditProps, PostEditState> {
    constructor(props: PostEditProps) {
        super(props);
        this.state = { 
        id: this.props.postToUpdate ? this.props.postToUpdate.id : null,
            postTitle: "",
            postDescription: "",
            fileUpload: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (event: any) => {
        let token = this.props.sessionToken ? this.props.sessionToken: localStorage.getItem('token');
  
          event.preventDefault();
          fetch(`http://localhost:3000/post/updatepost/${this.props.postToUpdate.id}`, {
            method: 'PUT',
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
          })
          this.props.updateOff();
        }

        render() { 
            console.log(this.props.sessionToken)
              return ( 
                  <Container>
                  <br/>
                  <br/>
                  <br/>
                  <h1>Update a Post!</h1>
                  <br/>
                  <h2>Below, please name, describe, and provide a shared link to a queer-focused post you love to use!</h2>
                  <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              autoComplete="Post Name"
                              name="postTitle"
                              variant="outlined"
                              required
                              fullWidth
                              onChange={(e) => this.setState({postTitle: e.target.value})}
                              value={this.state.postTitle}
                              id="postTitle"
                              label="Post Name"
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
                              autoComplete="Post Description"
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
                          Update Post!
                        </Button >
                        </Grid>
                  </Container>
               );
          }
      }
       
      export default PostEdit;
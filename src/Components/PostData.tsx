import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import PostLog from './PostLog';

import PostCreate from './PostCreate';
import PostEdit from './PostEdit';
import {PostInterface} from './PostInterface'



export interface PostDataProps {
    
    sessionToken: string;
    
}
 
export interface PostDataState {
    posts: PostInterface[];
    updateActive: boolean;
    postToUpdate: {};
}



class PostData extends React.Component<PostDataProps, PostDataState> {
    constructor(props: PostDataProps) {
        super(props);
        this.state = { 
            posts: [{
                postTitle: "",
                postDescription: "",
                fileUpload: "",
                id: 1
            }],
            updateActive: false,
            postToUpdate: {}
        }

    }

    fetchPosts() {

        fetch('http://localhost:3000/post/getmyposts', {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json',
        'Authorization': `${localStorage.getItem('token')}`
      })
    })
    .then(response => response.json())
    .then((postData) => {
      this.setState({posts: postData});
    });
  }
    editUpdatePost = (post: number) => {
    this.setState({postToUpdate: post});
    console.log(post);
  };

  updateOn = () => this.setState({updateActive: true});
  updateOff = () => this.setState({updateActive: false});


componentDidMount = () => {
    this.fetchPosts();
}

// componentDidUpdate = () => {
//     this.fetchLessons();
// }

displayCards() {
    return this.state.posts.length > 0 ? this.state.posts.map((post) => <PostLog post={post} posts={this.state.posts} editUpdatePost={this.editUpdatePost} updateOn={this.updateOn} fetchPosts={this.fetchPosts.bind(this)} sessionToken={this.props.sessionToken} />) : null;
}
    render() { 
        return (
        <Container>
        <Grid container xs={12}>
           <Grid>
             <PostCreate fetchPosts={this.fetchPosts} sessionToken={this.props.sessionToken} />
           </Grid>
           <Grid container item xs={9} alignItems="flex-start">
          {this.displayCards()}
          {this.state.updateActive ? <PostEdit postToUpdate={this.state.postToUpdate} updateOn ={this.updateOn} updateOff={this.updateOff} sessionToken={this.props.sessionToken} /> : <></>}
          </Grid>
           </Grid>
   
       </Container>);
    }
}
 
export default PostData;
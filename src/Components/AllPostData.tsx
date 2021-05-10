import * as React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import AllPostLog from './AllPostLog';


import {PostInterface} from './PostInterface'




export interface AllPostDataProps {
    
    sessionToken: string;
    
}
 
export interface AllPostDataState {
    posts: PostInterface[];
    updateActive: boolean;
    postToUpdate: {};
}



class AllPostData extends React.Component<AllPostDataProps, AllPostDataState> {
    constructor(props: AllPostDataProps) {
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

        fetch('http://localhost:3000/post/getallposts', {
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
    return this.state.posts.length > 0 ? this.state.posts.map((post) => <AllPostLog post={post} posts={this.state.posts}   fetchPosts={this.fetchPosts.bind(this)} sessionToken={this.props.sessionToken} />) : null;
}
    render() { 
        return (
        <Container>
          
        <Grid container xs={12}>
           <Grid>
             
           </Grid>
           <Grid container item xs={9} alignItems="flex-start">
          {this.displayCards()}
          
          </Grid>
           </Grid>
   
       </Container>);
    }
}
 
export default AllPostData;
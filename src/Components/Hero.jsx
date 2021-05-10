import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import ReactPlayer from 'react-player';
import queerEdu from '../assets/QueerEdu.mp4';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '80vh',
    position: 'relative',
    '& video': {
      objectFit: 'cover',
    },
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    paddingBottom: theme.spacing(4),
  },
}));

const Hero = () => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ReactPlayer
        url={queerEdu}
        playing
        loop
        muted
        width="100%"
        height="100%"
      />
      
    </section>
  );
};

export default Hero;
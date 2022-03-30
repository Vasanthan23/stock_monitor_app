import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import moment from 'moment';
import { useDispatch } from 'react-redux';

import { likePost, deletePost } from '../../../actions/posts';
import useStyles from './styles';

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));

  return (
    <Card className={classes.card}>
      <CardMedia className={classes.media} image={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} title={post.title} />
      {/*<div className={classes.overlay}>
        <Typography variant="h6">{post.creator}</Typography>
        <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
  </div>*/}
      <div className={classes.overlay2}>
      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && 
        <Button style={{ color: 'black' }} size="small" onClick={() => setCurrentId(post._id)}><MoreHorizIcon fontSize="default" /></Button>}
      </div>
      {/*<div className={classes.details}>
        <Typography variant="body2" color="textSecondary" component="h2">{post.quantity}</Typography>
      </div>*/}
      <CardContent>
        <Typography variant="body1" color="textPrimary" component="h1">{post.category}</Typography>
      </CardContent>
      <Typography className={classes.title} gutterBottom variant="h7" component="h2">{post.model}</Typography>
      <Typography className={classes.title} variant="body1" color="textPrimary" component="h2">{post.quantity}</Typography>
      <CardActions className={classes.cardActions}>
        {/*
        <Button size="small" color="primary" onClick={() => dispatch(likePost(post._id))}><ThumbUpAltIcon fontSize="small" /> Like {post.likeCount} </Button> */}
        {/*{(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && */}
        <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}><DeleteIcon fontSize="small" />Remove</Button> 
      </CardActions>
    </Card>
  );
};

export default Post;
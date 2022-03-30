import React,{useState,useEffect} from 'react';
import { TextField, Button,Typography,Paper} from '@material-ui/core';
import FileBase from 'react-file-base64';
import useStyles from './styles';
import {useDispatch} from 'react-redux';
import { createPost,updatePost } from '../../actions/posts';
import {useSelector} from 'react-redux';
const Form = ({currentId,setCurrentId}) => {
    const [postData,setPostData] = useState({ category: '', dimensions: '',model: '', selectedFile:'', quantity: '' });
    const classes = useStyles();
    const post = useSelector((state) => (currentId ? state.posts.find((p) => p._id === currentId) : null));
    const dispatch = useDispatch();
    const user = JSON.parse(localStorage.getItem('profile'));

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost({...postData,name:user?.result?.name}));
          clear();
        } else {
          dispatch(updatePost(currentId, {...postData,name:user?.result?.name}));
          clear();
        }
      };
    const clear = () => {
        setCurrentId(0);
        setPostData({ category: '', dimensions: '',model: '', selectedFile:'', quantity: '' });
    }

    useEffect(()=>{
        if(post){
            setPostData(post);
        }
    },[post]);
    return (
        <Paper className={classes.paper}>
            <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                <Typography variant="h6">Add to your Stock</Typography>
                <TextField name="Category" variant="outlined" label="Category" fullWidth
                value={postData.category}
                onChange={(e) => setPostData({...postData,category:e.target.value})}
                />
                <TextField name="Dimensions" variant="outlined" label="Dimensions" fullWidth
                value={postData.dimensions}
                onChange={(e) => setPostData({...postData,dimensions:e.target.value})}
                />
                <TextField name="Model" variant="outlined" label="Model" fullWidth
                value={postData.model}
                onChange={(e) => setPostData({...postData,model:e.target.value})}
                />
                <TextField name="Quantity" variant="outlined" label="Quantity" fullWidth
                value={postData.quantity}
                onChange={(e) => setPostData({...postData,quantity:e.target.value})}
                />
                <div className={classes.fileInput}>
                <FileBase 
                type="file"
                multiple={false}
                onDone={({base64}) => setPostData({...postData,selectedFile:base64})}></FileBase></div>
                <Button className={classes.buttonSubmit} color="primary" size="large" type="submit" fullWidth> Submit</Button>
                <Button color="secondary" size="small" onClick={clear} fullWidth> Clear</Button>
            </form>
            </Paper>

    );
}
export default Form;
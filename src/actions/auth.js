import * as api from '../api';

export const signin = (form,navigate) => async(dispatch) => {
    try{
        const {data} = await api.signin(form);
        console.log(data);
        dispatch({type:'AUTH',payload:data});
        //console.log(data);
        //dispatch({ type: 'FETCH_ALL', payload:data});
        navigate('/');
    }
    catch (error) {
        console.log(error.message);
    }

}

export const signup = (form,navigate) => async(dispatch) => {
    try{
        const {data} = await api.signup(form);
        //console.log(data);
        dispatch({type:'AUTH',payload : data});
        navigate('/');
    }
    catch (error) {
        console.log(error.message);
    }

}

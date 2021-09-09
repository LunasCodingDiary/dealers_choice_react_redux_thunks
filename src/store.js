import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import axios from 'axios';

const initialState = {  //is this useful?
  movies: [],
  view: ''
};


//Reducers

const view = (state = '' , action)=> {
    if(action.type === 'SET_VIEW'){
      state = action.view;
    }
    return state;
  };
  
const movies =  (state = [], action)=> {
    if(action.type === 'LOAD'){
      state = action.movies;
    }
    if(action.type === 'UPDATE'){
      state = state.map(movie => movie.id === action.movie.id ? action.movie : movie );
    }
    if(action.type === 'CREATE'){
      state= [...state, action.movie];
    }
      
    return state;
  };
  
//Combine reducers
const reducer = combineReducers(
    {
      movies, 
      view
    }
  );

//Create store; use thunk to transform each action to a function
const store = createStore(reducer, applyMiddleware(thunk, logger));
export const fetchMovies = () =>{
    return async(dispatch)=> {
      const movies = (await axios.get('/api/movies')).data;
      dispatch({
            type: 'LOAD',
            movies
      })
    }
  } 
  
export const updateMovies = ()=> {
    return async(dispatch)=>{
      const updated = (await axios.put(`/api/movies/${movie.id}`, {watched: !grocery.watched})).data;
      dispatch({type:'UPDATE', movie: updated});
    };
  };
  
  export const createMovies = (name)=> {
    return async(dispatch)=>{
      const movie = (await axios.post(`/api/movies/${ name?'':'random'}`, name ? {name} : null)).data;
      dispatch({type:'CREATE', movie});
    };
  };
  
export default store;
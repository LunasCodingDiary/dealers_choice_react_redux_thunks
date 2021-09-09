import React from 'react';
import axios from 'axios';

import {connect} from 'react-redux';

const _Movies = ({ movies, view, toggle, create}) => {
    return (
        <div>
            <button onClick = {create}>Create</button>
            <ul>
               {
                   movies.filter(movie => !view || ( movie.watched && view === 'watched') ||( !movie.watched && view === 'watchlist') ).map( movie => {
                    return (
                      <li onClick={ ()=> toggle(movie)} key={ movie.id } className={ movie.watched ? 'watched': ''}>{ movie.name }</li>
                    );
                  })

               } 
            </ul>
        </div>
    )
}

const mapDispatchToProps = (dispatch)=> {
    return {
      toggle: async(grocery)=>{
        const updated = (await axios.put(`/api/groceries/${grocery.id}`, { purchased: !grocery.purchased })).data;
        dispatch({ type: 'UPDATE', grocery: updated});
  
      }, 
      create: async()=>{
        const grocery = (await axios.post('/api/groceries/random')).data;
        dispatch({ type: 'CREATE', grocery });
  
      } 
    };
  };
  
const Movies = connect(state => state, mapDispatchToProps)(_Movies);
  
export default Movies;
  const mapDispatchToProps = (dispatch)=> {
    return {
      toggle: async(movie)=>{
        const watched = (await axios.put(`/api/movies/${movie.id}`, { watched: !movie.watched })).data;
        dispatch({ type: 'UPDATE', movie: watched});
  
      }, 
      create: async()=>{
        const movie = (await axios.post('/api/movies/random')).data;
        dispatch({ type: 'CREATE', movie });
  
      } 
    };
  };
  
  const Movies = connect(state => state, mapDispatchToProps)(_Movies);
  
  export default Movies;
    
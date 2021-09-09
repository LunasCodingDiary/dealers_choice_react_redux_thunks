import React, { Component } from 'react';
import { render } from 'react-dom';
import { connect, Provider } from 'react-redux';
import axios from 'axios';
import store from './store.js'
import thunk from "redux-thunk";

//component 1: Movie



//component 2: Nav



//Redux

class _App extends Component{
    componentDidMount(){
      this.props.bootstrap();
      window.addEventListener('hashchange', ()=> {
        this.props.setView(window.location.hash.slice(1));
      })
      this.props.setView(window.location.hash.slice(1));
    }
    render(){
      const { movies, view } = this.props;
      return (
        <div>
          <h1>My Movie List</h1>
          <Nav />
          <CreateForm />
          <Movies />
        </div>
      );
    }
  }
  
const App = connect(
    state => state,
    (dispatch)=> {
      return {
        setView: (view)=> dispatch({ type: 'SET_VIEW', view }), 
        bootstrap: ()=> dispatch(fetchMovies())
      }
    }
  )(_App);
  
  
render(<Provider store={ store }><App /></Provider>, document.querySelector('#root'));
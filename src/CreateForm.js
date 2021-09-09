import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class CreateForm extends Component{
  constructor(){
    super();
    this.state = {
      name: ''
    };
  }
  render(){
    const { name } = this.state;
    return (
      <form>
        <input value={ name } onChange={ ev => this.setState({ name: ev.target.value})}/>
        <button onClick={()=> this.props.create(this.state.name)}>Create</button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    create: async(name)=> {
      const movie = (await axios.post('/api/movies', { name })).data;
      dispatch({ type: 'CREATE', movie });
    }
  };
}

export default connect(null, mapDispatchToProps)(CreateForm);

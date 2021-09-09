import React from 'react';
import { connect } from 'react-redux';

const Nav = ({ movies, view })=> {  // the name should be exactly the same, because that's how they are exported.
  const watchlist = movies.filter(movie => !movie.watched);
  const watched = movies.filter(movie => movie.watched);
  return (
    <nav>
      <a href='#' className={ !view ? 'selected': ''}>All ({ movies.length })</a>
      <a href='#needs' className={ view === 'watchlist' ? 'selected': ''}>Needs ({ watchlist.length})</a>
      <a href='#purchased' className={ view === 'watched' ? 'selected': ''}>Purchased ({ watched.length })</a>
    </nav>
  );
};


export default connect(state => state )(Nav);

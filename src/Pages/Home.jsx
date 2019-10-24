import React, { Component } from 'react'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { getMovies, searchMovies } from '../Redux/movies/actions';
import Navbar from '../Components/navbar';
import TopPart from '../Components/topPart';
import MoviesPoster from '../Components/moviePoster';
import Rating from '../Components/rating/rating';
import {debounce} from 'lodash'

class Home extends Component {
  componentDidMount(){
    this.props.getMovies()
  }

  state = {
    timeout: 0
  }
  
  search = debounce((e, value) => {
    e.preventDefault()
    if (value !== ''){
      this.props.searchMovies(value)
    }else{
      this.props.getMovies()
    }
  }, 500)

  searchWithStars = (stars) => {
    this.props.getMovies(1, stars)
  }
  render() {
    const {movies, loading, search, rating} = this.props
    return (
      <>
      <Navbar/>
      <TopPart>
        <div className="search">
          <h4>YOUR FAVORITE MOVIES.</h4>
          <form onSubmit={(e) => this.search(e, e.target.value)}>
            <input type="text" name='search' ref='search' placeholder='Search for a movie' onChange={(e) => this.search(e, e.target.value)}/>
          </form>
        </div>
      </TopPart>
      {loading ? 
        'loading...' :
      <div className="container-fluid">
        <div className="rating right">
          <Rating rating={rating} search={search} searchBy={this.searchWithStars} enabled={true} />
        </div>
        <br/><br/>
        <div className="row">
          {movies.map( movie => {
            return(
            <div className="col s12 m4 l3" key={movie.id}>
              <MoviesPoster movie={movie}/>
            </div>
            )
          })}
        </div>
      </div>
      }
      </>
    )
  }
}


const mapStateToProps = state => 
({ 
  message: state.movies.message, 
  search: state.movies.search, 
  movies: state.movies.movies, 
  rating: state.movies.rating, 
  loading: state.movies.loading
})
const mapDispatchToProps = dispatch => bindActionCreators({getMovies, searchMovies}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Home)
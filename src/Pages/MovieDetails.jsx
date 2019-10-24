import React, { Component } from 'react'
import { getSingleMovie } from '../Redux/movies/actions'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Navbar from '../Components/navbar'
import TopPart from '../Components/topPart'
import Rating from '../Components/rating/rating';

class MovieDetails extends Component {
  componentDidMount(){
    this.props.getSingleMovie(this.props.match.params.id)
  }
  render() {
    const {loading} = this.props
    const {movie} = this.props || {}
    return (
      <>
      <Navbar/>
      {loading ? 
        'loading...' :
        <>
        <TopPart background={movie.backdrop_path}>
          <div className="movie-details">
            <h4>{movie.original_title}</h4>
            <h6>{movie.tagline}</h6>
            <div className="genres">
              {(movie.genres || []).map( genre =>{
                return(
                  <span key={`genre${genre.id}`} className="genre">{genre.name}</span>
                )
              })}
            </div>
            <Rating rating={movie.vote_average/ 2}/>
            <br/><br/>
            <span>{movie.vote_count} votes</span>
          </div>
        </TopPart>
        <div className="container-fluid">
            <h4 className='overview'>Overview</h4>
            <p>{movie.overview}</p>
            <br/>
            <div className="statusDate">
              <span className='status'>{movie.status}</span>
              <span className='date'>{new Date(movie.release_date).toDateString()}</span>
            </div>
            <br/> <br/>
            <div className="row">
              <div className="col s6 m3">
                <div className="content center">
                  <span className="little-title">RUNTIME (MIN)</span>
                  <h3>{movie.runtime}</h3>
                </div>
              </div>
              <div className="col s6 m3">
              <div className="content center">
                  <span className="little-title">LANG</span>
                  <h3>{movie.original_language}</h3>
              </div>
              </div>
              <div className="col s6 m3">
              <div className="content center">
                  <span className="little-title">BUDGET</span>
                  <h3>{(movie.budget/1000000)}M</h3>
              </div>
              </div>
              <div className="col s6 m3">
              <div className="content center">
                  <span className="little-title">STATUS</span>
                  <h3>{movie.status}</h3>
              </div>
              </div>
            </div>
        </div>
        </>
      }
        
      </>
    )
  }
}

const mapStateToProps = state => 
({ 
  message: state.movies.message, 
  movie: state.movies.movie, 
  loading: state.movies.loading
})
const mapDispatchToProps = dispatch => bindActionCreators({getSingleMovie}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails)
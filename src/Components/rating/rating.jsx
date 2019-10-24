import React from 'react'
import { searchMovies } from '../../Redux/movies/actions'

export default function Rating({rating, search, searchBy, enabled}) {
  let stars = ['','','','','']
  const searchByStars = (i) =>{
    if (enabled){
      if (stars[i] !== 'filled'){
        for (let index = 0; index < i+1; index++) {
            stars[index]= 'filled'
        }
        searchBy( (i+1)*2)
      }else{
        stars = ['','','','','']
        searchBy()
    }  }
  }
  for (let index = 0; index < stars.length; index++) {
    if(index < rating){
      stars[index]= 'filled'
    }
  }
  if (rating && rating.toString().split('.')[1]){
      let decimal = rating.toString().split('.')[1]
      let number = parseInt(rating)
      decimal >= 3 && decimal <= 7 ? stars[number]= 'half' : stars[number]= ''
  }
  return(
    <div className='rating-stars'>
      {stars.map( (s, index) =>{
        return(
          <i key={index + 'star'} onClick={() =>searchByStars(index)} className={s !== '' ? s === 'half' ? 'icon-star-half-empty':'icon-star filled': 'icon-star'}></i>
        )
      })}
    </div>
  )
}

import React from 'react'
import fondo from '../../Assets/images/fondo.jpg'

export default function TopPart({background, children}) {
  if (background)
    return (
      <div className="topPart valign-wrapper" style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original/${background})`, backgroundSize: '100% 100%'}} >
        {children}
      </div>
    )
  else
    return(
      <div className="topPart valign-wrapper" style={{ backgroundImage: `url(${fondo})`, backgroundSize: '100% 100%'}} >
        {children}
      </div>
    )
}

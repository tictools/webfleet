import React from 'react'

export default function({error}){
  return(
    <div className="feedback feedback__wrapper">
      <p className="feedback__text">{error}</p>
    </div>
  )
}
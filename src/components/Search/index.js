import React from 'react'

export default function({onSetQuery}){
  return(
    <div className="form form__wrapper">
      <form onSubmit={event=>{
              event.preventDefault()
              const { target : { q : { value : query } } } = event
              onSetQuery(query)
        }} className="form__box">
        <input type='text' name="q" />
        <button>Search</button>
      </form>
    </div>
  )
}
import React from 'react';

export default function ({ type }) {
  if(type === 'table') {
    return(<tbody className="spinner-border text-light text-center"></tbody>)
  } else {
    return(<div className="spinner-border text-light text-center"></div>)
  }
}


export const SpinDot = () => {
  return(
    <div className="spinner-grow text-primary" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  )
}
import React from 'react';
export default function Card({ image, name, origin, species, espisode }) {
  return (
    <div>
      <img src={image} alt='Pic not found' />
      <h2>{name}</h2>
      <h3>{origin}</h3>
      <h3>{species}</h3>
      <h5>{espisode}</h5>
    </div>
  )
}
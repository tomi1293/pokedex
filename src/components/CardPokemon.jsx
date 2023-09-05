import React from 'react'
import { Link } from 'react-router-dom'

export const CardPokemon = ({pokemon}) => {

    const imagen =
        pokemon.sprites.other.dream_world.front_default ||
        `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` ||
        pokemon.sprites.other.home.front_default 

  return (
    <Link to={`/pokemon/${pokemon.id}`} className='card-pokemon'>
        <div className='card-img'>
            <img
                src={imagen}
                alt={`Pokemon ${pokemon.name}`}
            />
        </div>
        <div className='card-info'>
            <span className='pokemon-id'>N° {pokemon.id}</span>
            <h3>{pokemon.name}</h3>
            <div className='card-types'>
                {pokemon.types.map(type => (
                    <span key={type.type.name} className={type.type.name}>
                        {type.type.name}
                    </span>
                ))}
            </div>
        </div>
    </Link>
  )
}

import React, { useContext } from 'react'
import { PokemonContext } from '../context/PokemonContext';
import { Card2 } from '../components/Card2';

export const AllPokemonPage = () => {

    const {globalPokemons} = useContext(PokemonContext);

    return (
        <div className="card-list-pokemon container">
            { 
            globalPokemons.map( pokemon => <Card2 pokemon={pokemon} key={pokemon.id}/>)
            }
        </div>
    )
}

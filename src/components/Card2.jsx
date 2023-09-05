import { primerMayuscula } from "../helpers/helper"


export const Card2 = ({pokemon}) => {

    const imagen =
    pokemon.sprites.other.dream_world.front_default ||
    `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png` ||
    pokemon.sprites.other.home.front_default 

    return (
        <div className="pokemon-container2">
            <div className="card-pokemon2">
                <div className="card-img2">
                    <img src={imagen} alt={pokemon.name}/>
                </div>
                <div className="card-info2">
                    <p className="pokemon-id">#{pokemon.id}</p>
                    <p>{primerMayuscula(pokemon.name)}</p>
                </div>
            </div>
        </div>
    )
}

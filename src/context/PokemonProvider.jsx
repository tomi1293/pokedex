import { useEffect, useState } from "react";
import { PokemonContext } from "./PokemonContext"
import { useForm } from "../hooks/useForm";

export const PokemonProvider = ({children}) => {

    //todo ESTADOS
    const [allPokemons, setAllPokemons] = useState([])
    const [globalPokemons, setGlobalPokemons] = useState([])
    const [offset, setOffset] = useState(0);

    //Utilizar customHook useForm
    const { valueSearch, onInputChange, onResetForm } = useForm({valueSearch:''})

    //Estados simples
    const [loading,setLoading] = useState(true)
    const [active, setActive] = useState(false)

    //todo PETICIONES
    //*Lllamar 50 pokemons a la api
    const getAllPokemons = async(limit = 50) => {
        const baseURL = 'https://pokeapi.co/api/v2/';

        //Hacemos la peticion que nos devuielve x cantidad de pokemon.
        const res = await fetch(`${baseURL}pokemon?limit=${limit}&offset=${offset}`)
        const data = await res.json();

        // recorremos data.results y hacemos una peticion en cada iteracion, esto me va a devolver un array de promesas
        const promises = data.results.map(async(pokemon)=>{
            const res = await fetch(pokemon.url);
            const data  = await res.json();
            return data;
        })

        //De esta manera podemos resolver todo el array de promesas y guardar la info en los resultados
        const results = await Promise.all(promises)
        setAllPokemons([ ...allPokemons, ...results ])
        setLoading(false)
        // console.log(results.map( p => p.sprites.other))
    }

    //*Llamar todos los pokemons
    const getGlobalPokemons = async() => {
        const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseURL}pokemon?limit=100000&offset=0`)
        const data = await res.json();

        const promises = data.results.map(async(pokemon)=>{
            const res = await fetch(pokemon.url);
            const data  = await res.json();
            return data;
        })

        const results = await Promise.all(promises)
        setGlobalPokemons(results)
        setLoading(false)
        // console.log(results)
    }

    //*Llamar a un pokemon por id
    const getPokemonById = async(id) => {
        const baseURL = 'https://pokeapi.co/api/v2/';

        const res = await fetch(`${baseURL}pokemon/${id}`)
        const data = await res.json()
        return data

    }

    //todo EFECTOS
    useEffect(() => {
        getAllPokemons();
    }, [offset])

    useEffect(() => {
        getGlobalPokemons();
    }, [])
    
    const onClickLoadMore = () => {
       setOffset( offset + 50 )
    }
    
    //Filter funcions 
    const [typeSelected, setTypeSelected] = useState({
        grass: false,
		normal: false,
		fighting: false,
		flying: false,
		poison: false,
		ground: false,
		rock: false,
		bug: false,
		ghost: false,
		steel: false,
		fire: false,
		water: false,
		electric: false,
		psychic: false,
		ice: false,
		dragon: false,
		dark: false,
		fairy: false,
		unknow: false,
		shadow: false,
    })
    const [filteredPokemons, setFilteredPokemons] = useState([]);
    const handleCheckBox = (e) => {
        
        setTypeSelected({
            ...typeSelected,
            [e.target.name]: e.target.checked
        })

        if(e.target.checked){
            const filteredResults = globalPokemons.filter( pokemon =>
                pokemon.types
                    .map( type => type.type.name)
                    .includes(e.target.name)    
            );
            setFilteredPokemons([...filteredPokemons,...filteredResults])
        } else {
            const filteredResults = filteredPokemons.filter( pokemon =>
                !pokemon.types
                    .map( type => type.type.name)
                    .includes(e.target.name)    
            );
            setFilteredPokemons([...filteredResults])
        }

    }

    return (
        <PokemonContext.Provider value={{
            valueSearch,
            onInputChange,
            onResetForm,
            allPokemons,
            globalPokemons,
            getPokemonById,
            onClickLoadMore,
            loading,
            setLoading,
            active,
            setActive,
            handleCheckBox,
            filteredPokemons
        }}>
            {children}
        </PokemonContext.Provider>
  )
}


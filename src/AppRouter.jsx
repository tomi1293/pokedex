import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { PokemonPage, HomePage, SearchPage } from './pages';
import { AllPokemonPage } from './pages/AllPokemonPage';

export const AppRouter = () => {
  return (
    <Routes>

        //todo Rutas anidadas
        <Route path='/' element={<Navigation/>} >
    
            <Route index element={<HomePage/>} />
            <Route path='pokemon/:id' element={<PokemonPage/>} />
            <Route path='search' element={<SearchPage/>} />
    
        </Route>
        
        <Route path='todos' element={<AllPokemonPage/>} />

        <Route path='*' element={<Navigate to='/' />} />

    </Routes>
  )
}


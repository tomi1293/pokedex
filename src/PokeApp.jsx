import { AppRouter } from './AppRouter'
import { PokemonProvider } from './context/PokemonProvider'

export const PokeApp = () => {
  return (
    <PokemonProvider>
      <AppRouter/>
    </PokemonProvider>
  )
}

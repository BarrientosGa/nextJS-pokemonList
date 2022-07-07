import type { GetStaticProps, NextPage } from 'next'
import {Grid} from '@nextui-org/react';
import { pokeApi } from '../api'
import { Layout } from '../components/layouts'
import {PokemonCard} from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces'

interface Props {
  pokemons: SmallPokemon[];
}


const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de pokemons'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((poke) => (
            <PokemonCard pokemon={poke} key={poke.id} />
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

/* 
  - se usa en modo produccion (build | solo se ejecuta una sola ves), 
    se precarga la informacion antes de que
    el usuario la pida, si estamos en desarrollo se ejecuta una y otra
    vez (normal)
  - esto se ejecuta del lado del servidor, si por ejemplo queremos pasar
    un console.log dentro de la funcion nunca lo va a mostrar en el
    navegador
  - se usa solamente dentro de pages
  - la preinsercion sucede mientras nosotros desarrollamos la aplicacion
  - al hacer el build ya no va llegar al endpoint porque esa data la tenemos
    nosotros y tambien genera un json propio con toda la data

*/
export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')
  const pokemons: SmallPokemon[] = data.results.map((poke, i) => ({
    ...poke,
    id: i + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i + 1}.svg`
  }))

  return {
    props: {
      pokemons
    }
  }
}



export default HomePage

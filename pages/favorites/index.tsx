import { NextPage } from "next"
import { Layout } from "../../components/layouts"
import { NoFavorites } from "../../components/ui"
import { useEffect, useState } from 'react';
import { localFavorites } from "../../utils";
import { FavoritesPokemons } from "../../components/pokemon";


const FavoritesPage: NextPage = () => {

    const [favoritePokemons, setfavoritePokemons] = useState<number[]>([])

    useEffect(() => {
        setfavoritePokemons(localFavorites.pokemons())
    }, [])



    return (
        <Layout title='Pokemons - Favoritos'>

            {
                favoritePokemons.length === 0 ? <NoFavorites /> :
                    <FavoritesPokemons pokemons={favoritePokemons} />
            }
        </Layout>
    )
}

export default FavoritesPage
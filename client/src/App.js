import './App.css';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql, useLazyQuery } from '@apollo/client';

//Components
import Input from './Components/Input';
import Output from './Components/Output';
import Email from './Components/Email';

// Apollo client setup
const client = new ApolloClient({
  uri:'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache()
});

function App() {

  const [pokemonInput, setPokemonInput] = useState("test");

  // Query
  const GET_POKEMON_QUERY = gql`
    query GetPokemon($pokemon: String!){
      pokemon(name: $pokemon){
        name
        number
        classification
        types
        image
        maxHP
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `;
  const [getPokemon, {loading, error, data}] = useLazyQuery(GET_POKEMON_QUERY)

  const takePokemonName = (pokemon) => {
    setPokemonInput(pokemon);
    getPokemon({variables: {pokemon: pokemon}});

  }


  if (error) return `Error! ${error}`;

  return (
    <ApolloProvider client={client}>
      <div className ="App">
        <Input 
          takePokemonName = {takePokemonName}
        />
        {data?.pokemon.name &&
        <Output 
          name = {data.pokemon.name}
          number = {data.pokemon.number}
          hp = {data.pokemon.maxHP}
          attacks = {data.pokemon.attacks.special}
          type = {data.pokemon.types}
          image = {data.pokemon.image}
        />
        }
        {data?.pokemon.name &&
        <Email 
          name = {data.pokemon.name}
          number = {data.pokemon.number}
          hp = {data.pokemon.maxHP}
          attacks = {data.pokemon.attacks.special}
          type = {data.pokemon.types}
          image = {data.pokemon.image}
        />
        }
        
        {loading == true && <p style={{textAlign: "center"}}>Loading ...</p>}

      </div>
    </ApolloProvider>
  );
}

export default App;

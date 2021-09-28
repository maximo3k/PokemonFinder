import './App.css';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider, useQuery, gql } from '@apollo/client';

//Components
import Input from './Components/Input';

// Apollo client setup
const client = new ApolloClient({
  uri:'https://graphql-pokemon2.vercel.app/',
  cache: new InMemoryCache()
});



function App() {

  const [pokemonInput, setPokemonInput] = useState();

  // Query
  const getPokemonQuery = gql`
  {
    query{
      pokemon(name: "{pokemonInput}}"){
        name
        image
      }
    }
  }
  `;

  
  const takePokemonName = (pokemon) => {
    setPokemonInput(pokemon);
    console.log(pokemon);
  }

  return (
    <ApolloProvider client={client}>
      <div className ="App">
        <Input 
          takePokemonName = {takePokemonName}
        />
        <p>{useQuery(getPokemonQuery)}</p>
      </div>
    </ApolloProvider>
  );
}

export default App;

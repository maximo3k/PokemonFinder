import {React, useState } from 'react'

function Input(props) {

    const [pokemon, setPokemon] = useState("")

    function handleSubmit(e) {
        props.takePokemonName(pokemon);
        e.preventDefault();
    }

    return (
        <div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input id="pkn" type="text" placeholder="Which pokemon?" value={pokemon} onChange={(e) => setPokemon(e.target.value)}/>
                    <button type="submit">Fetch</button>
                </form>
                <p>Out of Ideas? Try Pikachu, Charizard or Ninetales</p>
            </div>
        </div>
    )
}

export default Input

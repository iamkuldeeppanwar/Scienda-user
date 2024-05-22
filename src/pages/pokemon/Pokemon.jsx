import React, { useState } from 'react'
import { useGetPokemonByNameQuery } from '../../app/services/pokemon'

const Pokemon = () => {
    const [input, setInput] = useState('')
    const [selected, setSelected] = useState('bulbasaur')
    const { data, error, isLoading } = useGetPokemonByNameQuery(selected);

    return (
        <div className="App">
            
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
            <button onClick={() => setSelected(input)}>
                Submit
            </button>


            {error ? (
                <>Oh no, there was an error</>
            ) : isLoading ? (
                <>Loading...</>
            ) : data ? (
                <>
                    <h3>{data?.species?.name}</h3>
                    <img src={data?.sprites?.front_shiny} alt={data.species.name} />
                </>
            ) : null}
        </div>
    )
}

export default Pokemon
'use client'
import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Popover, PopoverContent, PopoverTrigger
} from "@/components/ui/popover";
import { Label } from '@/components/ui/label';
import { observer } from '@legendapp/state/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

const CardFindPokemon = observer(() => {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonData, setPokemonData] = useState({ name: '', type: '', loading: false});

  const handleSubmit = async () => {
    if (!pokemonName.trim()) return;

    setPokemonData({ ...pokemonData, loading: true });
    try {
      const url = new URL(`${POKEMON_API_URL}/${pokemonName}`, window.location.origin);

      const response = await fetch(url);
      const data = await response.json();

      if (data.types && data.types[0]) {
        setPokemonData({
          name: data.name,
          type: data.types[0].type.name,
          loading: false,
       });
      } else {
        setPokemonData({ ...pokemonData, loading: false });
      }
    } catch (error) {
      console.error(error);
      setPokemonData({ ...pokemonData, loading: false });
    }
  };

  return (
    <div className="max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <CardHeader>
        <CardTitle><b className='text-yellow-500'>Poke</b><b className='text-red-600'>Info</b></CardTitle>
        <CardDescription>Pesquise e receba informações do seu Pokémon</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6 ">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 mx-auto">
            <Label htmlFor="pokemon">Nome do Pokémon</Label>
            <input
              id="pokemon"
              placeholder="Insira o nome do Pokemon"
              value={pokemonName}
              className='w-42 p-2'
              onChange={(event) => setPokemonName(event.target.value)}
            />
          </div>
        </div>
        {pokemonData.loading && (
          <p>Buscando informações do Pokémon...</p>
        )}
      </CardContent>
      <Popover>
        <CardFooter className="justify-between space-x-2">
          <Button className='rounded-xl border border-gray-100 p-3 bg-white hover:bg-gray-100' onClick={handleSubmit}>
            <PopoverTrigger>Buscar</PopoverTrigger>
          </Button>
          <PopoverContent className='bg-white align-center justify-center '>
            {pokemonData.name && !pokemonData.loading && (
              <div>
                <h2>Informações do Pokémon</h2>
                <h2> <b className='text-red-500'>Nome:</b> <b className='text-yellow-500'>{pokemonData.name}</b></h2>
                <h2><b className='text-red-500'>Tipo:</b>  <b className='text-yellow-500'>{pokemonData.type}</b></h2>
                </div>
            )}
          </PopoverContent>
        </CardFooter>
      </Popover>
    </div>
  );
})

export default CardFindPokemon;

"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState, useEffect } from 'react'

const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

const pokemonData = {
  name: '',
  type: '',
  abilities: [],
  color: '', 
  loading: false,
};

function App() {
  const [selectedPokemon, setSelectedPokemon] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  const handleSubmit = async () => {
    pokemonData.loading = true;
    try {
      let url = `${POKEMON_API_URL} + ${selectedPokemon}`;
      if (selectedColor) {
        url + `${selectedColor}`;
      }

    let urlFinal = `${POKEMON_API_URL}/${selectedPokemon}${selectedColor ? `?color=${selectedColor}` : ''}`;

      const response = await fetch(urlFinal);
      const data = await response.json();

      console.log('AQUI ESTÁ A DATA DO POKEMON',data)
      console.log('AQUI ESTÁ A RESPONSE DO POKEMON',response)

      pokemonData.name = data.name;
      pokemonData.type = data.types[0].type.name;
      pokemonData.abilities = data.abilities.map((ability: any) => ability.name);
    } catch (error) {
      console.error(error);
    } finally {
      pokemonData.loading = false;
    }
  };

  useEffect(() => {
    if (selectedPokemon) {
      handleSubmit();
    } else {
      pokemonData.name = '';
      pokemonData.type = '';
      pokemonData.abilities = [];
      pokemonData.color = '';
      pokemonData.loading = false;
    }
  }, [selectedPokemon, selectedColor]);

  console.log('Nome do Pokemon',selectedPokemon)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Escolha seu Pokemon</CardTitle>
        <CardDescription>Filtre pela cor ou nome do Pokemon desejado</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2 mx-auto">
            <Label htmlFor="pokemon">Nome do Pokemon</Label>
            <Input
              id="pokemon"
              placeholder="Insira o nome do Pokemon"
              value={selectedPokemon}
              onChange={(event) => setSelectedPokemon(event.target.value)}
            />
          </div>
          <div className="grid gap-2 mx-auto">
            <Label htmlFor="color">Cor do Pokemon (opcional)</Label>
            <Input
              id="color"
              placeholder="Selecione a cor do Pokemon"
              value={selectedColor}
              onChange={(event) => setSelectedColor(event.target.value)}
            />
          </div>
        </div>
        {pokemonData.name && !pokemonData.loading && (
          <div>
            <h2>Informações do Pokémon</h2>
            <p>Nome: {pokemonData.name}</p>
            <p>Tipo: {pokemonData.type}</p>
            <p>Habilidades:</p>
            <ul>
              {pokemonData.abilities.map((ability) => (
                <li key={ability}>{ability}</li>
              ))}
            </ul>
          </div>
        )}
        {pokemonData.loading && (
          <p>Buscando informações do Pokémon...</p>
        )}
      </CardContent>
      <CardFooter className="justify-between space-x-2">
        <Button variant="ghost" onClick={handleSubmit}>
          Buscar
        </Button>
      </CardFooter>
    </Card>
  );
}

export default App;

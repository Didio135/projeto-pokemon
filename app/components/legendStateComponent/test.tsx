'use client'

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { observer, useObservable } from '@legendapp/state/react';


const CardFindPokemon1 = observer(() => {
    const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon';

    const busy$ = useObservable(false)
    const pokemonName$ = useObservable('')
    const pokemonData$ = useObservable({
        name: '',
        type: '',
    })

    const handleSubmit = async () => {
        if (pokemonData$.name.peek().length === 0) {
            return window.alert('Preencha o nome do pokemon!')
        }

        busy$.set(true)
        try {
            const url = new URL(`${POKEMON_API_URL}/${pokemonName$.peek()}`, window.location.origin);

            const response = await fetch(url);
            const data = await response.json();

            if (data.types && data.types[0]) {
                pokemonData$.set({
                    name: data.name,
                    type: data.types[0].type.name,
                })
            }

        } catch (error) {
            console.error(error);
        } finally {
            busy$.set(false)
        }
    };

    return (
        <div className="max-w-sm p-6 bg-white border rounded-lg border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
                <CardTitle>PokeInfo</CardTitle>
                <CardDescription>Pesquise e receba informações do seu Pokemon</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 ">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2 mx-auto">
                        <Label htmlFor="pokemon">Nome do Pokemon</Label>
                        <Input
                            id="pokemon"
                            placeholder="Insira o nome do Pokemon"
                            onChange={(event) => pokemonName$.set(event.target.value)}
                        />
                    </div>
                </div>
                {pokemonData$.name.get() && !busy$.get() && (
                    <div>
                        <h2>Informações do Pokémon</h2>
                        <p>Nome: {pokemonData$.name.get()}</p>
                        <p>Tipo: {pokemonData$.type.get()}</p>
                    </div>
                )}
                {busy$.get() && (
                    <p>Buscando informações do Pokémon...</p>
                )}
            </CardContent>
            <CardFooter className="justify-between space-x-2">
                <Button variant="ghost" onClick={handleSubmit}>
                    Buscar
                </Button>
            </CardFooter>
        </div>
    );
})

export default CardFindPokemon1;

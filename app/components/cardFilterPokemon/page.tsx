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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"


export const CardFilterPokemon = () => {
    const APIpokemonMod = () => {

        const baseURL = "https://pokeapi.co/api/v2/pokemon";

        const url = `${baseURL}/${''}`;

        fetch(url)

            .then(response => response.json())
            // Manipula os dados obtidos (neste caso, imprime no console)
            .then(data => {
                console.log(data);
            });
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Escolha seu Pokemon</CardTitle>
                <CardDescription>Filtre pela cor ou nome do Pokemon desejado</CardDescription>
            </CardHeader>
            <div className="justify-center align-start self-start w-64 h-32 mx-auto">
                <Label className="w-8 !leading-tight" htmlFor="subject">Pesquise seu Pokemon pelo nome:</Label>
                <Input id="subject" placeholder="I need help with..." />
            </div>
            <CardContent className="grid gap-2">
                <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2 mx-auto">
                        <Label htmlFor="area">Cor</Label>
                        <Select defaultValue="billing">
                            <SelectTrigger id="area">
                                <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="blue">Azul</SelectItem>
                                <SelectItem value="yellow">Amarelo</SelectItem>
                                <SelectItem value="red">Vermelho</SelectItem>
                                <SelectItem value="green">Verde</SelectItem>
                                <SelectItem value="orange">Laranja</SelectItem>
                                <SelectItem value="pink">Rosa</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="justify-between space-x-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Pesquisar</Button>
            </CardFooter>
        </Card>
    )
}
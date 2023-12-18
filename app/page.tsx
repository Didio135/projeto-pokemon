import CardFindPokemon from './components/cardPokemon/page'

export default function Home() {
  
  return (
    <section className="bg-pokebola-bg bg-opacity-50 bg-center h-screen w-screen px-6">
    <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl text-center  mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white"> <b className='text-yellow-500'>Poke</b><b className='text-red-600'>Info</b></h1>
            <p className="max-w-2xl text-center mx-auto mb-6 font-bold pr-8 text-yellow-400 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">Pesquise seu <b className='text-red-500'>Pokémon</b> favorito e receba seu nome e tipo. </p>
            </div>
        <div className="max-w-fit lg:mt-0 lg:col-span-5 rounded-lg lg:flex">
            <CardFindPokemon />
        </div>                
    </div>
</section>
  )
}

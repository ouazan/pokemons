const express = require('express')
const bodyParser=require('body-parser')
let pokemons = require('./mock-pokemon')
const {success} = require('./helper')

const app = express()
app.use(bodyParser.json())

app.get('/pokemons/:id',(req,res)=>{
    const id = parseInt(req.params.id)
    const pokemon = pokemons.find(pokemon=>pokemon.id===id)
    const message = `Le pokemon ${pokemon.name} a bien été trouvé`
    res.json(success(message,pokemon))
})

app.post('/pokemons',(req,res)=>{
    const id = pokemons.length + 1
    const newPokemon = {...req.body,...{id:id,created:new Date()}}
    pokemons.push(newPokemon)
    res.json(success('Ajouté',newPokemon))
})

// app.put('/pokemons/:id', (req, res) => {
//     const id = parseInt(req.params.id);
//     const pokemonUpdated = { ...req.body, id: id }
//     pokemons = pokemons.map(pokemon => {
//      return pokemon.id === id ? pokemonUpdated : pokemon
//     }) 
//     const message = `Le pokémon ${pokemonUpdated.name} a bien été modifié.`
//     res.json(success(message, pokemonUpdated))
//    })

app.listen('5000',()=>console.log('OK sur port 5000'))
import './App.css' 
import {destinatii as destinatiiInitiale} from './data/destinatii.js'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import Rezumat from './components/Rezumat.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import { useState } from 'react'
import { adaugaDestinatie, getNevizitate, marcheazaVizitat, totalZile, stergeDestinatie } from './utils/destinatii.js'
  
export default function App() { 
  const [destinatii, setDestinatii] = useState(destinatiiInitiale)
  const handleToggle = (id) => {
    setDestinatii((curent) => marcheazaVizitat(curent, id))
  }
  const handleDelete = (id) => {
    setDestinatii((curent) => stergeDestinatie(curent, id))
  }
  const handleAdd = (destinatie) => {
    setDestinatii((curent) => adaugaDestinatie(curent, destinatie))
  }

  const nevizitate = getNevizitate(destinatii)
  const zileDeVizitat = totalZile(nevizitate)

  return ( 
    <main> 
      <h1>City Explorer</h1>
      <FormularDestinatie onAdd={handleAdd} />
      <Rezumat
        total={destinatii.length}
        nevizitate={nevizitate.length}
        zile={zileDeVizitat}
      />
      <ListaDestinatii
        destinatii={destinatii}
        onToggle={handleToggle}
        onDelete={handleDelete}
      />
    </main> 
  )
}
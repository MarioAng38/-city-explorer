import './App.css'
import { useEffect, useState } from 'react'
import ListaDestinatii from './components/ListaDestinatii.jsx'
import Rezumat from './components/Rezumat.jsx'
import FormularDestinatie from './components/FormularDestinatie.jsx'
import Cautare from './components/Cautare.jsx'
import PanouStatistici from './components/PanouStatistici.jsx'
import PanouStatisticiGresit from './components/PanouStatisticiGresit.jsx'
import { getNevizitate, totalZile } from './utils/destinatii.js'
import {
  getDestinatii, postDestinatie, patchVizitat, deleteDestinatie,
} from './api/destinatii.js'

// Exercițiul 4: panoul de statistici se montează TEMPORAR.
//   'gresit' -> varianta din lucrare, cu cele șapte greșeli (pentru fișă, punctul 3)
//   'corect' -> varianta corectată
//   null     -> fără panou (așa rămâne pentru măsurătorile din fișă, punctele 1, 2, 4, 5)
const PANOU = null

export default function App() {
  // Exercițiul 1b: cele trei stări ale cererii
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)

  // Exercițiul 2c: butonul dezactivat cât timp cererea POST este în curs
  const [seTrimite, setSeTrimite] = useState(false)

  // Exercițiul 3a: textul căutării
  const [cautare, setCautare] = useState('')

  // Exercițiul 5c: paginarea
  const [pagina, setPagina] = useState(1)
  const [totalPagini, setTotalPagini] = useState(1)

  useEffect(() => {
    async function incarca() {
      try {
        const raspuns = await getDestinatii(pagina)

        // Paginat, serverul trimite { pages, data, ... }; nepaginat, trimite lista.
        if (Array.isArray(raspuns)) {
          setDestinatii(raspuns)
          setTotalPagini(1)
        } else {
          setDestinatii(raspuns.data)
          setTotalPagini(raspuns.pages)
        }
      } catch (error) {
        setEroare(error.message)
      } finally {
        setIncarcare(false)
      }
    }

    incarca()
  }, [pagina])

  // Exercițiul 1c: modificarea pleacă întâi la server, apoi se pune în stare obiectul întors
  async function handleToggle(id) {
    const destinatie = destinatii.find((d) => d.id === id)
    if (!destinatie) return

    try {
      const salvata = await patchVizitat(id, !destinatie.vizitat)
      setDestinatii((curent) => curent.map((d) => (d.id === id ? salvata : d)))
    } catch (error) {
      setEroare(error.message)
    }
  }

  // Exercițiul 2c: în stare intră obiectul întors de server (cu id), nu cel trimis
  async function handleAdd(destinatie) {
    setSeTrimite(true)
    try {
      const salvata = await postDestinatie(destinatie)
      setDestinatii((curent) => [...curent, salvata])
      return true
    } catch (error) {
      setEroare(error.message)
      return false
    } finally {
      setSeTrimite(false)
    }
  }

  async function handleDelete(id) {
    try {
      await deleteDestinatie(id)
      setDestinatii((curent) => curent.filter((d) => d.id !== id))
    } catch (error) {
      setEroare(error.message)
    }
  }

  // Exercițiul 3b: se filtrează doar lista afișată; rezumatul rămâne pe starea completă
  const text = cautare.trim().toLowerCase()
  const afisate = destinatii.filter(
    (d) => d.oras.toLowerCase().includes(text) || d.tara.toLowerCase().includes(text),
  )

  const nevizitate = getNevizitate(destinatii)

  // Exercițiul 3c: două mesaje diferite pentru lista goală
  let continutLista
  if (destinatii.length === 0) {
    continutLista = (
      <p className="gol">
        Nu există încă nicio destinație. Adaugă prima destinație din formularul de mai sus.
      </p>
    )
  } else if (afisate.length === 0) {
    continutLista = <p className="gol">Niciun rezultat pentru «{cautare.trim()}».</p>
  } else {
    continutLista = (
      <ListaDestinatii destinatii={afisate} onToggle={handleToggle} onDelete={handleDelete} />
    )
  }

  return (
    <main>
      <h1>City Explorer</h1>

      {PANOU === 'gresit' && <PanouStatisticiGresit />}
      {PANOU === 'corect' && <PanouStatistici />}

      {incarcare ? (
        <p className="stare">Se încarcă destinațiile...</p>
      ) : eroare ? (
        <p className="stare eroare">{eroare}</p>
      ) : (
        <>
          <Rezumat
            total={destinatii.length}
            nevizitate={nevizitate.length}
            zile={totalZile(nevizitate)}
          />
          <FormularDestinatie onAdd={handleAdd} seTrimite={seTrimite} />
          <Cautare valoare={cautare} onChange={setCautare} />
          {continutLista}

          {totalPagini > 1 && (
            <div className="paginare">
              <button
                type="button"
                disabled={pagina === 1}
                onClick={() => setPagina((p) => p - 1)}
              >
                Înapoi
              </button>
              <span>pagina {pagina} din {totalPagini}</span>
              <button
                type="button"
                disabled={pagina === totalPagini}
                onClick={() => setPagina((p) => p + 1)}
              >
                Înainte
              </button>
            </div>
          )}
        </>
      )}
    </main>
  )
}

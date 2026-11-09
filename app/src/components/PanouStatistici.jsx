// Exercițiul 4: varianta CORECTATĂ. Fiecare corectură este marcată cu [n],
// numărul simptomului din lucrare / din fișă (punctul 3).
import { useEffect, useState } from 'react'

export default function PanouStatistici() {
  const [destinatii, setDestinatii] = useState([])
  const [incarcare, setIncarcare] = useState(true)
  const [eroare, setEroare] = useState(null)
  const [prag, setPrag] = useState('3')

  useEffect(() => {
    async function incarca() {
      try {
        const response = await fetch('http://localhost:3001/destinatii')

        if (!response.ok) {
          throw new Error(`Serverul a răspuns cu ${response.status}`)
        }

        const date = await response.json()
        setDestinatii(date)
      } catch (err) {
        setEroare(err.message)
      } finally {
        // [5] era în try: la eșec nu se mai ajungea aici și panoul rămânea pe „Se încarcă”
        setIncarcare(false)
      }
    }

    incarca()
  }, [])

  if (incarcare) {
    return <p className="stare">Se încarcă statisticile...</p>
  }

  if (eroare) {
    return <p className="stare eroare">Statistici indisponibile: {eroare}</p>
  }

  // [3] „cel puțin” înseamnă >=, nu > (Porto, cu exact 3 zile, lipsea)
  const filtrate = destinatii.filter((d) => d.zile >= Number(prag))
  // [1] totalul se calculează din cele filtrate, nu din toate destinațiile
  const totalZile = filtrate.reduce((suma, d) => suma + d.zile, 0)
  const medie = filtrate.length === 0 ? 0 : totalZile / filtrate.length

  return (
    <section className="panou">
      <h2>Statistici</h2>

      <label>
        Cel puțin{' '}
        <input
          type="number"
          value={prag}
          // [4] onChange primește evenimentul, nu valoarea
          onChange={(event) => setPrag(event.target.value)}
        />{' '}
        zile
      </label>

      {/* [2] condiție booleană: lista goală, nu „lista are elemente” */}
      {filtrate.length === 0 && (
        <p className="gol">Nicio destinație cu cel puțin {prag} zile.</p>
      )}

      {filtrate.length > 0 && (
        <ul>
          <li>Destinații: {filtrate.length}</li>
          <li>Total zile: {totalZile}</li>
          <li>Media: {medie.toFixed(1)} zile</li>
        </ul>
      )}
    </section>
  )
}

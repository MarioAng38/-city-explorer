// Exercițiul 5: pentru setul mare de date se schimbă TEMPORAR portul în 3002.
// La final se pune înapoi pe 3001.
const API_URL = 'http://localhost:3001'

// Exercițiul 5c: câte destinații cere aplicația pe o pagină.
// Pentru măsurătorile pe varianta NEPAGINATĂ (fișa, punctul 4) se pune null.
export const PE_PAGINA = 20

async function verifica(response) {
  if (!response.ok) {
    throw new Error(`Serverul a răspuns cu ${response.status}`)
  }

  return response.json()
}

// GET /destinatii?_page=N&_per_page=20
// Întoarce obiectul primit de la server ({ pages, items, data, ... }), nu doar lista.
// Cu PE_PAGINA = null cere lista completă (GET /destinatii) și întoarce lista.
export async function getDestinatii(pagina = 1) {
  const url = PE_PAGINA
    ? `${API_URL}/destinatii?_page=${pagina}&_per_page=${PE_PAGINA}`
    : `${API_URL}/destinatii`

  const response = await fetch(url)
  return verifica(response)
}

// POST /destinatii: întoarce obiectul salvat de server, cu id-ul generat de el
export async function postDestinatie(d) {
  const response = await fetch(`${API_URL}/destinatii`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(d),
  })

  return verifica(response)
}

// PATCH /destinatii/:id: schimbă doar câmpul vizitat
export async function patchVizitat(id, vizitat) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ vizitat }),
  })

  return verifica(response)
}

// DELETE /destinatii/:id: folosit de butonul „Șterge destinația” din lucrarea 3
export async function deleteDestinatie(id) {
  const response = await fetch(`${API_URL}/destinatii/${id}`, {
    method: 'DELETE',
  })

  return verifica(response)
}

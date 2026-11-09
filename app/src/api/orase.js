const API_URL = 'http://localhost:3001'

export async function fetchUsers() {
	const response = await fetch(`${API_URL}/users`)

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function fetchUserById(id) {
	const response = await fetch(`${API_URL}/users/${id}`)

	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`)
	}

	return response.json()
}

export async function getOrase() {
	const response = await fetch(`${API_URL}/orase`)

	if(!response.ok) {
		throw new Error(`Serverul a raspuns cu ${response.status}`)
	}

	return response.json()
}


export async function postOras(oras)  {
	const response = await fetch(`${API_URL}/orase`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(oras)
	})

	if(!response.ok) {
		throw new Error(`Serverul a raspuns cu ${response.status}`)
	}

	return response.json()
}
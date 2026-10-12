export const getOrase = (list) => list.map(({ oras }) => oras)

export const getNevizitate = (list) =>
	list.filter(({ vizitat }) => vizitat === false)

export const totalZile = (list) =>
	list.reduce((total, { zile }) => total + zile, 0)

export const formatDestinatie = ({ oras, tara, zile, vizitat }) =>
	`${vizitat ? '[x]' : '[ ]'} ${oras}, ${tara} (${zile} zile)`

export const numarPeTara = (list) =>
	list.reduce((counts, { tara }) => {
		counts[tara] = (counts[tara] ?? 0) + 1
		return counts
	}, {})

export const sortDupaZile = (list) =>
	[...list].sort((a, b) => b.zile - a.zile)

export const marcheazaVizitat = (list, id) =>
	list.map((destinatie) =>
		destinatie.id === id
			? { ...destinatie, vizitat: !destinatie.vizitat }
			: destinatie,
	)

export const adaugaDestinatie = (list, destinatie) => [...list, destinatie]

export const stergeDestinatie = (list, id) =>
	list.filter((destinatie) => destinatie.id !== id)

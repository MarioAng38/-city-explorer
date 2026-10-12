export const getScumpe = (list) => list.filter((o) => o.pret > 400) 
  
// agregare 
export const costTotal = (list) => 
  list.reduce((total, o) => total + o.pret, 0) 
  
// transformare, cu destructuring în parametri 
export const formatOras = ({ oras, tara, pret }) => 
  `${oras}, ${tara} - ${pret} euro (${pret > 400 ? 'scump' : 'accesibil'})` 
  
// grupare, cu acumulator obiect și cheie calculată 
export const costPeTara = (list) => 
  list.reduce((acc, { tara, pret }) => 
    ({ ...acc, [tara]: (acc[tara] ?? 0) + pret }), {}) 

export const scadePret = (list, id, reducere) => 
list.map((o) => 
o.id === id 
? { ...o, pret: o.pret - reducere } // element nou 
: o,                                
// element refolosit 
)

export const adaugaOras = (list, oras) => [...list, oras] 
export const stergeOras = (list, id) => list.filter((o) => o.id !== id) 
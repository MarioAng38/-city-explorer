import { StrictMode } from 'react' 
import { createRoot } from 'react-dom/client' 
import App from './App.jsx' 
import './index.css' 

import { destinatii } from './data/destinatii.js'
import {
  getOrase,
  getNevizitate,
  totalZile,
  formatDestinatie,
  numarPeTara,
  sortDupaZile,
  marcheazaVizitat,
  adaugaDestinatie,
  stergeDestinatie,
} from './utils/destinatii.js'
import { fetchUsers, fetchUserById } from './api/orase.js'

import { orase_fisier_separat } from './data/orase.js' 
console.log(orase_fisier_separat.length) // 4 

createRoot(document.getElementById('root')).render( 
<StrictMode> 
<App /> 
</StrictMode>, 
) 

// ===== Laboratorul 2 ===== 


// ===== Exemple ===== 
console.log('L2 Merge!')

const oras = 'Lisabona'   // text, numit string, se scrie între ghilimele 
const zile = 4            
// număr 
const vizitat = false     
// valoare logică: true sau false 
let contor = 0 
contor = contor + 1       
// permis, pentru că a fost declarat cu let 
console.log(oras, zile)   // afișează în consolă: Lisabona 4


const orase = ['Lisabona', 'Porto', 'Kyoto'] 
console.log(orase.length) // 3, câte elemente are lista 
console.log(orase[0])     
// 'Lisabona', numărarea începe de la 0 
const destinatie = { oras: 'Lisabona', tara: 'Portugalia', zile: 4 } 
console.log(destinatie.oras)  // 'Lisabona', accesul la o proprietate 
console.log(destinatie.zile)  // 4 
const destinatii_demo = [ 
{ oras: 'Lisabona', zile: 4 }, 
{ oras: 'Kyoto', zile: 6 }, 
] 
console.log(destinatii_demo[1].oras) // 'Kyoto'


const dublu = (n) => { 
  return n * 2 
} 
  
const triplu = (n) => n * 3 
  
console.log(dublu(5))  // 10 
console.log(triplu(5)) // 15 

const zile_nou = 4 
  
console.log(zile_nou === 4)   // true 
console.log(zile_nou !== 4)   // false 
console.log(zile_nou > 2)     // true 
  
const vizitat_nou = false 
console.log(!vizitat_nou)     // true, negarea 
  
const stare = vizitat_nou ? 'vizitat' : 'de vizitat' 
console.log(stare)        // 'de vizitat' 


const oras_new = '  Lisabona' 
  
console.log(oras_new.length)              // 12, câte caractere are, spațiile incluse 
console.log(oras_new.trim())              // 'Lisabona', fără spațiile de la capete 
console.log(oras_new.trim().toUpperCase())  // 'LISABONA' 
console.log(oras_new.includes('Lis'))     // true, conține textul dat 
console.log('Lisabona, Portugalia'.split(', ')) // ['Lisabona', 'Portugalia'] 
  
const zileText = '4'     // atenție: este text, nu număr 
zileText + 1             // '41', textele se lipesc 
Number(zileText) + 1     // 5, după conversie 
  
Math.round(4.6)          // 5 
Math.max(4, 6, 2)        // 6


const orase_lista = ['Lisabona', 'Porto', 'Kyoto'] 
  
for (const oras of orase_lista) { 
  console.log(oras) 
} 



import { orase_utils } from './data/orase.js' 
import { getScumpe, costTotal, formatOras, costPeTara, scadePret } from './utils/orase.js' 
  
const scumpe = getScumpe(orase_utils) 
  
console.log('scumpe:', scumpe.length) 
console.log('cost total:', costTotal(scumpe), 'euro') 
console.log(orase_utils.map(formatOras).join('\n'))
console.log('pe țară:', costPeTara(orase_utils))

const reduse = scadePret(orase_utils, 1, 40) 
console.log('lista nouă:', reduse[0].pret) 
console.log('lista originală:', orase_utils[0].pret) 
console.log('element refolosit:', orase_utils[1] === reduse[1]) 



// ===== Laboratorul 2 - Exercitiile 1 si 2

console.log('L2 Ex. 1 - orașe:', getOrase(destinatii))
console.log('L2 Ex. 1 - nevizitate:', getNevizitate(destinatii).length)
console.log('L2 Ex. 1 - zile de vizitat:', totalZile(getNevizitate(destinatii)))
console.log(destinatii.map(formatDestinatie).join('\n'))
console.log('L2 Ex. 1 - pe țară:', numarPeTara(destinatii))
console.log('L2 Ex. 1 - cea mai lungă vizită:', sortDupaZile(destinatii)[0].oras)

const dupaMarcare = marcheazaVizitat(destinatii, '1')
console.log('L2 Ex. 2 - original:', destinatii[0].vizitat, '| listă nouă:', dupaMarcare[0].vizitat)
console.log('L2 Ex. 2 - element refolosit:', destinatii[1] === dupaMarcare[1])

const noua = { id: '7', oras: 'Sevilla', tara: 'Spania', zile: 3, vizitat: false }
const dupaAdaugare = adaugaDestinatie(destinatii, noua)
console.log('L2 Ex. 2 - după adăugare: original', destinatii.length, ', listă nouă', dupaAdaugare.length)

const dupaStergere = stergeDestinatie(dupaAdaugare, '7')
console.log('L2 Ex. 2 - după ștergere:', dupaStergere.length)

// ===== Laboratorul 2 - Exercitiul 3

async function loadOrase() { 
  try { 
    const users = await fetchUsers()
    console.log('L2 Ex. 3 - am primit', users.length, 'utilizatori')
    console.log('L2 Ex. 3 - orașe:', users.map((user) => user.address.city))
    console.log(
      'L2 Ex. 3 - nume mai lungi de 10 caractere:',
      users.map((user) => user.address.city).filter((city) => city.length > 10).length,
    )
    const user = await fetchUserById(1)
    console.log('L2 Ex. 3 - orașul utilizatorului 1:', user.address.city)
  } catch (error) { 
    console.error('L2 Ex. 3 - nu am putut încărca datele:', error.message)
  } 
} 
  
loadOrase()


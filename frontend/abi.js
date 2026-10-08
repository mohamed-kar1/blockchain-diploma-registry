// ABI du contrat Diplomes
// Ce fichier est généré automatiquement après la compilation

const CONTRACT_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "name": "etudiant", "type": "address" },
      { "indexed": false, "name": "nom", "type": "string" },
      { "indexed": false, "name": "titre", "type": "string" }
    ],
    "name": "DiplomeAjoute",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [{ "name": "", "type": "address" }],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      { "name": "etudiant", "type": "address" },
      { "name": "nom", "type": "string" },
      { "name": "titre", "type": "string" },
      { "name": "universite", "type": "string" },
      { "name": "annee", "type": "uint256" }
    ],
    "name": "ajouterDiplome",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{ "name": "etudiant", "type": "address" }],
    "name": "obtenirDiplomes",
    "outputs": [
      { "name": "noms", "type": "string[]" },
      { "name": "titres", "type": "string[]" },
      { "name": "universites", "type": "string[]" },
      { "name": "annees", "type": "uint256[]" }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{ "name": "etudiant", "type": "address" }],
    "name": "compterDiplomes",
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

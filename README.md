# 🎓 DiplômeChain - Système d'enregistrement de diplômes sur Blockchain

Projet étudiant utilisant Solidity, Hardhat, Ethers.js et le réseau de test Sepolia.

---

## 📁 Structure du projet

```
blockchain-diploma-registry/
├── contracts/
│   └── Diplomes.sol       ← Le smart contract (logique blockchain)
├── scripts/
│   └── deploy.js          ← Script de déploiement
├── frontend/
│   ├── index.html         ← Interface web
│   ├── style.css          ← Design
│   ├── app.js             ← Logique JavaScript
│   └── abi.js             ← Interface du contrat
├── hardhat.config.js      ← Configuration Hardhat + Sepolia
├── package.json           ← Dépendances npm
└── .env.example           ← Modèle de fichier de configuration
```

---

## 🚀 ÉTAPES DE CONFIGURATION (dans l'ordre !)

---

### ÉTAPE 1 — Installer Node.js

Télécharge et installe Node.js depuis : https://nodejs.org
(Choisis la version LTS, ex: 18.x ou 20.x)

Vérifie l'installation :
```bash
node --version
npm --version
```

---

### ÉTAPE 2 — Installer MetaMask

1. Va sur https://metamask.io
2. Installe l'extension dans Chrome ou Firefox
3. Crée un nouveau wallet (garde ta phrase secrète !)
4. **Passe sur le réseau Sepolia** :
   - Clique sur le réseau en haut (ex: "Ethereum Mainnet")
   - Active "Afficher les réseaux de test"
   - Sélectionne **Sepolia**

---

### ÉTAPE 3 — Obtenir des ETH de test (gratuit)

Tu as besoin d'ETH Sepolia pour payer les frais de déploiement.

1. Copie ton adresse MetaMask (commence par 0x...)
2. Va sur : https://sepoliafaucet.com OU https://faucet.sepolia.dev
3. Colle ton adresse et demande des ETH de test
4. Attends 1-2 minutes → tu reçois ~0.5 ETH de test

---

### ÉTAPE 4 — Créer un compte Alchemy (pour l'URL RPC)

1. Va sur https://alchemy.com → crée un compte gratuit
2. Crée une nouvelle app :
   - Réseau : **Ethereum**
   - Environnement : **Sepolia**
3. Clique sur "View Key" → copie l'URL HTTPS
   - Elle ressemble à : `https://eth-sepolia.g.alchemy.com/v2/abc123...`

---

### ÉTAPE 5 — Installer les dépendances du projet

Ouvre un terminal dans le dossier du projet :
```bash
cd blockchain-diploma-registry
npm install
```

Cela installe Hardhat, Ethers.js, et les plugins nécessaires.

---

### ÉTAPE 6 — Créer le fichier .env

Crée un fichier nommé `.env` (sans extension) à la racine du projet :
```bash
cp .env.example .env
```

Ouvre `.env` et remplis :
```
SEPOLIA_URL=https://eth-sepolia.g.alchemy.com/v2/TON_API_KEY
PRIVATE_KEY=ta_cle_privee_sans_0x
```

**Comment obtenir ta clé privée MetaMask ?**
- MetaMask → 3 points → Détails du compte → Exporter la clé privée
- ⚠️ NE JAMAIS partager cette clé !

---

### ÉTAPE 7 — Compiler le smart contract

```bash
npm run compile
```

Tu devrais voir : `Compiled 1 Solidity file successfully`

---

### ÉTAPE 8 — Déployer sur Sepolia

```bash
npm run deploy
```

Tu verras dans le terminal :
```
✅ Contrat déployé à l'adresse : 0xABCD1234...
👉 Copie cette adresse dans frontend/app.js
```

**Copie cette adresse !**

---

### ÉTAPE 9 — Configurer le frontend

Ouvre `frontend/app.js` et remplace :
```javascript
const CONTRACT_ADDRESS = "COLLE_LADRESSE_DU_CONTRAT_ICI";
```
par :
```javascript
const CONTRACT_ADDRESS = "0xTonAdresseDeContrat...";
```

---

### ÉTAPE 10 — Lancer le frontend

Ouvre simplement `frontend/index.html` dans ton navigateur.

Ou utilise un serveur local avec :
```bash
npx live-server frontend
```

---

## 🎮 Comment utiliser l'application

1. **Connecter MetaMask** → Clique sur "Connecter MetaMask"
2. **Ajouter un diplôme** (admin seulement) :
   - Entre l'adresse Ethereum de l'étudiant
   - Remplis les informations du diplôme
   - Clique "Enregistrer sur la blockchain"
   - Confirme la transaction dans MetaMask
3. **Consulter les diplômes** :
   - Entre n'importe quelle adresse Ethereum
   - Clique "Rechercher"
   - Les diplômes s'affichent instantanément

---

## 💡 Concepts clés à comprendre

| Concept | Explication simple |
|---------|-------------------|
| **Smart Contract** | Un programme qui vit sur la blockchain et s'exécute automatiquement |
| **Solidity** | Le langage de programmation pour écrire des smart contracts |
| **Hardhat** | L'outil pour compiler et déployer les contracts |
| **Ethers.js** | La bibliothèque JS pour connecter le site web à la blockchain |
| **MetaMask** | Le portefeuille (wallet) pour signer les transactions |
| **Sepolia** | Un réseau de test Ethereum (ETH gratuit, sans valeur réelle) |
| **ABI** | L'interface du contrat - liste toutes les fonctions disponibles |
| **Transaction** | Une action qui modifie la blockchain (coûte des frais = gas) |
| **View/Read** | Une lecture de la blockchain (GRATUIT, pas de transaction) |

---

## 🔍 Vérifier sur Etherscan

Après le déploiement, tu peux voir ton contrat sur :
`https://sepolia.etherscan.io/address/0xTonAdresse`

---

*Projet réalisé avec Solidity 0.8.0 + Hardhat + Ethers.js v6 + Sepolia Testnet*

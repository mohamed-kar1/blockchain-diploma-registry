// =============================================
// CONFIGURATION
// =============================================
const CONTRACT_ADDRESS = "0xd4e3B07c27D390F9642402cfe745915C41a20417";

// =============================================
// VARIABLES GLOBALES
// =============================================
let provider, signer, contract;
let compteConnecte = null;
let estAdmin = false;

// =============================================
// CONNEXION METAMASK
// =============================================
async function connecterWallet() {
  if (!window.ethereum) {
    afficherMessage("❌ MetaMask non détecté. Installe MetaMask !", "erreur");
    return;
  }

  try {
    const comptes = await window.ethereum.request({ method: "eth_requestAccounts" });
    compteConnecte = comptes[0];

    provider = new ethers.BrowserProvider(window.ethereum);
    signer   = await provider.getSigner();
    contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    // Affiche l'adresse dans le header
    document.getElementById("adresse-connectee").textContent =
      compteConnecte.slice(0, 6) + "..." + compteConnecte.slice(-4);
    document.getElementById("wallet-info").style.display = "flex";

    // Change le bouton connecter
    document.getElementById("btn-connecter").textContent = "✅ Connecté";
    document.getElementById("btn-connecter").style.background = "#1a3a1a";
    document.getElementById("btn-connecter").style.color = "#3dd68c";

    // Cache la page d'accueil, montre le dashboard
    document.getElementById("section-accueil").style.display = "none";
    document.getElementById("dashboard").style.display = "flex";
    document.getElementById("dashboard").style.flexDirection = "column";
    document.getElementById("dashboard").style.gap = "24px";

    // ===== VÉRIFICATION ADMIN =====
    const adminAdresse = await contract.admin();
    estAdmin = adminAdresse.toLowerCase() === compteConnecte.toLowerCase();

    if (estAdmin) {
      // C'est l'admin → affiche le panneau admin
      document.getElementById("badge-admin").style.display = "flex";
      document.getElementById("section-admin").style.display = "block";
      document.getElementById("section-pas-admin").style.display = "none";
      afficherMessage("👑 Bienvenue Admin ! Vous pouvez ajouter des diplômes.", "succes");
    } else {
      // C'est un étudiant → cache le panneau admin
      document.getElementById("section-admin").style.display = "none";
      document.getElementById("section-pas-admin").style.display = "block";
      afficherMessage("✅ Connecté en mode étudiant. Consultation disponible.", "info");
    }

    // Affiche la section consulter (tout le monde)
    document.getElementById("section-consulter").style.display = "block";

  } catch (err) {
    afficherMessage("❌ Erreur connexion : " + err.message.slice(0, 80), "erreur");
  }
}

// =============================================
// AJOUTER UN DIPLÔME (Admin seulement)
// =============================================
async function ajouterDiplome() {
  if (!contract) { afficherMessage("⚠️ Connecte ton wallet !", "erreur"); return; }
  if (!estAdmin) { afficherMessage("❌ Tu n'es pas administrateur !", "erreur"); return; }

  const adresseEtudiant = document.getElementById("input-adresse").value.trim();
  const nom             = document.getElementById("input-nom").value.trim();
  const titre           = document.getElementById("input-titre").value.trim();
  const universite      = document.getElementById("input-universite").value.trim();
  const annee           = document.getElementById("input-annee").value.trim();

  if (!adresseEtudiant || !nom || !titre || !universite || !annee) {
    afficherMessage("⚠️ Remplis tous les champs !", "erreur"); return;
  }
  if (!ethers.isAddress(adresseEtudiant)) {
    afficherMessage("❌ Adresse Ethereum invalide !", "erreur"); return;
  }

  try {
    afficherMessage("⏳ Transaction en cours...", "info");
    document.getElementById("btn-ajouter").disabled = true;

    const tx = await contract.ajouterDiplome(
      adresseEtudiant, nom, titre, universite, parseInt(annee)
    );

    afficherMessage("⏳ Confirmation sur la blockchain...", "info");
    await tx.wait();

    afficherMessage(`✅ Diplôme de ${nom} enregistré sur la blockchain !`, "succes");

    // Vide les champs
    ["input-adresse","input-nom","input-titre","input-universite","input-annee"]
      .forEach(id => document.getElementById(id).value = "");

  } catch (err) {
    afficherMessage("❌ " + err.message.slice(0, 100), "erreur");
  } finally {
    document.getElementById("btn-ajouter").disabled = false;
  }
}

// =============================================
// CONSULTER LES DIPLÔMES
// =============================================
async function consulterDiplomes() {
  if (!contract) { afficherMessage("⚠️ Connecte ton wallet !", "erreur"); return; }

  const adresse = document.getElementById("input-recherche").value.trim();
  if (!adresse) { afficherMessage("⚠️ Entre une adresse !", "erreur"); return; }
  if (!ethers.isAddress(adresse)) { afficherMessage("❌ Adresse invalide !", "erreur"); return; }

  try {
    afficherMessage("⏳ Recherche en cours...", "info");
    const [noms, titres, universites, annees] = await contract.obtenirDiplomes(adresse);
    const resultat = document.getElementById("resultat-diplomes");

    if (noms.length === 0) {
      resultat.innerHTML = `<p class="vide">Aucun diplôme trouvé pour cette adresse.</p>`;
    } else {
      let html = `<p class="nb-diplomes">// ${noms.length} diplôme(s) trouvé(s)</p>`;
      for (let i = 0; i < noms.length; i++) {
        html += `
          <div class="carte-diplome">
            <div class="diplome-titre">🎓 ${titres[i]}</div>
            <div class="diplome-info"><span>Étudiant</span> → ${noms[i]}</div>
            <div class="diplome-info"><span>Université</span> → ${universites[i]}</div>
            <div class="diplome-info"><span>Année</span> → ${annees[i].toString()}</div>
          </div>`;
      }
      resultat.innerHTML = html;
    }
    afficherMessage("", "");

  } catch (err) {
    afficherMessage("❌ " + err.message.slice(0, 80), "erreur");
  }
}

// =============================================
// MON ADRESSE
// =============================================
function remplirMonAdresse() {
  if (compteConnecte) {
    document.getElementById("input-recherche").value = compteConnecte;
    consulterDiplomes();
  } else {
    afficherMessage("⚠️ Connecte ton wallet d'abord !", "erreur");
  }
}

// =============================================
// AFFICHER UN MESSAGE
// =============================================
function afficherMessage(texte, type) {
  const msg = document.getElementById("message-global");
  msg.textContent = texte;
  msg.className = "message " + type;
  msg.style.display = texte ? "block" : "none";
}

// =============================================
// CHANGEMENT DE COMPTE METAMASK
// =============================================
if (window.ethereum) {
  window.ethereum.on("accountsChanged", () => location.reload());
}

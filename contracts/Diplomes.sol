// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Diplomes {
    // L'administrateur du contrat (celui qui déploie)
    address public admin;

    // Structure d'un diplôme
    struct Diplome {
        string nom;        // Nom de l'étudiant
        string titre;      // Titre du diplôme (ex: Licence Informatique)
        string universite; // Nom de l'université
        uint256 annee;     // Année d'obtention
        bool existe;       // Pour vérifier si le diplôme existe
    }

    // Mapping : adresse étudiant => liste de diplômes
    mapping(address => Diplome[]) private diplomes;

    // Événement émis quand un diplôme est ajouté
    event DiplomeAjoute(address indexed etudiant, string nom, string titre);


    // Constructeur : l'admin = celui qui déploie le contrat
    constructor() {
        admin = msg.sender;
    }

    // Fonction 1 : Ajouter un diplôme (admin seulement)
    function ajouterDiplome(
        address etudiant,
        string memory nom,
        string memory titre,
        string memory universite,
        uint256 annee
    ) public seulAdmin {
        diplomes[etudiant].push(Diplome(nom, titre, universite, annee, true));
        emit DiplomeAjoute(etudiant, nom, titre);
    }

    // Fonction 2 : Consulter les diplômes d'une adresse
    function obtenirDiplomes(address etudiant)
        public
        view
        returns (
            string[] memory noms,
            string[] memory titres,
            string[] memory universites,
            uint256[] memory annees
        )
    {
        Diplome[] storage liste = diplomes[etudiant];
        uint256 count = liste.length;

        noms       = new string[](count);
        titres     = new string[](count);
        universites = new string[](count);
        annees     = new uint256[](count);

        for (uint256 i = 0; i < count; i++) {
            noms[i]        = liste[i].nom;
            titres[i]      = liste[i].titre;
            universites[i] = liste[i].universite;
            annees[i]      = liste[i].annee;
        }

        return (noms, titres, universites, annees);
    }

    // Fonction 3 : Compter les diplômes d'un étudiant
    function compterDiplomes(address etudiant) public view returns (uint256) {
        return diplomes[etudiant].length;
    }
}


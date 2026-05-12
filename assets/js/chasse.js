/**  
 * @file Chasse aux épigraphes Javascript - TP3 P2
 * @author Maxime Riverin <2435415@csfoy.ca>
 * @version 0.0.1
 */

/* Variables globales */
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");

//*************************
// Écouteurs d'événements 
//*************************

document.getElementById("btnDemarrerNouvelleChasse").addEventListener("click", demarrerNouvelleChasse);
document.getElementById("btnDebuterChasse").addEventListener("click", demarrerChasse);
window.addEventListener('load', () => {
    if (localStorage.chasse_en_cours == 'true') {
        chasseEnCours();
    }
});

//*************************
// Fonctions 
//*************************
 
/**
 * Réinitialise la chasse en cours
*/
function demarrerNouvelleChasse() {
    localStorage.chasse_en_cours = false;
    localStorage.categories_validees = 0;
    document.getElementById('messageEtatChasse').textContent = 'Aucune chasse en cours';
    document.getElementById('btnDebuterChasse').removeAttribute('disabled');
    document.getElementById('btnDemarrerNouvelleChasse').setAttribute('disabled', "");
    document.getElementById('zoneChasseEnCours').setAttribute('hidden', "");
}

/**
 * Démarre la chasse en tirant au sort le peronnage, objet et lieu
*/
function demarrerChasse() {
    const strIdPersonnage = arrIdsPersonnagesAPiger[Math.floor(Math.random() * arrIdsPersonnagesAPiger.length)];
    const strIdObjet = arrIdsObjetsAPiger[Math.floor(Math.random() * arrIdsObjetsAPiger.length)];
    const strIdLieu = arrIdsLieuxAPiger[Math.floor(Math.random() * arrIdsLieuxAPiger.length)];
    console.log(strIdPersonnage);
    console.log(strIdObjet);
    console.log(strIdLieu);
    
    localStorage.id_personnage = strIdPersonnage;
    localStorage.id_objet = strIdObjet;
    localStorage.id_lieu = strIdLieu;
    
    localStorage.personnage_est_trouve = false;
    localStorage.objet_est_trouve = false;
    localStorage.lieu_est_trouve = false;
    
    localStorage.chasse_en_cours = true
    chasseEnCours();
}

/**
* Applique les bons attributes si un chasse est en cours
*/
function chasseEnCours() {
    document.getElementById('btnDebuterChasse').setAttribute('disabled', "");
    document.getElementById('btnDemarrerNouvelleChasse').removeAttribute('disabled');
    document.getElementById('zoneChasseEnCours').removeAttribute('hidden');
    document.getElementById('zoneMessageChasseCompletee').setAttribute('hidden', "");
    document.getElementById('zoneLiensChasse').removeAttribute('hidden');

    document.getElementById('messageEtatChasse').textContent = 'Chasse en cours';

    document.getElementById("segmentPersonnage").innerHTML = objJSONepigraphes[localStorage.id_personnage].CHASSE.INDICE;
    document.getElementById("segmentObjet").innerHTML = objJSONepigraphes[localStorage.id_objet].CHASSE.INDICE;
    document.getElementById("segmentLieu").innerHTML = objJSONepigraphes[localStorage.id_lieu].CHASSE.INDICE;

    document.getElementById("personnageIndice").innerHTML = objJSONepigraphes[localStorage.id_personnage].CHASSE.INDICE;
    document.getElementById("objetIndice").innerHTML = objJSONepigraphes[localStorage.id_objet].CHASSE.INDICE;
    document.getElementById("lieuIndice").innerHTML = objJSONepigraphes[localStorage.id_lieu].CHASSE.INDICE;
    afficherImages();
    mettreAJourChasse();
}

/**
 * Met à jour la chasse en fonction des indices trouvés
 */
function mettreAJourChasse() {
    const arrTypesIndices = document.querySelectorAll('.indices__liste p');
    
    for (let strTypeIndice of arrTypesIndices) {
        if (localStorage.getItem(`${strTypeIndice.className}_est_trouve`) == 'true') {
            let strReponsePrenomNom = "";
            strReponsePrenomNom += objJSONepigraphes[localStorage.getItem(`id_${strTypeIndice.className}`)].PRENOM + " ";
            strReponsePrenomNom += objJSONepigraphes[localStorage.getItem(`id_${strTypeIndice.className}`)].NOM;

            document.getElementById(`${strTypeIndice.className}Indice`).textContent = strReponsePrenomNom;
            document.getElementById(`${strTypeIndice.className}MessageTrouve`).removeAttribute('hidden');
            document.getElementById(`image__${strTypeIndice.className}`).classList.remove('image__floutee');

            if (localStorage.categories_validees == arrTypesIndices.length) {
                document.getElementById('messageEtatChasse').textContent = 'Chasse complétée !';
                document.getElementById('zoneMessageChasseCompletee').removeAttribute('hidden');
                document.getElementById('zoneLiensChasse').setAttribute('hidden', "");
            }
        }
        else {
            document.getElementById(`${strTypeIndice.className}MessageTrouve`).setAttribute('hidden', "");
        }
    }
}

/**
 * Affiche les images des personnages pigées + effet de flou
 */
function afficherImages() {
    document.querySelectorAll('.indices__liste__item img').forEach((item) => {
        item.classList.add('image__floutee');
    })

    document.getElementById("image__personnage").src = `../assets/images/fiches/${objJSONepigraphes[localStorage.id_personnage].SUFFIXE_IMAGES}.jpg`;
    document.getElementById("image__objet").src = `../assets/images/fiches/${objJSONepigraphes[localStorage.id_objet].SUFFIXE_IMAGES}.jpg`;
    document.getElementById("image__lieu").src = `../assets/images/fiches/${objJSONepigraphes[localStorage.id_lieu].SUFFIXE_IMAGES}.jpg`;
}
/* Variables globales */



//*************************
// Écouteurs d'événements 
//*************************
window.addEventListener("load", initialiser);
document.getElementById("btnSoumettre").addEventListener("click", validerPieceConviction);

//*************************
// Fonctions 
//*************************


/**
 * Obtenir la valeur d'un des paramètres (QueryParam) dans l'URL
 * @param {string} strParam - Nom du paramètre à rechercher dans l'URL
 * @returns {string} - Valeur correspondant au paramètre. 
 *                     Retourne null lorsqu'aucune valeur n'est trouvée.
 */
function obtenirValeurUrlParam(strParam) {
    return new URLSearchParams(window.location.search).get(strParam);
}

function initialiser() {
    let intIdFicheCourante = obtenirValeurUrlParam('id');
    
    console.log("ID de la fiche courante :", intIdFicheCourante);

    const refFiche = objJSONepigraphes[intIdFicheCourante];
        
    document.getElementById("prenom").innerHTML = refFiche.PRENOM + " ";
    document.getElementById("nom").innerHTML = refFiche.NOM;
    document.getElementById("arrondissement").innerHTML = refFiche.ARRONDISSEMENT;
    document.getElementById("quartier").innerHTML = refFiche.QUARTIER;
    document.getElementById("adresse").innerHTML = refFiche.ADRESSE;
        
    document.getElementById("notes_biographiques").innerHTML = "<p>" + refFiche.BIOGRAPHIE + "</p>";
    // a changer si chemin incorrect
    const strChemin = "../images/fiches/";
        
    document.getElementById("url_image").src = strChemin + refFiche.SUFFIXE_IMAGES + ".jpg";
    document.getElementById("url_image").alt = "Portrait de " + refFiche.PRENOM + " " + refFiche.NOM;
    document.getElementById("titre_image").innerHTML = refFiche.IMAGE.TITRE;
    document.getElementById("credit_image").innerHTML = refFiche.IMAGE.CREDIT;

    document.getElementById("url_plaque").src = strChemin + "plaque_" + refFiche.SUFFIXE_IMAGES + ".jpg";
    document.getElementById("transcript").innerHTML = refFiche.PLAQUE_TRANSCRIPTION;

    document.getElementById("carteZoom").src = strChemin + "zoomgooglemap_" + refFiche.SUFFIXE_IMAGES + ".png";

    const refLecteur = document.getElementById("audio_url");
    refLecteur.src = refFiche.AUDIO.URL;
        
    document.getElementById("audio_desc").innerHTML = refFiche.AUDIO.DESCRIPTION;
    document.getElementById("audio_preambule").innerHTML = refFiche.AUDIO.DESCRIPTION;
    document.getElementById("audio_transcription").innerHTML = refFiche.AUDIO.TRANSCRIPTION;
    document.getElementById("audio_credit").innerHTML = refFiche.AUDIO.CREDIT;
        
    document.getElementById("audio_url").load();
    localStorage.setItem(intIdFicheCourante, "true");
}

function validerPieceConviction() {
    const refRadioCoche = document.querySelector('[name="formChasse"]:checked');
    const refMessage = document.getElementById('message');
    const intIdFicheCourante = obtenirValeurUrlParam('id');

    // vérifier si chasse est commencée
    if (!localStorage.id_personnage) {
        refMessage.innerHTML = "Aucune chasse en cours. Si vous désirez débuter une chasse, visitez la page «Chasse».";
        // empêche l'execution de la fonction
        return;
    }

    // vérifier si bouton radio est sélectionné
    if (!refRadioCoche) {
        refMessage.innerHTML = "Veuillez sélectionner un élément.";
        return;
    }

    // récuperer les données
    const strTypeSelectionne = refRadioCoche.value;
    const strIdGagnant = localStorage.getItem("id_" + strTypeSelectionne);

    // vérifer si Id est gagnant
    if (intIdFicheCourante === strIdGagnant) {
        localStorage.setItem(strTypeSelectionne + "_est_trouve", "true");

        // vérifier si c'est le dernier indice
        let intTotalTrouves = 0;

        if (localStorage.personnage_est_trouve === "true") {
            intTotalTrouves +=1;
        }

        if (localStorage.objet_est_trouve === "true") {
            intTotalTrouves +=1;
        }

        if (localStorage.lieu_est_trouve === "true") {
            intTotalTrouves +=1;
        }

        if (intTotalTrouves === 3) {
            refMessage.innerHTML = "Bravo! Vous avez terminé la chasse, vous pouvez maintenant participer au Concours!";
        } 
        else {
            const strTexteIndice = objJSONepigraphes[intIdFicheCourante].CHASSE.INDICE;
            refMessage.innerHTML = "Bravo! Vous avez trouvé « " + strTexteIndice + " ».";
        }
    } 
    else {
        refMessage.innerHTML = "Désolé. Ce n’est pas le bon élément.";
    }

}

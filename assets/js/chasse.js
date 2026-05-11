const objChasse = {
  initialiser: function () {
    let refMessageEtatChasse = document.getElementById("messageEtatChasse");
    if (localStorage.id_personnage == undefined) {
      console.log("Aucune chasse en cours.");
      refMessageEtatChasse.textContent = "Aucune chasse en cours.";
    } else {
      console.log(
        "Chasse en cours pour le personnage avec ID:",
        localStorage.id_personnage,
        );
        let objEpigraphePersonnage = objJSONepigraphes[localStorage.id_personnage];
        let refPersonnageIndice = document.getElementById("personnageIndice");
        refPersonnageIndice.textContent = objEpigraphePersonnage.CHASSE.INDICE;
        let objEpigrapheObjet = objJSONepigraphes[localStorage.id_objet];
        let refObjetIndice = document.getElementById("objetIndice");
        refObjetIndice.textContent = objEpigrapheObjet.CHASSE.INDICE;
        let objEpigrapheLieu = objJSONepigraphes[localStorage.id_lieu];
        let refLieuIndice = document.getElementById("lieuIndice");
        refLieuIndice.textContent = objEpigrapheLieu.CHASSE.INDICE;
        
      refMessageEtatChasse.textContent = "Chasse en cours.";
    if  (localStorage.personnage_est_trouve == "true") {
        let refPersonnageMessageTrouve = document.getElementById("personnageMessageTrouve");
        refPersonnageMessageTrouve.hidden = false;
    }
    if  (localStorage.objet_est_trouve == "true") {
        let refObjetMessageTrouve = document.getElementById("objetMessageTrouve");
        refObjetMessageTrouve.hidden = false;
    }
    if  (localStorage.lieu_est_trouve == "true") {
        let refLieuMessageTrouve = document.getElementById("lieuMessageTrouve");
        refLieuMessageTrouve.hidden = false;
    }
    if (localStorage.personnage_est_trouve == "true" && 
    localStorage.objet_est_trouve == "true" && 
    localStorage.lieu_est_trouve == "true") {
    let refZoneEnigme = document.getElementById("zoneEnigme");
    refZoneEnigme.hidden = false;
    let refPersonnageSegment = document.getElementById("personnageSegment");
    refPersonnageSegment.textContent = objEpigraphePersonnage.CHASSE.INDICE;
    let refObjetSegment = document.getElementById("objetSegment");
    refObjetSegment.textContent = objEpigrapheObjet.CHASSE.INDICE;
    let refLieuSegment = document.getElementById("lieuSegment");
    refLieuSegment.textContent = objEpigrapheLieu.CHASSE.INDICE;
    refMessageEtatChasse.hidden = true;
    let refZoneMessageChasseCompletee = document.getElementById("zoneMessageChasseCompletee");
    refZoneMessageChasseCompletee.hidden = false;
}
    }
  },
  debuterChasse: function () {
    console.log("chasse debutée");
    let refBtnDebuterChasse = document.getElementById("main_bouton_chasse");
    refBtnDebuterChasse.disabled = true;
    let refBtnDebuterNouvelleChasse = document.getElementById(
      "btnDebuterNouvelleChasse",
    );
    refBtnDebuterNouvelleChasse.hidden = false;
    let refLienChercherIndices = document.getElementById("lienChercherIndices");
    refLienChercherIndices.hidden = false;
    let objEpigraphePersonnage = objJSONepigraphes[localStorage.id_personnage];
    let refPersonnageIndice = document.getElementById("personnageIndice");
    refPersonnageIndice.textContent = objEpigraphePersonnage.CHASSE.INDICE;
    let objEpigrapheObjet = objJSONepigraphes[localStorage.id_objet];
    let refObjetIndice = document.getElementById("objetIndice");
    refObjetIndice.textContent = objEpigrapheObjet.CHASSE.INDICE;
    let objEpigrapheLieu = objJSONepigraphes[localStorage.id_lieu];
    let refLieuIndice = document.getElementById("lieuIndice");
    refLieuIndice.textContent = objEpigrapheLieu.CHASSE.INDICE;
  
 }
};
window.addEventListener("load", function () {
  objChasse.initialiser();
  let refBtnDebuterChasse = document.getElementById("main_bouton_chasse");
    let refBtnDebuterNouvelleChasse = document.getElementById(
      "btnDebuterNouvelleChasse",
    );
  refBtnDebuterChasse.addEventListener("click", function () {
    objChasse.debuterChasse();});
    refBtnDebuterNouvelleChasse.addEventListener("click", function () {
        refBtnDebuterChasse.disabled = false;
  });
});

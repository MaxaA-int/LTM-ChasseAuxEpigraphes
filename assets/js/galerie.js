/**
 * @file Filtration dans la galerie des personnages
 * @author Maxime Riverin <2435415@csfoy.ca> 
 * @version 0.0.1
 */

const arrBoutonsFiltres = document.querySelectorAll('.filtre__containeur input');

arrBoutonsFiltres.forEach((item) =>
    item.addEventListener('click', function () {
        filtrerGalerie();
    }));

document.getElementById('btnReset').addEventListener('click', reinitialiserFiltres);

/**
 * Filtre la galerie selon les éléments sélectionnés
 */
function filtrerGalerie() {
    const arrCartesPersonnages = document.querySelectorAll('.galerie-container .carte');
    const refFiltresCoches = [...document.querySelectorAll('.filtre__containeur input:checked')];

    arrCartesPersonnages.forEach((item) => {
        if (refFiltresCoches.every(filtre => item.classList.contains(`carte__${filtre.value}`))) {
            item.classList.remove('display-none');
        }
        else {
            item.classList.add('display-none');
        }
    });
}

/**
 * Réinitialise les filtres
 */
function reinitialiserFiltres() {
    const refBoutonFiltres = document.querySelectorAll('.filtre__containeur input:checked');

    refBoutonFiltres.forEach((item) => {
        item.checked = false;
    })

    filtrerGalerie();
}
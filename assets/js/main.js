/**
 * @file Un menu simple, responsive bâti en amélioration progressive.
 * @version v4
 */

//*******************
// Varibales Globales
//*******************
const arrIdsPersonnagesAPiger = new Array("e0001", "e0008", "e0015", "e0019");
const arrIdsObjetsAPiger = new Array("e0002", "e0004", "e0007", "e0021");
const arrIdsLieuxAPiger = new Array("e0005", "e0012", "e0016", "e0022");

const arrBoutonsFiltres = document.querySelectorAll('.filtre__containeur input');


//*******************
// Écouteurs d'événements
//*******************
window.addEventListener('load', function () {
    menu.configurerNav();
});

arrBoutonsFiltres.forEach((item) =>
    item.addEventListener('click', function () {
        filtrerGalerie();
    }));

document.getElementById('btnReset').addEventListener('click', reinitialiserFiltres);

//*******************
// Déclaration d'objet(s)
//*******************

// JAVASCRIPT pour la Navigation Principale
let menu = {
    javascriptEnabled: document.documentElement.classList.add('js'),
    tagButton: null,
    tagSpan: null,
    tagNav: document.querySelector('.nav'),
    relacherFocus: null,
    tagLogo: document.getElementById('logo'),

    /**
     * Confine la navigation clavier à l'intérieur d'un élément.
     * Tab sur le dernier focusable revient au premier, et vice-versa.
     *
     * @param {HTMLElement} element - Conteneur à piéger
     * @returns {Function} Appeler pour libérer le piège
     */
    piegerFocus: function (element) {
        const focusables = element.querySelectorAll(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const premier = focusables[0];
        const dernier = focusables[focusables.length - 1];

        function gererTab(e) {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === premier) {
                    e.preventDefault();
                    dernier.focus();
                }
            } else {
                if (document.activeElement === dernier) {
                    e.preventDefault();
                    premier.focus();
                }
            }
        }

        element.addEventListener('keydown', gererTab);
        premier.focus();

        return function () {
            element.removeEventListener('keydown', gererTab);
        };
    },

    configurerNav: function () {
        // Donner un id au nav (requis pour aria-controls)
        if (!this.tagNav.id) {
            this.tagNav.id = 'nav-principal';
        }

        // Labelliser le nav pour les lecteurs d'écran
        if (!this.tagNav.getAttribute('aria-label')) {
            this.tagNav.setAttribute('aria-label', 'Navigation principale');
        }

        //********** Création du bouton du menu mobile

        this.tagButton = document.createElement('button');
        this.tagSpan = document.createElement('span');

        this.tagButton.appendChild(this.tagSpan);

        this.tagButton.className = 'nav__control';
        this.tagButton.type = 'button';

        // Attributs ARIA du bouton hamburger
        this.tagButton.setAttribute('aria-expanded', 'false');
        this.tagButton.setAttribute('aria-controls', this.tagNav.id);
        this.tagButton.setAttribute('aria-label', 'Ouvrir le menu de navigation');

        this.tagSpan.className = 'nav__span';
        this.tagSpan.setAttribute('aria-hidden', 'true');

        document.querySelector('.nav__barre').prepend(this.tagButton);

        this.tagButton.addEventListener('click', function () {
            menu.ouvrirFermerNav();
        });

        // Fermeture du la navigation par default
        this.tagNav.classList.add('nav--closed');

        // Fermeture au clavier via Échap
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && menu.tagButton.getAttribute('aria-expanded') === 'true') {
                menu.fermerNav();
            }
        });
    },

    ouvrirFermerNav: function () {
        if (this.tagNav.classList.contains('nav--closed')) {
            this.ouvrirNav();
        } else {
            this.fermerNav();
        }
    },

    ouvrirNav: function () {
        this.tagNav.classList.remove('nav--closed');
        this.tagButton.setAttribute('aria-expanded', 'true');
        this.tagButton.setAttribute('aria-label', 'Fermer le menu de navigation');

        // Activer le piège de focus ; déplace le focus au premier élément du menu
        this.relacherFocus = this.piegerFocus(this.tagNav);
    },

    fermerNav: function () {
        this.tagNav.classList.add('nav--closed');
        this.tagButton.setAttribute('aria-expanded', 'false');
        this.tagButton.setAttribute('aria-label', 'Ouvrir le menu de navigation');

        // Libérer le piège et rendre le focus au déclencheur (WCAG 2.4.3)
        if (this.relacherFocus) {
            this.relacherFocus();
            this.relacherFocus = null;
        }
        this.tagButton.focus();
    },
};
// Fin Javascript Navigation Princiaple

// JS DU FILTRE dans galerie des personnages

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

function reinitialiserFiltres() {
    const refBoutonFiltres = document.querySelectorAll('.filtre__containeur input:checked');

    refBoutonFiltres.forEach((item) => {
        item.checked = false;
    })

    filtrerGalerie();
}
'use strict';

class LoadPicture {
    constructor() {
        // from url 'https://jsonplaceholder.typicode.com/photos'
        // displayZone
        // nbOfPictures
        // order = ASC or DES (bool ?)
    }

    createBtn() {
        // si plus de 10 photos restantes on affiche le bouton
    }

    getPictures() {

    }

    load() {

        // async function ou utiliser un fetch simple ?
        // affiche l'icone de chargement puis await le resultat de la requete
    }


    displayPictures() {
        // how many
        // order
        // where 
    }
}



// Exemple d'appel minimum 
// const pictures = new LoadPicture({
//     url : 'https://jsonplaceholder.typicode.com/photos',
// })

// Tous les paramètres (un paramètre objet contenant des propriétée)
const pictures = new LoadPicture(
{
    url : 'https://jsonplaceholder.typicode.com/photos',
    area : 'main section.photo',
    numberPhoto : 20,
    order : 'ASC'
}
)

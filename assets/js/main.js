'use strict';

class LoadPicture {
    constructor({params}) {
        this.url = params.url;
        this.area = document.querySelector(params.area);
        this.batchSize = params.numberPhoto; // defaut 10, comment faire ?
        this.order = params.order;
        this.currentIndex = 0;
    }

    async load() { // request OK pas touche
        const startIndex = this.currentIndex;
        const endIndex = this.currentIndex + this.batchSize;

        try {
            let responsePictures = await fetch(`${url}?_start=${startIndex}&_end=${endIndex}&_limit=${batchSize}`);
            let pictures = await responsePictures.json();
            console.log(pictures[currentIndex].url);
            // dans la bonne fonction, on affichera pictures[currentIndex] dans une loop for of sur pictures
    
        } catch (e) {
            console.error(`An error occured ${e.message}`);
        }
    }

    createArea() { // WIP
        this.area = document.createElement('div');
        this.area.classList.add("photo");

        this.photo.style.width = this.photoWidth;
        this.photo.style.height = this.photoHeight;

        this.imgElement = document.createElement('img');
        this.imgElement.src = this.imageData[this.currentIndex].src;
        this.photo.appendChild(this.imgElement);
    }

    displayPictures() {
        // how many
        // order
        // where => create zone
        //for (const photo of photos) {
            this.load()
        // }
    }

    createBtn() {
        // si plus de 10 photos restantes on affiche le bouton
    }

}

/* -------------------------------------------------------------------------------------------------- */
/* ZONE DE TESTS */

async function load() {
    try {
        const batchSize = 10;
        const currentIndex = 0;
        const startIndex = currentIndex;
        const endIndex = currentIndex + batchSize;
        const url = 'https://jsonplaceholder.typicode.com/photos';

        // let responsePictures = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20');

        let responsePictures = await fetch(`${url}?_start=${startIndex}&_end=${endIndex}&_limit=${batchSize}`);
        let pictures = await responsePictures.json();
        console.log(`on récup l'url ${pictures[currentIndex].url}`);
        // dans la bonne fonction, on affichera pictures[currentIndex] dans une loop for of sur pictures

    } catch (e) {
        console.error(`An error occured ${e.message}`);
    }
}

load();

/* -------------------------------------------------------------------------------------------------- */

// Exemple d'appel minimum 
// const pictures = new LoadPicture({
//     url : 'https://jsonplaceholder.typicode.com/photos',
// })

// Tous les paramètres (un paramètre objet contenant des propriétés)
// const pictures = new LoadPicture(
//     {
//         url: 'https://jsonplaceholder.typicode.com/photos',
//         area: 'main section.photo',
//         numberPhoto: 20,
//         order: 'ASC'
//     }
// )

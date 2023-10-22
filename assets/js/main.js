'use strict';

class LoadPicture {
    constructor(params) {
        this.url = params.url;
        this.area = document.querySelector(params.area);
        this.batchSize = params.numberPhoto || 10;
        this.order = params.order;
        this.currentIndex = 0;
        this.pictures = null;
        console.log('constructor');

        this.createArea();
    }

    createArea() {
        console.log('create area BEG');

        const img = new Image();
        img.onload = () => {
            const area = document.createElement('div');
            area.classList.add("photo");
            area.style.width = '100%';
            area.style.height = '100%';

            img.style.width = '100%';
            img.style.height = '100%';

            area.appendChild(img);
            this.area.appendChild(area);

            if (this.currentIndex >= 10) {
                this.createBtn('next', area);
            }

            if (this.currentIndex >= 20) {
                this.createBtn('previous', area);
            }

            this.displayPictures();
        };

        this.load().then(pictures => {
            this.imageData = pictures.map(picture => picture.url);
            img.src = this.imageData[this.currentIndex];
        });
        console.log('create area END');
    }


    async load() { // request OK pas touche
        console.log('load BEG');

        const startIndex = this.currentIndex;
        const endIndex = this.currentIndex + this.batchSize;

        try {
            
            const responsePictures = await fetch(`${this.url}?_start=${startIndex}&_end=${endIndex}&_limit=${this.batchSize}`);
            const pictures = await responsePictures.json();
            
            const url = pictures.map(picture => picture.url);
            
            console.log(url[this.currentIndex]);
            console.log('load END');
            return url;

        } catch (e) {
            console.error(`An error occured ${e.message}`);
        }
    }
    
    async displayPictures() {
        console.log('display pictures BEG');

        this.pictures = await this.load();

        for (const photo of this.pictures) {
            this.createArea();
        }
        console.log('display pictures END');
    }

    createBtn(position, area) {
        console.log('create button BEG');

        const button = document.createElement('button');
        button.classList.add(position);
        button.innerHTML = `<i class="icon-${position}"></i>`;

        if (position === 'next') {
            button.addEventListener('click', () => this.nextImage());
        } else if (position === 'previous') {
            button.addEventListener('click', () => this.prevImage());
        }

        area.appendChild(button);

        console.log('create button END');
    }

}

/* -------------------------------------------------------------------------------------------------- */
/* ZONE DE TESTS */
// 
// let photos = null;
// let currentIndex = null;
// 
// async function load() {
//     try {
//         const batchSize = 10;
//         currentIndex = 0;
//         const startIndex = currentIndex;
//         const endIndex = currentIndex + batchSize;
//         const url = 'https://jsonplaceholder.typicode.com/photos';
// 
//         // let responsePictures = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20');
// 
//         let responsePictures = await fetch(`${url}?_start=${startIndex}&_end=${endIndex}&_limit=${batchSize}`);
//         pictures = await responsePictures.json();
//         console.log(`on récup l'url ${photos[currentIndex].url}`);
//         return photos;
//         // dans la bonne fonction, on affichera pictures[currentIndex] dans une loop for of sur pictures
// 
//     } catch (e) {
//         console.error(`An error occured ${e.message}`);
//     }
// }
// 
// load();
// 
// 
// function createArea(photos) { // WIP
//     const area = document.createElement('div');
//     area.classList.add("photo");
// 
//     area.style.width = "100%";
//     area.style.height = "100%";
// 
//     const img = document.createElement('img');
//     img.src = photos[currentIndex].url;
//     photo.appendChild();
// }
// 
// createArea();

/* -------------------------------------------------------------------------------------------------- */

// // Exemple d'appel minimum 
// const pictures = new LoadPicture({
//     url : 'https://jsonplaceholder.typicode.com/photos',
// })

// Tous les paramètres (un paramètre objet contenant des propriétés)
const pictures = new LoadPicture(
    {
        url: 'https://jsonplaceholder.typicode.com/photos',
        area: 'main section.photo',
        numberPhoto: 20,
        order: 'ASC'
    }
)

// console.log('hellu')
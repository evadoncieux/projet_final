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

        // this.createArea();
        this.displayPictures();
    }

    createArea() {
        console.log('create area BEG');
        const area = document.createElement('div');
        area.classList.add("photo");

        area.style.width = '100%';
        area.style.height = '100%';

        const img = document.createElement('img');
        img.src = this.pictures[this.currentIndex];
        area.appendChild(img);
        console.log(img.src);

        this.area.appendChild(area);

        if (this.currentIndex >= 10) {
            this.createBtn('next', area);

        } else if (this.currentIndex >= 20) {
            this.createBtn('previous', area);
        }
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

            // console.log(url[this.currentIndex]);
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

// console.log('hellu');
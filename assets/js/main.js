'use strict';

class LoadPicture {
    constructor(params) {
        this.url = params.url;
        this.area = document.querySelector('.display');
        this.batchSize = params.numberPhoto || 10;
        this.order = params.order;
        this.currentIndex = 0;
        this.pictures = null;
        this.allPictures = null;
        this.displayedPictures = null;

        this.nextButtonCreated = false;
        this.prevButtonCreated = false;

        this.displayPictures();
    }

    createArea() {
        const area = document.createElement('div');
        area.classList.add("photo");

        area.style.width = '100%';
        area.style.height = '100%';

        const img = document.createElement('img');
        img.src = this.pictures[this.currentIndex];
        area.appendChild(img);
        console.log(img.src);

        this.area.appendChild(area);

        if (this.currentIndex >= this.batchSize && !this.nextButtonCreated) {
            this.createBtn('next', area);
            this.nextButtonCreated = true;
        } else if (this.currentIndex >= this.batchSize && !this.prevButtonCreated) {
            this.createBtn('previous', area);
            this.prevButtonCreated = true; 
        }
    }

    async load() {
        try {
            const responsePictures = await fetch(this.url);
            this.allPictures = await responsePictures.json(); // Populate allPictures
            return this.allPictures.map(picture => picture.url);
        } catch (e) {
            console.error(`An error occurred: ${e.message}`);
        }
    }

    async displayPictures() {
        this.pictures = await this.load();
    
        for (let i = 0; i < this.pictures.length; i++) {
            this.createArea();
            this.currentIndex++;
        }
    }
    

    createBtn(position, area) {
        const button = document.createElement('button');
        button.classList.add(position);
        button.innerHTML = `<i class="icon-${position}"></i>`;

        if (position === 'next') {
            button.addEventListener('click', () => {
                this.currentIndex += this.batchSize;
            });
        } else if (position === 'previous') {
            button.addEventListener('click', () => {
                this.currentIndex -= this.batchSize;
            });
        }

        area.appendChild(button);
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
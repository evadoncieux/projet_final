'use strict';

class LoadPicture {
    constructor(params) {
        this.url = params.url;
        this.area = document.querySelector('.display') || '.display';
        this.batchSize = params.numberPhoto || 10;
        this.order = params.order;
        this.currentIndex = 0;
        this.currentBatchIndex = 0;
        this.pictures = null;
        this.allPictures = null;
        this.nextButtonCreated = false;
        this.prevButtonCreated = false;

        this.displayPictures();
    }

    createArea() {
        const cell = document.createElement('div');
        cell.style.display = 'grid';
        cell.style.gridTemplateColumns = 'repeat(5, 1fr)';
        cell.style.gridGap = '10px';
        cell.style.justifyContent = 'center';
    
        for (let i = 0; i < this.batchSize; i++) {
            if (this.currentIndex < this.pictures.length) {
                const area = document.createElement('div');
                area.classList.add('photo');
                const img = document.createElement('img');
                img.src = this.pictures[this.currentIndex];
                img.style.width = '100%';
                img.style.margin = '10px';
                area.appendChild(img);
                cell.appendChild(area);
                this.currentIndex++;
            }
        }
    
        this.area.appendChild(cell);
    
        if (this.currentIndex > this.batchSize && !this.prevButtonCreated) {
            this.createBtn('previous', cell);
            this.prevButtonCreated = true;
        }
    
        if (this.currentIndex < this.pictures.length && !this.nextButtonCreated) {
            this.createBtn('next', cell);
            this.nextButtonCreated = true;
        }
    }
    
    

    createBtn(position, area) {
        const button = document.createElement('button');
        button.classList.add(position);
        button.innerHTML = `<i class="icon-${position}"></i`;

        if (position === 'next') {
            button.addEventListener('click', () => {
                this.currentBatchIndex++;
                this.currentIndex = this.currentBatchIndex * this.batchSize;
                this.area.innerHTML = '';
                this.displayPictures();
            });
            button.innerText = 'Next';
        } else if (position === 'previous') {
            button.addEventListener('click', () => {
                this.currentBatchIndex--;
                this.currentIndex = this.currentBatchIndex * this.batchSize;
                this.area.innerHTML = '';
                this.displayPictures();
            });
            button.innerText = 'Previous';
        }
        area.appendChild(button);
    }

    async load() {
        try {
            const responsePictures = await fetch(this.url);
            this.allPictures = await responsePictures.json();
            return this.allPictures.map(picture => picture.url);
        } catch (e) {
            console.error(`An error occurred: ${e.message}`);
        }
    }

    async displayPictures() {
        this.pictures = await this.load();
        this.createArea();
    }
}


// Exemple d'appel minimum 
const pictures = new LoadPicture({
    url : 'https://jsonplaceholder.typicode.com/photos',
})

// // Tous les paramètres (un paramètre objet contenant des propriétés)
// const pictures = new LoadPicture(
//     {
//         url: 'https://jsonplaceholder.typicode.com/photos',
//         area: 'main section.photo',
//         numberPhoto: 10,
//         order: 'ASC'
//     }
// )

// console.log('hellu');
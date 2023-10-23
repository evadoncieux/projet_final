'use strict';

/**
* This class loads pictures from an API and displays them in a 5x2 grid
@param url
@param area
@param batchSize
@param order

*/
class LoadPicture {
    constructor(params) {
        this.url = params.url;
        this.area = document.querySelector('.display');
        this.batchSize = params.numberPhoto || 10;
        this.order = params.order;

        this.currentIndex = 0;
        this.currentBatchIndex = 0;
        this.pictures = null;
        this.allPictures = null;
        this.photosDisplayed = false;

        this.displayPictures();
    }

    /**
     * this method creates a grid containing the photo divs
     */
    createArea() {
        const cell = document.createElement('div');
        cell.style.display = 'grid';
        cell.style.gridTemplateColumns = 'repeat(5, 1fr)';
        cell.style.gap = '10px';
        cell.style.justifyContent = 'center';

        for (let i = 0; i < this.batchSize && this.currentIndex < this.pictures.length; i++) {
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
        this.area.appendChild(cell);

        if (this.currentIndex < this.allPictures.length - 1) {
            if (this.currentBatchIndex >= 1) {
                this.createPrevButton(cell);
            }

            if (this.currentIndex < this.allPictures.length) {
                this.createNextButton(cell);
            }
        }
        this.photosDisplayed = true;

    }

    /**
 * this method creates a next button if there are more than 10 pictures fetched
 */
    createNextButton(area) {
        const button = document.createElement('button');
        button.classList.add('next');
        button.innerHTML = `<i class="icon-next"></i`;
        button.addEventListener('click', () => {
            this.currentBatchIndex++;
            this.currentIndex = this.currentBatchIndex * this.batchSize;
            this.area.innerHTML = '';
            this.displayPictures();
        });
        button.innerText = 'Next';
        area.appendChild(button);
    }

    /**
 * this method creates a previous button if the current batch number is superior to 1
 */
    createPrevButton(area) {
        const button = document.createElement('button');
        button.classList.add('previous');
        button.innerHTML = `<i class="icon-previous"></i`;
        button.addEventListener('click', () => {
            this.currentBatchIndex--;
            this.currentIndex = this.currentBatchIndex * this.batchSize;
            this.area.innerHTML = '';
            this.displayPictures();
        });
        button.innerText = 'Previous';
        area.appendChild(button);
    }

    /**
     * this method toggles the loading icon while the images are loading
     */
    showLoader() {
        const loaderArea = document.querySelector('.loader');
        const loaderImg = document.createElement('img');
        loader.src = 'assets/images/loader.png'
        loader.style.width = '50px';

        if (!this.photosDisplayed) {
            loader.innerHTML = '';
            loader.appendChild(loaderImg);
            loader.style.display = 'block';
        } else {
            loader.innerHTML = '';
            loader.style.display = 'none';
        }
    }

    /**
 * this method gets the pictures from the API
 */
    async load() {
        try {
            this.photosDisplayed = false;
            const responsePictures = await fetch(`${this.url}`);
            this.allPictures = await responsePictures.json();

            if (this.order === 'DESC') {
                this.allPictures.sort((a, b) => b.id - a.id);
            }

            return this.allPictures.map(picture => picture.url);
        } catch (e) {
            console.error(`An error occurred: ${e.message}`);
        }
    }

    /**
 * this method get the pictures and loads them in the grid
 */
    async displayPictures() {
        this.pictures = await this.load();
        this.createArea();
    }
}


// Exemple d'appel minimum 
const pictures = new LoadPicture({
    url: 'https://jsonplaceholder.typicode.com/photos',
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
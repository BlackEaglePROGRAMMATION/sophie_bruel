async function fetchCategories() {
    const req = await fetch(`http://localhost:5678/api/categories`);
    const res = await req.json();
    return res;
}

async function fetchFigures() {
    const req = await fetch(`http://localhost:5678/api/works`);
    const res = await req.json();
    return res;
}

const addCategories = async () => {
    const categories = await fetchCategories();
    const containerFilter = document.querySelector('.container-filter');

    for (let category of categories) {
        const filter = document.createElement('button');
        filter.textContent = category.name;

        containerFilter.appendChild(filter);
    }

    return containerFilter.children;
}

const gallery = document.querySelector('.gallery');

const addFigures = async (data, container) => {
    for (let figure of data) {
        const newFigure = document.createElement('figure');
        newFigure.dataset.id = figure.id;

        newFigure.innerHTML = `            
            <img src="${figure.imageUrl}" alt="${figure.title}">
            <figcaption>${figure.title}</figcaption>
        `;

        container.appendChild(newFigure);
    }
}

async function filterFigures() {
    const figures = await fetchFigures();
    addFigures(figures, gallery);    

    const filters = await addCategories();

    for (let i = 0; i < filters.length; i++) {
        filters[i].addEventListener('click', () => {
            
            setFilterActif(filters, i);
            gallery.innerHTML = '';

            if (i === 0) {
                addFigures(figures, gallery);
                return;
            }

            const newGallery = figures.filter((data) => data.categoryId === i);
            addFigures(newGallery, gallery);            
        });
    }
}

filterFigures();

function setFilterActif(buttons, idx) {
    for (let button of buttons) {
        button.className = '';
    }

    buttons[idx].className = 'actif';
}

const formContact = document.querySelector('#contact');

formContact.addEventListener('submit', (e) => {
    e.preventDefault();
});
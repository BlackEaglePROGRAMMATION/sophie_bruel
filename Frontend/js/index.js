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
}

const addFigures = async () => {
    const figures = await fetchFigures();
    const gallery = document.querySelector('.gallery');

    for (let dataFigure of figures) {
        const figure = document.createElement('figure');
        figure.innerHTML = `
            <img src="${dataFigure.imageUrl}" alt="${dataFigure.title}">
            <figcaption>${dataFigure.title}</figcaption>
        `;

        gallery.appendChild(figure);
    }
}

function initialization() {
    addCategories();
    addFigures();
}

initialization();
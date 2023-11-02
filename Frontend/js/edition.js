const banner = document.querySelector('.banner');
const btnOpen_modal = document.querySelector('.btnOpen-modal');
const containerFilter = document.querySelector('.container-filter');

const modal = document.querySelector('.sect-modal');
const container_modal = document.querySelector('.sect-modal .container');

const btnClose_modal = document.querySelector('.sect-modal .fa-xmark');
const btnReturn_modal = document.querySelector('.sect-modal .fa-arrow-left');

const title_modal = document.querySelector('.sect-modal h3');

const btn_pageOne = document.querySelector('.btn-pageOne');
const btn_pageTwo = document.querySelector('.btn-pageTwo');

const token = sessionStorage.getItem('token');

function modeEdition() {
    if (!token) {
        return;
    }

    banner.style.display = 'flex';
    btnOpen_modal.style.display = 'flex';
    containerFilter.style.display = 'none';

    btnOpen_modal.addEventListener('click', () => {
        modal.style.display = 'flex';
        addFirstPage();
    });

    btn_pageOne.addEventListener('click', () => {
        container_modal.classList.add('second-page');
        container_modal.classList.remove('first-page');
        addSecondPage();
    });

    btn_pageTwo.addEventListener('click', () => {
        addNewProject();
    });

    btnReturn_modal.addEventListener('click', () => {
        addFirstPage();
    });

    btnClose_modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

modeEdition();


const addFiguresEdit = async () => {
    const figures = await fetchFigures();

    container_modal.innerHTML = '';

    for (let figure of figures) {
        const newFigure = document.createElement('figure');
        newFigure.dataset.id = figure.id;

        newFigure.innerHTML = `
            <i class="fas fa-trash-can"></i>
            <img class='figure' src="${figure.imageUrl}" alt="${figure.title}">            
        `;

        container_modal.appendChild(newFigure);
    }
}

function addFirstPage() {
    btn_pageOne.style.display = 'flex';
    btn_pageTwo.style.display = 'none';

    btnReturn_modal.style.display = 'none';
    title_modal.textContent = 'Galerie photo';

    container_modal.classList.add('first-page');
    container_modal.classList.remove('second-page');

    addFiguresEdit();
}

async function addSecondPage() {
    const categories = await fetchCategories();

    btnReturn_modal.style.display = 'flex';
    title_modal.textContent = 'Ajout photo';

    btn_pageOne.style.display = 'none';
    btn_pageTwo.style.display = 'flex';

    container_modal.innerHTML = `
        <div class='container-inputImg'>
            <i class='fas fa-image'></i>
            <label>+ Ajouter une photo</label>
            <p>jpg, png : 4mo max</p>
            <input type='file'>
        </div>

        <label class='title'>Titre</label>
        <input class='input-title' type='text'>

        <label class='categories'>Catégorie</label>
        <select>
            ${categories.map((category) => `<option value="${category.id}">${category.name}</option>`)}
        </select>
    `;

    gestionPreview();
}

const gestionPreview = () => {
    const container_input = document.querySelector('.container-inputImg');
    const input_img = document.querySelector('.container-inputImg input');
    const image = document.createElement('img');

    input_img.addEventListener('change', () => {
        if (!input_img.files[0]) {
            return;
        }

        const data_img = input_img.files[0];

        const preview = new FileReader();
        preview.readAsDataURL(data_img);

        preview.onload = () => {
            image.src = preview.result;
            container_input.appendChild(image);
        };
    });
}

const addNewProject = () => {
    const image = document.querySelector('input[type=file]');
    const title = document.querySelector('.input-title').value;
    const category = document.querySelector('.modal select').value;

    if (!image.files[0] || title === '') {
        return;
    }

    const formData = new FormData();

    formData.append('title', title);
    formData.append('category', category);
    formData.append('image', image.files[0]);

    fetch("http://localhost:5678/api/works", {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
        body: formData
    });
}
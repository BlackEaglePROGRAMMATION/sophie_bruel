const banner = document.querySelector('.banner');
const btnOpen_modal = document.querySelector('.btnOpen-modal');
const containerFilter = document.querySelector('.container-filter');

const modal = document.querySelector('.sect-modal');
const container_modal = document.querySelector('.sect-modal .container');

const btnClose_modal = document.querySelector('.sect-modal .fa-xmark');
const btnReturn_modal = document.querySelector('.sect-modal .fa-arrow-left');

const title_modal = document.querySelector('.sect-modal h3');
const btnValidation_modal = document.querySelector('.sect-modal .validation');

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

    btnClose_modal.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

modeEdition();


const addFirstPage = () => {
    container_modal.innerHTML = '';
    title_modal.textContent = 'Galerie photo';
    btnValidation_modal.textContent = 'Ajouter une photo';   
    
    addFiguresEdit();
}

const addFiguresEdit = async () => {
    const figures = await fetchFigures();
    addFigures(figures, container_modal, true);

}
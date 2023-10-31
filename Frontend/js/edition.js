const banner = document.querySelector('.banner');
const btnOpenModal = document.querySelector('.btnOpen-modal');
const containerFilter = document.querySelector('.container-filter');

const token = sessionStorage.getItem('token');

function modeEdition() {
    if (!token) {
        return;
    }

    banner.style.display = 'flex';
    btnOpenModal.style.display = 'flex';
    containerFilter.style.display = 'none';

    
}

modeEdition();
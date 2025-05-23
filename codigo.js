const wapperModal = document.querySelector(".modal-wapper");
const modal = document.querySelector(".wapper-form");
const abrirModal = document.getElementById('abrirModal');

abrirModal.addEventListener('click', ()=> {
    wapperModal.classList.remove('hidden');
    modal.classList.remove('hidden');
});

wapperModal.addEventListener('click', ()=> {
    wapperModal.classList.add('hidden');
    modal.classList.add('hidden');
});
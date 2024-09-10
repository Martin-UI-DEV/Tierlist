// document.addEventListener('DOMContentLoaded', () => {
//     const items = document.querySelectorAll('.item');
//     const tiers = document.querySelectorAll('.tier-items');

//     items.forEach(item => {
//         item.addEventListener('dragstart', handleDragStart);
//         item.addEventListener('dragend', handleDragEnd);
//     });

//     tiers.forEach(tier => {
//         tier.addEventListener('dragover', handleDragOver);
//         tier.addEventListener('drop', handleDrop);
//     });

//     function handleDragStart(e) {
//         e.dataTransfer.setData('text/plain', e.target.dataset.item);
//         e.target.classList.add('dragging');
//     }

//     function handleDragEnd(e) {
//         e.target.classList.remove('dragging');
//     }

//     function handleDragOver(e) {
//         e.preventDefault();
//     }

//     function handleDrop(e) {
//         e.preventDefault();
//         const itemName = e.dataTransfer.getData('text/plain');
//         const draggedItem = document.querySelector(`[data-item="${itemName}"]`);
//         e.target.appendChild(draggedItem);
//     }


const $ = el => document.querySelector(el);
const $$ = els => document.querySelectorAll(els);

const imageInput = $('#add-image-button');
const itemsSection = $('#items-list');

function createItem(src) {
    const imgElement = document.createElement('img');
    imgElement.draggable = true;
    imgElement.addEventListener('dragstart', handleDragStart);
    imgElement.addEventListener('dragend', handleDragEnd);
    imgElement.src = src;
    imgElement.className = 'item-image';
    itemsSection.appendChild(imgElement);
    return imgElement;
}

imageInput.addEventListener('change', (event)=>{
    const [file] = event.target.files;

    if (file) {
        const reader = new FileReader()
        reader.onload = (eventReader) => {
            createItem(eventReader.target.result)
        }
        reader.readAsDataURL(file)
    }
})

let draggedElement = null;
let sourceContainer = null;

const rows = $$('#tier-list .tier-items')
rows.forEach(row => {
    row.addEventListener('drop', handleDrop)
    row.addEventListener('dragover', handleDragOver)
    row.addEventListener('dragleave', handleDragLeave)
})

function handleDrop(e) {
    e.preventDefault()
    const { currentTarget, dataTransfer } = e
    if (sourceContainer && draggedElement) {
        sourceContainer.removeChild(draggedElement)
    }
    if (draggedElement) {
        const src = dataTransfer.getData('text/plain');
        const imgElement = createItem(src);
        currentTarget.appendChild(imgElement);
    }
    currentTarget.classList.remove('drag-over');
}

function handleDragOver(e) {
    e.preventDefault()
    const { currentTarget } = e
    if (sourceContainer === currentTarget) return
    currentTarget.classList.add('drag-over');
}
function handleDragLeave(e) {
    e.preventDefault()
    const { currentTarget } = e
    currentTarget.classList.remove('drag-over');
}

function handleDragStart(e) {
    draggedElement = e.target;
    sourceContainer = draggedElement.parentNode;
    e.dataTransfer.setData('text/plain', draggedElement.src);
}

function handleDragEnd(e) {
    draggedElement = null;
    sourceContainer = null;
}



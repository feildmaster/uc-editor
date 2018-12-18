const underlineRegex = /(Magic|Future|Dodge|Dust|Taunt|Paralyze|paralyzed|Start of turn|End of turn|Haste|Armor|Can't attack|Candy|Transparency|Charge|Fatigue|Turbo|Amalgamate|Dog)|_([^_]+)_/g
const colorRegex = /(ATK|DMG|HP|KR)/g;


function generate(monster = true) {
    gtag('event', `create_${monster ? 'monster':'spell'}`,);
    const container = document.getElementById('cards');
    const wrapper = document.createElement('span');
    wrapper.className = 'cardWrapper';
    // Desc max: 115
    wrapper.innerHTML = `
        <table class="cardBoard ${monster?'monster':'spell'}">
            <tr>
                <td class="name" colspan="3"><span></span><input type="text" maxlength="15" placeholder="Name"></td>
                <td class="cost edit"><span>0</span></td>
            </tr>
            <tr>
                <td class="image" colspan="4">
                    <input type="file" accept="image/*">
                    <img>
                </td>
            </tr>
            <tr>
                <td class="description" colspan="4"><div></div><textarea></textarea></td>
            </tr>
            <tr>
                ${monster?'<td class="attack edit"><span>0</span></td>':''}
                <td class="rarity" colspan="${monster?'2':'4'}" onclick="selectRarity(this);"><img data-rarity="COMMON" src="rarity/COMMON.png"></td>
                ${monster?'<td class="health edit"><span>0</span></td>':''}
            </tr>
        </table>
        <span class="footer">undercard.feildmaster.com</span>`;
    const card = wrapper.querySelector('.cardBoard');
    card.oncontextmenu = cardMenu.bind(null, card);
    // Name edit
    const nameCell = wrapper.querySelector('.name');
    nameCell.onclick = editName.bind(nameCell);
    nameCell.querySelector('input').onblur = finalizeName.bind(nameCell);
    // Number edit
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    wrapper.querySelectorAll('.edit span').forEach(function (span) {
        const clone = input.cloneNode();
        span.onclick = edit.bind(span, clone);
        clone.onblur = finalizeEdit.bind(clone, span);
        span.after(clone);
    });
    // Description edit
    const description = wrapper.querySelector('.description div');
    const descriptionBox = wrapper.querySelector('.description textarea');
    wrapper.querySelector('.description').onclick = editDescription.bind(description, descriptionBox);
    descriptionBox.onblur = renderDescription.bind(descriptionBox, description);
    // Image edit
    const imageRow = wrapper.querySelector('.image');
    const image = imageRow.querySelector('input');
    imageRow.onclick = () => image.click();
    image.onchange = readImage.bind(image, imageRow.querySelector('img'));
    // Add to document
    container.append(wrapper);
    tippy(imageRow, {
        content: 'Click to Select Image',
        placement: 'top',
        trigger: 'mouseenter',
        size: 'small',
        interactive: false,
    });
    tippy(descriptionBox);
}

function editName() {
    this.querySelector('span').style.display = 'none';
    this.querySelector('input').focus();
}

function finalizeName() {
    const span = this.querySelector('span');
    const input = this.querySelector('input');
    if (span.textContent !== input.value) {
        editEvent('name');
        span.textContent = input.value;
    }
    span.style.display = '';
}

function edit(input) {
    this.style.display = 'none';
    input.value = '';
    input.placeholder = this.textContent;
    input.focus();
}

function finalizeEdit(span) {
    const newValue = this.value || span.textContent;
    if (span.textContent !== newValue) {
        editEvent(span.parentElement.classList[0]);
        span.textContent = newValue;
    }
    span.style.display = '';
}

function editDescription(input) {
    this.style.display = 'none';
    input.focus();
    input._oldValue = input.value;
    input._tippy.show(0);
}

function renderDescription(span, e = {}) {
    const tippy = this._tippy;
    if (e.relatedTarget === tippy.popper) return;
    tippy.hide(0);
    if (this.value !== this._oldValue) {
        editEvent('description');
        const description = this.value
            .replace(underlineRegex, (match, $1, $2) => `<span class="underline">${$2||$1}</span>`)
            .replace(colorRegex, (match, $1) => `<span class="${getClass($1)}">${$1}</span>`);
        span.innerHTML = description;
    }
    span.style.display = '';
}

function getClass(keyword) {
    switch (keyword) {
        case 'ATK': return 'attack';
        case 'HP': return 'health';
        case 'DMG': return 'damage';
        case 'KR': return 'poison';
    }
}

function editEvent(type) {
    gtag('event', `edit_${type}`);
}

function readImage(image) {
    if (!(this.files && this.files[0])) return;
    editEvent('image');
    const reader = new FileReader();
    reader.onload = function (e) {
        image.src = e.target.result;
    };
    reader.readAsDataURL(this.files[0]);
}

function selectRarity(element) {
    editEvent('rarity');
    // Possibly make this a drop down instead
    const image = element.querySelector('img');
    const rarity = getNextRarity(image.dataset.rarity);
    image.dataset.rarity = rarity;
    image.src = `rarity/${rarity}.png`;
}

function getNextRarity(rarity) {
    switch (rarity) {
        default: return 'COMMON';
        case 'COMMON': return 'RARE';
        case 'RARE': return 'EPIC';
        case 'EPIC': return 'LEGENDARY';
        case 'LEGENDARY': return 'DETERMINATION';
    }
}

function saveCard(card) {
    gtag('event', 'save');
    const footer = card.parentElement.querySelector('.footer');
    footer.style.display = 'table-footer-group';
    const image = card.querySelector('.image img');
    let removedImage = false;
    if (!image.src) {
        image.parentElement.removeChild(image);
        removedImage = true;
    }
    const description = card.querySelector('.description textarea.tippy-active');
    if (description) { // Render description
        renderDescription.call(description, card.querySelector('.description div'));
    }
    domtoimage.toPng(card.parentElement).then((url) => {
        const link = document.createElement('a');
        link.download = `${card.querySelector('.name input').value||'undercard'}.png`;
        link.href = url;
        link.click();
    }).catch((error) => console.error('Ooops.', error))
    .then(() => {
        footer.style.display = '';
        if (removedImage) {
            card.querySelector('.image').append(image);
        }
    });
}

function cardMenu(card, e) {
    if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;
    if (e.target === card.querySelector('.description textarea')) return;
    e.stopPropagation();
    const context = document.querySelector('.context');
    context.style.display = 'unset';
    context.style.left = `${e.pageX}px`;
    context.style.top = `${e.pageY}px`;
    // Delete
    context.querySelector('.delete').onclick = () => {
        card.remove();
        context.style.display = '';
    };
    // Download
    context.querySelector('.download').onclick = () => {
        saveCard(card);
        context.style.display = '';
    };
    return false;
}

window.onload = () => {
    const context = document.querySelector('.context');
    const close = () => context.style.display = '';
    context.querySelector('.close').onclick = close;
    window.oncontextmenu = close;
    window.onclick = close;
};

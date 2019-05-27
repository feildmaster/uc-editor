export const effects = [
  'Magic', 'Future', 'Dodge', 'Dust', 'Taunt', 'Paralyze', 'paralyzed', 'Start of turn', 'End of turn', 'Haste', 'Armor', `Can't attack`, 'Candy', 'Transparency', 'Charge',
  'Fatigue', 'Turbo', 'Ranged', 'Support',
  // Tribes
  'Amalgamates?', 'Bombs?', 'Dogs?', 'Froggits?', 'G followers?', 'Lost souls?', 'Mold', 'Plants?', 'Royal guards?', 'Snails?', 'Spiders?', 'Temmies?',
];
export const specials = ['ATK', 'DMG', 'HP', 'KR', 'cost'];

const div = document.querySelector('#descriptionTip div');
function addType(type) {
    const el = document.createElement('span');
    el.innerText = type.replace('s?', '');
    div.append(el, ' ');
}
effects.forEach(addType);
specials.forEach(addType);

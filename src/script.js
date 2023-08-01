const dice = document.getElementById('form')
const results = document.getElementById('results')
const quickAttack = document.getElementById('quick-attack-roll')
const quickResult = document.getElementById('attack-roll')

dice.addEventListener('submit', (event) => {
    event.preventDefault();

    while (results.firstChild) {
        results.removeChild(results.firstChild)
    }

    if (event.target[0].value === '' || event.target[1].value === '') {
        window.alert('Invalid selection, please specify a number of dice and type of dice to roll')
        return;
    }

    const numDice = event.target[0].value;
    const numSides = event.target[1].value;

    for (let i = numDice; i > 0; i--) {
        const roll = Math.ceil(Math.random() * numSides)
        const result = document.createElement('div');
        result.setAttribute('id', i);
        result.setAttribute('class', 'roll')
        result.innerText = roll;


        results.appendChild(result);
    }

});

quickAttack.addEventListener('click', () => {
    quickResult.innerText = '';

    const attackRoll = Math.ceil(Math.random() * 20);

    quickResult.removeAttribute('hidden')

    if (attackRoll === 1) {
        quickResult.innerText = ` ${attackRoll} Oof!`
    } else if (attackRoll === 20) {
        quickResult.innerText = ` ${attackRoll} Nice!`
    } else {
        quickResult.innerText = ` ${attackRoll}`
    }
})
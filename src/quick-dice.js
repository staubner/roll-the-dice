const dice = document.getElementById('form')
const results = document.getElementById('results')
const quickAttack = document.getElementById('quick-attack-roll')
const quickResult = document.getElementById('attack-roll')
const resetBtn = document.getElementById('reset')
const rollSound = new Audio('../audio/rolling-dice-2-102706.mp3')
const errorSound = new Audio('../audio/error-126627.mp3')

//rolls dice
dice.addEventListener('submit', (event) => {
    event.preventDefault();

    while (results.firstChild) {
        results.removeChild(results.firstChild)
    }

    if (event.target[0].value === '' || event.target[1].value === '') {
        errorSound.play();
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

    rollSound.play();
});

//rolls a d20
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

    rollSound.play();
});

//resets page
resetBtn.addEventListener('click', () => {
    window.location.reload();
})
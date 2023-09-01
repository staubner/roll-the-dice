if (localStorage.length > 0 && !sessionStorage.getItem('redirect')) {
    // window.location.href = 'http://127.0.0.1:8080/custom-dice.html';
    window.location.href = 'https://memedice.netlify.app/custom-dice';
    sessionStorage.setItem('redirect', 'true')
} else if (sessionStorage.getItem('redirect') = 'true') {
    // window.location.href = 'http://127.0.0.1:8080';
    window.location.href = 'https://memedice.netlify.app';
};

const dice = document.getElementById('form')
const results = document.getElementById('results')
const individualDice = document.getElementById('individual-dice')
const totalResult = document.getElementById('total')
const quickAttack = document.getElementById('quick-attack-roll')
const quickResult = document.getElementById('attack-roll')
const resetBtn = document.getElementById('reset')
const rollSound = new Audio('../audio/rolling-dice-2-102706.mp3')
const errorSound = new Audio('../audio/error-126627.mp3')

//rolls dice
dice.addEventListener('submit', (event) => {
    event.preventDefault();

    document.getElementById('roll-dice').disabled = true;

    while (individualDice.firstChild) {
        individualDice.removeChild(individualDice.firstChild)
    };

    while (totalResult.firstChild) {
        totalResult.removeChild(totalResult.firstChild)
    };

    if (event.target[0].value === '' || event.target[1].value === '') {
        errorSound.play();
        document.getElementById('roll-dice').disabled = false;
        window.alert('Invalid selection, please specify a number of dice and type of dice to roll')
        return;
    };

    const numDice = event.target[0].value;
    const numSides = event.target[1].value;
    let total = 0;

    setTimeout(() => {
        for (let i = numDice; i > 0; i--) {
            const roll = Math.ceil(Math.random() * numSides)
            total = total + roll;

            const die = document.createElement('div');
            die.setAttribute('class', 'die-roll');
            die.innerText = roll;

            individualDice.appendChild(die);
        }

        totalResult.innerText = total;

        document.getElementById('roll-dice').disabled = false;
    }, 1450);


    rollSound.play();
});

//rolls a d20
quickAttack.addEventListener('click', () => {
    quickAttack.disabled = true;

    quickResult.innerText = '';

    const attackRoll = Math.ceil(Math.random() * 20);

    setTimeout(() => {
        if (attackRoll === 1) {
            quickResult.innerText = `${attackRoll} Oof!`
        } else if (attackRoll === 20) {
            quickResult.innerText = `${attackRoll} Nice!`
        } else {
            quickResult.innerText = `${attackRoll}`
        }

        quickAttack.disabled = false;
    }, 1450);

    rollSound.play();
});

//resets page
resetBtn.addEventListener('click', () => {
    window.location.reload();
})
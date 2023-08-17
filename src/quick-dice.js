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

    document.getElementById('roll-dice').disabled = true;

    while (results.firstChild) {
        results.removeChild(results.firstChild)
    }

    if (event.target[0].value === '' || event.target[1].value === '') {
        errorSound.play();
        document.getElementById('roll-dice').disabled = false;
        window.alert('Invalid selection, please specify a number of dice and type of dice to roll')
        return;
    }

    const numDice = event.target[0].value;
    const numSides = event.target[1].value;
    let total = 0;

    setTimeout(() => {
        for (let i = numDice; i > 0; i--) {
            const roll = Math.ceil(Math.random() * numSides)
            total = total + roll;
        }

        const result = document.createElement('div');
        result.setAttribute('class', 'roll')
        result.innerText = total;
    
        results.appendChild(result);

        document.getElementById('roll-dice').disabled = false;
    }, 1000);
    

    rollSound.play();
});

//rolls a d20
quickAttack.addEventListener('click', () => {
    quickAttack.disabled = true;

    quickResult.innerText = '';

    const attackRoll = Math.ceil(Math.random() * 20);

    setTimeout(() => {
        if (attackRoll === 1) {
            quickResult.innerText = ` ${attackRoll} Oof!`
        } else if (attackRoll === 20) {
            quickResult.innerText = ` ${attackRoll} Nice!`
        } else {
            quickResult.innerText = `${attackRoll}`
        }

        quickAttack.disabled = false;
    }, 1000);

    rollSound.play();
});

//resets page
resetBtn.addEventListener('click', () => {
    window.location.reload();
})
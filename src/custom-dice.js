import { checkForDupes } from './dupe-name-check.js';

const rollSound = new Audio('../audio/rolling-dice-2-102706.mp3')
const errorSound = new Audio('../audio/error-126627.mp3')
const customForm = document.getElementById('custom-form')
const rollList = document.getElementById('roll-list')

export const rollArray = [];

customForm.addEventListener('submit', (event) => {
    event.preventDefault();

    document.getElementById('create-custom').disabled = true;

    if (event.target[0].value === '' || event.target[1].value === '' || event.target[2].value === '') {
        errorSound.play();
        window.alert('Invalid selection, please enter a value in every field')
        return;
    }

    const rollName = event.target[0].value;
    const numDice = event.target[1].value;
    const numSides = event.target[2].value;
    const modifier = event.target[3].valueAsNumber;


    //checks for duplicate roll names
    const isDupe = checkForDupes(rollName);

    if (isDupe === true) {
        alert(`Name ${rollName} has already been used, please choose another name.`);
        return;
    }
    
    const newRollObj = {
        rollName,
        numDice,
        numSides,
        modifier,
    };

    rollArray.push(newRollObj);

    const customRoll = document.createElement('div');
    customRoll.setAttribute('class', 'saved-roll');

    const customRollAttributes = document.createElement('div');
    customRollAttributes.setAttribute('class', 'saved-roll-attributes');

    const customRollName = document.createElement('p')
    customRollName.setAttribute('class', 'custom-roll-attribute')
    customRollName.setAttribute('class', 'custom-roll-name')
    customRollName.innerText = `Name: ${rollName}`;
    customRollAttributes.appendChild(customRollName);

    const customRollNumDice = document.createElement('p');
    customRollNumDice.setAttribute('class', 'custom-roll-attribute')
    customRollNumDice.innerText = `Number of Dice: ${numDice}`;
    customRollAttributes.appendChild(customRollNumDice);

    const customRollTypeDice = document.createElement('p');
    customRollTypeDice.setAttribute('class', 'custom-roll-attribute')
    customRollTypeDice.innerText = `Type of Die: d${numSides}`;
    customRollAttributes.appendChild(customRollTypeDice);

    const customRollMod = document.createElement('p');
    customRollMod.setAttribute('class', 'custom-roll-attribute')
    customRollMod.innerText = `Modifier: ${modifier}`;
    customRollAttributes.appendChild(customRollMod);

    customRoll.appendChild(customRollAttributes);

    const customRollBox = document.createElement('div');
    customRollBox.setAttribute('class', 'custom-roll-box');
    customRoll.appendChild(customRollBox);

    const deleteCustomRoll = document.createElement('button');
    deleteCustomRoll.setAttribute('class', 'delete-custom-roll');
    deleteCustomRoll.setAttribute('id', `delete-${rollName.toLowerCase()}`)
    deleteCustomRoll.innerText = 'X';
    customRoll.appendChild(deleteCustomRoll);

    const customRollBtn = document.createElement('button');
    customRollBtn.setAttribute('class', 'custom-roll-button');
    customRollBtn.setAttribute('id', rollName.toLowerCase());
    customRollBtn.innerText = 'Roll';
    customRoll.appendChild(customRollBtn);

    rollList.appendChild(customRoll);

    let customRollHeight = numDice * 75;
    if (customRollHeight < 160) {
        customRollHeight = 160;
    }
    customRoll.style.height = `${customRollHeight}px`;

    const rollButton = document.getElementById(rollName.toLowerCase());

    rollButton.addEventListener('click', () => {
        rollButton.disabled = true;

        while (customRollBox.firstChild) {
            customRollBox.removeChild(customRollBox.firstChild)
        }

        setTimeout(() => {
            for (let i = numDice; i > 0; i--) {
                let roll = Math.ceil((Math.random() * numSides) + modifier);
                if (roll < 1) {
                    roll = 1;
                }

                const result = document.createElement('div');
                // result.setAttribute('id', i);
                result.setAttribute('class', 'roll')
                result.innerText = roll;


                customRollBox.appendChild(result);

                rollButton.disabled = false;
            }
        }, 1000);


        rollSound.play();
    })

    document.getElementById('create-custom').disabled = false;
})
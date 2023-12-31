const rollSound = new Audio('../audio/rolling-dice-2-102706.mp3')
const rollList = document.getElementById('roll-list')

if (localStorage.length > 0) {
    for (let i = 0; i < localStorage.length; i++) {
        const storedRollName = localStorage.key(i)

        const storedRoll = JSON.parse(localStorage.getItem(storedRollName));

        const rollName = storedRoll.rollName;
        const numDice = storedRoll.numDice;
        const numSides = storedRoll.numSides;
        const modifier = storedRoll.modifier;

        const customRoll = document.createElement('div');
        customRoll.setAttribute('class', 'saved-roll');
        customRoll.setAttribute('id', `custom-roll-${rollName}`)

        const customRollAttributes = document.createElement('div');
        customRollAttributes.setAttribute('class', 'saved-roll-attributes');

        const customRollName = document.createElement('p');
        customRollName.setAttribute('class', 'custom-roll-attribute');
        customRollName.setAttribute('class', 'custom-roll-name');
        customRollName.innerText = `Name: ${rollName}`;
        customRollAttributes.appendChild(customRollName);

        const customRollNumDice = document.createElement('p');
        customRollNumDice.setAttribute('class', 'custom-roll-attribute');
        customRollNumDice.innerText = `Number of Dice: ${numDice}`;
        customRollAttributes.appendChild(customRollNumDice);

        const customRollTypeDice = document.createElement('p');
        customRollTypeDice.setAttribute('class', 'custom-roll-attribute');
        customRollTypeDice.innerText = `Type of Die: d${numSides}`;
        customRollAttributes.appendChild(customRollTypeDice);

        const customRollMod = document.createElement('p');
        customRollMod.setAttribute('class', 'custom-roll-attribute');
        customRollMod.innerText = `Modifier: ${modifier}`;
        customRollAttributes.appendChild(customRollMod);

        customRoll.appendChild(customRollAttributes);

        const customRollBox = document.createElement('div');
        customRollBox.setAttribute('class', 'custom-roll-box');
        customRoll.appendChild(customRollBox);

        const customRollDice = document.createElement('div');
        customRollDice.setAttribute('class', 'custom-roll-dice');
        customRollBox.appendChild(customRollDice);

        const customRollTotal = document.createElement('div');
        customRollTotal.setAttribute('class', 'custom-roll-total');
        customRollBox.appendChild(customRollTotal);

        const deleteCustomRoll = document.createElement('button');
        deleteCustomRoll.setAttribute('class', 'delete-custom-roll');
        deleteCustomRoll.setAttribute('id', `delete-${rollName.toLowerCase()}`)
        deleteCustomRoll.innerText = 'X';
        customRoll.appendChild(deleteCustomRoll);

        const customRollBtn = document.createElement('button');
        customRollBtn.setAttribute('class', 'custom-roll-button roll');
        customRollBtn.setAttribute('id', rollName.toLowerCase());
        customRollBtn.innerText = 'Roll';
        customRoll.appendChild(customRollBtn);

        rollList.appendChild(customRoll);

        const rollButton = document.getElementById(rollName.toLowerCase());
        const deleteButton = document.getElementById(`delete-${rollName.toLowerCase()}`)

        rollButton.addEventListener('click', () => {
            rollButton.disabled = true;

            if (customRollDice.firstChild) {
                customRollDice.innerHTML = '';
            }

            if (customRollTotal.firstChild) {
                customRollTotal.innerHTML = '';
            }

            let total = 0;

            setTimeout(() => {
                for (let i = numDice; i > 0; i--) {
                    const roll = Math.ceil((Math.random() * numSides));

                    total = total + roll;

                    const die = document.createElement('div');
                    die.setAttribute('class', 'custom-die-roll');
                    die.innerText = roll;

                    customRollDice.appendChild(die);
                };

                if (modifier > 0 || modifier < 0) {
                    const die = document.createElement('div');
                    die.setAttribute('class', 'mod-die');
                    die.innerText = `mod. ${modifier}`;
                    customRollDice.appendChild(die);
                };

                const result = document.createElement('div');
                result.setAttribute('class', 'custom-dice-total')
                if (total + modifier >= 1) {
                    result.innerText = total + modifier;
                } else {
                    result.innerText = 1;
                };
                
                customRollTotal.appendChild(result);

                rollButton.disabled = false;

            }, 1450);


            rollSound.play();
        });

        deleteButton.addEventListener('click', () => {
            deleteButton.disabled = true;

            if (confirm(`Delete roll "${rollName}"?`) === true) {
                document.getElementById(`custom-roll-${rollName}`).remove();
                localStorage.removeItem(rollName);
            } else {
                deleteButton.disabled = false;
                return;
            }
        });
    };
};
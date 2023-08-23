export function confirmRoll () {
    const popUp = document.createElement('div');
    popUp.setAttribute('id', 'pop-up');
    popUp.innerText = 'Custom Roll Saved!';
    document.body.append(popUp);

    setTimeout(() => {
        popUp.remove();
    }, 1800);
};
export function checkForDupes(newName) {
    const namesToCheck = document.querySelectorAll('.saved-roll');

    const allNames = [];

    if(namesToCheck.length > 0) {
        namesToCheck.forEach((element) => {
            allNames.push(element.childNodes[0].childNodes[0].innerText);
        });
    }

    let isTrue = false;

    allNames.forEach((name) => {
        if (name.includes(newName) === true) {
            isTrue = true;
        };
    });

    return isTrue;
};
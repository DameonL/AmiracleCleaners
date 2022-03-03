document.querySelector("#createButton").addEventListener("click", () => {
    let newItem = {};
    newItem.fields = {};
    newItem.variants = {};

    let textFields = document.querySelectorAll(`input[type="text"]`);
    for (let textField of textFields) {
        let boundField = textField.getAttribute("boundField");
        newItem[boundField] = { stringValue: boundField.value; }
    }

    let numberFields = document.querySelectorAll(`input[type="number"]`);
    for (let numberField of numberFields) {
        let boundField = numberField.getAttribute("boundField");
        newItem[boundField] = { doubleValue: boundField.valueAsNumber; }
    }

    console.log(newItem);
});
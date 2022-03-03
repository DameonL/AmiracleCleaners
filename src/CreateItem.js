document.querySelector("#createButton").addEventListener("click", () => {
    let newItem = {};
    newItem.fields = {};
    newItem.fields.variants = [];

    let textFields = document.querySelectorAll(`input[type="text"]`);
    let assignValue = (boundField, item, value) => {
        if (boundField.includes(".")) {
            let fieldPath = boundField.split(".");
            item.fields[fieldPath[0]][fieldPath[1]] = value;
        } else {
            item.fields[boundField] = value;
        }
    }

    for (let textField of textFields) {
        let boundField = textField.getAttribute("boundField");
        assignValue(boundField, newItem, { stringValue: textField.value });
    }

    let numberFields = document.querySelectorAll(`input[type="number"]`);
    for (let numberField of numberFields) {
        let boundField = numberField.getAttribute("boundField");
        assignValue(boundField, newItem, { doubleValue: numberFields.valueAsNumber });
    }

    console.log(newItem);
});
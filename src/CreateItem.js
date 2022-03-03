document.querySelector("#createButton").addEventListener("click", () => {
    let newItem = {};
    newItem.fields = {};
    newItem.variants = {};

    let textFields = document.querySelector(`input[type="text"]`);
    for (let textField of textFields) {
        let boundField = textField.getAttribute("boundField");
        fields[boundField].stringValue = stringValue.value;
    }

    let numberFields = document.querySelector(`input[type="number"]`);
    for (let numberField of numberFields) {
        let boundField = numberField.getAttribute("boundField");
        fields[boundField].doubleValue = numberField.valueAsNumber;
    }

    console.log(newItem);
});
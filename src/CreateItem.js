function processFields(startElement) {
    let newItem = {};
    newItem.fields = {};

    let boundFields = document.querySelectorAll("[boundField]");

    for (let field in boundFields) {
        if getParentField(field) continue;

        let fieldName = field.getAttribute("boundField");
        let fieldType = field.getAttribute("fieldType");
        let fieldItem = fieldTypeHandlers[fieldType](field);
        newItem.fields[fieldName] = fieldItem;
    }

    return newItem;
}

function getParentField = (field) => {
    let currentElement = field;
    while (currentElement) {
        currentElement = parentElement;

        if (!currentElement) break;

        let fieldType = currentElement.getAttribute("fieldType");
        if ((fieldType === "arrayValue") || (fieldType === "mapValue"))
            return currentElement;
    }

    return null;
}

let fieldTypeHandlers = {
    "stringValue" : (field) => {
        let output = {};
        output.stringValue = field.value;
        return output;
    },
    "doubleValue" : (field) => {
        let output = {};
        output.doubleValue = field.valueAsNumber;
        return output;
    },
    "arrayValue" : (field) => {
        let output = {};
        output.arrayValue = {};
        output.arrayValue.values = [];
        let childElements = field.querySelectorAll(`[boundField="value"]`);
        for (let child of childElements) {
            if (getParentField(child) != field) continue;
            output.arrayValue.values.add(processFields(child));
        }

        return output;
    }
    "mapValue" : (field) => {
        let output = processFields(field);
        return output;
    }
}

document.querySelector("#createButton").addEventListener("click", () => {
    let serializedItem = processFields(document);

    console.log(serializedItem);
});
class ItemBinder {
    #boundItem = null;
    #boundElement = null;

    constructor(itemToBind, elementToBind) {
        this.#boundItem = itemToBind;
        this.#boundElement = elementToBind;
        this.#bindFields();
    }

    #bindFields() {
        let boundElements = this.#boundElement.querySelectorAll(`[boundField]`);
        for (let boundElement of boundElements) {
            let boundField = boundElement.getAttribute("boundField");
            if (boundField in this.#boundItem) {
                if ((boundElement.nodeName == "DIV") || (boundElement.nodeName == "SPAN")) {
                    let fieldText = "";
                    if (this.#boundItem[boundField].stringValue) {
                        fieldText = this.#boundItem[boundField].stringValue;
                    }
                    if (this.#boundItem[boundField].doubleValue) {
                        fieldText = this.#boundItem[boundField].doubleValue;
                    }
    
                    boundElement.innerText = fieldText;
                } else if (boundElement.nodeName == "IMG") {
                    boundElement.src = `../img/products/${this.#boundItem[boundField].stringValue}.jpg`;
                }
            }
        }
    }
}

export default ItemBinder;
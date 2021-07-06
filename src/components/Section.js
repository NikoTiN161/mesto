export default class Section {
    constructor({data, renderer}, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    renderItems() {
        this._renderedItems.forEach(item => {
            this._renderer(item);
        });
    }

    addItem(element, isAppend) {
        isAppend 
        ? this._container.append(element)
        : this._container.prepend(element);
    }

    // deleteItem(itemId) {
    //     let newArr = this._renderedItems.slice();
    //     this._renderedItems.forEach((item, index) => {
    //         if (item._id === itemId) {
    //             newArr.splice(index, 1);
    //         }
    //     });
    //     this._renderedItems = newArr;
    //     this.renderItems();
    // }
}
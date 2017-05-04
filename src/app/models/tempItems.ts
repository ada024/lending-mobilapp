export class Tempitems{

     list = [];
    constructor() {
       
    }

    getItems() {
        return this.list;
    }

    addItem(item) {
        this.list.push(item);
    }

    deleteItem(item) {
        let index: number = this.list.indexOf(item);
        if (index !== -1) {
            this.list.splice(index, 1);
        }
    }

    deleteAllItems() {
        while (this.list.length > 0) {
           this.list.pop();
        }
    }

}
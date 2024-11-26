const fs = require('fs').promises;

class FakeDb {
    constructor(file = "./items.json") {
        this.file = file;
    }

    async readDb() {
        const fileData = await fs.readFile(this.file);
        return JSON.parse(fileData);
    }

    async writeDb(data) {
        await fs.writeFile(this.file, JSON.stringify(data, null, 2));
    }

    async addItem(item) {
        const items = await this.readDb();
        items.push(item);
        await this.writeDb(items);
        return item;
    }

    async getItem(name) {
        const items = await this.readDb();
        return items.find(item => item.name === name);
    }

    async updateItem(name, updatedItem) {
        let items = await this.readDb();
        let itemIndex = items.findIndex(items => items.name === name);
        if(itemIndex !== -1){
            items[itemIndex] = updatedItem;
            await this.writeDb(items);
            return updatedItem;
        } else {
            throw new Error("Item not found");
        }
    }

    async deleteItem(name) {
        let items = await this.readDb();
        let itemIndex = items.findIndex(item => item.name === name);
        if(itemIndex !== -1){
            items.splice(itemIndex, 1);
            await this.writeDb(items);
        } else {
            throw new Error("Item not found");
        }
    }
}

module.exports = new FakeDb();
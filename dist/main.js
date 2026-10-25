class User {
    id;
    name;
    email;
    password;
    phone;
    _age;
    _userNoteBooks = [];
    set userNoteBook(book) {
        if (Array.isArray(book)) {
            this._userNoteBooks.push(...book);
        }
        else {
            this._userNoteBooks.push(book);
        }
    }
    set age(value) {
        if (!(value >= 18 && value <= 60))
            throw new Error("age must be between 18 - 60");
    }
    get age() {
        return this._age;
    }
    constructor(id, name, email, password, phone, _age) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.phone = phone;
        this._age = _age;
    }
    displayInfo() {
        console.log({
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            phone: this.phone,
            age: this.age
        });
    }
}
class Admin extends User {
    constructor(id, name, email, password, phone, age) {
        super(id, name, email, password, phone, age);
    }
    mangeNote() {
    }
}
class Note {
    id;
    title;
    content;
    user;
    constructor(id, title, content, user) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.user = user;
    }
    preview() {
        console.log({
            title: this.title,
            content: this.content
        });
    }
}
class NoteBook {
    book = [];
    constructor(book) {
        this.book = book;
    }
    addNote(note) {
        this.book.push(note);
    }
    removeNote(note) {
        const index = this.book.findIndex(ele => ele === note);
        if (index !== -1) {
            this.book.splice(index, 1);
        }
    }
}
class Storage {
    item;
    Items = [];
    constructor(item) {
        this.item = item;
    }
    addItem(item) {
        this.Items.push(item);
    }
    removeItem(item) {
        const index = this.Items.findIndex(ele => ele === item);
        if (index !== -1) {
            this.Items.splice(index, 1);
        }
    }
    getAllItem() {
        return this.Items;
    }
}
const user = new User(1, "ahmed", "ahmed@mail.com", "#Pass123", "010123456", 30);
const user2 = new User(2, "mohamed", "ahmed@mail.com", "#Pass123", "010123456", 30);
const note = new Note(5, "nodejs", "nodejs is better than dotnet ;)", user);
const note2 = new Note(7, "nodejs ", "nodejs is better than FastAPI ;)", user);
const U2note = new Note(6, "nodejs 2 ", "nodejs is better than SpringBoot ;)", user2);
const book = new NoteBook([note, note2]);
const book2 = new NoteBook([U2note]);
user.userNoteBook = book;
user2.userNoteBook = [book, book2];
const storage = new Storage(user);
storage.addItem(user);
storage.addItem(user2);
console.log(storage.getAllItem());
console.log(storage.removeItem(user));
console.log(storage.getAllItem());
export {};
//# sourceMappingURL=main.js.map
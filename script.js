// Завдання 1: Базовий клас та наслідування

// 1 Створи клас User, який має:
class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  getInfo() {
    console.log(`Користувач: ${this.name} - ${this.email}`);
  }
}

const newUser = new User("Sasha", "olexandr19@gmail.com");
newUser.getInfo();

// 2 Створи клас Admin, що наслідує User, та додає поле role.
class Admin extends User {
  constructor(name, email, role) {
    super(name, email);
    this.role = role;
  }

  getRole() {
    console.log(`Роль: ${this.role}`);
  }
}

const admin = new Admin("Sasha", "olexandr19@gmail.com", "Адміністратор");
admin.getRole();

// 3 Створи екземпляри класів User та Admin, виклич методи getInfo() та getRoe().
const newAdmin = new Admin("Dima", "dima@gmail.com", "Адміністратор");
newAdmin.getInfo();
newAdmin.getRole();

// Завдання 2: Ланцюг редагування
class TextEditor {
  constructor(text) {
    this.text = text;
  }

  toUpperCase() {
    this.text = this.text.toUpperCase();
    return this;
  }

  toLowerCase() {
    this.text = this.text.toLowerCase();
    return this;
  }

  replace(replace) {
    this.text = this.text.split(find).join(replace);
    return this;
  }

  trim() {
    this.text = this.text.trim();
    return this;
  }

  show() {
    console.log(this.text);
    return this;
  }
}

const editor = new TextEditor("  Привіт, світ!  ");
editor.trim().replace("світ", "JavaScript").toUpperCase().show();

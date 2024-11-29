// TODO: No lo estamos utilizando todavía, pero lo vamos a utilizar en el futuro
class Client {
  #clientId;
  #fullName;
  #email;
  #passwordHash;
  #phone;
  #instagram;
  #birthdate;
  #gender;
  #isActive;
  constructor(clientId, fullName, email, passwordHash, phone, instagram, birthdate, gender, isActive = true) {
    this.#clientId = clientId;
    this.#fullName = fullName;
    this.#email = email;
    this.#passwordHash = passwordHash;
    this.#phone = phone;
    this.#instagram = instagram;
    this.#birthdate = birthdate;
    this.#gender = gender;
    this.#isActive = isActive;
  }

  toString() {
    return `Cliente: ${this.#clientId} - ${this.#fullName} - ${this.#email} - ${this.#phone} - ${this.#instagram} - ${this.#birthdate} - ${this.#gender} - ${this.#isActive}`;
  }
}

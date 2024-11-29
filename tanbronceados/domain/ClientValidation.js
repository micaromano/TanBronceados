// TODO: No lo estamos utilizando todavía, pero lo vamos a utilizar en el futuro
class ClientValidation {
  #client;
  constructor(client) {
    this.#client = client;
  }

  isValid() {
    // Add all client validations here
    let errors = [];
    
    if (!this.#client.fullName) {
      errors.push('El nombre completo es requerido');
    }

    if (!this.#client.email) {
      errors.push('El correo electrónico es requerido');
    }

    return {
      isValid: errors.length === 0,
      errors,
    }
  }
}
export class PhoneNumber {
  private readonly _value: string;

  constructor(phone: string) {
    if (!this.validatePhone(phone)) {
      throw new Error('Invalid phone number');
    }
    this._value = phone;
  }

  private validatePhone(phone: string): boolean {
    const regex = /^\+?[0-9]{7,15}$/; //verifica se contém apenas numeros e o sinal de +
    return regex.test(phone);
  }

  get value(): string {
    return this._value;
  }
}

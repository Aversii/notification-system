export class Email {
  private readonly _value: string;

  constructor(email: string) {
    if (!this.validateEmail(email)) {
      throw new Error('Invalid email address');
    }
    this._value = email.toLowerCase();
  }

  private validateEmail(email: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  get value(): string {
    return this._value;
  }
}

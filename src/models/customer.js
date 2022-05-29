import { ModelBase } from '../model_base.js'

export class Customer extends ModelBase {
  static tableName = 'customers'

  static fields = [
    'username',
    'email',
    'password',
    'cpf',
    'phoneNumber',
    'adress',
  ]

  constructor(id, username, email, password, cpf, phoneNumber, adress) {
    this.id = id
    this.username = username
    this.email = email
    this.password = password
    this.cpf = cpf
    this.phoneNumber = phoneNumber
    this.adress = adress
  }
}

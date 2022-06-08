import { ModelBase } from '../model_base.js'

export class Order extends ModelBase {
  static tableName = 'orders'

  static fields = [
    'username',
    'email',
    'password',
    'cpf',
    'phoneNumber',
    'adress',
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.username = params.username
    this.email = params.email
    this.password = params.password
    this.cpf = params.cpf
    this.phoneNumber = params.phoneNumber
    this.adress = params.adress
  }
}

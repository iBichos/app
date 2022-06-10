import DataAccessModel from './data-access.model.js'

export default class CustomerModel extends DataAccessModel {
  static tableName = 'customers'

  static fields = [
    'username',
    'email',
    'password',
    'cpf',
    'phoneNumber',
    'address',
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.username = params.username
    this.email = params.email
    this.password = params.password
    this.cpf = params.cpf
    this.phoneNumber = params.phoneNumber
    this.address = params.adress
  }
}

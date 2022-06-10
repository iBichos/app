import DataAccessModel from './data-access.model.js'

export default class MerchantModel extends DataAccessModel {
  static tableName = 'merchants'

  static fields = [
    'username',
    'email',
    'password',
    'cnpj',
    'phoneNumber',
    'address',
    'companyName',
    'ownerName',
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.username = params.username
    this.email = params.email
    this.password = params.password
    this.cnpj = params.cnpj
    this.phoneNumber = params.phoneNumber
    this.adress = params.adress
    this.companyName = params.companyName
    this.ownerName = params.ownerName
  }
}

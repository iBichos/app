import { ModelBase } from '../model_base.js'

export class Merchant extends ModelBase {
  static tableName = 'merchants'

  static fields = [
    'username',
    'email',
    'password',
    'cpnj',
    'phoneNumber',
    'adress',
    'companyName',
    'ownerName',
    
  
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.username = params.username
    this.email = params.email
    this.password = params.password
    this.cpnj = params.cpnj
    this.phoneNumber = params.phoneNumber
    this.adress = params.adress
    this.companyName = params.companyName
    this.ownerName = params.ownerName
    

  }
}

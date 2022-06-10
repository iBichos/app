import DataAccessModel from './data-access.model.js'

export default class AdminModel extends DataAccessModel {
  static tableName = 'admins'

  static fields = [
    'username',
    'email',
    'password',
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.username = params.username
    this.email = params.email
    this.password = params.password
    
  }
}

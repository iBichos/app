import AbstractModel from './abstract.js'

export default class AdminModel extends AbstractModel {
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

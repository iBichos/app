import { ModelBase } from '../model_base.js'

export class Admin extends ModelBase {
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

import DataAccessModel from './data-access.model.js'

export default class CategoryModel extends DataAccessModel {
  static tableName = 'categories'

  static fields = [
    'name',
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.name = params.name
  }
}
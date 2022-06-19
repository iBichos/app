import DataAccessModel from './data-access.model.js'

export default class AnimalTypeModel extends DataAccessModel {
  static tableName = 'animalTypes'

  static fields = [
    'name',
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.name = params.name
  }
}
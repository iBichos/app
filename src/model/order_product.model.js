import DataAccessModel from './data-access.model.js'

export default class OrderProductModel extends DataAccessModel {
  static tableName = 'orderProducts'

  static fields = [
    'product_id',
    'order_id'
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.product_id = params.product_id
    this.order_id = params.order_id
  }
}

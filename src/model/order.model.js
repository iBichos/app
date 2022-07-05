import DataAccessModel from './data-access.model.js'
import CustomerModel from './customer.model.js'

export default class OrderModel extends DataAccessModel {
  static tableName = 'orders'

  static fields = [
    'customer_id',
    'total_price_cents',
    'status',
    'created_at',
    'products'
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.customer_id = params.customer_id
    this.total_price_cents = params.total_price_cents
    this.status = params.status
    this.created_at = params.created_at
    this.products = params.products
  }

  async customer() {
    return await CustomerModel.find(this.customer_id)
  }

  total_price() {
    return `R$ ${this.total_price_cents / 100}`
  }

  code() {
    return Buffer.from(this.id.toString()).toString('base64')
  }
}

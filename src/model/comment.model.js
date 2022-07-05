import CustomerModel from './customer.model.js'
import DataAccessModel from './data-access.model.js'
import ProductModel from './product.model.js'

export default class CommentModel extends DataAccessModel {
  static tableName = 'comments'

  static fields = [
    'customer_id',
    'product_id',
    'comment',
    'date',
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.customer_id = params.customer_id
    this.product_id = params.product_id
    this.comment = params.comment
    this.date = params.date
  }

  async customer() {
    return await CustomerModel.find(this.customer_id)
  }

  async product() {
    return await ProductModel.find(this.product_id)
  }
}

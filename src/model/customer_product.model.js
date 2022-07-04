import DataAccessModel from './data-access.model.js'
import ProductModel from './product.model.js'

export default class CustomerProductModel extends DataAccessModel {
  static tableName = 'customer_products'

  static fields = [
    'product_id',
    'customer_id'
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.product_id = params.product_id
    this.customer_id = params.customer_id
  }

  async product(){
    return await ProductModel.find(this.product_id)
  }
}
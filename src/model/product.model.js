import DataAccessModel from './data-access.model.js'
import MerchantModel from './merchant.model.js'

export default class ProductModel extends DataAccessModel {
  static tableName = 'products'

  static fields = [
    'name',
    'price_cents',
    'description',
    'image_url',
    'merchant_id'
  ]

  constructor(params) {
    super()
    this.id = params.id
    this.name = params.name
    this.price_cents = params.price_cents
    this.description = params.description
    this.merchant_id = params.merchant_id
    this.image_url = params.image_url
  }

  merchant() {
    return MerchantModel.find(this.merchant_id)
  }

  price() {
    return `R$ ${this.price_cents / 100}`
  }
}

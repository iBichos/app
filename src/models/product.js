import { ModelBase } from '../model_base.js'
import { Merchant } from './merchant.js'

export class Product extends ModelBase {
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
    return Merchant.find(this.merchant_id)
  }
}

import ProductModel from "../model/product.model.js";

let layout = 'layouts/merchant'

export default class MerchantRouter {
  static profile = (request, response) => {
    response.render('merchant/profile/edit', {
      layout,
      session: request.session,
      url: request.url
    })
  }

  static products = (req, res) => {
    res.render('merchant/products/index', {
      layout,
      session: req.session,
      url: req.url
    })
  }

  static productById = (req, res) => {
    let product = ProductModel.find(req.params.id)

    res.render('merchant/products/form', {
      layout,
      session: req.session,
      url: req.url,
      product: product
    })
  }

  static createProduct = (req, res) => {

    res.render('merchant/products/form', {
      layout,
      session: req.session,
      url: req.url
    })
  }

  static signIn = (req, res) => {
    res.render('merchant/sign_in/index', {
      session: req.session,
      url: req.url
    })
  }

  static signUp = (req, res) => {
    res.render('merchant/sign_up/index', {
      layout,
      session: req.session,
      url: req.url
    })
  }

  static orders = (req, res) => {
    res.render('merchant/purchases/index', {
      layout,
      session: req.session,
      url: req.url
    })
  }
}
import ProductModel from "../model/product.model.js";

const layout = 'layouts/merchant'

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

  static login = (req, res) => {
    res.render('merchant/login/index', {
      layout,
      session: req.session,
      url: req.url
    })
  }

  static doLogin = (req, res) => {
    let merchant = MerchantModel.findByField("username", req.body.username)
    if(merchant && merchant.password === req.body.password){
      req.session.merchant=merchant
      req.session.isSignedIn=true
      req.session.isMerchant=true
      console.log(req.session)

      res.redirect('/merchant/products/index');
    }
    else{
      res.send('Invalid username or password');
    }
  }

  static logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }

  static orders = (req, res) => {
    res.render('merchant/orders/index', {
      layout,
      session: req.session,
      url: req.url
    })
  }
}
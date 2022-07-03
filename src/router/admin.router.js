import ProductModel from "../model/product.model.js";
import MerchantModel from "../model/merchant.model.js";
import CustomerModel from "../model/customer.model.js";

const layout = 'layouts/admin'

export default class AdminRouter {
  static customers = (req, res) => {
    let customers = CustomerModel.list()
    
    res.render('admin/customers/index', {
      layout,
      session: req.session,
      url: req.url,
      customers: customers
    })
  }

  static deleteCustomer = (req, res) => {
    CustomerModel.delete(req.params.id)
    this.customers(req,res)
  }

  static merchants = (req, res) => {
    let merchants = MerchantModel.list()
    res.render('admin/merchants/index', {
      layout,
      session: req.session,
      url: req.url,
      merchants: merchants
    })
  }

  static deleteMerchant = (req, res) => {
    MerchantModel.delete(req.params.id)
    this.merchants(req,res)
  }

  static products = (req, res) => {
    let products = ProductModel.list()

    res.render('admin/products/index', {
      layout,
      session: req.session,
      url: req.url,
      products: products
    })
  }

  static deleteProduct = (req, res) => {
    ProductModel.delete(req.params.id)
    this.products(req,res)
  }

  static login = (req, res) => {
    res.render('admin/login/index', {
      layout,
      session: req.session,
      url: req.url
    })
  }

  static doLogin = (req, res) => {
    let admin = AdminModel.findByField("username", req.body.username)
    if(admin && admin.password === req.body.password){
      req.session.admin=admin
      req.session.isSignedIn=true
      req.session.isAdmin=true
      console.log(req.session)

      res.redirect('/admin/merchants/index');
    }
    else{
      res.send('Invalid username or password');
    }
  }

  static logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }
}
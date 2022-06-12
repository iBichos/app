import ProductModel from "../model/product.model.js";

const layout = 'layouts/admin'

export default class AdminRouter {

  static customers = (req, res) => {
    res.render('admin/customers/index', {
      layout,
      session: req.session,
      url: req.url
    })
  }

  static merchants = (req, res) => {
    res.render('admin/merchants/index', {
      layout,
      session: req.session,
      url: req.url,
    })
  }

  static products = (req, res) => {
    res.render('admin/products/index', {
      layout,
      session: req.session,
      url: req.url,
    })
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
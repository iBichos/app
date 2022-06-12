import ProductModel from '../model/product.model.js'
import CustomerModel from "../model/customer.model.js";

const layout = 'layouts/customer'


export default class customerRouter { 
  static home = (request, response) => {
    let products = ProductModel.list().slice(0, 4)

    response.render('customer/home/index', {
      layout,
      products: products,
      session: request.session,
      url: request.url,
      shopping_cart: request.session.cart
    });
  }
  
  static products = (request, response) => {
    let products = ProductModel.list()

    response.render('customer/products/index', {
      layout: layout,
      products: products,
      session: request.session,
      url: request.url,
      shopping_cart: request.session.cart
    });
  }
  
  static productById = (req, res) => {
    // find product with req.params.id
    let product = ProductModel.find(req.params.id)

    res.render('customer/products/show', {
      layout: layout,
      product: product,
      url: req.url,
      shopping_cart: req.session.cart,
      session: req.session
    });
  }

  static cart = (req, res) => {
    let shopping_cart_total_cents = 0
    if (req.session.cart != undefined) {
      shopping_cart_total_cents = req.session.cart.reduce(
        (sum, item) => sum + item.product.price_cents * item.quantity,
        0
      )
    }

    let shopping_cart = req.session.cart
    if (shopping_cart == undefined) {
      shopping_cart = []
    }
  
    res.render('customer/shopping_cart/index', {
      layout: layout,
      session: req.session,
      shopping_cart: shopping_cart,
      url: req.url,
      shopping_cart_total: shopping_cart_total_cents / 100
    });
  }

  static addToCart = (req, res) => {
    let addedProduct = ProductModel.find(req.params.product_id)
    
    if (typeof req.session.cart != "undefined") {
      req.session.cart.push({ product: addedProduct, quantity: 1 })
    } else {
      req.session.cart = [{ product: addedProduct, quantity: 1 }]
    }

    res.send(req.session.cart);
  }

  static removeFromCart = (req, res) => {
    let product_id = req.params.product_id
    let index = req.session.cart.findIndex(element => element.product.id === product_id)

    if (index == -1) return

    req.session.cart = req.session.cart.splice(index, 1)
    res.send(req.session.cart);
  }

  static profile = (req, res) => {

    res.render('customer/profile/edit', {
      layout: layout,
      session: req.session,
      shopping_cart: req.session.cart,
      url: req.url
    })
  }

  static orders = (req, res) => {
    let purchases = [
      {
        "id": 3231,
        "created_at": "18 de maio de 2022",
        "total_price_cents": 12300,
        "status": "Pedido enviado",
        "products": [
          {
            "id": 1,
            "quantity": 3,
            "name": "Golden 15 kg",
            "price_cents": 12999,
            "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
          }
        ]
      }
    ]
  
    res.render('customer/purchases/index', {
      layout: layout,
      session: req.session,
      shopping_cart: req.session.cart,
      url: req.url,
      purchases: purchases
    })
  }

  static orderById = (req, res) => {
    console.log(req.session)
    res.render('customer/purchases/index', {
      layout: layout,
      session: req.session,
      shopping_cart: req.session.cart,
      url: req.url,
      purchase: purchase
    })
  }

  static login = (req, res) => {
    if(req.session.isLoggedIn) {
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }
    else {
      res.render('customer/login', {
        session: req.session,
        shopping_cart: req.session.cart,
        url: req.url,
      })
    }
  }

  static doLogin = (req, res) => {
    let customer = CustomerModel.findByField("username", req.body.username)
    if(customer && customer.password === req.body.password){
      req.session.customer=customer
      req.session.isSignedIn=true
      req.session.isCustomer=true
      console.log(req.session)

      res.redirect('/');
    }
    else{
      res.send('Invalid username or password');
    }
  }

  static logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
  }
}
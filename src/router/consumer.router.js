import ProductModel from '../model/product.model.js'
import CustomerModel from "../model/customer.model.js";

const layout = 'layouts/consumer'

let shopping_cart = {
  "products": [
    {
      "id": 1,
      "quantity": 3,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    },
  ]
}

export default class ConsumerRouter { 
  static home = (request, response) => {
    let products = ProductModel.list().slice(4)
    
    response.render('consumer/home/index', {
      layout,
      products: products,
      session: request.session,
      url: request.url,
      shopping_cart: shopping_cart
    });
  }
  
  static products = (request, response) => {
    let products = ProductModel.list()
    
    response.render('consumer/products/index', {
      layout: layout,
      products: products,
      session: request.session,
      url: request.url,
      shopping_cart: shopping_cart
    });
  }
  
  static productById = (req, res) => {
    // find product with req.params.id
    product.find(req.params.id)
    
    let product = {
      "id": 1,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    }
    
    res.render('consumer/products/show', {
      layout: layout,
      product: product,
      url: req.url,
      shopping_cart: shopping_cart,
      session: req.session
    });
  }

  static cart = (req, res) => {
    let shopping_cart_total_cents = shopping_cart.products.reduce(
      (sum, product) => sum + product.price_cents * product.quantity,
      0
    )
  
    res.render('consumer/shopping_cart/index', {
      layout: consumer_layout,
      session: req.session,
      shopping_cart: shopping_cart,
      url: req.url,
      shopping_cart_total: shopping_cart_total_cents / 100
    });
  }

  static profile = (req, res) => {

    res.render('consumer/profile/edit', {
      layout: layout,
      session: req.session,
      shopping_cart: shopping_cart,
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
  
    res.render('consumer/purchases/index', {
      layout: layout,
      session: req.session,
      shopping_cart: shopping_cart,
      url: req.url,
      purchases: purchases
    })
  }

  static orderById = (req, res) => {
    console.log(req.session)
    res.render('consumer/purchases/index', {
      layout: layout,
      session: req.session,
      shopping_cart: shopping_cart,
      url: req.url,
      purchase: purchase
    })
  }

  static login = (req, res) => {
    if(req.session.isLoggedIn) {
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }
    else {
      res.render('login', {
        layout: layout,
        session: req.session,
        shopping_cart: shopping_cart,
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
      res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`)
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
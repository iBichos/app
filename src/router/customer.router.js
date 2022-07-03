import ProductModel from '../model/product.model.js'
import CustomerModel from "../model/customer.model.js";
import OrderModel from "../model/order.model.js";
import CategoryModel from '../model/category.model.js';
import AnimalTypeModel from '../model/animal-type.model.js';
import MerchantModel from '../model/merchant.model.js';

const layout = 'layouts/customer'


export default class customerRouter { 
  static home = async (request, response) => {
    let products = await ProductModel.list()
    products = products.slice(0, 4)

    request.session.products = products
    response.render('customer/home/index', {
      layout,
      products: products,
      session: request.session,
      url: request.url,
      shopping_cart: request.session.cart
    });
  }
  
  static products = async (request, response) => {
    let products = await ProductModel.list()
    let categories = await CategoryModel.list()
    let animalTypes = await AnimalTypeModel.list()
    let merchants = await MerchantModel.list()
    const query = request.query

    if (query.category) {
      products = products.filter(product => product.categories !== undefined)
      products = products.filter(product => product.categories.includes(JSON.parse(query.category)) === true)
    }

    if (query.animalType) {
      products = products.filter(product => product.animalTypes !== undefined)
      products = products.filter(product => product.animalTypes.includes(JSON.parse(query.animalType)) === true)
    }

    if (query.fromPrice) {
      products = products.filter(product => product.price_cents >= (JSON.parse(query.fromPrice)) === true)
    }

    if (query.belowPrice) {
      products = products.filter(product => product.price_cents <= (JSON.parse(query.belowPrice)) === true)
    }

    if (query.merchant) {
      products = products.filter(product => product.merchant_id === (JSON.parse(query.merchant)))
    }

    request.session.products = products
    response.render('customer/products/index', {
      layout: layout,
      products: products,
      categories: categories,
      animalTypes: animalTypes,
      merchants: merchants,
      session: request.session,
      url: request.url,
      shopping_cart: request.session.cart
    });
  }
  
  static productById = async (req, res) => {
    // find product with req.params.id
    let product = await ProductModel.find(req.params.id)

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

  static addToCart = async (req, res) => {
    let addedProduct = await ProductModel.find(req.params.product_id)
    
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

  static updateProfile = async (req, res) => {
    await CustomerModel.update(req.session.customer.id, req.body)

    req.session.customer = await CustomerModel.find(req.session.customer.id)

    this.profile(req, res)
  }

  static orders = async (req, res) => {
    let orders = await OrderModel.list()
  
    res.render('customer/orders/index', {
      layout: layout,
      session: req.session,
      shopping_cart: req.session.cart,
      url: req.url,
      orders: orders
    })
  }

  static createOrder = (req, res) => {

    let total_price_cents = req.session.cart.reduce(
      (sum, item) => sum + item.product.price_cents * item.quantity,
      0
    )

    let products = []

    req.session.cart.forEach((item)=> {
      products.push({
        id: item.product.id,
        quantity: item.quantity,
        name: item.product.name,
        price_cents: item.product.price_cents,
        image_url: item.product.image_url
      })
    })

    let today = Date.now()

    let order_params = {
      "created_at": `02/12/2022`,
      "total_price_cents": total_price_cents,
      "status": "Pedido pendente",
      "customer_id": req.session.customer.id,
      "products": products
    }

    OrderModel.create(order_params)
    
    req.session.cart = []

    this.showOrder(req, res)
  }

  static showOrder = (req, res) => {
    res.render('customer/orders/show', {
      layout: layout,
      session: req.session,
      shopping_cart: req.session.cart,
      url: req.url,
    })
  }

  static login = (req, res) => {
    if(req.session.isLoggedIn) {
      res.send("Welcome User <a href=\'/logout'>click to logout</a>");
    }
    else {
      res.render('customer/login/new', {
        session: req.session,
        shopping_cart: req.session.cart,
        url: req.url,
      })
    }
  }

  static doLogin = async (req, res) => {
    let customer = await CustomerModel.findByField("username", req.body.username)
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
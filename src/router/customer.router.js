import ProductModel from '../model/product.model.js'
import CustomerModel from "../model/customer.model.js";
import OrderModel from "../model/order.model.js";
import CategoryModel from '../model/category.model.js';
import AnimalTypeModel from '../model/animal-type.model.js';
import MerchantModel from '../model/merchant.model.js';
import CustomerProductModel from '../model/customer_product.model.js';
import CommentModel from '../model/comment.model.js';
import OrderProductModel from '../model/order_product.model.js';
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

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

  static wishlist = async (request, response) => {
    let customer_products_list = await CustomerProductModel.list()
    let customer_products = customer_products_list.filter(customer_product => customer_product.customer_id == request.session.customer.id)

    let customer_products_with_products = []
    for (const customer_product of customer_products) {
      let product = await customer_product.product()
      
      let customer_product_with_product = customer_product
      customer_product_with_product['product'] = product

      customer_products_with_products.push(
        customer_product_with_product
      )
    }

    response.render('customer/wishlist/index', {
      layout,
      customer_products: customer_products_with_products,
      session: request.session,
      url: request.url,
      shopping_cart: request.session.cart
    })
  }

  static addToWishlist = async (request, response) => {
    let customer_product = await CustomerProductModel.create({
      customer_id: request.session.customer.id,
      product_id: parseInt(request.params.product_id)
    })
    response.send(customer_product)
  }

  static removeFromWishlist = async (request, response) => {
    await CustomerProductModel.delete(request.params.customer_product_id)
    this.wishlist(request,response)
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
    let product = await ProductModel.find(parseInt(req.params.id))

    let comments = await prisma.comments.findMany({
      where: { product_id: parseInt(req.params.id)},
      include: { customer: true }
    })

    res.render('customer/products/show', {
      layout: layout,
      product: product,
      comments: comments,
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
    //criar função para isso dentro do model Order
    let orders = await prisma.orders.findMany({
      where: { customer_id: req.session.customer.id },
      include: { OrderProducts: { include: { product: true } } },
    })

    const result = orders.map((order) => {
      return { ...order, products: order.OrderProducts.map((orderProducts) => orderProducts.product) }
    })

    res.render('customer/orders/index', {
      layout: layout,
      session: req.session,
      shopping_cart: req.session.cart,
      url: req.url,
      orders: result
    })
  }

  static createOrder = async (req, res) => {

    const order = await OrderModel.create({customer_id: req.session.customer.id})

    let order_products = []
    req.session.cart.forEach((item)=> {
      order_products.push({
        product_id: item.product.id,
        order_id: order.id
      })
    })

    for(const order_product_params of order_products ){
      await OrderProductModel.create(order_product_params)
    }

    let total_price_cents = req.session.cart.reduce((sum, item) => sum + item.product.price_cents * item.quantity, 0)
    let order_params = {
      "created_at": Date.now().toString(),
      "total_price_cents": total_price_cents,
      "status": "Pedido pendente"
    }

    await OrderModel.update(order.id, order_params)

    req.session.cart = []

    res.render('customer/orders/show', {
      layout: layout,
      session: req.session,
      order: order,
      shopping_cart: req.session.cart,
      url: req.url,
    })
  }

  static showOrder = async (req, res) => {
    let order = await OrderModel.find(req.params.id)

    res.render('customer/orders/show', {
      layout: layout,
      session: req.session,
      order: order,
      shopping_cart: req.session.cart,
      url: req.url,
    })
  }

  static login = async (req, res) => {
    let products = await ProductModel.list()
    req.session.products = products
    if(req.session.isLoggedIn) {
      this.profile(req, res)
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
      req.session.signInRejected=false
      this.profile(req, res)
    }
    else{
      req.session.signInRejected=true
      this.login(req, res)
    }
  }

  static sign_up = async (req, res) => {
    res.render('customer/sign_up/new', {
      session: req.session,
      shopping_cart: req.session.cart,
      url: req.url,
    })
  }

  static create_user = async(req, res) => {
    await CustomerModel.create(req.body)

    this.login(req,res)
  }

  static logout = (req,res) => {
    req.session.destroy();
    res.redirect('/');
  }

  static create_comment = async(req, res) =>  {
    
    let params = req.body

    let today = new Date();
    params.date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    params.customer_id = parseInt(req.session.customer.id);
    params.product_id = parseInt(params.product_id)

    await CommentModel.create(params)
    this.products(req, res);
  }
}
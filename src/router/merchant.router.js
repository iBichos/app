import ProductModel from "../model/product.model.js";
import OrderModel from "../model/order.model.js";
import MerchantModel from "../model/merchant.model.js";

import path from 'path';
import uploadConfig from '../config/upload.js';

import S3Storage from '../utils/s3storage.js'


const layout = 'layouts/merchant'

export default class MerchantRouter {
  static profile = async (request, response) => {

    let merchant = await MerchantModel.find(request.session.merchant.id)
    response.render('merchant/profile/edit', {
      layout,
      session: request.session,
      url: request.url,
      merchant: merchant
    })
  }

  static updateProfile = async (req, res) => {
    let merchant = await MerchantModel.find(req.session.merchant.id)
    await MerchantModel.update(merchant.id, req.body)

    this.profile(req, res)
  }

  static products = async (req, res) => {
    let products = await ProductModel.list()

    res.render('merchant/products/index', {
      layout,
      session: req.session,
      url: req.url,
      products: products
    })
  }

  static newProduct = (req, res) => {
    let product = new ProductModel({})

    res.render('merchant/products/form', {
      layout,
      session: req.session,
      url: req.url,
      product: product,
      method: 'POST'
    })
  }

  static editProduct = async (req, res) => {
    let product = await ProductModel.find(req.params.id)
    res.render('merchant/products/form', {
      layout,
      session: req.session,
      url: req.url,
      product: product,
      method: 'PUT'
    })
  }

  static updateProduct = async (req, res) => {
    const s3 = new S3Storage();
    await s3.saveFile(req.file.filename);

    let params = req.body
    params['image_url'] = 'https://s3.amazonaws.com/ibichos-images/' + req.file.filename
    params['price_cents'] = parseInt(req.body['price_cents'])
    params['merchant_id'] = req.session.merchant.id

    await ProductModel.update(parseInt(req.params.id), params)
    this.products(req,res)
  }

  static createProduct = async (req, res) => {
    const s3 = new S3Storage();
    await s3.saveFile(req.file.filename);
    
    let params = req.body
    params['image_url'] = 'https://s3.amazonaws.com/ibichos-images/' + req.file.filename
    params['price_cents'] = parseInt(req.body['price_cents'])
    params['merchant_id'] = req.session.merchant.id

    await ProductModel.create(params)
    this.products(req,res)
  }

  static deleteProduct = async (req, res) => {
    await ProductModel.delete(req.params.id)
    this.products(req,res)
  }

  static sign_up = async (req, res) => {
    res.render('merchant/sign_up/new', {
      session: req.session,
      url: req.url,
    })
  }

  static create_merchant = async(req, res) => {
    await MerchantModel.create(req.body)
    this.login(req,res)
  }

  static login = (req, res) => {
    res.render('merchant/login/index', {
      session: req.session,
      url: req.url
    })
  }

  static doLogin = async (req, res) => {
    let merchant = await MerchantModel.findByField("username", req.body.username)
    if(merchant && merchant.password === req.body.password){
      req.session.merchant=merchant
      req.session.isSignedIn=true
      req.session.isMerchant=true
      req.session.signInRejected=false
      this.profile(req, res)
    }
    else{
      req.session.signInRejected=true
      this.login(req, res)
    }
  }

  static logout = (req, res) => {
    req.session.destroy();
    res.redirect('/');
  }

  static orders = async (req, res) => {
    let orders = await OrderModel.list()

    res.render('merchant/orders/index', {
      layout,
      session: req.session,
      url: req.url,
      orders: orders
    })
  }

  static showOrder = async (req, res) => {
    let order = await OrderModel.find(req.params.id)

    res.render('merchant/orders/show', {
      layout,
      session: req.session,
      url: req.url,
      order: order
    })
  }

  static updateOrder = (req, res) => {
    OrderModel.update(req.params.id, req.body)
    this.showOrder(req,res)
  }
}
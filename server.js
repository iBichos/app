import express from 'express';
import expressLayouts from 'express-ejs-layouts'
import sessions from 'express-session';

import ConsumerRouter from './src/router/consumer.router.js';
import MerchantRouter from './src/router/merchant.router.js';
import AdminRouter from './src/router/admin.router.js'
import { isCustomer, isSignedIn } from "./src/service/session-validation.service.js";

const app = express();
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static('./assets'));
//session middleware
app.use(sessions({
  secret: "iBichosSecretKey",
  saveUninitialized:true,
  cookie: { maxAge: 1000 * 60 * 60 * 24 },
  resave: false
}));

app.get('/', ConsumerRouter.home)
app.get('/products', ConsumerRouter.products)
app.get('/products/:id', ConsumerRouter.productById)

app.get('/shopping_cart', ConsumerRouter.cart)
app.get('/add_to_cart/:product_id', ConsumerRouter.addToCart)

app.get('/profile', isCustomer, isSignedIn, ConsumerRouter.profile)
app.get('/purchases', ConsumerRouter.orders)
app.get('/purchases/:id', ConsumerRouter.orderById)
app.get('/login', ConsumerRouter.login)
app.post('/login', ConsumerRouter.doLogin)
app.get('/logout', ConsumerRouter.logout);

app.get('/merchant/products', MerchantRouter.products)
app.get('/merchant/products/:id/edit', MerchantRouter.editProduct)
app.get('/merchant/products/new', MerchantRouter.newProduct)
app.post('/merchant/products', MerchantRouter.createProduct)
app.put('/merchant/products', MerchantRouter.updateProduct)


app.get('/merchant/profile', MerchantRouter.profile)
app.get('/merchant/login', MerchantRouter.login)
app.post('/merchant/login', MerchantRouter.doLogin)
app.get('/merchant/logout', MerchantRouter.logout)
app.get('/merchant/orders', MerchantRouter.orders)

app.get('/admin/consumers', AdminRouter.consumers)
app.get('/admin/merchants', AdminRouter.merchants)
app.get('/admin/products', AdminRouter.products)
app.get('/admin/login', AdminRouter.login)
app.post('/admin/doLogin', MerchantRouter.doLogin)
app.get('/admin/logout', MerchantRouter.logout)

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

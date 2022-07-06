import express from 'express';
import expressLayouts from 'express-ejs-layouts'
import sessions from 'express-session';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';
import path from 'path';

import CustomerRouter from './src/router/customer.router.js';
import MerchantRouter from './src/router/merchant.router.js';
import AdminRouter from './src/router/admin.router.js'
import { isAdmin, isCustomer, isMerchant, isSignedIn } from "./src/service/session-validation.service.js";
import { priceCentsMask } from './src/service/product-validation.service.js';

const app = express();
const port = 3000
const __dirname = path.resolve();

app.set('view engine', 'ejs')

app.use(methodOverride('_method'))
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
app.use(bodyParser.urlencoded())

// parse application/json
app.use(bodyParser.json())

app.get('/', CustomerRouter.home)
app.get('/products', CustomerRouter.products)
app.get('/products/:id', CustomerRouter.productById)
app.get('/shopping_cart', CustomerRouter.cart)
app.get('/login', CustomerRouter.login)
app.post('/login', CustomerRouter.doLogin)
app.get('/sign_up', CustomerRouter.sign_up)
app.post('/sign_up', CustomerRouter.create_user)
app.get('/logout', isSignedIn, isCustomer, CustomerRouter.logout);
app.get('/add_to_cart/:product_id', CustomerRouter.addToCart)
app.get('/profile', isSignedIn, isCustomer, CustomerRouter.profile)
app.put('/profile', isSignedIn, isCustomer, CustomerRouter.updateProfile)
app.get('/orders', isSignedIn, isCustomer, CustomerRouter.orders)
app.get('/orders/:id', isSignedIn, isCustomer, CustomerRouter.showOrder)
app.get('/create_order', isSignedIn, isCustomer, CustomerRouter.createOrder)
app.get('/wishlist', isSignedIn, isCustomer, CustomerRouter.wishlist)
app.get('/add_to_wishlist/:product_id', isSignedIn, isCustomer, CustomerRouter.addToWishlist)
app.delete('/customer_products/:customer_product_id', isSignedIn, isCustomer, CustomerRouter.removeFromWishlist)
app.post('/comment', isSignedIn, isCustomer, CustomerRouter.create_comment)

// Merchant routes
app.get('/merchant/products', isSignedIn, isMerchant, MerchantRouter.products)
app.get('/merchant/products/:id/edit', isSignedIn, isMerchant, MerchantRouter.editProduct)
app.get('/merchant/products/new', isSignedIn, isMerchant, MerchantRouter.newProduct)
app.post('/merchant/products', isSignedIn, isMerchant, priceCentsMask, MerchantRouter.createProduct)
app.put('/merchant/products/:id', isSignedIn, isMerchant, priceCentsMask, MerchantRouter.updateProduct)
app.delete('/merchant/products/:id', isSignedIn, isMerchant, MerchantRouter.deleteProduct)
app.get('/merchant/profile', isSignedIn, isMerchant, MerchantRouter.profile)
app.put('/merchant/profile', isSignedIn, isMerchant, MerchantRouter.updateProfile)
app.get('/merchant/sign_up', MerchantRouter.sign_up)
app.post('/merchant/sign_up', MerchantRouter.create_merchant)
app.get('/merchant/login', MerchantRouter.login)
app.post('/merchant/login', MerchantRouter.doLogin)
app.get('/merchant/logout', isSignedIn, isMerchant, MerchantRouter.logout)
app.get('/merchant/orders', isSignedIn, isMerchant, MerchantRouter.orders)
app.get('/merchant/orders/:id', isSignedIn, isMerchant, MerchantRouter.showOrder)
app.put('/merchant/orders/:id', isSignedIn, isMerchant, MerchantRouter.updateOrder)

// Admin routes
app.get('/admin/customers', isSignedIn, isAdmin, AdminRouter.customers)
app.get('/admin/merchants', isSignedIn, isAdmin, AdminRouter.merchants)
app.get('/admin/products', isSignedIn, isAdmin, AdminRouter.products)
app.delete('/admin/customers/:id', isSignedIn, isAdmin, AdminRouter.deleteCustomer)
app.delete('/admin/merchants/:id', isSignedIn, isAdmin, AdminRouter.deleteMerchant)
app.delete('/admin/products/:id', isSignedIn, isAdmin, AdminRouter.deleteProduct)
app.get('/admin/login', AdminRouter.login)
app.post('/admin/login', AdminRouter.doLogin)
app.get('/admin/logout', isSignedIn, isAdmin, AdminRouter.logout)

app.use((req, res) => {
  res.status(404);

  res.sendFile(path.join(__dirname+ '/public/404.html'));
  return;

});

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

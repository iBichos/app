import express from 'express';
import expressLayouts from 'express-ejs-layouts'
import sessions from 'express-session';

import { Customer } from './src/models/customer.js'
import { Product } from './src/models/product.js'

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

// Rotas Consumer
let consumer_layout = 'layouts/consumer'
let merchant_layout = 'layouts/merchant'

// carrinho de compras
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

app.get('/', (req, res) => {
  let products = Product.list().slice(4)

  res.render('consumer/home/index', {
    layout: consumer_layout,
    products: products,
    session: req.session,
    url: req.url,
    shopping_cart: shopping_cart
  });
})

app.get('/products', (req, res) => {
  let products = Product.list()

  res.render('consumer/products/index', {
    layout: consumer_layout,
    products: products,
    session: req.session,
    url: req.url,
    shopping_cart: shopping_cart
  });
})

app.get('/products/:id', (req, res) => {
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
    layout: consumer_layout,
    product: product,
    url: req.url,
    shopping_cart: shopping_cart,
    session: req.session
  });
})

app.get('/shopping_cart', (req, res) => {
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
})

app.get('/profile', (req, res) => {

  res.render('consumer/profile/edit', {
    layout: consumer_layout,
    session: req.session,
    shopping_cart: shopping_cart,
    url: req.url
  })
})

app.get('/purchases', (req, res) => {
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
    layout: consumer_layout,
    session: req.session,
    shopping_cart: shopping_cart,
    url: req.url,
    purchases: purchases
  })
})

app.get('/purchases/:id', (req, res) => {
  console.log(req.session)
  res.render('consumer/purchases/index', {
    layout: consumer_layout,
    session: req.session,
    shopping_cart: shopping_cart,
    url: req.url,
    purchase: purchase
  })
})

app.get('/merchant/products', (req, res) => {
  res.render('merchant/products/index', {
    layout: merchant_layout,
    session: session,
    url: req.url
  })
})

app.get('/merchant/products/:id/edit', (req, res) => {
  let product = Product.find(req.params.id)

  res.render('merchant/products/form', {
    layout: merchant_layout,
    session: session,
    url: req.url,
    product: product
  })
})

app.get('/merchant/products/new', (req, res) => {

  res.render('merchant/products/form', {
    layout: merchant_layout,
    session: session,
    url: req.url
  })
})

app.get('/merchant/profile', (req, res) => {
  res.render('merchant/profile/edit', {
    layout: merchant_layout,
    session: session,
    url: req.url
  })
})

app.get('/merchant/sign_in', (req, res) => {
  res.render('merchant/sign_in/index', {
    session: session,
    url: req.url
  })
})

app.get('/merchant/sign_up', (req, res) => {
  res.render('merchant/sign_up/index', {
    session: session,
    url: req.url
  })
})

app.get('/merchant/purchases', (req, res) => {
  res.render('merchant/purchases/index', {
    layout: merchant_layout,
    session: session,
    url: req.url
  })
})

app.get('/login', (req, res) => {
  if(req.session.userid){
    res.send("Welcome User <a href=\'/logout'>click to logout</a>");
  } 
  else {
    res.render('login', {
      layout: consumer_layout,
      session: req.session,
      shopping_cart: shopping_cart,
      url: req.url,
    })
  }
})

app.post('/login', (req, res) => {
  let customer = Customer.findByField("username", req.body.username)
  if(typeof customer !== "undefined" && customer.password === req.body.password){
    req.session.customer=customer
    req.session.isLoggedIn=true
    console.log(req.session)
    res.send(`Hey there, welcome <a href=\'/logout'>click to logout</a>`)
  }
  else{
    res.send('Invalid username or password');
  }
})

app.get('/logout',(req,res) => {
  req.session.destroy();
  res.redirect('/');
});

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

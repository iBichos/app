import express from 'express';
import { application } from 'express';
import expressLayouts from 'express-ejs-layouts'
import { Customer } from './src/models/customer.js'
import { Admin } from './src/models/admin.js'
import { Merchant } from './src/models/merchant.js'
import { Product } from './src/models/product.js'


const app = express();
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static('./assets'));

// Rotas Consumer
let consumer_layout = 'layouts/consumer'

// logica de sessão do usuário vem aqui e é repassado para a view se o usuário está logado ou não
let session = true
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
    session: session,
    url: req.url,
    shopping_cart: shopping_cart
  });
})

app.get('/products', (req, res) => {
  let products = Product.list()

  res.render('consumer/products/index', {
    layout: consumer_layout,
    products: products,
    session: session,
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
    session: session
  });
})

app.get('/shopping_cart', (req, res) => {
  let shopping_cart_total_cents = shopping_cart.products.reduce(
    (sum, product) => sum + product.price_cents * product.quantity,
    0
  )

  res.render('consumer/shopping_cart/index', {
    layout: consumer_layout,
    session: session,
    shopping_cart: shopping_cart,
    url: req.url,
    shopping_cart_total: shopping_cart_total_cents / 100
  });
})

app.get('/profile', (req, res) => {

  res.render('consumer/profile/edit', {
    layout: consumer_layout,
    session: session,
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
    session: session,
    shopping_cart: shopping_cart,
    url: req.url,
    purchases: purchases
  })
})

app.get('/purchases/:id', (req, res) => {
  res.render('consumer/purchases/index', {
    layout: consumer_layout,
    session: session,
    shopping_cart: shopping_cart,
    url: req.url,
    purchase: purchase
  })
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

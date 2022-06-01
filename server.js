import express from 'express';
import expressLayouts from 'express-ejs-layouts'
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
  // trocar isso por os 4 primeiros produtos do bd
  let products = [
    {
      "id": 1,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    },
    {
      "id": 2,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    },
    {
      "id": 3,
      "name": "Golden 15 kg",
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "price_cents": 12999,
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    },
    {
      "id": 4,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    }
  ]

  res.render('consumer/home/index', {
    layout: consumer_layout,
    products: products,
    session: session,
    url: req.url,
    shopping_cart: shopping_cart
  });
})

app.get('/products', (req, res) => {

  let products = [
    {
      "id": 1,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    },
    {
      "id": 2,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    },
    {
      "id": 3,
      "name": "Golden 15 kg",
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "price_cents": 12999,
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    },
    {
      "id": 4,
      "name": "Golden 15 kg",
      "price_cents": 12999,
      "description": "Um produto muito bom para o seu cachorro que come muito.",
      "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
    }
  ]

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
  let shopping_cart_total = shopping_cart.products.reduce(
    (sum, product) => sum + product.price_cents,
    0
  )

  res.render('consumer/shopping_cart/index', {
    layout: consumer_layout,
    session: true,
    shopping_cart: shopping_cart,
    url: req.url,
    shopping_cart_total: shopping_cart_total
  });
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

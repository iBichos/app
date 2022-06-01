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
  res.render('consumer/home/index', {layout: consumer_layout, products: products});
})

app.get('/products', (req, res) => {
  res.render('consumer/products/index', {layout: consumer_layout});
})

app.get('/products/:id', (req, res) => {
  // find product with req.params.id
  let product = {
    "id": 1,
    "name": "Golden 15 kg",
    "price_cents": 12999,
    "description": "Um produto muito bom para o seu cachorro que come muito.",
    "image_url": "https://50192.cdn.simplo7.net/static/50192/sku/cachorro-racao-golden-formula-mini-bits-para-cachorro-adulto-carne-e-arroz--p-1590533328758.jpg"
  }
  res.render('consumer/products/show', {layout: consumer_layout, product: product});
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

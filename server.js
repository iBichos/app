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
  
  res.render('consumer/home/index', {layout: consumer_layout, name: 'aa'});
})

app.get('/catalogue', (req, res) => {
  res.render('consumer/products/index', {layout: consumer_layout});
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

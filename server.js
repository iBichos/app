const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));
app.use(expressLayouts);
app.use(express.static('./assets'));

app.get('/', (req, res) => {
  str = "1o exemplo de uso de templates EJS com GET"
  res.render('index', { teste: str });
})

// Rotas Consumer

app.get('/home', (req, res) => {
  res.render('consumer/home/index', {layout: 'layouts/consumer'});
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

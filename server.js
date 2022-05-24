const express = require('express');
const app = express();
const port = 3000

app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  str = "1o exemplo de uso de templates EJS com GET"
  res.render('index', { teste: str });
})

app.listen(port, () => {
  console.log('Server listening on port ' + port)
})

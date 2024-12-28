// Forma antiga de importar o express
// const app = require('./app')

// Forma moderna de importar o express, com a biblioteca Sucrase
import app from './app'

app.listen(3001, () => console.log('Server is running on port 3001...'));
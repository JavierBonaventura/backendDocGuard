const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

mongoose.connect('mongodb+srv://bonaventurajavier:Oficina526@docguard.zkbxcfv.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión a MongoDB:'));
db.once('open', () => {
  console.log('Conexión exitosa a MongoDB Atlas');
});

app.use(express.json());

const User = mongoose.model('User', {
  name: String,
  email: String,
  password: String,
});

app.get('/users', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get('/', async (req, res) => {
  res.send('Backend de Doc Guard');
});

app.post('/users', async (req, res) => {
  const { name, email, password } = req.body;
  const newUser = new User({ name, email, password });
  await newUser.save();
  res.json(newUser);
});

app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;
  const updatedUser = await User.findByIdAndUpdate(id, { name, email }, { new: true });
  res.json(updatedUser);
});

app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'Usuario eliminado exitosamente' });
});

// Ruta para autenticar usuarios
app.post('/auth', async (req, res) => {
  const { username, password } = req.body;
  
  // Buscar al usuario por nombre de usuario y contraseña
  const user = await User.findOne({ name: username, password: password });

  if (user) {
    // Usuario autenticado exitosamente
    res.json({ success: true, message: 'Autenticación exitosa' });
  } else {
    // Usuario no autenticado
    res.status(401).json({ success: false, message: 'Credenciales inválidas' });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor Express en http://localhost:${PORT}`);
});

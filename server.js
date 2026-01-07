const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const PORT = process.env.PORT || 3000;  

const app = express();
app.use(cors());
app.use(express.json());

// Usar as rotas
app.use('/api', authRoutes);
app.use('/api', productRoutes);

// Sincronizar o banco de dados e iniciar o servidor
sequelize.sync({alter:true}).then(() => {
    console.log('Banco de dados sincronizado.');
}).catch((err) => {
    console.error('Erro ao sincronizar o banco de dados', err);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
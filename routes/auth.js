const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/Users');
const jwt = require('jsonwebtoken');

// Rota de cadastro: POST /api/auth/register
router.post('/register', async (req, res) => {
    try {
        const {name, email, password} = req.body;

        //1. Verificar se o usuário já existe
        const userExists = await User.findOne({where: {email}});
        if (userExists) {
            return res.status(400).json({message: 'Este e-mail já está cadastrado.'});
        }
        //2. Criptografar a senha
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Salvar o novo usuário no banco de dados
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({message: 'Usuário cadastrado com sucesso!', userId: newUser.id});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro no servidor. Tente novamente mais tarde.'});
    }
});

//Rota de Login: POST /api/login
router.post('/login', async (req, res) => {
    try {
        const {email, password} = req.body;

        //1. Verificar se o usuário existe
        const user = await User.findOne({where: {email}});
        if (!user) {
            return res.status(400).json({message: 'Credenciais inválidos.'});
        }

        //2. Comparar senhas
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({message: 'Senha inválida.'});
        }

        //3. Gerar token JWT
        // o primeiro parâmetro é o payload (dados do usuário)
        const token = jwt.sign(
            {id: user.id, email: user.email},
            process.env.JWT_SECRET,
            {expiresIn: '1h'} // o token expira em 1 hora
        );

        //4. Retornar o token e os dados do usuário
        res.json({message: 'Login realizado com sucesso!', 
            token, 
            user: {id: user.id, name: user.name, email: user.email}});
    } catch (error) {
        console.error(error);
        res.status(500).json({message: 'Erro no servidor. Tente novamente mais tarde.'});
    }
});

module.exports = router;
const express = require('express');
const cors = require('cors')
const connection = require('./db');

const server = express();

server.use(cors());
server.use(express.json());

const port = 3025;

server.get("/produtos", (req, res) => {
    const sql = 'SELECT * FROM PRODUTO';

    connection.query(sql, (erro, resultados) => {
        if(erro){
            console.log('Erro ao buscar produtos: ', erro);
            res.status(500).send('Erro ao buscar produtos');
            return;
        }
        res.send(resultados);
    });
});

server.get("/produtos/ordenados", (req, res) => {
    const sql = 'SELECT * FROM PRODUTO ORDER BY nome ASC';

    connection.query(sql, (erro, resultados) => {
        if(erro){
           return res.status(500).json({ erro: erro.message });
        }
        return res.json(resultados);
    });
})

server.get("/produtos/:id", (req, res) => {
    const {id} = req.params;
    const sql = 'SELECT * FROM PRODUTO WHERE id_produto = ?';

    connection.query(sql, [id], (erro, resultados) => {
        if(erro){
            return res.status(500).json({ erro: erro.message});
        }

        return res.json(resultados);
    });
});

server.get("/produtos/busca/:nome", (req, res) => {
    const sql = 'SELECT * FROM PRODUTO WHERE nome LIKE ?';

    const termoBusca = '%' + req.params.nome + '%';

    connection.query(sql, [termoBusca], (erro, resultados) => {
        if(erro){
            return res.status(500).json({erro: erro.message});
        }
        res.json(resultados);
    });
});

server.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
const express = require('express');
const fileUpload = require('express-fileupload');
const pdfParse = require('pdf-parse');

const app = express();

// Middleware para servir arquivos estáticos do diretório 'public'
app.use('/', express.static('public'));

// Middleware para processar uploads de arquivos
app.use(fileUpload());

// Rota para extrair texto de um arquivo PDF
app.post('/extract-text', (req, res) => {
    // Verifica se há um arquivo PDF no campo 'inpFile' do formulário
    console.log("foi 1")
    if (!req.files || !req.files.inpFile) {
        res.status(400).end();
        return;
    }

    // Usa pdf-parse para extrair texto do arquivo PDF
    pdfParse(req.files.inpFile.data).then(result => {
        // Envia o texto extraído como resposta
        res.send(result.text);
    });
});

// Inicia o servidor na porta 5500
app.listen(5500, () => {
    console.log('Servidor está rodando na porta 5500');
});

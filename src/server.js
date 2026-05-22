const express = require('express');
const cors    = require('cors');
const fs      = require('fs');
const path    = require('path');
const { pipeline } = require('stream/promises');
const StreamConcat = require('stream-concat');
const winston = require('winston');

// node server.js

const app  = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DIR = path.join(__dirname, 'ExamenAaDKevinTimus');
const DIRFich = path.join(__dirname, 'ExamenAaDKevinTimus', 'FitxerKevin.txt');


app.get('/mostrarNomsTimus', (req, res) => {
  function carpetas(direccion, listaArchivos = []) {
    const elementos = fs.readdirSync(direccion, { withFileTypes: true });

    elementos.forEach(item => {
      const rutaCompleta = path.join(direccion, item.name);

      if (item.isDirectory()) {
        listaArchivos.push(rutaCompleta);

        carpetas(rutaCompleta, listaArchivos);
      } else {
        listaArchivos.push(rutaCompleta);
      }
    });

    return listaArchivos;
  }

  const todoElContenido = carpetas(DIR);
  console.log(todoElContenido);
  res.json(todoElContenido);

})



app.put('/copiarFitxerTimus', (req, res) => {

  fs.writeFileSync(DIRFich, '22/05/2026', "utf-8");
  const paraCopiar = path.join(__dirname, 'ExamenAaDKevinTimus', 'FitxerKevin.txt');
  const origen = path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'FitxerOrigen.txt');
  const contenidoOrigen = fs.readFileSync(origen, 'utf8');
  const contendioParaCopiar = fs.readFileSync(paraCopiar, 'utf8');

  if (fs.existsSync(path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'Docs1', 'FitxerDesti.txt'))) {
    fs.appendFileSync(path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'Docs1', 'FitxerDesti.txt'), contenidoOrigen + contendioParaCopiar);
  } else {
    fs.writeFileSync(path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'Docs1', 'FitxerDesti.txt'), contendioParaCopiar, "utf-8" )
    fs.writeFileSync(path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'Docs1', 'FitxerDesti.txt'), contenidoOrigen + contendioParaCopiar);

  }
  res.json('Acabado');
  console.log('Acabado');
})


app.post('/writeBuffersTimus', async (req, res) => {
  const BufferNom = Buffer.from('Kevin', "utf-8")
  const BufferCognom1 = Buffer.from('Timus', "utf-8")
  const BufferCognom2 = Buffer.from('Leonte', "utf-8")
  const dataExamen = Buffer.from('22/05/2026', "utf-8")

  const bufferConcatenado = Buffer.concat([BufferNom, BufferCognom1, BufferCognom2, dataExamen]);

  if (fs.existsSync(path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'Buffer'))) {
    console.log("Ya existe")
  } else {
    fs.mkdirSync(fs.createWriteStream(path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'Buffer', {recursive: true})));
  }


  const ws = fs.createWriteStream(path.join(__dirname, 'ExamenAaDKevinTimus', 'Documents', 'Buffer', 'ex4KevinTimus'));
  await pipeline(bufferConcatenado, ws);

  console.log(bufferConcatenado.toString());

})


app.post('/llegirImatgeTimus', (req, res) => {
  const imagen = fs.readdirSync(path.join(__dirname, 'ExamenAaDKevinTimus', 'Imatges', 'imatge1.jpg'));
  const extension = path.extname(path.join(__dirname, 'ExamenAaDKevinTimus', 'Imatges', 'imatge1.jpg'));
  console.log(extension);

  if (extension === 'png') {
    const highMark = fs.createReadStream(path.join(__dirname, 'ExamenAaDKevinTimus', 'Imatges', 'imatgee1.jpg'), {
      encoding: 'utf8',
      highWaterMark: 4096
    });

    console.log(imagen);
    res.json(imagen);

  } else {
    console.log('nahhhh');
  }


})

app.listen(PORT, () => {
  console.log(`Servidor a http://localhost:${PORT}`);
});


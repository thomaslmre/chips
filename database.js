const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());

// Créer une connexion à la base de données
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "oneway"
});

// Route GET pour récupérer des données depuis la base de données
app.get('/donnees', (req, res) => {
  const sql = 'SELECT * FROM Femme';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Erreur lors de l\'exécution de la requête :', err);
      res.status(500).json({ error: 'Erreur lors de la récupération des données.' });
      return;
    }
    res.json(results);
  });
});

// Démarrer le serveur
app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000.');
});

fetch('http://localhost:3000/donnees')
  .then(response => response.json())
  .then(data => {
    // Traiter les données récupérées
    console.log(data);
  })
  .catch(error => {
    // Gérer les erreurs
    console.error('Erreur lors de la récupération des données :', error);
});
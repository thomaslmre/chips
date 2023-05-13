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
  const sql = `SELECT Femme.nom_femme, Femme.prenom_femme, Femme.annee_naissance_femme, atout1.rang_atout as tete_femme, atout2.rang_atout as back_femme FROM Femme 
               LEFT JOIN Atout atout1 ON Femme.tete_femme = atout1.id_atout
               LEFT JOIN Atout atout2 ON Femme.back_femme = atout2.id_atout`;
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
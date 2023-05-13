const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());

// Créer une connexion à la base de données
const connection = mysql.createConnection({
  host: "89.116.147.103",
  user: "u104222462_ONW_thomas",
  password: "L&@r7IUFX0p",
  database: "u104222462_oneway",
  port: 3306
});

// Route GET pour récupérer des données depuis la base de données
app.get('/donnees', (req, res) => {
  const sql = `SELECT femme.nom_femme, femme.prenom_femme, femme.annee_naissance_femme, atout1.rang_atout as tete_femme, atout2.rang_atout as back_femme FROM femme 
               LEFT JOIN atout atout1 ON femme.tete_femme = atout1.id_atout
               LEFT JOIN atout atout2 ON femme.back_femme = atout2.id_atout`;
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

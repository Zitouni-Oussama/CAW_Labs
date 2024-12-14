import React from "react";
import Layout from "./../components/Layout/Layout";
import { Box, Typography } from "@mui/material";
import './../styles/about.css';  // Importation du fichier CSS

const About = () => {
  return (
    <Layout>
      <Box
        className="about-container"
        sx={{
          my: 15,
          textAlign: "center",
          p: 3,
          backgroundColor: "#f0f8ff", // Un fond légèrement bleu
          borderRadius: 12,
          boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)", // Ombre plus douce
          "& h4": {
            fontWeight: "bold",
            my: 2,
            fontSize: "2.5rem",
            color: "#2c3e50", // Bleu foncé pour le titre
          },
          "& p": {
            textAlign: "justify",
            color: "#34495e", // Gris bleu clair pour le texte
            fontSize: "1.1rem",
            lineHeight: 1.8,
            marginBottom: "1.5rem",
            letterSpacing: "0.5px", // Améliorer la lisibilité
          },
          "@media (max-width:600px)": {
            "& h4": {
              fontSize: "1.8rem",
            },
            "& p": {
              fontSize: "1rem",
            },
          },
        }}
      >
        <Typography variant="h4">Bienvenue dans notre restaurant</Typography>
        <p>
          Chez <strong>Le Gourmet</strong>, nous croyons que chaque repas doit être une expérience mémorable. 
          Nous vous accueillons dans un cadre chaleureux où la passion de la cuisine rencontre l'art de la table. 
          Notre menu est inspiré des saveurs traditionnelles, tout en y ajoutant une touche créative qui ravira vos papilles. 
          Chaque plat est préparé avec des ingrédients frais et de qualité, pour vous offrir une explosion de goûts à chaque bouchée.
        </p>
        <p>
          Notre équipe de chefs talentueux travaille sans relâche pour vous offrir des plats raffinés qui combinent tradition et innovation. 
          Que vous soyez ici pour un déjeuner rapide ou pour une soirée gourmande, nous avons quelque chose qui conviendra à tous les goûts. 
          Nous vous invitons à découvrir notre menu, où chaque plat raconte une histoire unique et un voyage culinaire à travers des ingrédients soigneusement sélectionnés.
        </p>
        <p>
          Nous espérons que votre expérience chez <strong>Le Gourmet</strong> sera inoubliable. 
          Venez savourer l'authenticité, la convivialité et l'excellence culinaire dans notre restaurant. 
          Nous avons hâte de vous accueillir et de partager avec vous notre passion pour la gastronomie.
        </p>
      </Box>
    </Layout>
  );
};

export default About;

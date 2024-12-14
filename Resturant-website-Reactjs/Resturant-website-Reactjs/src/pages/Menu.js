import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importer le hook pour naviguer
import axios from "axios";
import Layout from "./../components/Layout/Layout";
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import "./../styles/MenuStyles.css"; // Importer le fichier CSS

const Menu = () => {
  const [menuList, setMenuList] = useState([]);
  const [filteredMenus, setFilteredMenus] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigate = useNavigate(); // Initialiser le hook de navigation

  useEffect(() => {
    axios
      .get("http://localhost/api/getMenu.php")
      .then((response) => {
        setMenuList(response.data);
        setFilteredMenus(response.data);
      })
      .catch((error) => {
        console.error("Erreur lors du chargement des données :", error);
      });
  }, []);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredMenus(menuList);
    } else {
      const filtered = menuList.filter((menu) => menu.cat === category);
      setFilteredMenus(filtered);
    }
  };

  const handleCardClick = (menu) => {
    navigate(`/menu/${menu.id}`, { state: { menu } }); // Naviguer vers une nouvelle page avec les détails
  };

  return (
    <Layout>
      {/* Boutons de filtrage */}
      <Box className="headerContainer">
        {/* Ajoutez des boutons pour chaque catégorie de menu */}
        <button onClick={() => handleCategoryFilter("")}>Tous</button>
        <button onClick={() => handleCategoryFilter("Pizza")}>Pizza</button>
        <button onClick={() => handleCategoryFilter("Burger")}>Burgers</button>
        <button onClick={() => handleCategoryFilter("Sandwich")}>Sandwich</button>
        <button onClick={() => handleCategoryFilter("Fries")}>Fries</button>
      </Box>

      {/* Cartes des menus */}
      <Box className="menuCardsContainer">
        {filteredMenus.map((menu, index) => (
          <Card
            key={index}
            className="menuCard"
            sx={{ display: "flex", m: 2 }}
          >
            <CardActionArea onClick={() => handleCardClick(menu)}>
              <CardMedia
                className="menuCardImage"
                component="img"
                src={`/images/${menu.image}`}
                alt={menu.name}
              />
              <CardContent className="cardContent">
                <div>
                  <Typography className="menuCardTitle" variant="h5" gutterBottom>
                    {menu.name}
                  </Typography>
                  <Typography className="menuCardDescription" variant="body2">
                    {menu.description}
                  </Typography>
                </div>
                <Typography className="menuCardPrice" variant="body2">
                  {menu.price} USD
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Layout>
  );
};

export default Menu;

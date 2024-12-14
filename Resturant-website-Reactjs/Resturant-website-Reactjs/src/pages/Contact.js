import React from "react";
import Layout from "./../components/Layout/Layout";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import MailIcon from "@mui/icons-material/Mail";
import CallIcon from "@mui/icons-material/Call";
import "./../styles/ContactStyles.css"
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const Contact = () => {
  return (
    <Layout>
      <Box sx={{ my: 5, ml: 10, textAlign: "center" }}>
        <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, color: "#2c3e50" }}>
          Contactez notre restaurant
        </Typography>
        <Typography variant="body1" sx={{ color: "#34495e", fontSize: "1rem", lineHeight: 1.6, mb: 3 }}>
          Si vous avez des questions, des commentaires ou des demandes spéciales, n'hésitez pas à nous contacter. Nous sommes à votre écoute !
        </Typography>
      </Box>
      <Box
        sx={{
          m: 3,
          width: "600px",
          ml: 10,
          "@media (max-width:600px)": {
            width: "100%",
          },
        }}
      >
        <TableContainer component={Paper} sx={{ boxShadow: 3 }}>
          <Table aria-label="contact table">
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    bgcolor: "#daa520",
                    color: "white",
                    fontWeight: "bold",
                    textAlign: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  Détails de contact
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <SupportAgentIcon sx={{ color: "red", mr: 2 }} /> 1800-00-0000 (numéro gratuit)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <MailIcon sx={{ color: "skyblue", mr: 2 }} /> help@myrest.com
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ display: "flex", alignItems: "center" }}>
                  <CallIcon sx={{ color: "green", mr: 2 }} /> 1234567890
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Layout>
  );
};

export default Contact;

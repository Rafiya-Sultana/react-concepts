import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const RecipesApp = () => {
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all recipes when the component mounts
  useEffect(() => {
    fetch("https://dummyjson.com/recipes")
      .then((res) => res.json())
      .then((data) => {
        setRecipes(data.recipes);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  // Fetch recipe details when a recipe is clicked
  const fetchRecipeDetails = (id) => {
    fetch(`https://dummyjson.com/recipes/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setSelectedRecipe(data);
        setIsModalOpen(true);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // Close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedRecipe(null);
  };

  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "90%",
    maxWidth: 500,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    maxHeight: "80vh",
    overflowY: "auto", // Makes the modal scrollable
    scrollbarWidth: "none", // For Firefox
  msOverflowStyle: "none", // For IE and Edge
  "&::-webkit-scrollbar": {
    display: "none", // For Chrome, Safari, and Edge
  },
  };

  const contentStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  };

  const imageStyle = {
    width: "150px", // Small image size
    height: "auto",
    borderRadius: "8px",
    marginBottom: "1rem",
  };

  const backButtonStyle = {
    position: "absolute",
    top: 8,
    left: 8,
  };


  return (
    <div>
      <h1>Recipes App</h1>

      {/* Display loading/error for fetching recipes */}
      {loading ? (
        <p>Loading recipes...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <TableContainer component={Paper}  sx={{bgcolor:'#fafafa'}}>
          <Table>
            <TableHead  sx={{bgcolor:'#e0e0e0'}}>
              <TableRow>
                <TableCell sx={{fontWeight:'bold'}}>ID</TableCell>
                <TableCell sx={{fontWeight:'bold'}}>Name</TableCell>
                <TableCell sx={{fontWeight:'bold'}}>Difficulty</TableCell>
                <TableCell sx={{fontWeight:'bold'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe.id}>
                  <TableCell>{recipe.id}</TableCell>
                  <TableCell>{recipe.name}</TableCell>
                  <TableCell>{recipe.difficulty}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => fetchRecipeDetails(recipe.id)}
                    >
                      View Details
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Modal for displaying recipe details */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <Box sx={modalStyle}>
          {selectedRecipe ? (
            <>
                 <IconButton
            sx={backButtonStyle}
            onClick={handleCloseModal}
          >
            <ArrowBackIosIcon />
          </IconButton>
            <Box sx={contentStyle}>
              <Typography variant="h5" component="h2" sx={{fontWeight:'bold'}}>
                {selectedRecipe.name}
              </Typography>
              <img
                src={selectedRecipe.image}
                alt={selectedRecipe.name}
                style={imageStyle}
              />
              <Typography>
                <strong>Difficulty:</strong> {selectedRecipe.difficulty}
              </Typography>
              <Typography>
                <strong>Prep Time:</strong> {selectedRecipe.prepTimeMinutes} mins
              </Typography>
              <Typography>
                <strong>Cook Time:</strong> {selectedRecipe.cookTimeMinutes} mins
              </Typography>
              <Typography>
                <strong>Servings:</strong> {selectedRecipe.servings}
              </Typography>
              <Typography>
                <strong>Calories:</strong> {selectedRecipe.caloriesPerServing} kcal
              </Typography>
              <p>
                <strong >Instructions:</strong>
              </p>
              <ul style={{ textAlign: "left" }}>
                {selectedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ul>
            </Box> 
            </>
          ) : (
            <Typography>Loading...</Typography>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default RecipesApp;

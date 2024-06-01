import CategoryModel from "../models/categoryModel.js";

export const getDefaultCategoryId = async () => {
  try {
    // Recherchez la catégorie par défaut dans la base de données
    const defaultCategory = await CategoryModel.findOne({ name: "Non classe" });

    if (!defaultCategory) {
      throw new Error("Default category not found");
    }

    // Récupérez l'ID de la catégorie par défaut
    return defaultCategory._id;
  } catch (error) {
    console.error("Error while getting default category:", error);
    throw error;
  }
};

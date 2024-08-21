import { customFetch } from "../axios";

export const getCategories = async () => {
  try {
    const response = await customFetch.get("/v1/categories");
    const responseData = response.data; 
    return responseData;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error; 
  }
};
import { ElementsParamsProps } from "../../interface/elementsInterface";
import { customFetch } from "../axios";


export const getElements = async ({
  limit,
  page,
  category_ids,
}: ElementsParamsProps) => {
    console.log(limit)
  try {
    const response = await customFetch.get(
      `/v1/images/search?limit=${limit}&page=${page}&category_ids=${category_ids}`
    );
    const responseData = response.data;
    return responseData;
  } catch (error) {
    console.error("Error fetching elements:", error);
    throw error;
  }
};

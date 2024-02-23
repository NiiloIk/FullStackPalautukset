import { apiBaseUrl } from "../constants";
import { Diagnosis } from "../types";
import axios from "axios";


const getAll = async () => {
  const { data } = await axios.get<Diagnosis[]>(
    `${apiBaseUrl}/diagnoses`
  );

  return data;
};

export default {
  getAll
};
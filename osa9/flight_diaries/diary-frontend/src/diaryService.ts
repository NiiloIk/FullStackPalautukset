import axios from "axios";
import { Diary } from "./types";

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => {
  return axios
    .get<Diary[]>(baseUrl)
    .then(response => response.data)
}

export const createDiary = (object: any) => {
  return axios
    .post<Diary>(baseUrl, object)
    .then(response => response.data)
}
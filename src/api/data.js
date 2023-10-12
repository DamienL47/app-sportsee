import axios from "axios";
import {
  BASE_URL,
  USER18_URL,
  USER12_URL,
  USER18_AVERAGE,
  USER18_PERFORMANCE,
  USER18_ACTIVITY,
  USER12_AVERAGE,
  USER12_PERFORMANCE,
  USER12_ACTIVITY,
} from "../config";

export class DataAPI {
  static async getUsers(id, stats = null) {
    try {
      const response = await axios.get(`${BASE_URL}${id}`);
      return response.data;
    } catch (error) {
      console.log(error, " Erreur de réception des données depuis l'api ");
    }
  }
}

import axios from "axios";
import { BASE_URL } from "../config";

export class DataAPI {
  static async getUsers(id, stats = null) {
    try {
      const response = await axios.get(`${BASE_URL}${id}`);
      return response.data;
    } catch (error) {
      console.log(error, " Erreur de réception des données depuis l'api ");
    }
  }
  static async getDataInfos(id, stats = null) {
    try {
      const response = await axios.get(`${BASE_URL}${id}${stats}`);
      return response.data;
    } catch (error) {
      console.log(error, " Erreur de réception des données depuis l'api ");
    }
  }
}

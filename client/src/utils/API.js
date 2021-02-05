import axios from "axios";

export default {
  getGames: function() {
    return axios.get("/api/games/");
  },
  getGame: function(id) {
    return axios.get("/api/game/" + id);
  },
  deleteGame: function(id) {
    return axios.delete("/api/game/" + id);
  },
  createGame: function(data){
    return axios.post("/api/game/create", data);
  },
  createQtrGame: function(data){
    return axios.post("/api/game/create/qtr", data);
  },
  updateGame: function(id,data){
    return axios.put("/api/game/" + id, data);
  },
  getUserGames: function(userId) {
    return axios.get("/api/games/" + userId);
  },
  updateSquare: function(id, data) {
    return axios.put("/api/square/" + id, data);
  },
  deleteParticipant: function(id,name){
    return axios.delete("/api/square/" + id + "/"+ name)
  },
  getChat: function(id){
    return axios.get("/api/chat/" + id);
  },
  updateChat: function(id,data){
    return axios.put("/api/chat/" + id, data);
  },

};
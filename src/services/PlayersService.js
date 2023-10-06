import { instancePlayers } from "./InstanceAxios";

const fetchTeams = (league) => {
  return instancePlayers.get(`/api/v1/json/3/search_all_teams.php?l=${league}`);
};

const fetchPlayers = (teamName, playerName) => {
  return instancePlayers.get(
    `/api/v1/json/3/searchplayers.php?t=${teamName}&p=${playerName}`
  );
};

export { fetchPlayers, fetchTeams };

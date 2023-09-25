import { instancePlayers } from "./InstanceAxios";

const fetchLeagues = () => {
  return instancePlayers.get(
    `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
  );
};

const fetchPlayers = (teamName, playerName) => {
  return instancePlayers.get(
    `api/v1/json/{APIKEY}/searchplayers.php?t=${teamName}&p=${playerName}`
  );
};

export { fetchPlayers, fetchLeagues };

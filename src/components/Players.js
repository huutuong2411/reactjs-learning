import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Table.css";
import { fetchPlayers, fetchLeagues } from "../services/PlayersService";
import _, { debounce } from "lodash";
import { Form } from "react-bootstrap";

function Players() {
  useEffect(() => {
    // call API
    fetchLeagues().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <>
      <div className="row">
        <div className="col-3">
          <Form.Select aria-label="Default select example">
            <option>Chọn giải đấu</option>
            <option value="English Premier League">Premier League</option>
            <option value="French Ligue 1">Ligue 1</option>
            <option value="Spanish La Liga">La Liga</option>
            <option value="German Bundesliga">Bundesliga</option>
            <option value="Italian Serie A">Serie A</option>
          </Form.Select>
        </div>

        <div className="col-4 mb-2">
          <input
            className="form-control"
            type="text"
            placeholder="Search player by name"
          />
        </div>
      </div>
      <div className="col-7 mb-2">
        <Card body>This is some text within a card body.</Card>
        <Card body>This is some text within a card body.</Card>
        <Card body>This is some text within a card body.</Card>
      </div>
    </>
  );
}

export default Players;

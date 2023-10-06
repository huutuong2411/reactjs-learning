import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import "./Table.css";
import { fetchPlayers, fetchTeams } from "../services/PlayersService";
import _, { debounce } from "lodash";
import { Form } from "react-bootstrap";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
function Players() {
  const [league, setLeague] = useState("");
  const [listTeams, setListTeams] = useState([]);
  const [club, setClub] = useState("");
  const [keyword, setKeyword] = useState("");
  const [listPlayer, setListPlayer] = useState([]);
  const [open, setOpen] = useState(false);
  const [lovedPlayer, setLovedPlayer] = useState([]);

  useEffect(() => {
    // call API
    if (league !== "") {
      setOpen(true);
      fetchTeams(league).then((response) => {
        setListTeams(response.data.teams);
        setOpen(false);
      });
    } else {
      setListTeams([]);
    }
  }, [league]);

  useEffect(() => {
    if (club !== "" || keyword !== "") {
      setOpen(true);
      searchPlayer();
    } else {
      setListPlayer([]);
    }
  }, [club, keyword]);

  const searchPlayer = debounce(() => {
    fetchPlayers(club, keyword).then((response) => {
      setListPlayer(response.data.player);
      setOpen(false);
    });
  }, 1000);

  const handleClose = () => {
    setOpen(false);
  };

  const handleLoved = (player) => {
    const resultUsers = lovedPlayer.some((item) => {
      return player.idPlayer === item.idPlayer;
    });
    if (!resultUsers) {
      setLovedPlayer([player, ...lovedPlayer]);
      console.log(lovedPlayer);
    } else {
      toast.error("cầu thủ đã tồn tại");
    }
  };

  const handleDeleteLoved = (id) => {
    const cloneLovedPlayer = lovedPlayer.filter((obj) => obj.idPlayer !== id);

    setLovedPlayer(cloneLovedPlayer);
  };
  return (
    <>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-4">
              <Form.Select
                aria-label="Default select example"
                onChange={(event) => setLeague(event.target.value)}
              >
                <option value="">---Chọn giải đấu---</option>
                <option value="English Premier League">Premier League</option>
                <option value="French Ligue 1">Ligue 1</option>
                <option value="Spanish La Liga">La Liga</option>
                <option value="German Bundesliga">Bundesliga</option>
                <option value="Italian Serie A">Serie A</option>
              </Form.Select>
            </div>
            <div className="col-4">
              <Form.Select
                aria-label="Default select example"
                onChange={(event) => setClub(event.target.value)}
              >
                <option value="">---Chọn đội bóng---</option>
                {listTeams &&
                  listTeams.length > 0 &&
                  listTeams.map((item, index) => {
                    return (
                      <option key={item.idTeam} value={item.strTeam}>
                        {item.strTeam}
                      </option>
                    );
                  })}
              </Form.Select>
            </div>
            <div className="col-4 mb-2">
              <input
                className="form-control"
                type="text"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Search player by name"
              />
            </div>
          </div>
          <h3>Danh sách cầu thủ:</h3>
          <div className="scrollbar scrollbar-secondary">
            {listPlayer &&
              listPlayer.length > 0 &&
              listPlayer.map((item, index) => {
                return (
                  <Card
                    body
                    key={item.idPlayer}
                    className="border-secondary card border border-2 rounded"
                  >
                    <div className="d-flex justify-content-between mb-2">
                      <div className="col-7">
                        <img
                          className="player-image"
                          src={item.strCutout}
                          alt={`Avatar of ${item.strPlayer}`}
                        />
                        <Card.Title className="text-danger">
                          {item.strPlayer}
                        </Card.Title>
                        <strong>Quốc tịch: </strong>
                        {item.strNationality}
                        <strong className="mx-2">Vị trí: </strong>
                        {item.strPosition}
                        <p>
                          <strong>Chiều cao: </strong>
                          {item.strHeight}
                        </p>
                      </div>
                      <div>
                        <button
                          className="btn btn-success"
                          onClick={() => handleLoved(item)}
                        >
                          <i className="fa-solid fa-arrow-right"></i>Thêm vào
                          đội hình
                        </button>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </div>
        </div>
        <div className="col-4">
          <div className="card text-white bg-success mb-3">
            <div className="card-header">
              <h3>Danh sách chọn</h3>
              <button className="btn btn-warning">
                <i class="fa-solid fa-futbol"></i>Xếp đội hình
              </button>
            </div>
            <div className="">
              <ul className="list-group scrollbar scrollbar-secondary scrollbar-loved">
                {lovedPlayer &&
                  lovedPlayer.length > 0 &&
                  lovedPlayer.map((item, index) => {
                    return (
                      <li className="list-group-item" key={index}>
                        <img
                          className="player-image loved-image"
                          src={item.strCutout}
                          alt={`Avatar of ${item.strPlayer}`}
                        />
                        <div className="d-flex justify-content-between mb-2">
                          <Card.Title className="text-danger">
                            {item.strPlayer}
                          </Card.Title>
                          <button
                            onClick={() => handleDeleteLoved(item.idPlayer)}
                            className="btn btn-danger"
                          >
                            <i className="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Players;

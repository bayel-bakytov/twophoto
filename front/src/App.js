import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
var serverUrl = "http://localhost:5000";
function App() {
  const [left, setLeft] = useState({});
  const [right, setRight] = useState({});
  const [sex, setSex] = useState(null);

  const getPersons = async () => {
    var r = await axios.get(serverUrl);
    if (r) {
      setLeft(r.left);
      setRight(r.right);
    }
  };

  const choosePerson = async (v) => {
    try {
      if (!v) {
        var r = await axios.post(serverUrl + "/getPersons", null);
        return;
      }
      if (v == "right") {
        right.win = true;
      } else {
        left.win = true;
      }
      var result = {
        right: right,
        left: left,
        sex: sex,
      };
      console.log(result);
      var r = await axios.post(serverUrl + "/getPersons", result);
      if (r) {
        setLeft(r.left);
        setRight(r.right);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const chooseSex = (v) => {
    setSex(v);
    choosePerson();
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      {!sex ? (
        <div className="sex_wrapp" id="sex_wrapp">
          <h2>Выбери пол</h2>
          <div>
            <button
              onClick={() => {
                chooseSex("boy");
              }}
            >
              Я парень
            </button>
            <button
              onClick={() => {
                chooseSex("girl");
              }}
            >
              Я девушка
            </button>
          </div>
        </div>
      ) : (
        <div className="game_wrapp none" id="game">
          <center>
            <h1>Кто сексуальнее?</h1>
          </center>
          <div className="game">
            {left && right && (
              <>
                <div className="first">
                  <img src={left.img} />
                  <button
                    onClick={() => {
                      choosePerson("left");
                    }}
                  >
                    Левая
                  </button>
                </div>
                <h2>VS</h2>
                <div className="second">
                  <img src={right.img} />
                  <button
                    onClick={() => {
                      choosePerson("right");
                    }}
                  >
                    Правая
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

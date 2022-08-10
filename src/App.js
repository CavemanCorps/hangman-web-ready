import React, { useState, useEffect } from "react";
//import "/src/styles.css";
import "./App.css";

const CHALLENGES = [
  "his kingdom come",
  "perfect lamb",
  "the four gospels",
  "jesus christ",
  "holy water",
  "the lord is my shephard",
  "david and goliath",
  "holy trinity",
  "moses and the ark",
  "amen"
];

let layouts = [
  ["", "", "", "", "", "", "", "", ""],
  ["", "o", "", "", "", "", "", "", ""],
  ["", "o", "", "-", "", "", "", "", ""],
  ["", "o", "", "-", "|", "", "", "", ""],
  ["", "o", "", "-", "|", "-", "", "", ""],
  ["", "o", "", "-", "|", "-", "/", "", ""],
  ["", "o", "", "-", "|", "-", "/", "", " \\"]
];

function App() {
  const [challenge, setChallenge] = useState("...");
  const [letter, setLetter] = useState("Enter letter. Good luck 😊");
  const [blanks, setBlanks] = useState("");
  const [markdown, setMarkdown] = useState("");
  const [layout, setLayout] = useState(layouts[0]);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(false);

  const generatePhrase = () => {
    const randomChallenge =
      CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)];
    const currentBlanks = randomChallenge
      .split("")
      .map((e) => (e !== " " ? "_" : " "))
      .join("");
    setChallenge(randomChallenge);
    setBlanks(currentBlanks);
  };

  const handleKeyPress = (e) => {
    const newMarkdown = e.target.value;
    const newLetter = newMarkdown.charAt(e.target.value.length - 1);
    setMarkdown(newMarkdown);
    setLetter(newLetter);
  };

  const endGame = () => {
    return gameOver || winner;
  }

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (blanks === challenge) {
      setWinner(true); // moved this from the "else if" to here and that worked
    }
    if (challenge.includes(letter)) {
      let newBlanks = blanks
        .split("")
        .map((a, index) => (challenge[index] === letter ? letter : a))
        .join("");
      setBlanks(newBlanks);
    } else if (
      letter !== "Enter letter. Good luck 😊" &&
      !challenge.includes(letter)
    ) {
      // FINALLY GOT THIS SHIT WORKING. MADE ANOTHER COPY IN CASE I FUCK UP
      if (layouts.length - 1 > 1) {
        layouts.shift();
        setLayout(layouts[0]);
      } else {
        setGameOver(true);
        setLayout(["", "o", "", "-", "|", "-", "/", "", " \\"]);
      }
    }
    console.log(blanks, challenge, blanks === challenge);
  }, [letter, blanks, challenge, winner]);
  useEffect(() => {
    generatePhrase();
  }, []);

  return (
    <div className="myHangman">
      <h2 id="stickman">
        {layout.slice(0, 3)} <br /> {layout.slice(3, 6)} <br />{" "}
        {layout.slice(6, 9)}
      </h2>
      <h3 id="blanks">{blanks}</h3>
      <h3>{letter}</h3>
      <textarea
        id="input"
        onChange={handleKeyPress}
        value={markdown}
        disabled={endGame()}
      />
      {/* DISABLE TEXT AREA AT GAME OVER */}

      <div className="button-div">
        {/* {" "} */}
        {/* ONLY RENDERED WHEN THE GAME IS OVER */}
        {gameOver && (
          <button className="button" onClick={() => reset()}>
            Restart Game?
          </button>
        )}
      </div>

      <div className="winner-message">
        {" "}
        {/* ONLY RENDERED WHEN THE GAME IS OVER */}
        {winner && (
          <button className="button" onClick={() => reset()}>
            You Win! Play Again?
          </button>
        )}
      </div>
    </div>
  );
}
export default App;


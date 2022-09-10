import React, { useState, useEffect } from "react";
import "./App.css";

const CHALLENGES = [
  "tiger",
  "zebra",
  "red panda",
  "capybara",
  "ring tailed lemur",
  "polar bear",
  "meerkat"
];

let layouts = [
  [""],
  ["", "o", "", "", "", "", "", "", ""],
  ["", "o", "", "-", "", "", "", "", ""],
  ["", "o", "", "-", "|", "", "", "", ""],
  ["", "o", "", "-", "|", "-", "", "", ""],
  ["", "o", "", "-", "|", "-", "/", "", ""],
  ["placeholder"]
];

function App() {
  const [challenge, setChallenge] = useState("...");
  const [letter, setLetter] = useState("Please enter letter");
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

  const reset = () => {
    window.location.reload();
  };

  useEffect(() => {
    if (blanks === challenge) {
      setWinner(true); // moved this from the "else if" to here and that worked
      layout[1] = "😎"
    }
    if (challenge.includes(letter)) {
      let newBlanks = blanks
        .split("")
        .map((a, index) => (challenge[index] === letter ? letter : a))
        .join("");
      setBlanks(newBlanks);
    } else if (
      letter !== "Please enter letter" &&
      !challenge.includes(letter)
    ) {
      if (layouts.length - 1 > 1) {
        layouts.shift();
        setLayout(layouts[0]);
      } else {
        setGameOver(true);
        setLayout(["", "😢", "", "-", "|", "-", "/", "", " \\"]);
      }
    }
  }, [letter, blanks, challenge, winner]);
  useEffect(() => {
    generatePhrase();
  }, []);

  return (
    <div className="myHangman">
      <h2>
        | <br /> | <br /> | <br />
        {layout.slice(0, 3)} <br /> {layout.slice(3, 6)} <br /> {layout.slice(6, 9)}
      </h2>
      <h3 >{blanks}</h3>
      <h3>{letter}</h3>
      <textarea
        onChange={handleKeyPress}
        value={markdown}
        disabled={gameOver || winner}
      />

      <div>
          {gameOver || winner ? (
            <button className="button" onClick={() => reset()}>
              {gameOver ? 'Restart Game?' : 'You Win! Play Again?'}
            </button>
          ) : ''}
      </div>  

      <div className="title">
        <h2>Hangman: Zoo Animal Edition</h2>
        <h3>by Roman Navarro</h3>
      </div>
    </div>
    </div>
  );
}
export default App;



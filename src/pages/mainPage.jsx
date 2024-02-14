import { useState, useRef, useEffect } from "react";

function MainPage({changeView}) {
  const messages = [
    "Hi",
    "Ms.",
    "Sharon",
    "Zhang",
    "It is only right that I ask",
    "Will",
    "You",
    "Be",
    "My",
    "Valentine",
    "?",
  ];

  const buttonRef = useRef();

  const [message, setMessage] = useState(0);
  const [buttonX, setbuttonX] = useState();
  const [buttonY, setbuttonY] = useState();
  const [numOfTimesClicked, setNumOfTimesClicked] = useState(0);

  const changeMessage = () => {
    if (message !== messages.length - 1) setMessage(message + 1);
  };

  const getButtonPosition = () => {
    setNumOfTimesClicked(numOfTimesClicked+1);
    const x = buttonRef.current.offsetLeft;
    setbuttonX(x);

    const y = buttonRef.current.offsetTop;
    setbuttonY(y);

    console.log(x, y);

    changeButtonCoords(x, y);
  };

  const changeButtonCoords = (x, y) => {
    const direction = Math.floor(Math.random() * 1);
    let offsetX, offsetY;
    if (numOfTimesClicked < 3) {
        offsetX = Math.floor(Math.random() * -100);
      offsetY = Math.floor(Math.random() * -100);
    }
    setbuttonX(x + offsetX);
    setbuttonY(y + offsetY);
  };
  // Re-calculate X and Y of the red box when the window is resized by the user
  useEffect(() => {
    window.addEventListener("onClick", getButtonPosition);
  }, []);

  return (
    <>
      <h1 style={{textAlign: 'center'}} className='wave-disappear-text' onClick={changeMessage}>{messages[message]}</h1>
      {message == messages.length - 1 && (
        <div className="buttons">
          <button onClick={() => changeView('yay')}>Yes</button>
          <button
            style={{
              position: "absolute",
              left: `${buttonX}px`,
              top: `${buttonY}px`,
              display: numOfTimesClicked == 3 ? 'none' : 'inline-block',
            }}
            ref={buttonRef}
            onClick={getButtonPosition}
          >
            No
          </button>
        </div>
      )}
      {message < messages.length -1 && <h2 className="bounce">Click on Text to Continue</h2>}
      {numOfTimesClicked==3 &&<h2>You don't have a choice!</h2>}
    </>
  );
}

export default MainPage;

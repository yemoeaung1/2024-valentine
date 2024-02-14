import { useState, useEffect} from "react";
import { useTimer } from "react-timer-hook";

function Birthday({ changeView }) {
  //birthday button
  const [isClicked, setIsClicked] = useState(false);


  const currentTime = new Date();

  const dateTime = new Date('2024-02-14T00:02:00');

  const timeDifferenceInMillis = dateTime.getTime() - currentTime.getTime();
  console.log("Time Difference:", timeDifferenceInMillis);

  const timeDifferenceInSeconds = Math.floor(timeDifferenceInMillis / 1000);
  const time = new Date();
  time.setSeconds(timeDifferenceInSeconds);
  console.log(time);


  const handleBirthdayButtonClicked= () =>{
    setIsClicked(true);
  }

  return (
    <>
      {isClicked===false && <CustomTimer expiryTimestamp={time} handleClick={handleBirthdayButtonClicked} />}
      {isClicked && <BirthdayCard changeView={changeView}/>}
    </>
  );
}

function CustomTimer({ expiryTimestamp, handleClick }) {
  const [isTimeUp, setIsTimeUp] = useState(false);
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => {
      setIsTimeUp(true);
    },
  });

  const timeDisplay = (hours, minutes) => {
    const time = {};

    if (hours >= 0) {
      time["hour"] = <span>{String(hours).padStart(2, "0")}</span>;
    } else {
      time["hour"] = <span>00</span>;
    }

    if (minutes !== 0) {
      time["min"] = <span>{String(minutes).padStart(2, "0")}</span>;
    } else {
      time["min"] = <span>00</span>;
    }

    return time;
  };

  const timeFormatter = timeDisplay(hours, minutes);
  return (
    <div className="text-font" style={{ textAlign: "center" }}>
      <h1
        style={{ fontFamily: "Lucida Grande, Lucida Sans Unicode, sans-serif" }}
      >
        Time Until Yo Birthday
      </h1>
      <div
        style={{
          fontSize: "100px",
          fontFamily: "Courier New, Courier, monospace",
        }}
      >
        {timeFormatter["hour"]}:{timeFormatter["min"]}:
        <span>{String(seconds).padStart(2, "0")}</span>
      </div>
      {isTimeUp === true && <BirthdayButton handleClick={handleClick} />}
    </div>
  );
}

function BirthdayButton({ handleClick}) {

  // console.log(isTimeUp);
  return (
    <div>
      <button onClick={handleClick}>Ready?</button>
    </div>
  );
}

function BirthdayCard({ changeView }) {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Set a time delay of 5 seconds (5000 milliseconds) before showing the button
    const timer = setTimeout(() => {
      setShowButton(true);
    }, 45000);
  });
  return (
    <>
    <div className="birthdayCard">
      <div className="cardFront">
        <h3 className="happy">HAPPY BIRTHDAY Love!</h3>
        <div className="balloons">
          <div className="balloonOne" />
          <div className="balloonTwo" />
          <div className="balloonThree" />
          <div className="balloonFour" />
        </div>
      </div>
      <div className="cardInside">
        <h3 className="back">HAPPY BIRTHDAY </h3>
        <p>HI BABY!</p>
        <p>
          HAPPY BIRTHDAYYYY MY BABY! You're finally 21!! You've grown so much right in front of me in the span of the two precious years I've been with you. From dealing with shitty people to going out of your comfort zone, I'm happy to 
          have met such a confident and independent woman. You're becoming a more beautiful woman inside and out day by day and I can't wait to see your life unfold more. 
          I'm glad to have been a part of your life for two birthdays in a row and I'm looking forward to spending many more birthdays together and continuing this tradition forever.
        </p>
        <p> Fyi, this card will never go away. It's my signature move now ehehe.</p>
        <p>Hopefully your favorite Husky and Golden Retriever Mix and more formally, your boyfriend,
- Yemoe</p>
      </div>
    </div>
    <div className="my-8">
    {showButton && <button onClick={()=>changeView('main')}>There's more!</button>}
    </div>

    </>
  );
}

export default Birthday;

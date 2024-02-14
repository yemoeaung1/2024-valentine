import gif from "/youtube-video-gif.gif";

function YayPage( { changeView }) {
  return (
    <>
      <img src={gif} alt="Works?" />
      <h4>I knew you would say that.😉</h4>
      <button onClick={() => changeView("quiz")}>Click for our date!</button>
    </>
  );
}

export default YayPage;

import { useState, useEffect} from "react";

function QuestionPage({changeView}) {

    const squestions = [
        {
          "text": "What is our first day being official?",
          "choices": ["March 25", "March 26", "March 24", "March 23"],
          "correctAnswer": "March 25"
        },
        {
          "text": "What is the one place outside of our dorm that we were staying at until 4am?",
          "choices": ["Staller Steps", "Sand St", "Your mom's house", "Staller Center"],
          "correctAnswer": "Staller Steps"
        },
        {
          "text": "Who is the best person in the whole world?",
          "choices": ["You", "Me", "Your boyfriend", "Yours truly"],
          "correctAnswer": "You"
        }
      ]
      


  const [questions, setQuestions] = useState(squestions);
  const [view, setView] = useState("question");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [questionsCorrect, setQuestionsCorrect] = useState(0);

  

  const handleAnswer = (selectedChoice) => {
    const currentQuestion = questions[currentIndex];
    console.log(selectedChoice);
    console.log(currentQuestion.correctAnswer);

    let isCorrect = false;

    if (selectedChoice === currentQuestion.correctAnswer) {
      isCorrect = true;
    }

    currentQuestion["result"] = isCorrect ? "✓" : "❌";
    currentQuestion["selectedAnswer"] = selectedChoice;

    if (isCorrect) {
      setQuestionsCorrect(questionsCorrect + 1);
      console.log("Questions Correct:" + questionsCorrect);
      setView("correct");
    } else {
      setView("incorrect");
    }

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setQuestions([...questions]);
        setCurrentIndex(currentIndex + 1);
        setView("question"); // Transition back to showing the question
      } else {
        setView("results");
        // Last question answered, show results page or perform any other action
        // Example: <ResultsPage questionsCorrect={questionsCorrect} />
      }
    }, 1000); // Adjust the delay as needed
  };

  if(questions.length === 0){
    return;
  }

  const currentQuestion = questions[currentIndex];
  console.log(questions);
  // console.log(JSON.stringify(currentQuestion));

  return (
    <div className="box-content border-2 m-w-9/12 mx-auto mt-12 p-4">

      {view === "correct" && <MessageBox status={"correct"} />}
      {view === "incorrect" && <MessageBox status={"incorrect"} />}
      {view === "question" && (
        <>
         
          <Question question={currentQuestion.text} />
          <div className="divider"></div>
          <div className="text-black my-4 flex flex-col items-center"  >
         
            {currentQuestion.choices.map((choice, index) => (
              <Answer key={index} choice={choice} handleAnswer={handleAnswer} />
            ))}
          </div>
        </>
      )}
      {view === "results" && (
        <>
          <ResultsPage questions={questions} changeView={changeView}/>
          <div className="flex my-4 justify-between">
            <button
              onClick={() => {
                setQuestionsCorrect(0);
                setView("question");
                setCurrentIndex(0);
                //setQuestions(sampleQuestions);
              }}
              className="my-4"
            >
              Try Again
            </button>
            {questionsCorrect === questions.length && (
              <button onClick={() => {
                changeView('plan');
              }}
              className="my-4">See my itinerary</button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

function MessageBox({ status }) {
  if (status === "correct") {
    // return <h1>Correct</h1>;
    return <h1 className="correct-respo text-center animate-pulse">Correct</h1>;
  }
  return <h1 className="incorrect-respo text-center animate-pulse">Incorrect</h1>;
}

function Question({ question }) {
  return (
    <>
      {/* <div className="text-center text-black bg-white">{question}</div> */}
      <div>{question}</div>
    </>
  );
}

function Answer({ choice, handleAnswer }) {
  // console.log(JSON.stringify(choice))
  const [boxColor, setBoxColor] = useState("white");

  const checkAnswer = () => {
    handleAnswer(choice);
  };
  return (
    <div
      onClick={checkAnswer}
      className={` text-center zoom shadow rounded-box text-center my-4 min-w-40 mx-40 text-black`}
      style={{ backgroundColor: boxColor }}
    >
      {" "}
      {choice}
    </div>
  );
}

function ResultsPage({ questions }) {
  console.log("In Results");

  return (
    <div className="overflow-x-auto">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th className="text-white">Question</th>
            <th className="text-white">Selected Answer</th>
            <th className="text-white">Result</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question, index) => {
            console.log(question);
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{question.text}</td>
                <td>{question.selectedAnswer}</td>
                <td>{question.result}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <MusicPlayer/> */}
    </div>
  );
}

export default QuestionPage; 
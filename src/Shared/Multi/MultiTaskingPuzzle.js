import React, { useState, useEffect } from "react";
import OwnTextFieldInput from "../WhiteTextField";
import { Box } from "@mui/material";
import { checkRightAnswer } from "../../store/appStore";
import Lottie from "lottie-react";
import right from "../../media/animations/right.json";
import help from "../../media/icons/help.svg";
import ModalComponent from "../Modal/ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import { openModal, openNestedModal } from "../../store/appStore";
import { modalCauses } from "../../store/enum";
import NestedModal from "../Modal/NestedModalComponent";

const ClueData = (props) => {
  console.log(props);
  return (
    <div className="clue-item-wrapper">
      {props.clueData.text && <div>{props.clueData.text}</div>}
      {props.clueData.fileName && (
        <div className="puzzle-image">
          <img src={`/${props.clueData.fileName}`} alt="" />
        </div>
      )}
    </div>
  );
};

const MultiTaskingPuzzle = (props) => {
  const dispatch = useDispatch();
  const { loader, shouldUpdateStep, modal, nestedModal } = useSelector(
    (state) => state
  );

  const [puzzleData, setPuzzleData] = useState(props.data);
  const [activePuzzleId, setActivePuzzleId] = useState(null);
  useEffect(() => {
    const puzzlesCount = puzzleData.length;
    const doneCount = puzzleData.filter((item) => item.done === true);
    if (puzzlesCount == doneCount.length) {
      //onPuzzleCompleted callback
      //props.onPuzzleCompleted();
      console.log("all puzzles are completed");
    }
  }, [puzzleData]);

  const onInputChange = (value, puzzleItemId) => {
    setPuzzleData((prevPuzzleData) => {
      const updatedData = prevPuzzleData.map((puzzle) => {
        if (puzzle.id === puzzleItemId) {
          const ans = checkRightAnswer(puzzle.rightAnswer, value);
          if (ans) {
            return { ...puzzle, done: true, answer: value };
          }
          return { ...puzzle, done: false, answer: value };
        }
        return puzzle;
      });
      return updatedData;
    });
  };
  function checkUnusedClues(puzzleId) {
    const clues = puzzleData.find((puzzle) => puzzle.id === puzzleId).clues;
    const unusedClue = clues.find((clue) => !clue.used);
    if (unusedClue) {
      return true;
    }
    return false;
  }

  const openClueData = () => {
    let unusedClue;
    const updatedPuzzleData = puzzleData.map((puzzle) => {
      if (puzzle.id === activePuzzleId) {
        unusedClue = puzzle.clues.find((clue) => !clue.used);
        if (unusedClue) {
          unusedClue.used = true; // Set used to true
        }
      }
      return puzzle;
    });

    dispatch(openModal(false));

    if (unusedClue) {
      setPuzzleData(updatedPuzzleData);
      return unusedClue;
    }
    return null;
  };

  const helpRequest = (puzzleId) => {
    setActivePuzzleId(puzzleId);
    if (checkUnusedClues(puzzleId)) {
      dispatch(openModal(true));
    } else {
      dispatch(openNestedModal(true));
    }
  };
  const closeModal = () => {
    setActivePuzzleId(null);
    dispatch(openModal(false));
  };
  const closeNestedModal = () => {
    setActivePuzzleId(null);
    dispatch(openNestedModal(false));
  };
  const getRightAnswer = () => {
    let rightAnswers = puzzleData.find((puzzle) => puzzle.id == activePuzzleId);
    if (rightAnswers) {
      return rightAnswers.rightAnswer[0];
    }
    return "";
  };

  const renderItem = (puzzle) => {
    return (
      <div className="puzzle-item">
        {puzzle.text && (
          <div
            className="puzzle-text left"
            dangerouslySetInnerHTML={{ __html: puzzle.text }}
          />
        )}
        {puzzle.fileName && (
          <div className="puzzle-image">
            <img src={`/${puzzle.fileName}`} alt="" />
          </div>
        )}
        <Box
          key={puzzle.id}
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "320px" },
          }}
          autoComplete="off"
        >
          <div className="answer-input-wrapper">
            <div className="clues-wrapper">
              <div className="" onClick={() => helpRequest(puzzle.id)}>
                <img src={help} />
              </div>
            </div>

            <OwnTextFieldInput
              id="outlined-basic"
              label={"Ваш ответ"}
              variant="outlined"
              onChange={(e) => onInputChange(e.target.value, puzzle.id)}
              value={puzzle.answer}
            />
            {puzzle.done && (
              <div className="right-answer-animation">
                <Lottie animationData={right} />
              </div>
            )}
            {puzzle.clues.map((clue) => {
              return <div>{clue.used && <ClueData clueData={clue} />}</div>;
            })}
          </div>
        </Box>
      </div>
    );
  };

  return (
    <div className="puzzle-wrapper">
      {puzzleData.map((puzzle, index) => {
        return (
          <div>
            <div key={index}>{renderItem(puzzle)}</div>
            <div className="border"></div>
          </div>
        );
      })}
      {modal && (
        <ModalComponent
          open={modal}
          handleClose={closeModal}
          title={"Вы уверены, что хотите видеть подсказку?"}
          cause={modalCauses.info}
          button={true}
          extraButton={true}
          onButtonClick={openClueData}
          buttonText={"Да"}
          onExtraButtonClick={closeModal}
          extraButtonText={"Нет"}
        />
      )}
      {nestedModal && (
        <NestedModal
          open={nestedModal}
          handleClose={closeNestedModal}
          parentTitle={"Подсказки закончились. Показать правильный ответ?"}
          //parentText={"parentText"}
          childTitle={getRightAnswer()}
          //childText={"childText"}
          closeChildModalButtonText={"OK"}
          openChildModalButtonText={"Да"}
          closeParentModalButtonText={"Нет"}
        />
      )}
    </div>
  );
};
export default MultiTaskingPuzzle;

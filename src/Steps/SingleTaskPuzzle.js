import React, { useState } from "react";
import OwnTextFieldInput from "../Shared/WhiteTextField";
import { Box } from "@mui/material";
import { checkRightAnswer } from "../store/appStore";
import Lottie from "lottie-react";
import right from "../media/animations/right.json";
import help from "../media/icons/help.svg";
import ModalComponent from "../Shared/Modal/ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  setLoading,
  setCurrentStep,
  openModal,
  openNestedModal,
} from "../store/appStore";
import { steps, modalCauses } from "../store/enum";
import NestedModal from "../Shared/Modal/NestedModalComponent";

const ClueData = (props) => {
  console.log(props);
  return (
    <div className="clue-item-wrapper">
      {props.clueData.text && <div>{props.clueData.text}</div>}
      {props.clueData.image && <div>{props.clueData.image}</div>}
    </div>
  );
};

const SingleTaskPuzzle = (props) => {
  const dispatch = useDispatch();
  const { loader, shouldUpdateStep, modal, nestedModal } = useSelector(
    (state) => state
  );

  const [puzzleData, setPuzzleData] = useState(props.data);

  const onInputChange = (value) => {
    setPuzzleData((prevPuzzleData) => {
      const ans = checkRightAnswer(prevPuzzleData.rightAnswer, value);
      if (ans) {
        return { ...prevPuzzleData, done: true, answer: value };
      }
      return { ...prevPuzzleData, done: false, answer: value };
    });
  };
  function checkUnusedClues() {
    const unusedClue = puzzleData.clues.find((clue) => !clue.used);
    if (unusedClue) {
      return true;
    }
    return false;
  }

  const openClueData = () => {
    let unusedClue = puzzleData.clues.find((clue) => !clue.used);
    let updatedPuzzleData;
    if (unusedClue) {
      updatedPuzzleData = {
        ...puzzleData,
        clues: puzzleData.clues.map((clue) =>
          clue.id === unusedClue.id ? { ...clue, used: true } : clue
        ),
      };
    } else {
      return puzzleData;
    }

    dispatch(openModal(false));

    if (unusedClue) {
      setPuzzleData(updatedPuzzleData);
      return unusedClue;
    }
    return null;
  };

  const helpRequest = () => {
    if (checkUnusedClues()) {
      dispatch(openModal(true));
    } else {
      dispatch(openNestedModal(true));
    }
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
        {puzzle.image && (
          <div className="puzzle-image">
            <image scr={puzzle.image} />
          </div>
        )}
        <Box
          component="form"
          sx={{
            "& .MuiTextField-root": { m: 1, width: "320px" },
          }}
          autoComplete="off"
        >
          <div className="answer-input-wrapper">
            <div className="clues-wrapper">
              <div className="" onClick={() => helpRequest()}>
                <img src={help} />
              </div>
            </div>

            <OwnTextFieldInput
              id="outlined-basic"
              label={"Ваш ответ"}
              variant="outlined"
              onChange={(e) => onInputChange(e.target.value)}
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
    <div className="poetry-puzzle-wrapper">
      <div>{renderItem(puzzleData)}</div>

      {modal && (
        <ModalComponent
          open={modal}
          handleClose={() => dispatch(openModal(false))}
          title={"Вы уверены, что хотите видеть подсказку?"}
          cause={modalCauses.info}
          button={true}
          extraButton={true}
          onButtonClick={openClueData}
          buttonText={"Да"}
          onExtraButtonClick={() => dispatch(openModal(false))}
          extraButtonText={"Нет"}
        />
      )}
      {nestedModal && (
        <NestedModal
          open={nestedModal}
          handleClose={() => dispatch(openNestedModal(false))}
          parentTitle={"Подсказки закончились. Показать правильный ответ?"}
          //parentText={"parentText"}
          childTitle={puzzleData.rightAnswer[0]}
          //childText={"childText"}
          closeChildModalButtonText={"OK"}
          openChildModalButtonText={"Да"}
          closeParentModalButtonText={"Нет"}
        />
      )}
    </div>
  );
};
export default SingleTaskPuzzle;

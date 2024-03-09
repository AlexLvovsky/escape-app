import React, { useState, useEffect } from "react";
import OwnTextFieldInput from "../WhiteTextField";
import { Box } from "@mui/material";
import Lottie from "lottie-react";
import right from "../../media/animations/right.json";
import unlike from "../../media/animations/unlike.json";
import help from "../../media/icons/help.svg";
import ModalComponent from "../Modal/ModalComponent";
import { useSelector, useDispatch } from "react-redux";
import {
  checkRightAnswer,
  openModal,
  openNestedModal,
} from "../../store/appStore";
import { steps, modalCauses } from "../../store/enum";
import NestedModal from "../Modal/NestedModalComponent";
import ReactPlayer from "react-player";
import OutlineSubmitButton from "../../Shared/Buttons/OutlineSubmitButton";
import Typewriter from "../../Shared/TypeWritter/TypeWritter";

const ClueData = (props) => {
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

const SingleTaskPuzzle = (props) => {
  const dispatch = useDispatch();
  // const [startWritingDescription, setStartWritingDescription] = useState(false);
  const [startWritingLastDescription, setStartWritingLastDescription] =
    useState(false);
  //
  // const [showPuzzle, setShowPuzzle] = useState(
  //   puzzleData.description_text && puzzleData.description_filePath
  //     ? false
  //     : true
  // );
  const { loader, shouldUpdateStep, modal, nestedModal } = useSelector(
    (state) => state
  );

  const [puzzleData, setPuzzleData] = useState(props.data);
  const [bottomButton, setBottomButton] = useState(
    puzzleData.last_description_text ? false : true
  );
  const [showIncorrectAnswer, setShowIncorrectAnswer] = useState(false);
  const [submitPlayingLastDescription, setSubmitPlayingLastDescription] =
    useState(false);

  useEffect(() => {
    if (puzzleData.done == true) {
      if (puzzleData.last_description_text) {
        setSubmitPlayingLastDescription(true);
      } else {
        setBottomButton(true);
      }
    }
  }, [puzzleData.done]);

  const onInputChange = (value) => {
    setShowIncorrectAnswer(false);
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

  const renderItem = () => {
    return (
      <div className="puzzle-item">
        {/* {puzzleData.description_text && puzzleData.description_filePath && (
          <div className="description">
            {startWritingDescription && (
              <div className="text">
                <Typewriter text={puzzleData.description_text} delay={75} />
              </div>
            )}{" "}
            <ReactPlayer
              url={puzzleData}
              width="100%"
              height="1px"
              controls={false}
              playing={true}
              muted={false}
              type="audio/mp3"
              volume={1}
              playIcon={<button className="play">Play</button>}
              light={<OutlineSubmitButton title="Старт ?? ?" />}
              onStart={() => {
                setTimeout(() => {
                  setStartWritingDescription(true);
                }, 1000);
              }}
              onEnded={() => {
                setShowPuzzle(true);
              }}
            />
          </div>
        )} */}
        <div className="puzzle-data">
          {/* {showPuzzle && ( //check if there is first description*/}
          <div>
            {puzzleData.puzzleText && (
              <div
                className="puzzle-text left"
                dangerouslySetInnerHTML={{ __html: puzzleData.puzzleText }}
              />
            )}
            {puzzleData.puzzleFilePath && (
              <div className="puzzle-image">
                <img src={`/${puzzleData.puzzleFilePath}`} alt="" />
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

                <div className="answer-form">
                  <OwnTextFieldInput
                    id="outlined-basic"
                    label={"Ваш ответ"}
                    variant="outlined"
                    onChange={(e) => onInputChange(e.target.value)}
                    value={puzzleData.answer}
                  />
                  {!puzzleData.done && (
                    <OutlineSubmitButton
                      title="Проверить"
                      className="small"
                      onClick={() => setShowIncorrectAnswer(true)}
                    />
                  )}
                </div>
                {puzzleData.done && (
                  <div className="right-answer-animation">
                    <Lottie animationData={right} />
                  </div>
                )}
                {showIncorrectAnswer && (
                  <div className="right-answer-animation">
                    <Lottie animationData={unlike} />
                  </div>
                )}

                {puzzleData.clues.map((clue) => {
                  return <div>{clue.used && <ClueData clueData={clue} />}</div>;
                })}
              </div>
            </Box>
          </div>
          {/* )} */}
        </div>
        {/* {puzzleData.last_description_text && puzzleData.done && ( */}
        {submitPlayingLastDescription && (
          <div className="last-description">
            {startWritingLastDescription && (
              <div className="text">
                <Typewriter
                  text={puzzleData.last_description_text}
                  delay={75}
                />
              </div>
            )}
            <ReactPlayer
              url={puzzleData.last_description_filePath}
              width="100%"
              height="1px"
              controls={false}
              playing={true}
              muted={false}
              type="audio/mp3"
              volume={1}
              playIcon={<button className="play">Play</button>}
              light={<OutlineSubmitButton title="Далее" className="mt-80" />}
              onStart={() => {
                setTimeout(() => {
                  setStartWritingLastDescription(true);
                }, 1000);
              }}
              onEnded={() => {
                setBottomButton(true);
              }}
            />
          </div>
        )}
        {bottomButton && puzzleData.done && (
          <div className="puzzle-item-bottom-button">
            <OutlineSubmitButton
              onClick={props.onBottomButtonClick}
              title={props.bottomButtonText}
              className="w-100"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="puzzle-wrapper">
      <div>{renderItem()}</div>

      {modal && (
        <ModalComponent
          open={modal}
          handleClose={() => dispatch(openModal(false))}
          title={"Вы уверены, что хотите подсказку?"}
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

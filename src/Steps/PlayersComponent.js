import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setName,
  setCurrentStep,
  setCount,
  findWinner,
  openModal,
  setError,
  setTeemName,
} from '../store/appStore';
import { TextField, Box } from '@mui/material';
import { steps, errorType } from '../store/enum';
import { errors } from '../store/variables';
import OwnTextFieldInput from '../Shared/WhiteTextField';
import ModalComponent from '../Shared/Modal/ModalComponent';
import OutlineSubmitButton from '../Shared/Buttons/OutlineSubmitButton';
import Lottie from 'lottie-react';
import bike from '../media/animations/bike.json';
import ReactPlayer from 'react-player';
import Typewriter from '../Shared/TypeWritter/TypeWritter';
import { introduction } from '../store/introduction';

const PlayersComponent = () => {
  const dispatch = useDispatch();
  const { count, names, winnerName, error, errorData, modal, teemName } =
    useSelector((state) => state);
  const [playerCountInput, setPlayerCountInput] = useState(count);
  const [showBottomButton, setShowBottomButton] = useState(false);
  const [startWritingLastDescription, setStartWritingLastDescription] =
    useState(false);
  const modalError = errors.find((e) => e.type === errorType.no_winner);

  useEffect(() => {
    if (error) {
      dispatch(openModal(true));
    }
  }, [error]);

  const handleCountChange = (e) => {
    const newCount = parseInt(e.target.value, 10) || null;
    setPlayerCountInput(newCount);
    dispatch(setCount(newCount));
  };

  const handleNameChange = (e, index) => {
    const newName = e.target.value;
    dispatch(setName({ index, name: newName }));
    dispatch(findWinner());
  };
  const handleClose = () => {
    dispatch(openModal(false));
    dispatch(setError({ error: false }));
  };

  return (
    <div className="">
      <div className="bike-animation">
        <Lottie animationData={bike} />
      </div>

      <div className="players-component-form">
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '320px' },
          }}
          autoComplete="off"
        >
          <div>
            <TextField
              className="my-own"
              id="outlined-required"
              label="Введите название команды"
              onChange={setTeemName}
              value={teemName}
              required
            />
          </div>
          <div>
            <TextField
              className="my-own"
              id="outlined-required"
              label="Введите число участников"
              onChange={handleCountChange}
              value={playerCountInput}
              required
            />
          </div>
        </Box>

        {playerCountInput && (
          <Box
            component="form"
            sx={{
              '& .MuiTextField-root': { m: 1, width: '320px' },
            }}
            //autoComplete="off"
          >
            <div>
              {Array.from({ length: count }, (_, index) => (
                <div>
                  <OwnTextFieldInput
                    key={index}
                    label={`Игрок ${index + 1}:`}
                    variant="outlined"
                    value={names[index] || ''}
                    onChange={(e) => handleNameChange(e, index)}
                    required
                    id="margin-normal"
                  />
                </div>
              ))}
              {startWritingLastDescription && (
                <div className="text">
                  <Typewriter text={introduction.text6} delay={60} />
                </div>
              )}
              {winnerName ? (
                <div className="">
                  <ReactPlayer
                    url={introduction.audio6}
                    width="100%"
                    height="1"
                    controls={false}
                    playing={true}
                    muted={false}
                    type="audio/mp3"
                    volume={1}
                    playIcon={<button className="play">Play</button>}
                    light={
                      <OutlineSubmitButton title="Далее" className="w-100" />
                    }
                    onStart={() => {
                      setTimeout(() => {
                        setStartWritingLastDescription(true);
                      }, 1000);
                    }}
                    onEnded={() => {
                      setTimeout(() => {
                        setShowBottomButton(true);
                      }, 1000);
                    }}
                  />
                </div>
              ) : (
                <OutlineSubmitButton
                  onClick={() => {
                    //dispatch(findWinner());
                    dispatch(openModal(true));
                  }}
                  title="Далее"
                  className="w-100"
                />
              )}
            </div>
            {showBottomButton && (
              <OutlineSubmitButton
                onClick={() => {
                  dispatch(setCurrentStep({ currentStep: steps.wheel }));
                }}
                title="Да, конечно"
                className=""
              />
            )}
          </Box>
        )}
      </div>
      <ModalComponent
        open={modal}
        handleClose={handleClose}
        title={modalError?.title}
        text={modalError?.text}
      />
    </div>
  );
};
export default PlayersComponent;

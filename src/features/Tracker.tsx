import {
  useCallback,
  useImperativeHandle,
  forwardRef,
  useEffect,
  memo
} from "react";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { useTimer } from "../utils/hook";
import { deleteTimer, updateTimer } from "../store/tracker";

type Props = {
  timerid: number;
  itemName?: string;
  handleRemoveTrack: (index: number) => void;
};

export const Tracker = forwardRef(
  ({ itemName, timerid, handleRemoveTrack }: Props, _ref) => {
    const dispatch = useDispatch();
    const { timer, timerState, pauseOrResume, stopTimer } = useTimer();

    useEffect(() => {
      if (timerState === "RUNNING") {
        dispatch(
          updateTimer({
            id: timerid,
            timer_name: itemName!,
            time_running: timer!
          })
        );
      }
    }, [timer, dispatch, timerState, itemName, timerid]);

    const getTimerMessage = useCallback(() => {
      return timerState === "PAUSE"
        ? "Resume"
        : timerState === "STOP"
        ? "Start"
        : "Pause";
    }, [timerState]);

    useImperativeHandle(_ref, () => ({
      getTimer: () => timer
    }));

    const handleDeleteTimer = () => {
      dispatch(deleteTimer({ timer_id: timerid }));
      handleRemoveTrack(timerid);
    };

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <span>
            <b>#{timerid}</b> {itemName ?? "No title"}{" "}
          </span>
          <b> Time : {timer}</b>
        </div>
        <Button onClick={() => pauseOrResume()} variant="secondary">
          {getTimerMessage()}
        </Button>
        <Button onClick={() => stopTimer()} className="mx-2" variant="light">
          Stop
        </Button>
        <Button
          onClick={() => handleDeleteTimer()}
          className="mx-2"
          variant="light"
        >
          Delete
        </Button>
      </>
    );
  }
);

export default memo(Tracker);

import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, FormControl } from "react-bootstrap";

import { addToCounter, TrackerStateType } from "../store/counter";
import { RootState } from "../store";

/**
 * Learn Basics of RTK and RTK's Query
 */

const Counter = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const { trackers } = useSelector<RootState>(
    (state) => state.counter
  ) as TrackerStateType;

  const handleSubmit = () => {
    dispatch(
      addToCounter({
        id: 12,
        time_running: 0,
        timer_name: inputRef.current?.value!
      })
    );
  };

  return (
    <Container className="my-4">
      {JSON.stringify(trackers)}
      <FormControl ref={inputRef} />
      <Button variant="secondary" className="mt-1" onClick={handleSubmit}>
        Add to array
      </Button>
    </Container>
  );
};

export default Counter;

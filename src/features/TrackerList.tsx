import { useEffect, useMemo, useRef, useState } from "react";
import { Button, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Tracker from "./Tracker";
import AppLayout from "../components/common/Layout";
import { TrackerStateType } from "../store/tracker";
import { RootState } from "../store";

type Track = {
  title?: string;
};

export default () => {
  const dispatch = useDispatch();
  const inputRef = useRef<HTMLInputElement>(null);
  const { trackers: trackersList } = useSelector<RootState>(
    (state) => state.tracker
  ) as TrackerStateType;

  const [trackers, setTracker] = useState<Track[]>([]);

  const handleCreateTrack = () => {
    setTracker((tracks) => [
      ...tracks,
      { title: inputRef.current?.value, time: 0 }
    ]);
  };

  const handleRemoveTrack = (index: number) => {
    const _trackers = [...trackers];
    _trackers.splice(index, 1);
    setTracker(_trackers);
  };

  const accumulatedTime = useMemo(() => {
    return trackersList.reduce((acc, curr) => (acc += curr.time_running), 0);
  }, [trackersList]);

  return (
    <AppLayout>
      <>
        <input type="text" className="my-3 form-control" ref={inputRef} />
        <Button variant="secondary" onClick={() => handleCreateTrack()}>
          Track
        </Button>

        <ListGroup className="mt-2">
          {trackers.map(({ title }, index) => {
            return (
              <ListGroupItem key={index}>
                <Tracker
                  itemName={title}
                  timerid={index}
                  handleRemoveTrack={handleRemoveTrack}
                />
              </ListGroupItem>
            );
          })}
        </ListGroup>

        <Card>
          <Card.Header> Summary </Card.Header>
          <Card.Body>
            <Card.Text> Accumulated Time : {accumulatedTime} </Card.Text>
          </Card.Body>
        </Card>
      </>
    </AppLayout>
  );
};

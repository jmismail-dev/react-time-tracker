import { Provider } from "react-redux";
import { store } from "./store";
import TrackerList from "./features/TrackerList";
// import Counter from "./features/Counter";

export default function App() {
  return (
    <Provider store={store}>
      {/* <Counter /> */}
      <TrackerList />
    </Provider>
  );
}

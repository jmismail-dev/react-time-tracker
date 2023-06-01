import { Container } from "react-bootstrap";
import Header from "./Header";

type Props = {
  children: JSX.Element | JSX.Element[];
};

export default ({ children }: Props) => {
  return (
    <>
      <Header />
      <Container className="my-4">{children}</Container>
    </>
  );
};

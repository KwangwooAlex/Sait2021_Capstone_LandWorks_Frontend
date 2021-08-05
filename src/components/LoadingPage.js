import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  useLoading,
  Audio,
  BallTriangle,
  Bars,
  Circles,
  Grid,
  Hearts,
  Oval,
  Puff,
  Rings,
  SpinningCircles,
  TailSpin,
  ThreeDots,
} from "@agney/react-loading";

const Container = styled.main`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingDiv = styled.div`
  margin-top: 15px;
  font-size: 18px;
  margin-left: 7px;
`;

const Box = styled.div`
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
  font-weight: 600;
`;

// const LeftTitle = styled.div`
//   height: 100%;
//   display: flex;
//   align-items: center;
//   margin-left: 20px;
//   color: white;
//   font-size: 17px;
//   font-weight: 500;
// `;

function LoadingPage() {
  const { containerProps, indicatorEl } = useLoading({
    loading: true,
    indicator: <Oval width="50" color="gray" />,
  });

  return (
    <Container>
      <section {...containerProps}>
        <Box>
          {indicatorEl}
          <LoadingDiv>Loading...</LoadingDiv>
        </Box>
      </section>
    </Container>
  );
}

export default LoadingPage;

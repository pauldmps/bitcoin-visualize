import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 12px;
  width: 50%;
  margin-left: 25%;

  @media (max-width: 1024px) {
    width: 60%;
    margin-left: 20%;
  }
`;
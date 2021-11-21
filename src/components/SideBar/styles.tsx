import styled from "styled-components";

export const SideBarContainer = styled.div`
  width: 20%;
  padding-left: 30px;
  border-left: 1px solid black;
  padding-top: 25px;
  min-height: 100vh;
`;

export const OptionsHeading = styled.div`
  color: grey;
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const FilterItem = styled.div`
  margin-bottom: 15px;
  label {
    display: block;
    margin-bottom: 6px;
    color: grey;
    font-size: 16px;
    font-weight: bold;
  }
`;

const Styles = {
  SideBarContainer,
  OptionsHeading,
  FilterItem,
};

export default Styles;

import styled from "styled-components";

export const ItemsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const ItemContainer = styled.div`
  width: 25%;
  padding-left: 30px;
  padding-right: 30px;
  margin-top: 30px;
`;

export const TitleName = styled.div`
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  margin-top: 5px;
  color: ${(props) => props.theme.themePrimary};
`;

export const GenreYear = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 5px;
  color: grey;
`;

const Styles = {
  ItemsContainer,
  ItemContainer,
  TitleName,
  GenreYear,
};

export default Styles;

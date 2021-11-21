import styled from "styled-components";

export const NavContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0px;
  height: 8%;
`;

export const SearchBoxContainer = styled.div`
  width: 20%;
`;

export const NavItemsContainer = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
`;

export const AppName = styled.div`
  width: 20%;
  font-size: 24px;
  font-weight: bold;
  cursor: pointer;
  a,
  span {
    text-decoration: none;
    color: inherit;
  }
`;

const Styles = {
  NavContainer,
  SearchBoxContainer,
  NavItemsContainer,
  AppName,
};

export default Styles;

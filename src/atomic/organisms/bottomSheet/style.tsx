import styled from "styled-components/native";
import { shadow } from "../../constants/button";
import { blackOpacity, grey, white } from "../../constants/colors";

export const BoxModal = styled.Modal`
    width: 100%;
`

export const Backdrop = styled.TouchableOpacity.attrs({
    activeOpacity: 1
})`
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    position: absolute;
    background-color: ${blackOpacity};
    z-index: 999;
`

export const Main = styled.View`
    height: auto;
    min-height: 350px;
    background-color: ${white};
    elevation: ${shadow.elevation};
    box-shadow: ${shadow.boxShadow};
    shadow-opacity: ${shadow.shadowOpacity};
    border-radius: 20px;
    padding: 15px;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
`

export const Header = styled.View`
    width: 100%;
    align-items: center;
    justify-content: center;
    flex-direction: row;
    position: relative;
    padding-top: 10px;
    padding-bottom: 30px;
`

export const Body = styled.View`
    flex: 1;
`

export const Footer = styled.View`
    width: 100%;
    align-items: center;
    margin-bottom: 20px;
`
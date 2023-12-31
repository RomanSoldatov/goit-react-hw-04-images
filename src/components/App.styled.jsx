import styled from 'styled-components';

export const ModalImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

export const ModalDescr = styled.p`
  position: absolute;
  bottom: 0;
  left: 0;

  display: flex;

  margin: 0;
  padding-right: ${props => props.theme.space[4]}px;
  padding-left: ${props => props.theme.space[4]}px;
  padding-top: ${props => props.theme.space[3]}px;
  padding-bottom: ${props => props.theme.space[3]}px;

  width: 100%;

  color: ${props => props.theme.colors.accent};
  text-shadow: ${props => props.theme.shadows.textShadow};
  background-color: ${props => props.theme.colors.background};
  box-shadow: 0px -2px 4px 1px rgba(0, 0, 0, 0.2),
    0px -4px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12);

  backdrop-filter: blur(5.5px);

  font-size: ${props => props.theme.fontSizes.m};
`;

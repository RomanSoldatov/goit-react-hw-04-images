import styled from 'styled-components';

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1200;

  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const ModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  //max-width: calc(100vw - 48px);
  //min-height: calc(100vh - 48px);
  max-width: 85vw;
  height: 650px;

  border-radius: 3px;
  box-shadow: 0px 2px 1px -1px rgba(0, 0, 0, 0.2),
    0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12);

  pointer-events: none;
  opacity: 1;
  transition: opacity 300ms, transform 300ms;
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
  background-color: rgba(185, 228, 201, 0.5);
  box-shadow: 0px -2px 4px 1px rgba(0, 0, 0, 0.2),
    0px -4px 5px 0px rgba(0, 0, 0, 0.14), 0px -1px 10px 0px rgba(0, 0, 0, 0.12);

  backdrop-filter: blur(5.5px);

  font-size: ${props => props.theme.fontSizes.l};
`;

export const ModalPicture = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

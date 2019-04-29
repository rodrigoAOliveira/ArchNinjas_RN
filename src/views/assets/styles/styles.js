import styled from 'styled-components/native/dist/styled-components.native.esm'
import Colors from './colors'

export const Center = styled.View`
  width: 100%;
  height: 100%;
  display: flex;
  alignItems: center;
  justifyContent: center;
`;

export const HelloText = styled.Text`
  color: ${Colors.primary};
  fontSize: 44;
  fontFamily: Kato;
`;

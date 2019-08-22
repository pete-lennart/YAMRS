import * as React from 'react';
import styled from 'styled-components';

interface TileContainerProps {
  width: number;
  children: React.ReactNode;
}

const TileContainer = styled.div<TileContainerProps>`
  width: ${(props: TileContainerProps) => props.width}px;
  position: relative;
`;

const TileImage = styled.img`
  width: 100%;
  display: block;
`;

interface TileOverlayProps {
  children: React.ReactNode;
}

const TileOverlay = styled.div<TileOverlayProps>`
  cursor: pointer;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: black;
  color: white;
  opacity: 0;
  transition: opacity 0.5s;
  padding: 40px 20px;
  box-sizing: border-box;
  &:hover {
    opacity: 0.8;
  }
`;

const TileOverlayHeader = styled.p`
  font-size: 20pt;
  box-sizing: border-box;
`;

interface MovieTileProps {
  src: string;
  width: number;
  onClick: (e: React.MouseEvent) => void;
  title: string;
  desc: string;
}

export const MovieTile = (props: MovieTileProps) => (
  <TileContainer width={props.width}>
    <TileImage src={props.src} />
    <TileOverlay onClick={props.onClick}>
      <TileOverlayHeader>{props.title}</TileOverlayHeader>
    </TileOverlay>
  </TileContainer>
);

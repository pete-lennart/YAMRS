import * as React from "react";
import styled, {css} from 'styled-components';

export interface RuneProps {
  filled?: boolean;
  color?: string;
}

interface ExtendedRuneProps extends RuneProps {
  clipPath?: string;
}

export const SVGPath = styled.path<ExtendedRuneProps>`
  stroke: ${({color}) => color || "black"};
  stroke-width: ${({clipPath}) => clipPath ? "16" : "8"}px;
  fill: ${({filled, color}) => filled ? (color || "black") : "none"};
  transition: 0.2s ease-in-out;
`;

interface ContainerProps {
  margin?: string;
}

interface IconButtonContainerProps extends ContainerProps {
  size: number;
}

const SVG = styled.svg<IconButtonContainerProps>`
  display: block;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  margin: ${({margin}) => margin || "0 0 0 0"};
`;

export interface IconProps extends RuneProps, IconButtonContainerProps {}

export const asIcon = (RuneComponent: (props: RuneProps) => JSX.Element) => (props: IconProps) => (
  <SVG
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    size={props.size}
    margin={props.margin}
  >
    <RuneComponent filled={props.filled} color={props.color} />
  </SVG>
);

export interface ButtonProps extends IconProps {
  onClick: (e: React.MouseEvent) => void;
}

const basicButtonCSS = css<ContainerProps>`
cursor: pointer;
margin: ${({margin}) => margin || "0 0 0 0"};
border: none;
background-color: rgba(0, 0, 0, 0);
transition: all 0.5s;
:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
`;

const IconButtonContainer = styled.div<IconButtonContainerProps>`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  padding: ${({size}) => size / 4}px;
  ${basicButtonCSS}
  height: ${({size}) => size}px;
  width: ${({size}) => size}px;
  border-radius: ${({size}) => size}px;
`;

export const asButton = (IconComponent: (props: IconProps) => JSX.Element) => (props: ButtonProps) => (
  <IconButtonContainer
    size={props.size}
    margin={props.margin}
    onClick={props.onClick}
  >
    <IconComponent size={props.size / 2} filled={props.filled} color={props.color} />
  </IconButtonContainer>
);

interface TextButtonProps extends ContainerProps {
  color?: string;
  onClick: (e: React.MouseEvent) => void;
}

export const TextButton = styled.div<TextButtonProps>`
  ${basicButtonCSS}
  font-size: 14pt;
  border-radius: 2px;
  padding: 8px 12px;
  color: ${({color}) => color || "black"};
  margin: ${({margin}) => margin || "0 0 0 0"};
`;
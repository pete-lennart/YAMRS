import * as React from 'react';
import {asButton, asIcon, SVGPath, RuneProps} from './helper';

const CheckmarkRune = (props: RuneProps) => (
  <g>
    <SVGPath
      filled={props.filled}
      color={props.color}
      d="M0 50 L40 90 L100 10"
    />
  </g>
);

export const CheckmarkIcon = asIcon(CheckmarkRune);

export const CheckmarkButton = asButton(CheckmarkIcon);

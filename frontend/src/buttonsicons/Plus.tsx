import * as React from 'react';
import {asButton, asIcon, SVGPath, RuneProps} from './helper';

const PlusRune = (props: RuneProps) => (
  <g>
    <SVGPath
      filled={props.filled}
      color={props.color}
      d="M0 50 l100 0 M50 0 l0 100"
    />
  </g>
);

export const PlusIcon = asIcon(PlusRune);

export const PlusButton = asButton(PlusIcon);

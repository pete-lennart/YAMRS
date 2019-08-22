import * as React from 'react';
import {asButton, asIcon, SVGPath, RuneProps} from './helper';

const StarRune = (props: RuneProps) => {
  let cpid = Math.random().toString(10);
  return (
    <g>
      <defs>
        <clipPath id={cpid}>
          <path d="M50 0 L61.225699 34.549150 H97.552826 L68.163563 55.901699 L79.389263 90.450850 L50 69.098301 L20.610737 90.450850 L31.836437 55.901699 L2.447174 34.549150 H38.774301 Z" />
        </clipPath>
      </defs>
      <SVGPath
        filled={props.filled}
        color={props.color}
        d="M50 0 L61.225699 34.549150 H97.552826 L68.163563 55.901699 L79.389263 90.450850 L50 69.098301 L20.610737 90.450850 L31.836437 55.901699 L2.447174 34.549150 H38.774301 Z"
        clipPath={`url(#${cpid})`}
      />
    </g>
  );
};

export const StarIcon = asIcon(StarRune);

export const StarButton = asButton(StarIcon);

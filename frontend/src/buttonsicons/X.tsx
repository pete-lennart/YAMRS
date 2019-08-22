import * as React from "react";
import {asButton, asIcon, SVGPath, RuneProps} from "./helper";

const XRune = (props: RuneProps) => <g><SVGPath filled={props.filled} color={props.color} d="M0 0 L100 100 M0 100 L100 0" /></g>;

export const XIcon = asIcon(XRune);

export const XButton = asButton(XIcon);

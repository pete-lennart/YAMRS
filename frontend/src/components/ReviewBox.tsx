import * as React from 'react';
import styled from 'styled-components';
import {StarIcon} from '../buttonsicons/Star';

const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  box-sizing: border-box;
  margin: 0 0 20px;
  padding: 20px;
`;

const ReviewTitleBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  box-sizing: border-box;
  margin-bottom: 4px;
`;

const ReviewUserText = styled.p`
  font-size: 24pt;
`;

const ReviewStarsContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const ReviewText = styled.div`
  width: 100%;
  box-sizing: border-box;
`;

interface ReviewProps {
  numstars: number;
  text: string;
  username: string;
}

export const ReviewBox = (props: ReviewProps) => (
  <ReviewContainer>
    <ReviewTitleBar>
      <ReviewUserText>{props.username}</ReviewUserText>
      <ReviewStarsContainer>
        <StarIcon size={32} filled={props.numstars > 0} />
        <StarIcon size={32} filled={props.numstars > 1} />
        <StarIcon size={32} filled={props.numstars > 2} />
        <StarIcon size={32} filled={props.numstars > 3} />
        <StarIcon size={32} filled={props.numstars > 4} />
      </ReviewStarsContainer>
    </ReviewTitleBar>
    <ReviewText>{props.text}</ReviewText>
  </ReviewContainer>
);

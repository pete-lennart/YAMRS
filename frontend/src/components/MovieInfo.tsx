import * as React from 'react';
import styled from 'styled-components';
import {XButton} from '../buttonsicons/X';
import {getReviewsOfMovie} from '../requests/reviews';
import {Review, fetchStatus} from '../types';
import {PlusButton} from '../buttonsicons/Plus';
import {LoadingContainer} from './LoadingContainer';
import {ReviewBox} from './ReviewBox';
import {NewReviewBox} from './NewReviewBox';

interface ContainerProps {
  show: boolean;
}

const Container = styled.div<ContainerProps>`
  position: fixed;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px;
  opacity: ${(props: ContainerProps) => props.show ? '1' : '0'};
  visibility: ${(props: ContainerProps) => props.show ? 'visible' : 'hidden'};
  transition: all 0.5s;
  background-color: white;
  box-sizing: border-box;
  z-index: 2;
`;

const TitleBar = styled.div`
  width: 100%;
  height: 10%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

const MainArea = styled.div`
  width: 100%;
  height: 90%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const SummaryPane = styled.div`
  height: 100%;
  box-sizing: border-box;
  width: 48%;
`;

const ReviewPane = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  width: 48%;
  border: 1px solid #cccccc;
  border-radius: 3px;
  padding: 20px;
  overflow-y: scroll;
`;

const Title = styled.p`
  font-size: 28pt;
`;

const Description = styled.p`
  font-size: 16pt;
`;

interface MovieInfoProps {
  id: number;
  title: string;
  desc: string;
  show: boolean;
  close: () => void;
}

interface MovieInfoState {
  reviews: Review[];
  getReviewsStatus: fetchStatus;
  showNewReviewDialog: boolean;
  createReviewStatus: fetchStatus;
}

export class MovieInfo extends React.Component<MovieInfoProps, MovieInfoState> {
  constructor(props: MovieInfoProps) {
    super(props);
    this.state = {
      reviews: [],
      getReviewsStatus: "pending",
      showNewReviewDialog: false,
      createReviewStatus: "idle",
    };
  }

  componentDidUpdate(prevProps: MovieInfoProps) {
    if (this.props.id !== prevProps.id) {
      getReviewsOfMovie(this.props.id)
        .then((reviews: Review[]) => {
          this.setState({reviews, getReviewsStatus: "success"});
        })
        .catch((err: any) => {
          this.setState({getReviewsStatus: "error"});
        });
    }
  }

  openNewReviewDialog = () => {
    this.setState({showNewReviewDialog: true});
  }

  closeNewReviewDialog = () => {
    this.setState({showNewReviewDialog: false});
  }

  render() {
    return (
      <Container show={this.props.show}>
        <TitleBar>
          <Title>{this.props.title}</Title>
          <ButtonContainer>
            <PlusButton size={32} onClick={this.openNewReviewDialog} margin="0 32px 0 0" />
            <XButton size={32} onClick={this.props.close} />
          </ButtonContainer>
        </TitleBar>
        <MainArea>
          <SummaryPane>
            <Description>{this.props.desc}</Description>
          </SummaryPane>
          <ReviewPane>
            {this.state.getReviewsStatus === "pending"
              ? <LoadingContainer>Loading...</LoadingContainer>
              : this.state.getReviewsStatus === "error"
                ? <LoadingContainer>Error! Could not load reviews.</LoadingContainer>
                : this.state.reviews.length === 0
                  ? <LoadingContainer>No reviews have been written for this movie. Be the first one!</LoadingContainer>
                  : this.state.reviews.map((review: Review) => (
                    <ReviewBox numstars={review.numstars} text={review.text} username={review.username} />
                  ))
            }
            <NewReviewBox
              id={this.props.id}
              show={this.state.showNewReviewDialog}
              close={this.closeNewReviewDialog}
            />
          </ReviewPane>
        </MainArea>
      </Container>
    )
  }
}

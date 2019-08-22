import * as React from 'react';
import styled from 'styled-components';
import {TextInput, PasswordInput} from '../inputs/inputs';
import {TextButton} from '../buttonsicons/helper';
import * as config from '../config.json';
import {Review, fetchStatus} from '../types';
import {getUnapprovedReviews, approveReview} from '../requests/reviews';
import {ReviewBox} from './ReviewBox';
import {CheckmarkButton} from '../buttonsicons/Checkmark';

interface VisibilityProps {
  show: boolean;
}

interface BackgroundProps extends VisibilityProps {
  onClick: (e: React.MouseEvent) => void;
}

const Background = styled.div<BackgroundProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  opacity: ${({show}) => show ? "1" : "0"};
  visibility: ${({show}) => show ? "visible" : "hidden"};
  transition: all 0.5s;
  z-index: 100;
`;

const DialogContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  padding: 32px;
`;

const UnapprovedReviewList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  box-sizing: border-box;
  padding: 20px;
  overflow-y: scroll;
  width: 1000px;
  height: 100%;
  background-color: white;
`;

const AdminReviewBox = styled.div`
  position: relative;
  width: 100%;
`;

const ApproveOverlay = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
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

interface AdminSectionProps extends VisibilityProps {
  children: React.ReactNode;
  close: () => void;
}

interface AdminSectionState {
  username: string;
  password: string;
  loggedIn: boolean;
  wrongUsername: boolean;
  wrongPassword: boolean;
  unapprovedReviews: Review[];
  getUnapprovedReviewsStatus: fetchStatus;
}

export class AdminSection extends React.Component<AdminSectionProps, AdminSectionState> {
  private dialogBackground: React.RefObject<HTMLDivElement>;
  constructor(props: AdminSectionProps) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loggedIn: false,
      wrongUsername: false,
      wrongPassword: false,
      unapprovedReviews: [],
      getUnapprovedReviewsStatus: "pending"
    }
    this.dialogBackground = React.createRef();
  }

  componentDidUpdate() {
    getUnapprovedReviews()
      .then((reviews: Review[]) => {
        this.setState({unapprovedReviews: reviews, getUnapprovedReviewsStatus: "success"});
      })
      .catch((err: any) => {
        this.setState({getUnapprovedReviewsStatus: "error"});
      });
  }

  handleUsernameChange = (e: React.ChangeEvent) => {
    this.setState({username: (e.target as HTMLInputElement).value});
  }

  handlePasswordChange = (e: React.ChangeEvent) => {
    this.setState({password: (e.target as HTMLInputElement).value});
  }

  login = () => {
    if (this.state.password === config.adminPassword && this.state.username === config.adminName) {
      this.setState({username: '', password: '', loggedIn: true, wrongPassword: false, wrongUsername: false});
    } else {
      if (this.state.password !== config.adminPassword) {
        this.setState({wrongPassword: true});
      }
      if (this.state.username !== config.adminName) {
        this.setState({wrongUsername: true});
      }
    }
  }

  fixedOnClick = (e: React.MouseEvent) => {
    if (e.target === this.dialogBackground.current) {
      this.props.close();
    }
  }

  approveReview = (id: string) => {
    approveReview(id)
      .then((success: boolean) => {
        const unappr = JSON.parse(JSON.stringify(this.state.unapprovedReviews));
        const index = unappr.findIndex((r: Review) => r.id === id);
        unappr.splice(index, 1);
        this.setState({unapprovedReviews: unappr});
      })
      .catch((err: any) => {
        console.log(err);
      });
  }

  render() {
    return [
      <Background key="1" show={this.props.show} onClick={this.fixedOnClick} ref={this.dialogBackground}>
        {!this.state.loggedIn
          ? (
            <DialogContainer>
              <TextInput label="Username" value={this.state.username} onChange={this.handleUsernameChange} />
              <PasswordInput label="Password" value={this.state.password} onChange={this.handlePasswordChange} />
              <TextButton onClick={this.login}>Login</TextButton>
            </DialogContainer>
          )
          : (
            <UnapprovedReviewList>
              {this.state.unapprovedReviews.map((review: Review) => (
                <AdminReviewBox key={review.id}>
                  <ReviewBox numstars={review.numstars} text={review.text} username={review.username} />
                  <ApproveOverlay>
                    <CheckmarkButton color="white" size={56} onClick={() => this.approveReview(review.id)} />
                  </ApproveOverlay>
                </AdminReviewBox>
              ))}
            </UnapprovedReviewList>
          )
        }
      </Background>
    ];
  }
}

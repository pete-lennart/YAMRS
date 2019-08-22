import * as React from 'react';
import styled from 'styled-components';
import {StarButton} from '../buttonsicons/Star';
import {CheckmarkButton} from '../buttonsicons/Checkmark';
import {XButton} from '../buttonsicons/X';
import {createReview} from '../requests/reviews';
import {TextInput} from '../inputs/inputs';

interface ContainerProps {
  show: boolean;
}

const Container = styled.div<ContainerProps>`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  opacity: ${({show}) => show ? "1" : "0"};
  visibility: ${({show}) => show ? "visible" : "hidden"};
  transition: all 0.5s;
  background-color: white;
`;

const Form = styled.div`
  width: 100%;
`;

const FormSection = styled.div`
  padding: 20px;
`;

const StarContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: start;
  align-items: center;
`;

const BottomBar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: center;
  margin-top: auto;
  padding: 20px;
`;

interface NewReviewBoxProps extends ContainerProps {
  id: number;
  close: () => void;
}

interface NewReviewBoxState {
  text: string;
  numstars: number;
  username: string;
  hasError: boolean;
}

export class NewReviewBox extends React.Component<NewReviewBoxProps, NewReviewBoxState> {
  constructor(props: NewReviewBoxProps) {
    super(props);
    this.state = {
      text: '',
      numstars: 0,
      username: '',
      hasError: false,
    };
  }

  saveNewReview = () => {
    createReview(this.props.id, this.state.text, this.state.numstars, this.state.username)
      .then((success: boolean) => {
        if (success) {
          console.log("New review created successfully");
          this.props.close();
          this.setState({text: '', numstars: 0, username: ''});
        }
        return Promise.reject("Error while creating review");
      })
      .catch((err: any) => {
        console.log("Error while creating review");
        console.log(err);
        this.setState({hasError: true});
      })
  }

  handleTextChange = (e: React.ChangeEvent) => {
    this.setState({text: (e.target as HTMLInputElement).value});
  }

  handleUsernameChange = (e: React.ChangeEvent) => {
    this.setState({username: (e.target as HTMLInputElement).value});
  }

  selectStars = (numstars: number) => {
    this.setState({numstars});
  }

  render() {
    return (
      <Container show={this.props.show}>
        <Form>
          <FormSection>
            <TextInput label="Name" value={this.state.username} onChange={this.handleUsernameChange} />
          </FormSection>
          <FormSection>
            <StarContainer>
              <StarButton
                size={40}
                color="black"
                filled={this.state.numstars > 0}
                onClick={() => this.selectStars(1)}
              />
              <StarButton size={40} color="black" filled={this.state.numstars > 1} onClick={() => this.selectStars(2)} />
              <StarButton size={40} color="black" filled={this.state.numstars > 2} onClick={() => this.selectStars(3)} />
              <StarButton size={40} color="black" filled={this.state.numstars > 3} onClick={() => this.selectStars(4)} />
              <StarButton size={40} color="black" filled={this.state.numstars > 4} onClick={() => this.selectStars(5)} />
            </StarContainer>
          </FormSection>
          <FormSection>
            <TextInput label="Text" value={this.state.text} onChange={this.handleTextChange} />
          </FormSection>
        </Form>
        <BottomBar>
          <XButton size={32} margin="0 20px 0 0" onClick={this.props.close} />
          <CheckmarkButton size={32} onClick={this.saveNewReview} />
        </BottomBar>
      </Container>
    );
  }
}

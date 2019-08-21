import * as React from 'react';
import * as config from './config.json';
import getMovies from './requests/movies';
import {Movie} from './types';
import {MovieTile} from './MovieTile';
import styled, {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    padding: 0;
    margin: 0;
    font-family: Roboto, sans-serif;
  }
`;

const GridContainer = styled.div`
  background-color: black;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

interface AppState {
  loading: boolean;
  movieData: Movie[];
  tileWidth: number;
  loadingError: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      movieData: [],
      tileWidth: 0,
      loadingError: false,
    };
    this.updateTileWidth = this.updateTileWidth.bind(this);
  }

  componentDidMount() {
    this.updateTileWidth();
    window.addEventListener('resize', this.updateTileWidth);
    getMovies()
      .then((movieData: Movie[]) => {
        this.setState({
          loading: false,
          movieData
        })
      })
      .catch((err: any) => {
        this.setState({
          loading: false,
          loadingError: true
        });
      });
  }
    
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTileWidth);
  }

  updateTileWidth() {
    const meanWidth = 250;
    const total = document.body.clientWidth;
    const numTiles = Math.floor(total / meanWidth) + 1;
    const tileWidth = total / numTiles;
    this.setState({tileWidth});
  }

  render() {
    return [
      <GlobalStyle />,
      <GridContainer>
        {this.state.movieData.map((d: Movie) => (
          <MovieTile
            key={d.id}
            src={`${config.imgBasePath}${d.poster_path}`}
            width={this.state.tileWidth}
            onClick={() => console.log(`Movie with id ${d.id} clicked.`)}
            title={d.title}
            desc={d.overview}
          />
        ))}
      </GridContainer>
    ];
  }
}

export default App;

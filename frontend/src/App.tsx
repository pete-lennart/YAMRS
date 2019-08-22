import * as React from 'react';
import getMovies from './requests/movies';
import {Movie} from './types';
import {MovieTile} from './components/MovieTile';
import styled from 'styled-components';
import {MovieInfo} from './components/MovieInfo';
import {TextButton} from './buttonsicons/helper';
import {AdminSection} from './components/AdminSection';

const imgBasePath = "https://image.tmdb.org/t/p/w500";

const AppTitleBar = styled.div`
  padding: 32px;
  box-sizing: border-box;
  height: 96px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.7);
`;

const AppTitle = styled.p`
  font-size: 32pt;
  color: white;
`;

const GridContainer = styled.div`
  padding-top: 96px;
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
  selectedID: number;
  selectedTitle: string;
  selectedDesc: string;
  showMovieInfo: boolean;
  showAdminPage: boolean;
}

class App extends React.Component<{}, AppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      loading: true,
      movieData: [],
      tileWidth: 0,
      loadingError: false,
      selectedID: 0,
      selectedTitle: '',
      selectedDesc: '',
      showMovieInfo: false,
      showAdminPage: false,
    };
  }

  componentDidMount() {
    this.updateTileWidth();
    window.addEventListener('resize', this.updateTileWidth);
    this.fetchMovies();
  }
    
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateTileWidth);
  }

  fetchMovies = () => {
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

  updateTileWidth = () => {
    const meanWidth = 250;
    const total = document.body.clientWidth;
    const numTiles = Math.floor(total / meanWidth) + 1;
    const tileWidth = total / numTiles;
    this.setState({tileWidth});
  }

  openMovieInfo = (id: number, title: string, desc: string) => {
    this.setState({
      selectedID: id,
      selectedTitle: title,
      selectedDesc: desc,
      showMovieInfo: true,
    });
  }

  closeMovieInfo = () => {
    this.setState({showMovieInfo: false});
  }

  openAdminPage = () => {
    this.setState({showAdminPage: true});
  }

  closeAdminPage = () => {
    this.setState({showAdminPage: false});
  }

  render() {
    return [
      <AppTitleBar key="1">
        <AppTitle>YAMRS</AppTitle>
        <TextButton color="white" onClick={this.openAdminPage}>Administration</TextButton>
      </AppTitleBar>,
      <GridContainer key="2">
        {this.state.movieData.map((d: Movie) => (
          <MovieTile
            key={d.id}
            src={`${imgBasePath}${d.poster_path}`}
            width={this.state.tileWidth}
            onClick={() => this.openMovieInfo(d.id, d.title, d.overview)}
            title={d.title}
            desc={d.overview}
          />
        ))}
      </GridContainer>,
      <MovieInfo
        key="3"
        id={this.state.selectedID}
        title={this.state.selectedTitle}
        desc={this.state.selectedDesc}
        show={this.state.showMovieInfo}
        close={this.closeMovieInfo}
      />,
      <AdminSection key="4" show={this.state.showAdminPage} close={this.closeAdminPage}>
        HELLO
      </AdminSection>
    ];
  }
}

export default App;

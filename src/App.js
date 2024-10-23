import SearchBar from './components/searchbar';
import Banner from './components/banner';
import GlobalStyle from './GlobalStyle';
import logo from './logo.svg';
import './output.css';
import Content from './components/content';
import Header from './components/header';

function App() {
  return (
    <div style={{ height: '100%' }} className="bg-gray-50 p-10">
      <Header />
      <SearchBar />
      <Banner image={'banner.png'} />
      <Content image={'game.png'} title={'Morning Draw'} subtitle={'Super Monday'} />
      <Banner image={'banner1.png'} />
      <Content image={'afriluck_lg.png'} title={'Evening Draw'} subtitle={'Super Monday'} />
    </div>
  );
}

export default App;

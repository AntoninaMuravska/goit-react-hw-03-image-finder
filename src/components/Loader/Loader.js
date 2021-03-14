import Loader from "react-loader-spinner";
import {Component} from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

class LoaderApp extends Component {
    render() {
      return (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      );
    }
  }

  export default LoaderApp;
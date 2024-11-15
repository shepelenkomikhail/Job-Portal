import Header from "../components/containers/Header.tsx";
import MainContent from "../components/containers/MainContent.tsx";
import Footer from "../components/containers/Footer.tsx";

export default function MainPage(){
    return(
      <div>
          <Header/>
            <MainContent/>
          <Footer/>
      </div>
    );
}
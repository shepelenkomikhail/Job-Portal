import Header from "../components/containers/Header.tsx";
import MainContent from "../components/containers/MainContent.tsx";
import Footer from "../components/containers/Footer.tsx";
import MyProvider from "../components/context/MyProvider.tsx";

export default function MainPage(){
    return(
      <div>
          <Header/>
          <MyProvider>
            <MainContent/>
          </MyProvider>
          <Footer/>
      </div>
    );
}
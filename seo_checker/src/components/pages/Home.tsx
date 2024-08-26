import '../../App.css';
import HeroSection from '../HeroSection/HeroSection';

import SEOCheck from '../../SEOCheck/SEOCheck';
import Reviews from '../Reviews/Reviews';

function Home() {
  return (
    <>
      <HeroSection />
      <SEOCheck/>
      <Reviews/>
      
    </>
  );
}

export default Home;

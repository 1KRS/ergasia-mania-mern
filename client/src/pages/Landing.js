import logo from '../assets/images/logo.svg';
import main from '../assets/images/main.svg';

const Landing = () => {
  return (
    <main>
      <nav>
        <img src={logo} alt="ErgasiaMania" className="logo" />
      </nav>
      <div className="container page">
        <div className="info">
          {/* info */}
          <h1>
            Job <span>Tracking</span> App
          </h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            in, consectetur quibusdam non doloremque odit obcaecati tenetur
            veniam debitis itaque nemo praesentium tempora asperiores, corporis
            dolores eaque! Error, tempore debitis!
          </p>
          <button className="btn btn-hero">Login/Register</button>
        </div>
      </div>
      <img src={main} alt="Job hunt" className="img main-img" />
    </main>
  );
};

export default Landing;

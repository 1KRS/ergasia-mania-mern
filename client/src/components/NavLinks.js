import { NavLink } from 'react-router-dom'; 
import links from '../utils/links';
import { useAppContext } from '../context/appContext';

const NavLinks = ({ toggleSidebar }) => {
  const { language } = useAppContext();
  return (
    <div className="nav-links">
      {links.map((link) => {
        const { textGr, textUk, textSe, path, id, icon } = link;

        return (
          <NavLink
            to={path}
            className={({ isActive }) =>
              isActive ? 'nav-link active' : 'nav-link'
            }
            key={id}
            onClick={toggleSidebar}
          >
            <span className="icon">{icon}</span>
            {language === 'english'
              ? textUk
              : language === 'svenska'
              ? textSe
              : textGr}
          </NavLink>
        );
      })}
    </div>
  );
};
export default NavLinks;

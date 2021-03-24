import { NavLink } from 'react-router-dom';
import { Navigation } from './components';

export default function Header() {
  return (
    <Navigation>
      <ul>
        <li>
          <NavLink to="/">Pokemon App</NavLink>
        </li>
        <li>
          <NavLink to="/my-pokemon">My Pokemon</NavLink>
        </li>
      </ul>
    </Navigation>
  );
}
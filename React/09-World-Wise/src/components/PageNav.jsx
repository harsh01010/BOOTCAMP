import { Link, NavLink } from "react-router-dom";

function PageNav() {
  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/pricing">Pricing</NavLink>
        </li>
        <li>
          <NavLink to="/product">product</NavLink>
        </li>
        <li>
          <Link to="/">Homepage</Link>
        </li>
      </ul>
    </nav>
  );
}

export default PageNav;

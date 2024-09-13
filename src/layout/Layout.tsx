import { Outlet, Link } from "react-router-dom";
import "../App.css";
const Layout = () => {
  return (
    <div className="mb-10">
      <nav>
        <ul className="ml-auto lg:flex lg:items-center">
          <li className="mx-5 my-2 text-slate-500 hover:text-slate-600">
            <Link to="/about">About</Link>
          </li>
          <li className="mx-5 my-2 text-slate-500 hover:text-slate-600">
            <Link to="/">XState</Link>
          </li>
          <li className="mx-5 my-2 text-slate-500 hover:text-slate-600">
            <Link to="/recursive">Recursive Component</Link>
          </li>
        </ul>
      </nav>

      <hr />

      {/* An <Outlet> renders whatever child route is currently active,
          so you can think about this <Outlet> as a placeholder for
          the child routes we defined above. */}
      <Outlet />
    </div>
  );
};

export default Layout;

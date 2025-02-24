// // Profile img issue exist
import { IconButton } from "@mui/material";
import { Search, Person, Menu } from "@mui/icons-material";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { setLogout } from "../redux/state";

const Navbar = () => {
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  console.log(user);

  return (
    <div className="navbar">
      <a href="/">
        <img src="/assets/logo.png" alt="logo" className="nav_img"/>
      </a>

      <div className="navbar_search">
        <input
          type="text"
          placeholder="Search ..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {/* Disable the search when seach box is epty ele we receiv error */}
        <IconButton disabled={search === ""}>
          <Search
            sx={{ color: "var(--pinkred)" }}
            onClick={() => {
              navigate(`/properties/search/${search}`);
            }}
          />
        </IconButton>
      </div>

      <div className="navbar_right">
        {user ? (
          <a href="/create-listing" className="host">
            Become A Host
          </a>
        ) : (
          <a href="/login" className="host">
            please login
          </a>
        )}

        <button
          className="navbar_right_account"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        >
          <Menu sx={{ color: "var(--darkgrey)" }} /> {/* Use CSS variable */}
          {!user ? (
            <Person sx={{ color: "var(--darkgrey)" }} />
          ) : (
            <img
              // src={`${import.meta.env.VITE_API_URL}/${user.profileImagePath.replace(
              //   "public",
              //   ""
              // )}`}
              src="https://cdn-icons-png.flaticon.com/128/3177/3177440.png"
              alt="profile photo"
              style={{ objectFit: "cover", borderRadius: "50%" }}
            />
          )}
        </button>

        {dropdownMenu && !user && (
          <div className="navbar_right_accountmenu">
            <Link to="/login">Log In</Link>
            <Link to="/register">Sign Up</Link>
          </div>
        )}

        {dropdownMenu && user && (
          <div className="navbar_right_accountmenu">
            <h1
              style={{
                fontSize: "20px",
                fontWeight: "bold",
                textAlign: "center",
                margin: "2px 0",
              }}
            >
              {user.firstname} {user.lastname}
            </h1>
            <Link to={`/${user._id}/trips`}>Trip List</Link>
            <Link to={`/${user._id}/wishList`}>Wish List</Link>
            <Link to={`/${user._id}/properties`}>Property List</Link>
            <Link to={`/${user._id}/reservations`}>Reservation List</Link>
            <Link to="/create-listing">Become A Host</Link>

            <Link
              to="/login"
              onClick={() => {
                dispatch(setLogout());
              }}
            >
              Log Out
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;

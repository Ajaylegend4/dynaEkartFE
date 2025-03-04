import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [navBarData, setNavBarData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNavbarData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/navbar/get");
        if (response.data && response.data.NavBarData) {
          setNavBarData(response.data.NavBarData);
        }
      } catch (err) {
        setError("Failed to fetch navigation data");
      } finally {
        setLoading(false);
      }
    };

    fetchNavbarData();
  }, []);

  if (loading) {
    return <div className="text-white text-center">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container bg-black p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-2"></div>
        <div className="col-span-8">
          <div className="flex justify-between">
            {navBarData.map((item) => (
              <NavLink
                key={item._id}
                to={item.link}
                className="text-white text-lg"
                activeClassName="text-blue-500"
              >
                {item.name}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="col-span-2"></div>
      </div>
    </div>
  );
};

export default Navbar;

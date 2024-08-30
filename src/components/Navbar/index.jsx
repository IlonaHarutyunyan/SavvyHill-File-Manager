import React from "react";
import { useNavigate } from "react-router-dom";
//styles
import "./styles.scss";
//icons
import { RiArrowGoBackLine } from "react-icons/ri";

export const Navbar = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="navbar_wrapper">
      <button onClick={handleGoBack} className="back_button">
        <RiArrowGoBackLine />
      </button>
    </div>
  );
};

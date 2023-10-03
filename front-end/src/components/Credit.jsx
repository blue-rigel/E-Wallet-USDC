import React from "react";

const Credit = () => {
  return (
    <div className="credit-card">
      <div className="card">
        <div className="card-front">
          <div className="chip"></div>
          <div className="logo mastercard"></div>
          <div className="card-number">09876543212345</div>
          <div className="card-info">
            <div className="card-holder"></div>
            <div className="card-name">Nishanthi</div>
            <div className="valid">
              <span className="valid-thru">Valid Thru</span>
              <span className="valid-date">12/24</span>
            </div>
          </div>
        </div>
        <div className="card-back">
          <div className="magnetic-stripe"></div>
          <div className="signature"></div>
        </div>
      </div>
    </div>
  );
};

export default Credit;

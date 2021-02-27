import React from "react";
import "./TileGrid.scss";

export const TileGrid = ({ children }) => {
  return (
    <div className="tile-grid">
      {children}
    </div>
  )
}
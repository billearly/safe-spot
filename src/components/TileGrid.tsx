import React, { CSSProperties } from "react";
import "./TileGrid.scss";

type TileGridProps = {
  rows: number;
  columns: number;
  children: Node[]
}

export const TileGrid = ({ children, rows, columns }: TileGridProps) => {
  const styles = {
    "--rows": rows,
    "--columns": columns
  } as CSSProperties;

  return (
    <div
      className="tile-grid"
      style={styles}
    >
      {children}
    </div>
  )
}
import React, { useState, useEffect } from "react";
import { DateTime } from "luxon";

type ScoreboardProps = {
  startDatetime: DateTime;
  spotsLeft: number;
};

export const Scoreboard = ({ startDatetime, spotsLeft }: ScoreboardProps) => {
  const [timeTaken, setTimeTaken] = useState("00:00");

  useEffect(() => {
    const timer = setInterval(() => {
      const duration = startDatetime.diffNow(["minutes", "seconds"]);
      const timeStr = duration.negate().toFormat("mm:ss");

      setTimeTaken(() => timeStr);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <p>Time Taken: {timeTaken}</p>
      <p>Spots Left: {spotsLeft}</p>
    </div>
  );
};

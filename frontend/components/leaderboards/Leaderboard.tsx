import React from "react";

interface Props {}

export const Leaderboard: React.FC<Props> = ({}) => {
  return (
    <table style={{ border: "1px solid" }}>
      <thead>
        <th style={{ border: "1px solid" }}>this will be a leaderboard</th>
      </thead>
      <tbody>
        <tr>
          <td style={{ border: "1px solid" }}>this will be a leaderboard</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td style={{ border: "1px solid" }}>this will be a leaderboard</td>
        </tr>
      </tfoot>
    </table>
  );
};

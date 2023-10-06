import React from "react";
import { getClient } from "@/lib/client";
import { GetScoresDocument } from "@/graphql/generated/graphql";

interface Props {}

export const Leaderboard: React.FC<Props> = ({}) => {
  // ??????????? why is it null
  const { data } = getClient().query({ query: GetScoresDocument });
  return (
    <>
      <table>
        <thead>
          <tr>
            <th>THIS WILL BE</th>
            <th>a leaderboard :)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>this</td>
            <td>will</td>
            <td>be a</td>
            <td>leaderboard</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <th>one day! this will become a leaderboard \(^o^)/</th>
          </tr>
        </tfoot>
      </table>
      <p>data: {JSON.stringify(data)}</p>
    </>
  );
};

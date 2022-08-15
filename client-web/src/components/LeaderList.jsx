import React from "react";
import PlayerNameView from "./PlayerNameView";

const teamStyle = {
  width: 3,
  height: 14,
  //margin: 2,
};

const itemWrapperStyleBase = {
  width: 200,
  display: "grid",
  columnGap: 4,
  rowGap: 2,
  alignItems: "center",
};

const valueStyle = {
  display: "flex",
  justifyContent: "flex-end",
};

const rootStyle = {
  display: "flex",
  flexDirection: "column",
  rowGap: 4,
  borderRadius: 4,
  backgroundColor: "var(--color-list-item-background)",
  padding: 8,
};

const LeaderList = (props) => {
  const title = props.title;
  const leaderData = props.leaderData;
  const showTeams = !!props.showTeams;

  let itemWrapperStyle = {
    ...itemWrapperStyleBase,
  };

  itemWrapperStyle.gridTemplateColumns = showTeams
    ? "3px 148px 42px"
    : "151px 42px";

  return (
    <div style={rootStyle}>
      <div className="subsection_header underline">{title}</div>
      <div style={itemWrapperStyle}>
        {leaderData.map((item) => {
          let teamsDiv = "";
          if (showTeams) {
            teamsDiv = (
              <div
                className={`${item.teamName.toLowerCase()}_team`}
                style={teamStyle}
                title={`${item.teamName} team`}
              ></div>
            );
          }

          return (
            <React.Fragment key={item.player.memberId}>
              {teamsDiv}
              <PlayerNameView player={item.player} />
              <div style={valueStyle}>{item.stat.toLocaleString()}</div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default LeaderList;

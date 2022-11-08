import { useNavigate, useParams } from "react-router-dom";
import PlayerActivityList from "./components/PlayerActivityList";
import PlayerWeaponsDetailView, {
  WEAPONS_DETAIL_GAME,
  WEAPONS_DETAIL_PLAYER,
} from "./components/PlayerWeaponsDetailView";
import PlayerMapSummaryList from "./components/PlayerMapSummaryList";
import PlayerActivitiesHeader from "./components/PlayerActivitiesHeader";

import {
  useFetchPlayerActivities,
  useFetchPlayerSummary,
} from "../../hooks/remote";

import { CharacterClassSelection, Mode, Moment, Season } from "shared";
import PlayerMedalsDetailList from "./components/PlayerMedalsDetailList";
import PlayerConfigSelectView from "../../components/PlayerConfigSelectView";
import React, { useEffect, useState } from "react";
import RefreshStatusView from "../../components/RefreshStatusView";
import {
  MOMENT_TYPE,
  SEASON_TYPE,
  PLAYER_VIEW_REFRESH_INTERVAL,
} from "../../core/consts";
import PlayerPerformanceSummaryView from "./components/PlayerPerformanceSummaryView";
import PageSectionView from "../../components/PageSectionView";
import ScreenNavigationView from "../../components/ScreenNavigationView";
import LoadingAnimationView from "../../components/LoadingAnimationView";

const { useQuery } = require("../../hooks/browser");

const gapMargin = 30;
const invalidParametersStyle = {
  padding: "var(--padding-page-container)",
  display: "flex",
  width: "100%",
  height: "100%",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  rowGap: 8,
};

const loadLatestLinkStyle = {
  marginTop: `-${gapMargin}px`,
};

const gappedStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "30px",
};

const pageContainerStyle = {
  //minWidth: "720px",
  width: "100%",
};

const itemDetailsStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: `${gapMargin}px`,
};

const pageLinks = [
  {
    value: "Overview",
    id: "overview",
  },
  {
    value: "Weapons",
    id: "weapons",
  },
  {
    value: "Meta Weapons",
    id: "meta",
  },
  {
    value: "medals",
    id: "medals",
  },
  {
    value: "maps",
    id: "maps",
  },
  {
    value: "games",
    id: "games",
  },
];

const PlayerView = () => {
  let params = useParams();
  let query = useQuery();

  let mode = Mode.fromString(params.mode);

  let startMoment;
  let endMoment;

  const momentType =
    params.momentType === MOMENT_TYPE ? MOMENT_TYPE : SEASON_TYPE;
  if (momentType === MOMENT_TYPE) {
    startMoment = Moment.fromString(params.startMoment);
    endMoment = params.endMoment
      ? Moment.fromString(params.endMoment)
      : Moment.NOW;
  } else {
    let s = Season.fromString(params.startMoment);
    startMoment = s.startMoment;
    endMoment = s.endMoment;
  }

  let classSelection = CharacterClassSelection.fromString(params.classType);
  let hash = query.get("fr");

  let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
    useFetchPlayerSummary(
      PLAYER_VIEW_REFRESH_INTERVAL,
      params.memberId,
      mode,
      startMoment,
      endMoment,
      classSelection,
      hash
    );

  let [playerActivities, isPlayerActivitiesLoading, playerActivitiesLoadError] =
    useFetchPlayerActivities(
      PLAYER_VIEW_REFRESH_INTERVAL,
      params.memberId,
      mode,
      startMoment,
      endMoment,
      classSelection,
      hash
    );

  const [lastUpdate, setLastUpdate] = useState();
  useEffect(() => {
    setLastUpdate(new Date());
  }, [playerSummary]);

  let navigate = useNavigate();
  if (
    !params.memberId ||
    !params.mode ||
    !params.startMoment ||
    !params.classType
  ) {
    const onPlayerConfigUpdate = (url) => {
      navigate(url);
    };

    return (
      <div style={invalidParametersStyle}>
        <div className="page_title">Invalid Parameters</div>
        <div>Please select Player parameters:</div>
        <div>
          <PlayerConfigSelectView onUpdate={onPlayerConfigUpdate} />
        </div>
      </div>
    );
  }

  const onLatestActivityClick = (e, memberId) => {
    e.stopPropagation();
    e.preventDefault();
    navigate(`/latest/${memberId}`);
  };

  /*
    if (profileLoadError) {
        return <div>An error occured (profileLoadError) <br />{profileLoadError.toString()}<br />{profileLoadError.stack}</div>
    }
    */

  if (playerSummaryLoadError) {
    return (
      <div style={invalidParametersStyle}>
        <div className="page_title">Error loading Activities</div>
        <div>{playerSummaryLoadError.toString()}</div>
        <div>{playerSummaryLoadError.stack}</div>
      </div>
    );
  }

  if (isPlayerActivitiesLoading || isPlayerSummaryLoading) {
    return <LoadingAnimationView message="Loading Player data." />;
  }

  let summary = playerSummary.summary;
  let weapons = summary.weapons;
  let medals = summary.medals;
  let meta = playerSummary.meta;
  let maps = playerSummary.maps;
  let player = playerSummary.player;

  let activities = playerActivities ? playerActivities.activities : [];

  mode = Mode.fromString(playerSummary.query.mode);
  startMoment = Moment.fromString(playerSummary.query.startMoment);
  classSelection = CharacterClassSelection.fromString(
    playerSummary.query.classSelection
  );

  return (
    <div id="page_nav" className="page_containter" style={pageContainerStyle}>
      <div style={gappedStyle}>
        <ScreenNavigationView links={pageLinks} />

        <div id="overview">
          <PlayerActivitiesHeader
            player={player}
            classSelection={classSelection}
            mode={mode}
            startMoment={startMoment}
            endMoment={endMoment}
            momentType={momentType}
          />
        </div>
        <RefreshStatusView
          lastUpdate={lastUpdate}
          refreshInterval={PLAYER_VIEW_REFRESH_INTERVAL}
          align="left"
        />

        <PlayerPerformanceSummaryView summary={summary} medals={medals} />

        <div style={itemDetailsStyle}>
          <div>
            {" "}
            <PageSectionView
              id="weapons"
              title="Weapons"
              description="Your weapon stats"
            />
            <PlayerWeaponsDetailView
              weapons={weapons}
              type={WEAPONS_DETAIL_GAME}
            />
          </div>
          <div>
            <PageSectionView
              id="meta"
              title="Meta Weapons"
              description="Weapon meta from your matches excluding you and your fireteam members"
            />
            <PlayerWeaponsDetailView
              weapons={meta}
              type={WEAPONS_DETAIL_PLAYER}
            />
          </div>
          <div>
            <PageSectionView
              id="medals"
              title="Medals"
              description="Medals earned in matches"
            />
            <PlayerMedalsDetailList
              medals={medals}
              activityCount={summary.activityCount}
            />
          </div>
        </div>
        <div>
          <PageSectionView
            id="maps"
            description="Stats broken down by map"
            title="Maps"
          />
          <PlayerMapSummaryList maps={maps} />
        </div>
        <PageSectionView
          description="Most recent matches"
          id="games"
          title="Games"
        />
        <div
          style={loadLatestLinkStyle}
          title="Load a page that always displays the most recent activity details"
        >
          <a
            href="void()"
            onClick={(e) => onLatestActivityClick(e, player.memberId)}
          >
            Monitor Most Recent Activity
          </a>
        </div>
        <PlayerActivityList activities={activities} summary={summary} />
      </div>
    </div>
  );
};

export default PlayerView;

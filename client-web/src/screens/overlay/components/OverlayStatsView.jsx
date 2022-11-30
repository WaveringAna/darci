import React from "react";
import OverlayStatView from "./OverlayStatView";
import Stat from "../../../core/enums/Stat";
import {
    calculateEfficiency,
    calculateKillsDeathsRatio,
    calculateRatio,
} from "shared/packages/utils";
import {
    FLOAT_FORMATTER,
    INT_FORMATTER,
    PERCENT_INT_FORMATTER,
} from "../../../core/utils/string";
import { useFetchPlayerSummary } from "../../../hooks/remote";
import { useQuery } from "../../../hooks/browser";
import { PLAYER_VIEW_REFRESH_INTERVAL } from "../../../core/consts";
import Moment from "shared/packages/enums/Moment";

const rootStyle = {
    display: "flex",
    flexDirection: "column",
    gap: 4,
};

const OverlayStatsView = (props) => {
    const stats = props.stats;
    const memberId = props.memberId;
    const mode = props.mode;
    const startMoment = props.startMoment;
    const characterClass = props.characterClass;
    const refreshInterval = props.refreshInterval
        ? props.refreshInterval
        : PLAYER_VIEW_REFRESH_INTERVAL;

    const query = useQuery();

    let [playerSummary, isPlayerSummaryLoading, playerSummaryLoadError] =
        useFetchPlayerSummary({
            refreshInterval,
            memberId,
            mode,
            startMoment,
            endMoment: Moment.NOW,
            characterClass,
            hash: query.get("fr"),
        });

    if (!playerSummary) {
        return "";
    }

    let arr = [];
    for (const s of stats) {
        let type = Stat.fromType(s);
        let label = type.label;
        let value;
        let formatter;

        switch (type) {
            case Stat.KD: {
                value = calculateKillsDeathsRatio(
                    playerSummary.summary.kills,
                    playerSummary.summary.deaths
                );
                formatter = FLOAT_FORMATTER;
                break;
            }
            case Stat.EFFICIENCY: {
                label = "Eff";
                value = calculateEfficiency(
                    playerSummary.summary.kills,
                    playerSummary.summary.deaths,
                    playerSummary.summary.assists
                );
                formatter = FLOAT_FORMATTER;
                break;
            }
            case Stat.KILLS: {
                label = playerSummary.summary.kills === 1 ? "Kills" : "Kills";
                value = playerSummary.summary.kills;
                formatter = INT_FORMATTER;

                break;
            }
            case Stat.DEATHS: {
                label = playerSummary.summary.deaths === 1 ? "Death" : "Deaths";
                value = playerSummary.summary.deaths;
                formatter = INT_FORMATTER;
                break;
            }
            case Stat.DEFEATS: {
                label =
                    playerSummary.summary.opponentsDefeated === 1
                        ? "Defeat"
                        : "Defeats";
                value = playerSummary.summary.opponentsDefeated;
                formatter = INT_FORMATTER;
                break;
            }
            case Stat.ASSISTS: {
                label =
                    playerSummary.summary.assists === 1 ? "Assist" : "Assists";
                value = playerSummary.summary.assists;
                formatter = INT_FORMATTER;
                break;
            }
            case Stat.ACTIVITY_COUNT: {
                label =
                    playerSummary.summary.activityCount === 1
                        ? "Game"
                        : "Games";
                label = "Games";
                value = playerSummary.summary.activityCount;
                formatter = INT_FORMATTER;
                break;
            }
            case Stat.WINS: {
                label = playerSummary.summary.wins === 1 ? "Win" : "Wins";
                value = playerSummary.summary.wins;
                formatter = INT_FORMATTER;
                break;
            }
            case Stat.LOSSES: {
                const losses =
                    playerSummary.summary.activityCount -
                    playerSummary.summary.wins;
                label = losses === 1 ? "Loss" : "Losses";
                value = losses;
                formatter = INT_FORMATTER;
                break;
            }
            case Stat.WIN_PERCENT: {
                label = "Win %";
                value = calculateRatio(
                    playerSummary.summary.wins,
                    playerSummary.summary.activityCount
                );
                formatter = PERCENT_INT_FORMATTER;

                break;
            }

            case Stat.KILLS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.kills,
                    playerSummary.summary.activityCount
                );
                formatter = FLOAT_FORMATTER;

                break;
            }
            case Stat.ASSISTS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.assists,
                    playerSummary.summary.activityCount
                );
                formatter = FLOAT_FORMATTER;

                break;
            }
            case Stat.DEFEATS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.opponentsDefeated,
                    playerSummary.summary.activityCount
                );
                formatter = FLOAT_FORMATTER;

                break;
            }
            case Stat.DEATHS_GAME: {
                value = calculateRatio(
                    playerSummary.summary.deaths,
                    playerSummary.summary.activityCount
                );
                formatter = FLOAT_FORMATTER;

                break;
            }
            default: {
                console.log("OverlayStatsView : Unknown Stat type:", s, type);
            }
        }
        arr.push({ label, value, formatter });
    }

    return (
        <div style={rootStyle}>
            <div className="overlay_title">{`${mode.label} (${startMoment.label})`}</div>

            <div className="overlay_list_row">
                {arr.map((item, index) => {
                    return (
                        <OverlayStatView
                            key={index}
                            label={item.label}
                            value={item.value}
                            formatter={item.formatter}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default OverlayStatsView;

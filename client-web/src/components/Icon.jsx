/* MIT License
 *
 * Copyright (c) 2022 Mike Chambers
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React from "react";

import { ReactComponent as PrecisionIcon } from "./images/precision_icon.svg";
import { ReactComponent as GrenadeIcon } from "./images/grenade_icon.svg";
import { ReactComponent as MeleeIcon } from "./images/melee_icon.svg";
import { ReactComponent as SuperIcon } from "./images/super_icon.svg";
import { ReactComponent as BlankIcon } from "./images/blank_icon.svg";
import { ReactComponent as DestinyLogo } from "./images/destiny_logo.svg";

import { ReactComponent as AboutIcon } from "./images/tabler/about_icon.svg";
import { ReactComponent as PlayerIcon } from "./images/tabler/player_icon.svg";
import { ReactComponent as LeaderboardIcon } from "./images/tabler/leaderboard_icon.svg";
import { ReactComponent as SearchIcon } from "./images/tabler/search_icon.svg";

import { ReactComponent as ChevronsDown } from "./images/tabler/chevrons-down.svg";
import { ReactComponent as ChevronsUp } from "./images/tabler/chevrons-up.svg";
import { ReactComponent as Alert } from "./images/tabler/alert-triangle.svg";

export const PRECISION_ICON = "PRECISION_ICON";
export const GRENADE_ICON = "GRENADE_ICON";
export const MELEE_ICON = "MELEE_ICON";
export const SUPER_ICON = "SUPER_ICON";
export const BLANK_ICON = "BLANK_ICON";
export const DESTINY_LOGO = "DESTINY_LOGO";

export const ABOUT_ICON = "ABOUT_ICON";
export const PLAYER_ICON = "PLAYER_ICON";
export const LEADERBOARD_ICON = "LEADERBOARD_ICON";
export const SEARCH_ICON = "SEARCH_ICON";

export const CHEVRONS_DOWN = "CHEVRONS_DOWN";
export const CHEVRONS_UP = "CHEVRONS_UP";

export const ALERT_ICON = "ALERT_ICON";

const Icon = (props) => {
    let icon = props.icon;
    let width = props.width ? props.width : 10;
    let style = props.style;
    let title = props.title ? props.title : "";

    let out;
    switch (icon) {
        case PRECISION_ICON:
            out = (
                <PrecisionIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case GRENADE_ICON:
            out = (
                <GrenadeIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case MELEE_ICON:
            out = (
                <MeleeIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case SUPER_ICON:
            out = (
                <SuperIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case DESTINY_LOGO:
            out = (
                <DestinyLogo
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case ABOUT_ICON:
            out = (
                <AboutIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case PLAYER_ICON:
            out = (
                <PlayerIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case LEADERBOARD_ICON:
            out = (
                <LeaderboardIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case SEARCH_ICON:
            out = (
                <SearchIcon
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case CHEVRONS_DOWN:
            out = (
                <ChevronsDown
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case CHEVRONS_UP:
            out = (
                <ChevronsUp
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case ALERT_ICON:
            out = (
                <Alert
                    className="pulse"
                    title={title}
                    width={width}
                    height={width}
                    style={style}
                />
            );
            break;
        case BLANK_ICON:
        //fall through
        default:
            out = <BlankIcon style={style} title={title} />;
    }

    return out;
};

export default Icon;

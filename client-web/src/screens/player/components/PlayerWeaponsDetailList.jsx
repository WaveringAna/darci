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

import React, { useState } from "react";
import { FixedSizeList as List } from "react-window";
import { AmmunitionType, ItemSubType } from "shared";
import SelectView from "../../../components/SelectView";
import { LEFT } from "../../../core/consts";
import PlayerWeaponsDetailListItem from "./PlayerWeaponsDetailListItem";

const elementStyle = {
    width: "422px",
};

const titleStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
};

const ITEM_HEIGHT = 100;
const MAX_HEIGHT = 488;

const configStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
};

const PlayerWeaponsDetailList = (props) => {
    const onSortChange = props.onSortChange;
    let weapons = props.weapons;

    const sortOptions = props.sortOptions;

    const [filterIndex, setFilterIndex] = useState(0);

    let itemKey = (index, weapons) => weapons[index].id;

    let height = ITEM_HEIGHT * weapons.length;
    if (height > MAX_HEIGHT) {
        height = MAX_HEIGHT;
    }

    const f = (type) => {
        return {
            label: type.label,
            filter: (item) => item.weapon.itemSubType === type,
        };
    };
    const filterOptions = [
        {
            label: "All",
            filter: () => {
                return true;
            },
        },
        { label: "----", filter: (item) => true },
        {
            label: "Primary",
            filter: (item) =>
                item.weapon.ammunitionType === AmmunitionType.PRIMARY,
        },
        {
            label: "Special",
            filter: (item) =>
                item.weapon.ammunitionType === AmmunitionType.SPECIAL,
        },
        {
            label: "Heavy",
            filter: (item) =>
                item.weapon.ammunitionType === AmmunitionType.HEAVY,
        },

        //the space is intentional.
        //a hack as the label is used at the key. probably should fix this.
        { label: "---- ", filter: (item) => true },

        f(ItemSubType.AUTO_RIFLE),
        f(ItemSubType.BOW),
        f(ItemSubType.FUSION_RIFLE),
        f(ItemSubType.GLAIVE),
        f(ItemSubType.GRENADE_LAUNCHER),
        f(ItemSubType.HAND_CANNON),
        f(ItemSubType.LINEAR_FUSION_RIFLE),
        f(ItemSubType.MACHINE_GUN),
        f(ItemSubType.PULSE_RIFLE),
        f(ItemSubType.ROCKET_LAUNCHER),
        f(ItemSubType.SCOUT_RIFLE),
        f(ItemSubType.SHOTGUN),
        f(ItemSubType.SIDEARM),
        f(ItemSubType.SNIPER_RIFLE),
        f(ItemSubType.SUBMACHINE_GUN),
        f(ItemSubType.SWORD),
        f(ItemSubType.TRACE_RIFLE),
    ];

    const onFilterChange = (item, index) => {
        setFilterIndex(index);
    };

    weapons = weapons.filter(filterOptions[filterIndex].filter);

    return (
        <div style={elementStyle}>
            <div style={configStyle}>
                <SelectView
                    onChange={onFilterChange}
                    options={filterOptions}
                    align={LEFT}
                />
                <SelectView onChange={onSortChange} options={sortOptions} />
            </div>
            <List
                height={height}
                width={422}
                itemData={weapons}
                itemCount={weapons.length}
                itemSize={ITEM_HEIGHT}
                itemKey={itemKey}
            >
                {PlayerWeaponsDetailListItem}
            </List>
        </div>
    );
};

export default PlayerWeaponsDetailList;

import React from "react";
import SwatchView from "../../../components/SwatchView";

export const CARD_WIN = "CARD_WIN";
export const CARD_EMPTY = "CARD_EMPTY";
export const CARD_NO_FLAWLESS = "CARD_NO_FLAWLESS";
export const CARD_FLAWLESS = "CARD_FLAWLESS";

const SIDE = 12;
const CardSwatchView = (props) => {
    const type = props.type;

    let div;
    switch (type) {
        case CARD_WIN: {
            div = (
                <SwatchView
                    width={SIDE}
                    height={SIDE}
                    color="yellow"
                    border="white"
                />
            );
            break;
        }
        case CARD_FLAWLESS: {
            div = (
                <SwatchView
                    width={SIDE}
                    height={SIDE}
                    color="yellow"
                    border="white"
                />
            );
            break;
        }
        case CARD_NO_FLAWLESS: {
            div = (
                <SwatchView
                    width={SIDE}
                    height={SIDE}
                    color="red"
                    border="white"
                />
            );
            break;
        }
        default: {
            div = <SwatchView width={SIDE} height={SIDE} borderColor="white" />;
        }
    }

    return div;
};

export default CardSwatchView;

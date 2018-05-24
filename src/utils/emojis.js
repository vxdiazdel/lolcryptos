export const emojis = [
    "😊",
    "😁",
    "😋",
    "😍",
    "🤑",
    "😐",
    "🙁",
    "😬",
    "😤",
    "🤢",
    "🔮",
    "👻",
    "💀",
    "💥",
    "🌛",
    "🔥",
    "💩",
    "✨",
    "🌈",
    "🚀",
    "💃",
    "🎉",
    "💰",
    "🌌",
    "🌍",
    "🚲",
    "🐱",
    "🐶",
    "🚂",
    "🍺",
    "🍭",
    "🍕",
    "🍟",
    "🌕",
    "⛺️",
    "🗻",
    "💸",
    "👌",
    "🍑",
    "💵",
    "💴",
    "💶",
    "💷",
    "💣",
    "💯"
];

export const resultEmojis = {
    plusOne: "😊",
    plusTwo: "😁",
    plusThree: "😍",
    plusFour: "🤑",
    plusFive: "🚀",
    noChange: "😐",
    minusOne: "🙄",
    minusTwo: "🙁",
    minusThree: "😥",
    minusFour: "😨",
    minusFive: "🚲"
};

export const findEmoji = percent => {
    if (percent <= -40) {
        return resultEmojis.minusFive;
    } else if (percent > -40 && percent <= -30) {
        return resultEmojis.minusFour;
    } else if (percent > -30 && percent <= -20) {
        return resultEmojis.minusThree;
    } else if (percent > -20 && percent <= -10) {
        return resultEmojis.minusTwo;
    } else if (percent > -10 && percent < 0) {
        return resultEmojis.minusOne;
    } else if (percent > 0 && percent < 10) {
        return resultEmojis.plusOne;
    } else if (percent >= 10 && percent < 20) {
        return resultEmojis.plusTwo;
    } else if (percent >= 20 && percent < 30) {
        return resultEmojis.plusThree;
    } else if (percent >= 30 && percent < 40) {
        return resultEmojis.plusFour;
    } else if (percent >= 40) {
        return resultEmojis.plusFive;
    }
    return resultEmojis.noChange;
};

export const isPositive = percent => percent > 0;

export const loadEmojis = arr => {
    setInterval(() => {
        return arr[Math.floor(Math.random() * arr.length)];
    }, 150);
};

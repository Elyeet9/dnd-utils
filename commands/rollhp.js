// A command that returns a Dsicord message of a DnD HP roll
// the message should be like this: rollhp dX Y (X is the number of dice, Y is the aamount of levels)
function rollHP(dice, levelCount, constitution) {
    let message = '**Rolleando HP**\n';
    const half = Math.floor(dice / 2);
    let total = 0;
    for (let i = 0; i < levelCount-1; i++) {
        // Get rolls until they are greater than 2
        let roll = Math.floor(Math.random() * dice) + 1;
        let num_fails = 0;
        while (roll <= 2) {
            num_fails++;
            roll = Math.floor(Math.random() * dice) + 1;
        }
        total += roll;

        // Generate aa message with the rolls
        message += `1d${dice}: \`${roll}\``;
        if (roll <= half) {
            message += ' 😅 ';
        } else {
            message += ' 😎 ';
        }

        // Add joke if it has fails
        if (num_fails > 1) {
            message += ` *(rolleaste \`${num_fails}\` veces 1 o 2 🫵🤣)*`;
        } if (num_fails === 1) {
            message += ` *(rolleaste \`${num_fails}\` vez 1 o 2 🫵🤣)*`;
        }
        message += '\n';
    }

    let final_hp = dice + total;
    if (constitution > 0) {
        const con_hp = constitution * levelCount;
        final_hp += con_hp;
        return message + `Total: ${dice} (lvl 1) + ${total} (Rolls) + ${con_hp} (CON) = \`${final_hp}\``;
    }
    return message + `Total: ${dice} (lvl 1) + ${total} (Rolls) = \`${final_hp}\``;
};

module.exports = rollHP;
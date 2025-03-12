// A command that returns a Discord message of a DnD stat roll

function rollStats() {
    let final_message = '**Rolleando stats (min 70)**\n';
    let message = '';
    const stats = [];
    let total = 0;
    while (total < 70) {
        message = '';
        stats.length = 0;
        total = 0;
        for (let i = 0; i < 6; i++) {
            message += '4d6kh3: ';
            const rolls = [];
            for (let j = 0; j < 4; j++) {
                rolls.push(Math.floor(Math.random() * 6) + 1);
            }
            
            message += '(';
            // add the numbers to the message separated by commas and add ~~ around the lowest number
            message += rolls.map((roll, index) => {
                let number = roll.toString();
                if (number === '6' || number === '1') {
                    number = `**${number}**`;
                }
                if (index === rolls.indexOf(Math.min(...rolls))) {
                    return `~~${roll}~~`;
                }
                return number;
            }).join(', ');
            message += ')';
    
            // get the sum of the stats, minus the lowest
            const sum = rolls.reduce((acc, val) => acc + val, 0) - Math.min(...rolls);
            stats.push(sum);
            total += sum;
            message += ` = \`${sum}\``;
            message += '\n';
        }
        if (total < 70) {
            // Send a message with the stats rolled encased in ` and separated by commas
            final_message += `> Rolleaste \`${total}\` (${stats.map(stat => `\`${stat}\``).join(', ')}) 🫵🤣\n`;
        }
        message += `Total: \`${total}\``;
        
        // add a emoji at the end if 70-80, 80-90, 90+
        if (total >= 70 && total < 80) {
            message += ' 😅';
        } else if (total >= 80 && total < 90) {
            message += ' 😎';
        } else if (total >= 90) {
            message += ' 🤯';
        }
    }
    final_message += message;
    return final_message;
}

module.exports = rollStats;
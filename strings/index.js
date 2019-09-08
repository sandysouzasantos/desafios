function styleMyString(limit, myString) {
    myString = myString.trim();
    const wordsArray = myString.split(/[\s\n\t]/);
    let result = '';
    let line = wordsArray[0];
    for (let i = 1; i < wordsArray.length; i += 1) {
        if ((line + ' ' + wordsArray[i]).length <= limit) {
            if (wordsArray[i].length === 0) {
                result += line + '\n';
                line = '';
                continue;
            }
            line = (line !== '' ? line + ' ' : '') + wordsArray[i];
        } else {
            result += line + '\n';
            line = wordsArray[i];
        }
    }
    result += line + '\n';

    let lineBreakPositions = [];
    let position = myString.indexOf('\n\n');
    while (position !== -1) {
        lineBreakPositions.push(position);
        position = myString.indexOf('\n\n', position + 1);
    }

    const characters = result.split('');
    for (let i = 0; i < lineBreakPositions.length; i++) {
        characters.splice(lineBreakPositions[i], 0, '\n');
    }
    result = characters.join('');

    const lines = result.split("\n");
    let justifiedResult = '';
    for (let i = 0; i < lines.length; i++) {
        justifiedResult += justify(lines[i], limit) + '\n';
    }
    return justifiedResult;
}

function justify(line, limit) {
    if (line.length === 0) {
        return line;
    }
    let missingSpaces = limit - line.length;
    const words = line.split(' ');

    while (missingSpaces > 0) {
        for (let i = 0; i < words.length - 1; i++) {
            words[i] += ' ';
            missingSpaces--;
            if (missingSpaces <= 0) {
                break;
            }
        }
    }

    return words.join(' ');
}

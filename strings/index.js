function styleMyString(limit, myString) {
    const charactersArray = myString.split(/[\s\n]/);

    let result = '';

    let line = charactersArray[0];

    for (let i = 1; i < charactersArray.length; i += 1) {
        if ((line + ' ' + charactersArray[i]).length <= limit) {
            line = line + ' ' + charactersArray[i];
        } else {
            result += line + '\n';
            line = charactersArray[i];
        }
    }

    result += line + '\n';

    let lineBreakPositions = [];

    let position = myString.indexOf('\n\n');
    while(position !== -1) {
        lineBreakPositions.push(position);
        position = myString.indexOf('\n\n', position+1);
    }

    const characters = result.split('');
    for(let i = 0; i < lineBreakPositions.length; i++){
        characters.splice(lineBreakPositions[i], 0, '\n');
    }

    return characters.join('');
}

styleMyString(40, "In the beginning God created the heavens and the earth. Now the earth was formless and empty, darkness was over the surface of the deep, and the Spirit of God was hovering over the waters.\n" +
    "\n" +
    "And God said, \"Let there be light,\" and there was light. God saw that the light was good, and he separated the light from the darkness. God called the light \"day,\" and the darkness he called \"night.\" And there was evening, and there was morning - the first day.");
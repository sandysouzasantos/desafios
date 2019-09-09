function styleMyString(limit, myString) {
    myString = myString.trim();
    const wordsArray = myString.split(/[\s\n\t]/);
    let result = '';
    let line = wordsArray[0];

    // Para cada palavra do array, adicioná-la em 'line' até o limite de caracteres.
    for (let i = 1; i < wordsArray.length; i += 1) {
        if ((line + ' ' + wordsArray[i]).length <= limit) {
            // Caso ocorra de algum elemento do array ser vazio, finalizar a linha atual e começar uma nova.
            if (wordsArray[i].length === 0) {
                result += line + '\n';
                line = '';
                continue;
            }
            // Verifica se 'line' é vazia antes de adicionar uma nova palavra para evitar espaços no início da frase.
            line = (line !== '' ? line + ' ' : '') + wordsArray[i];
        } else {
            // Tendo 'line' alcançado o máximo de caracteres sem quebrar nenhuma palavra, ela é salva e uma nova 'line' é iniciada.
            result += line + '\n';
            line = wordsArray[i];
        }
    }
    // Como a última 'line' não entra na hipótese do 'else' e o loop já acabou porque não há mais palavras, salva-se ela no final.
    result += line + '\n';

    // Aqui busca-se a posição a linha vazia na string original para readicioná-la à string.
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

    // Para justificar a nova string, crias-se um novo array com as frases e se chama a função 'justify' para cada uma delas.
    const lines = result.split("\n");
    let justifiedResult = '';
    for (let i = 0; i < lines.length; i++) {
        justifiedResult += justify(lines[i], limit) + '\n';
    }
    return justifiedResult;
}

function justify(line, limit) {
    if (line.trim().length === 0) {
        return line;
    }

    const words = line.split(' ');
    // Se a linha contém apenas uma palavra, ela é retornada.
    if (words.length < 2) {
        return line;
    }

    let missingSpaces = limit - line.length;

    // Enquanto for possível acrescentar espaços à string, um espaço será adicionado ao final de cada palavra com exceção da última.
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

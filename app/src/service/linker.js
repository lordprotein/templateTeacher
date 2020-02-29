import cyrillicToTranslit from 'cyrillic-to-translit-js';


const linker = word => {
    word = `/${(cyrillicToTranslit().transform(word, '_')).toLowerCase()}`;
    let link = '';

    const wordLength = word.length;

    for (let i = 0; i < wordLength; i++) {
        const prevLetter = word[i - 1];
        const letter = word[i];

        if (letter === '_' && prevLetter === '_') continue;

        link += letter;
    }

    return link;
}



export default linker;
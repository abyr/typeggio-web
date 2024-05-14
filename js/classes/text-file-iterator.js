async function* makeTextFileLineIterator(fileURL) {
    const utf8Decoder = new TextDecoder('utf-8'),
        response = await fetch(fileURL),
        reader = response.body.getReader();

    let {
        value: chunk,
        done: readerDone
    } = await reader.read();

    chunk = chunk ? utf8Decoder.decode(chunk) : '';

    const re = /\n|\r|\r\n/gm;
    let startIndex = 0;

    for (; ;) {
        let result = re.exec(chunk);

        if (!result) {
            if (readerDone) {
                break;
            }

            let remainder = chunk.substr(startIndex);

            ({ value: chunk, done: readerDone } = await reader.read());

            chunk = remainder + (chunk ? utf8Decoder.decode(chunk) : '');
            startIndex = re.lastIndex = 0;

            continue;
        }

        yield chunk.substring(startIndex, result.index);
        startIndex = re.lastIndex;
    }

    if (startIndex < chunk.length) {
        yield chunk.substr(startIndex);
    }
}

export default {
    makeTextFileLineIterator
};
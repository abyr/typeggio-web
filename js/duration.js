export default {

    msToReadableTime: ms => {
        var min = Math.floor(ms / 60000);
        var sec = ((ms % 60000) / 1000).toFixed(0);

        return min + ":" + (sec < 10 ? '0' : '') + sec;
      }
};

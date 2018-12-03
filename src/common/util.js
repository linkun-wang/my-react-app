class Util {
    getQueryString = (str, name) => {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        const r = str.match(reg);
        return r ? unescape(r[2]) : null;
    };

    formatErrorMsg = (error) => {
        switch (error.status) {
            case 404:
                return 'Your request has gone with wind~~';
            case 403:
                return 'Your request has been rejected...';
            case 503:
                return 'The system is busy, you can try again later~~';
            default:
                return error.status
        }
    };

    /**
     * @param num
     * @returns {string}
     * Description: Add '0' before a number, such as: 2015/7/4 1:3:1 => 2015/07/04 01:03:01
     */
    addZero = (num) => {
        return num < 10 ? '0'+num : num
    };

    /**
     * @param time
     * @returns {string}
     * Description: Format the time to style which we want such as '2015/07/04 01:03:01'
     */
    formatTime = (time) => {
        let GMTTime = new Date(time);
        let year = GMTTime.getFullYear();
        let month = this.addZero(GMTTime.getMonth()+1);
        let date = this.addZero(GMTTime.getDate());
        let hour = this.addZero(GMTTime.getHours());
        let minutes = this.addZero(GMTTime.getMinutes());
        let seconds = this.addZero(GMTTime.getSeconds());
        return year + '/' + month + '/' + date + ' ' + hour + ':' + minutes + ':' + seconds
    }
}

export default new Util;

class Util {
    constant = {
        LIMIT: 7, // 每页数量
        MAP_KEY: 'caccd696b2aef003ebbf0cfc9167dce5'
    };

    URL = {
        get_starred: 'https://api.github.com/users/linkun-wang/starred',
        get_issues: 'https://api.github.com/repos/linkun-wang/my-app/issues?state=all',
    };

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
                return 'API rate limit exceeded for 116.66.184.191. (But here\'s the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)';
            case 503:
                return 'The system is busy, you can try again later~~';
            default:
                return error.statusText
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
    };

    /**
     * parse params: { per_page:10,page:1 } ==> ?per_page=10&page=1
     * @param data
     * @param key
     * @param encode
     * @param index
     * @returns {string}
     */
    parseParam = (data, key, encode, index) => {
        if( data == null ) return '';
        let paramStr = '';
        let t = typeof (data);
        if (t === 'string' || t === 'number' || t === 'boolean') {
            paramStr += (index > 0 ? '&' : '') + key + '=' + ((encode == null||encode) ? encodeURIComponent(data) : data);
        } else {
            let keyArr = Object.keys(data);
            for (let i in data) {
                let k = key == null ? i : key + (data instanceof Array ? '[' + i + ']' : '.' + i);
                paramStr += this.parseParam(data[i], k, encode, keyArr.indexOf(i));
            }
        }
        return paramStr;
    }
}

export default new Util();

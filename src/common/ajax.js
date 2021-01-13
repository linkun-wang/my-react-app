import Util from './util';

let ajaxQueue = {};
let total = 0, link = undefined;
const LIMIT = Util.constant.LIMIT;

class Ajax {

    reject = (response) => Promise.reject(response);

    getTotal = (link) => {
        let totalPages = 0;
        let str = link.split(',').find(s => s.indexOf('rel="last"') > -1);
        if(str) {
            totalPages = Util.getQueryString(str.split(';')[0].slice(1, -1), 'page');
        } else {
            str = link.split(',').find(s => s.indexOf('rel="prev"') > -1);
            if(str) {
                totalPages = Util.getQueryString(str.split(';')[0].slice(1, -1), 'page') * 1 + 1;
            }
        }
        return totalPages * LIMIT
    };

    statusVerify = (response) => {
        if(response.status >= 200 && response.status < 300 ){
            link = response.headers.get('link');
            return Promise.resolve(response.json());
        } else {
            return Promise.reject(response);
        }
    };

    // 重新封装fetch函数 ==> 如果timeout存在，则超时后可中断请求
    fetch = (url,data,timeout) => {
        let abortFn = null;
        let fetchPromise = fetch(url, data);
        let abortPromise = new Promise((resolve, reject) => {
            abortFn = () => { reject(url) }
        });
        //Promise.race ==> 参数数组中的两个promise对象赛跑，那个跑的快就返回那个结果
        let _fetch = Promise.race([fetchPromise, abortPromise]);
        _fetch.abort = abortFn;
        if (timeout) {
            setTimeout(() => {
                abortFn();
            }, timeout);
        }
        return _fetch
    };

    get = (url, data, timeout) => {
        let _this = this;
        let _param = data && Object.keys(data).length > 0 ? '?'+ Util.parseParam(data):'';
        let fetch = timeout ? this.fetch : window.fetch;
        ajaxQueue[url] = fetch(url+_param,{
            method: 'GET',
            headers: {
                'Authorization': 'Basic YWxmYWx...',
            }
        });
        return ajaxQueue[url].then(this.statusVerify, this.reject).then( data => {
            total = 0;
            if (link) total = _this.getTotal(link);
            return { total: total || data.length, data: data }
        });
    };

    post = (url, data, timeout) => {
        let _data = JSON.stringify(data);
        let fetch = timeout ? this.fetch : window.fetch;
        ajaxQueue[url] = fetch(url,{
            method: 'POST',
            headers: {
                'Authorization': 'Basic YWxmYWx...',
            },
            body: _data
        }, timeout);
        return ajaxQueue[url].then(this.statusVerify, this.reject);
    };

    // 终止请求
    abort = (url) => {
        if (url && ajaxQueue[url]) {
            ajaxQueue[url].abort();
        } else {
            for (let url in ajaxQueue) {
                ajaxQueue[url] && ajaxQueue[url].abort && ajaxQueue[url].abort();
            }
        }
    }

}
export default new Ajax();

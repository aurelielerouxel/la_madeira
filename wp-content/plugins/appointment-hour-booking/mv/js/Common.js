(function($) {
    $.cpeoplebrowser = {};
    uaMatch= function(ua) {
            var ret = { browser: "" };

            ua = ua.toLowerCase();

            if (/webkit/.test(ua)) {
                ret = { browser: "webkit", version: /webkit[\/ ]([\w.]+)/ };

            } else if (/opera/.test(ua)) {
                ret = { browser: "opera", version: /version/.test(ua) ? /version[\/ ]([\w.]+)/ : /opera[\/ ]([\w.]+)/ };

            } else if (/msie/.test(ua)) {
                ret = { browser: "msie", version: /msie ([\w.]+)/ };

            } else if (/mozilla/.test(ua) && !/compatible/.test(ua)) {
                ret = { browser: "mozilla", version: /rv:([\w.]+)/ };
            }

            ret.version = (ret.version && ret.version.exec(ua) || [0, "0"])[1];

            return ret;
        };
    browserMatch = uaMatch(navigator.userAgent);
    if (browserMatch.browser) {
        $.cpeoplebrowser[browserMatch.browser] = true;
        $.cpeoplebrowser.version = browserMatch.version;
    }

    // Deprecated, use jQuery.browser.webkit instead
    if ($.cpeoplebrowser.webkit) {
        $.cpeoplebrowser.safari = true;
    }
})(jQuery);
try { document.execCommand("BackgroundImageCache", false, true); } catch (e) { }
var popUpWin;
function PopUpCenterWindow(URLStr, width, height, newWin, scrollbars) {
    var popUpWin = 0;
    if (typeof (newWin) == "undefined") {
        newWin = false;
    }
    if (typeof (scrollbars) == "undefined") {
        scrollbars = 0;
    }
    if (typeof (width) == "undefined") {
        width = 800;
    }
    if (typeof (height) == "undefined") {
        height = 600;
    }
    var left = 0;
    var top = 0;
    if (screen.width >= width) {
        left = Math.floor((screen.width - width) / 2);
    }
    if (screen.height >= height) {
        top = Math.floor((screen.height - height) / 2);
    }
    if (newWin) {
        open(URLStr, '', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=' + scrollbars + ',resizable=yes,copyhistory=yes,width=' + width + ',height=' + height + ',left=' + left + ', top=' + top + ',screenX=' + left + ',screenY=' + top + '');
        return;
    }

    if (popUpWin) {
        if (!popUpWin.closed) popUpWin.close();
    }
    popUpWin = open(URLStr, 'popUpWin', 'toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=' + scrollbars + ',resizable=yes,copyhistory=yes,width=' + width + ',height=' + height + ',left=' + left + ', top=' + top + ',screenX=' + left + ',screenY=' + top + '');
    popUpWin.focus();
}

function OpenModelWindow(url, option) {
    var fun;
    try {
        if (parent != null && parent.$ != null && parent.$.ShowIfrmDailog != undefined) {
            fun = parent.$.ShowIfrmDailog
        }
        else {
            fun = $.ShowIfrmDailog;
        }
    }
    catch (e) {
        fun = $.ShowIfrmDailog;
    }
    
    fun(url, option);
}
function CloseModelWindow(callback, dooptioncallback) {
    parent.$.closeIfrm(callback, dooptioncallback);
}
function fomartTimeAMPM(h,m,__MilitaryTime) {
    if (__MilitaryTime)
        var tmp = ((h < 10)  ? "0" : "") + h + ":" + ((m < 10)?"0":"") + m  ;
    else
    {
        var tmp = ((h%12) < 10) && h!=12 ? "0" + (h%12)  : (h==12?"12":(h%12))  ;
        tmp += ":" + ((m < 10)?"0":"") + m + ((h>=12)?"pm":"am");
        
    }
    return tmp ;        
}

function StrFormat(temp, dataarry) {
    return temp.replace(/\{([\d]+)\}/g, function(s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { if (s instanceof (Date)) { return (s.getMonth()+1)+"/"+s.getDate()+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes() } else { return encodeURIComponent(s) } } else { return "" } });
}
function StrFormatNoEncode(temp, dataarry) {
    return temp.replace(/\{([\d]+)\}/g, function(s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { if (s instanceof (Date)) { return (s.getMonth()+1)+"/"+s.getDate()+"/"+s.getFullYear()+" "+s.getHours()+":"+s.getMinutes() } else { return (s); } } else { return ""; } });
}
function getiev($) {
    var userAgent = window.navigator.userAgent.toLowerCase();
    $.cpeoplebrowser.msie8 = $.cpeoplebrowser.msie && /msie 8\.0/i.test(userAgent);
    $.cpeoplebrowser.msie7 = $.cpeoplebrowser.msie && /msie 7\.0/i.test(userAgent);
    $.cpeoplebrowser.msie6 = !$.cpeoplebrowser.msie8 && !$.cpeoplebrowser.msie7 && $.cpeoplebrowser.msie && /msie 6\.0/i.test(userAgent);
    var v;
    if ($.cpeoplebrowser.msie8) {
        v = 8;
    }
    else if ($.cpeoplebrowser.msie7) {
        v = 7;
    }
    else if ($.cpeoplebrowser.msie6) {
        v = 6;
    }
    else { v = -1; }
    return v;
}
jQuery(document).ready(function($) {
    var v = getiev($);
    if (v > 0) {
        $(document.body).addClass("ie ie" + v);
    }

});

/**
  * @description {Class} wdCalendar
  * This is the main class of wdCalendar.
  */
; (function($) {
    var __WDAY = new Array(i18n.dcmvcal.dateformat.sun, i18n.dcmvcal.dateformat.mon, i18n.dcmvcal.dateformat.tue, i18n.dcmvcal.dateformat.wed, i18n.dcmvcal.dateformat.thu, i18n.dcmvcal.dateformat.fri, i18n.dcmvcal.dateformat.sat);
    var __WDAYLarge = new Array(i18n.dcmvcal.dateformat.sunday, i18n.dcmvcal.dateformat.monday, i18n.dcmvcal.dateformat.tuesday, i18n.dcmvcal.dateformat.wednesday, i18n.dcmvcal.dateformat.thursday, i18n.dcmvcal.dateformat.friday, i18n.dcmvcal.dateformat.saturday);
    var __WDAY2 = new Array(i18n.dcmvcal.dateformat.sun2, i18n.dcmvcal.dateformat.mon2, i18n.dcmvcal.dateformat.tue2, i18n.dcmvcal.dateformat.wed2, i18n.dcmvcal.dateformat.thu2, i18n.dcmvcal.dateformat.fri2, i18n.dcmvcal.dateformat.sat2);
    var __MonthName = new Array(i18n.dcmvcal.dateformat.jan, i18n.dcmvcal.dateformat.feb, i18n.dcmvcal.dateformat.mar, i18n.dcmvcal.dateformat.apr, i18n.dcmvcal.dateformat.may, i18n.dcmvcal.dateformat.jun, i18n.dcmvcal.dateformat.jul, i18n.dcmvcal.dateformat.aug, i18n.dcmvcal.dateformat.sep, i18n.dcmvcal.dateformat.oct, i18n.dcmvcal.dateformat.nov, i18n.dcmvcal.dateformat.dec);
    var __MonthNameLarge = new Array(i18n.dcmvcal.dateformat.l_jan, i18n.dcmvcal.dateformat.l_feb, i18n.dcmvcal.dateformat.l_mar, i18n.dcmvcal.dateformat.l_apr, i18n.dcmvcal.dateformat.l_may, i18n.dcmvcal.dateformat.l_jun, i18n.dcmvcal.dateformat.l_jul, i18n.dcmvcal.dateformat.l_aug, i18n.dcmvcal.dateformat.l_sep, i18n.dcmvcal.dateformat.l_oct, i18n.dcmvcal.dateformat.l_nov, i18n.dcmvcal.dateformat.l_dec);
    var __MilitaryTime = true;
    var __TheContainer = "";
    var arrs = new Array
    arrs[i18n.dcmvcal.dateformat.year_index] = "yyyy";
    arrs[i18n.dcmvcal.dateformat.month_index] = "M";
    arrs[i18n.dcmvcal.dateformat.day_index] = "d";
    i18n.dcmvcal.dateformat.fulldayvalue = arrs.join(i18n.dcmvcal.dateformat.separator);  
    var dialogUnBlur = function()
    {
        unBlur();
        $('body').click(unBlur);
        $('.ui-button').off('focus');
        function unBlur() {
            $('.ui-button').blur();  
        }
    }
    if (!Clone || typeof (Clone) != "function") {
        var Clone = function(obj) {
            var objClone = new Object();
            if (obj.constructor == Object) {
                objClone = new obj.constructor();
            } else {
                objClone = new obj.constructor(obj.valueOf());
            }
            for (var key in obj) {
                if (objClone[key] != obj[key]) {
                    if (typeof (obj[key]) == 'object') {
                        objClone[key] = Clone(obj[key]);
                    } else {
                        objClone[key] = obj[key];
                    }
                }
            }
            objClone.toString = obj.toString;
            objClone.valueOf = obj.valueOf;
            return objClone;
        }
    }
    if (!dateFormat || typeof (dateFormat) != "function") {
        var dateFormat = function(format) {
            var o = {
                "M+": this.getMonth() + 1,
                "d+": this.getDate(),
                "h+": this.getHours(),
                "H+": this.getHours(),
                "m+": this.getMinutes(),
                "s+": this.getSeconds(),
                "q+": Math.floor((this.getMonth() + 3) / 3),
                "w": "0123456".indexOf(this.getDay()),
                "W": __WDAY[this.getDay()],
                "L": __MonthName[this.getMonth()] //non-standard
            };
            if (/(y+)/.test(format)) {
                format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            var format1 = format;
            for (var k in o) {
                if ((new RegExp("(" + k + ")").test(format)) && (new RegExp("(" + k + ")").test(format1)))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
            return format;
        };
    }
    if (!DateAdd || typeof (DateDiff) != "function") {
        var DateAdd = function(interval, number, idate) {
            number = parseInt(number);
            var date;
            if (typeof (idate) == "string") {
                date = idate.split(/\D/);
                eval("var date = new Date(" + date.join(",") + ")");
            }

            if (typeof (idate) == "object") {
                date = new Date(idate.toString());
            }
            switch (interval) {
                case "y": date.setFullYear(date.getFullYear() + number); break;
                case "m": date.setMonth(date.getMonth() + number); break;
                case "d": date.setDate(date.getDate() + number); break;
                case "w": date.setDate(date.getDate() + 7 * number); break;
                case "h": date.setHours(date.getHours() + number); break;
                case "n": date.setMinutes(date.getMinutes() + number); break;
                case "s": date.setSeconds(date.getSeconds() + number); break;
                case "l": date.setMilliseconds(date.getMilliseconds() + number); break;
            }
            return date;
        }
    }
    if (!DateDiff || typeof (DateDiff) != "function") {
        var DateDiff = function(interval, d1, d2) {
            switch (interval) {
                case "d": //date
                case "w":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
                    break;  //w
                case "h":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours());
                    break; //h
                case "n":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes());
                    break;
                case "s":
                    d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate(), d1.getHours(), d1.getMinutes(), d1.getSeconds());
                    d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate(), d2.getHours(), d2.getMinutes(), d2.getSeconds());
                    break;
            }
            var t1 = d1.getTime(), t2 = d2.getTime();
            var diff = NaN;
            switch (interval) {
                case "y": diff = d2.getFullYear() - d1.getFullYear(); break; //y
                case "m": diff = (d2.getFullYear() - d1.getFullYear()) * 12 + d2.getMonth() - d1.getMonth(); break;    //m
                case "d": diff = Math.floor(t2 / 86400000) - Math.floor(t1 / 86400000); break;
                case "w": diff = Math.floor((t2 + 345600000) / (604800000)) - Math.floor((t1 + 345600000) / (604800000)); break; //w
                case "h": diff = Math.floor(t2 / 3600000) - Math.floor(t1 / 3600000); break; //h
                case "n": diff = Math.floor(t2 / 60000) - Math.floor(t1 / 60000); break; //
                case "s": diff = Math.floor(t2 / 1000) - Math.floor(t1 / 1000); break; //s
                case "l": diff = t2 - t1; break;
            }
            return diff;

        }
    }
    if ($.fn.noSelect == undefined) {
        $.fn.noSelect = function(p) { //no select plugin by me :-)
            if (p == null)
                prevent = true;
            else
                prevent = p;
            if (prevent) {
                return this.each(function() {
                    if ($.browser.msie || $.browser.safari) $(this).bind('selectstart', function(e) { return false; });
                    else if ($.browser.mozilla) {
                        $(this).css('MozUserSelect', 'none');
                        $('body').trigger('focus');
                    }
                    else if ($.browser.opera) $(this).bind('mousedown', function(e) { e.stopPropagation(); });
                    else $(this).attr('unselectable', 'on');
                });

            } else {
                return this.each(function() {
                    if ($.browser.msie || $.browser.safari) $(this).unbind('selectstart');
                    else if ($.browser.mozilla) $(this).css('MozUserSelect', 'inherit');
                    else if ($.browser.opera) $(this).unbind('mousedown');
                    else $(this).removeAttr('unselectable', 'on');
                });

            }
        }; //end noSelect
    }
    $.fn.bcalendar = function(option) {
        var def = {
            newWidthGroup:0,
            newWidthGroupCalculate:false,
            list_eventsPerPage:0,
            currentlist:{dend:"",idend:0},
            cachepages:new Array(),
            lastdate : "",
            page:0,
            numberOfMonths : 12,
            /**
             * @description {Config} view
             * {String} Three calendar view provided, 'day','week','month'. 'week' by default.
             */
            view: "nMonth",
            /**
             * @description {Config} weekstartday
             * {Number} First day of week 0 for Sun, 1 for Mon, 2 for Tue.
             */
            weekstartday: 0,  //start from Sunday by default
            showtooltip:false,
            tooltipon:1,
            shownavigate:false,
            navigateurl:"",
            target:0,
            theme: "#"+option.paletteDefault, //theme no
            /**
             * @description {Config} height
             * {Number} Calendar height, false for page height by default.
             */
            height: false,
            /**
             * @description {Config} url
             * {String} Url to request calendar data.
             */
            url: "",
            /**
             * @description {Config} eventItems
             * {Array} event items for initialization.
             */
            eventItems: [],
            method: "POST",
            /**
             * @description {Config} showday
             * {Date} Current date. today by default.
             */
            showday: new Date(),
            /**
	 	         * @description {Event} onBeforeRequestData:function(stage)
	 	         * Fired before any ajax request is sent.
	 	         * @param {Number} stage. 1 for retrieving events, 2 - adding event, 3 - removiing event, 4 - update event.
	           */
            onBeforeRequestData: false,
            /**
	 	         * @description {Event} onAfterRequestData:function(stage)
	 	         * Fired before any ajax request is finished.
	 	         * @param {Number} stage. 1 for retrieving events, 2 - adding event, 3 - removiing event, 4 - update event.
	           */
            onAfterRequestData: false,
            /**
	 	         * @description {Event} onAfterRequestData:function(stage)
	 	         * Fired when some errors occur while any ajax request is finished.
	 	         * @param {Number} stage. 1 for retrieving events, 2 - adding event, 3 - removiing event, 4 - update event.
	           */
            onRequestDataError: false,

            onWeekOrMonthToDay: false,
            /**
	 	         * @description {Event} quickAddHandler:function(calendar, param )
	 	         * Fired when user quick adds an item. If this function is set, ajax request to quickAddUrl will abort.
	 	         * @param {Object} calendar Calendar object.
	 	         * @param {Array} param Format [{name:"name1", value:"value1"}, ...]
	 	         *
	           */
            quickAddHandler: false,
            /**
             * @description {Config} quickAddUrl
             * {String} Url for quick adding.
             */
            quickAddUrl: "",
            /**
             * @description {Config} quickUpdateUrl
             * {String} Url for time span update.
             */
            quickUpdateUrl: "",
            /**
             * @description {Config} quickDeleteUrl
             * {String} Url for removing an event.
             */
            quickDeleteUrl: "",
            /**
             * @description {Config} autoload
             * {Boolean} If event items is empty, and this param is set to true.
             * Event will be retrieved by ajax call right after calendar is initialized.
             */
            autoload: false,
            /**
             * @description {Config} readonly
             * {Boolean} Indicate calendar is readonly or editable
             */
            readonly: false,
            /**
             * @description {Config} extParam
             * {Array} Extra params submitted to server.
             * Sample - [{name:"param1", value:"value1"}, {name:"param2", value:"value2"}]
             */
            extParam: [],
            /**
             * @description {Config} enableDrag
             * {Boolean} Whether end user can drag event item by mouse.
             */
            enableDrag: true,
            loadDateR: []
        };
        var eventDiv = $("#gridEvent"+option.thecontainer);
        if (eventDiv.length == 0) {
            eventDiv = $("<div id='gridEvent"+option.thecontainer+"' style='display:none;'></div>").appendTo(document.body);
        }
        var gridcontainer = $(this);
        option = $.extend(def, option);
        __MilitaryTime = option.militaryTime;
        //no quickUpdateUrl, dragging disabled.
        if (option.quickUpdateUrl == null || option.quickUpdateUrl == "") {
            option.enableDrag = false;
        }
        if (option.rowsByCategory == "dc_subjects" || option.rowsByCategory == "dc_locations" )
            option.rowsList = eval(option.rowsByCategory);
        if (option.dayWithTime && option.view=="day")
            option.rowsList = "";
        if (option.dayWithColumns == "dc_subjects" || option.dayWithColumns == "dc_locations" )
            option.columnsList = eval(option.dayWithColumns);
        //template for month and date
        var __SCOLLEVENTTEMP = "<DIV style=\"WIDTH:${width};top:${top};left:${left};\" title1=\"${title}\" class=\"chip chip${i} ${drag}\"><div class=\"dhdV\" style=\"display:none\">${data}</div><DIV style=\"BORDER-BOTTOM-COLOR:${bdcolor}\" class=ct>&nbsp;</DIV><DL class=\"${userEdition}\" style=\"BORDER-BOTTOM-COLOR:${bdcolor}; BACKGROUND-COLOR:${bgcolor1}; BORDER-TOP-COLOR: ${bdcolor}; HEIGHT: ${height}px; BORDER-RIGHT-COLOR:${bdcolor}; BORDER-LEFT-COLOR:${bdcolor}\"><DT style=\"BACKGROUND-COLOR:${bgcolor2}\">${starttime} ${icon}</DT><DD><SPAN class=\"t-title\">${content}</SPAN><div class=\"t-loc\">${location}</div><div class=\"t-desc\">${description}</div></DD><DIV class='resizer' style='display:${redisplay}'><DIV class=rszr_icon>&nbsp;</DIV></DIV></DL><DIV style=\"BORDER-BOTTOM-COLOR:${bdcolor}; BACKGROUND-COLOR:${bgcolor1}; BORDER-TOP-COLOR: ${bdcolor}; BORDER-RIGHT-COLOR: ${bdcolor}; BORDER-LEFT-COLOR:${bdcolor}\" class=cb1>&nbsp;</DIV><DIV style=\"BORDER-BOTTOM-COLOR:${bdcolor}; BORDER-TOP-COLOR:${bdcolor}; BORDER-RIGHT-COLOR:${bdcolor}; BORDER-LEFT-COLOR:${bdcolor}\" class=cb2>&nbsp;</DIV></DIV>";
        var __ALLDAYEVENTTEMP = '<div class="rb-o ${eclass}" id="${id}" title1="${title}" style="color:${color};"><div class="dhdV" style="display:none">${data}</div><div class="${extendClass} rb-m" style="background-color:${color}"><div class="rb-i t-title ${userEdition}">${content}</div><div class="rb-i t-loc">${location}</div><div class="rb-i t-desc">${description}</div></div></div>';
        var __MonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        var __LASSOTEMP = "<div class='drag-lasso' style='left:${left}px;top:${top}px;width:${width}px;height:${height}px;'>&nbsp;</div>";
        var __VIEWWEEKDAYS = option.viewWeekDays;
        var __VIEWWEEKDAYSTOTAL = 0;
            for (i=0;i<__VIEWWEEKDAYS.length;i++)
               __VIEWWEEKDAYSTOTAL += __VIEWWEEKDAYS[i];
        //for dragging var
        var _dragdata;
        var _dragevent;

        //clear DOM
        clearcontainer();

        //no height specified in options, we get page height.
        if (!option.height) {
            option.height = document.documentElement.clientHeight;
        }
        //if (option.view == "day" || option.view == "week" || option.view == "nDays" || option.view == "rowMonth")
        {
            if (option.height/(option.hoursEnd-option.hoursStart+1)>option.cellheight)
                option.cellheight = Math.ceil(option.height/(option.hoursEnd-option.hoursStart+1));
            if (option.cellheight%2==1) option.cellheight++;

        }


        //populate events data for first display.
        if (option.url && option.autoload) {
            render();
            var d = getRdate();
            if (option.view!="list")
                pushER(d.start, d.end);
            populate();
        }
        else {
            //contruct HTML
            render();
            //get date range
            var d = getRdate();
            if (option.view!="list")
                pushER(d.start, d.end);
        }

        //clear DOM
        function clearcontainer() {
            gridcontainer.empty();
        }
        //get range
        function getRdate() {
            return { start: option.vstart, end: option.vend };
        }
        //add date range to cache.
        function pushER(start, end) {
            var ll = option.loadDateR.length;
            if (!end) {
                end = start;
            }
            if (ll == 0) {
                option.loadDateR.push({ startdate: start, enddate: end });
            }
            else {
                for (var i = 0; i < ll; i++) {
                    var dr = option.loadDateR[i];
                    var diff = DateDiff("d", start, dr.startdate);
                    if (diff == 0 || diff == 1) {
                        if (dr.enddate < end) {
                            dr.enddate = end;
                        }
                        break;
                    }
                    else if (diff > 1) {
                        var d2 = DateDiff("d", end, dr.startdate);
                        if (d2 > 1) {
                            option.loadDateR.splice(0, 0, { startdate: start, enddate: end });
                        }
                        else {
                            dr.startdate = start;
                            if (dr.enddate < end) {
                                dr.enddate = end;
                            }
                        }
                        break;
                    }
                    else {
                        var d3 = DateDiff("d", end, dr.startdate);

                        if (dr.enddate < end) {
                            if (d3 < 1) {
                                dr.enddate = end;
                                break;
                            }
                            else {
                                if (i == ll - 1) {
                                    option.loadDateR.push({ startdate: start, enddate: end });
                                }
                            }
                        }
                    }
                }
                //end for
                //clear
                ll = option.loadDateR.length;
                if (ll > 1) {
                    for (var i = 0; i < ll - 1; ) {
                        var d1 = option.loadDateR[i];
                        var d2 = option.loadDateR[i + 1];

                        var diff1 = DateDiff("d", d2.startdate, d1.enddate);
                        if (diff1 <= 1) {
                            d1.startdate = d2.startdate > d1.startdate ? d1.startdate : d2.startdate;
                            d1.enddate = d2.enddate > d1.enddate ? d2.enddate : d1.enddate;
                            option.loadDateR.splice(i + 1, 1);
                            ll--;
                            continue;
                        }
                        i++;
                    }
                }
            }
        }
        function adaptWH()
	    {
	        $(".multicalendar").each(function(){
                    var h = 0;
                    $(this).find(".ui-datepicker-group").each(function(){
                        if (h < ($(this).css("height").replace("px","")*1)) h = $(this).css("height").replace("px","")*1;
                    });
                    if (h!=0) $(this).find(".ui-datepicker-group").each(function(){$(this).css("height",h+"px");});
                });
	    }
        $(window).resize(function() {
            adaptWH();
            if (option.newWidthGroupCalculate)
            {
                option.newWidthGroup = 0;
                render();
            }

        });
        //contruct DOM
        function render() {
            //params needed
            //viewType, showday, events, config
            if (option.view=="list")
                $("#sfprevbtn"+option.thecontainer+",#sfnextbtn"+option.thecontainer).addClass("nav_list");
            else
                $("#sfprevbtn"+option.thecontainer+",#sfnextbtn"+option.thecontainer).removeClass("nav_list");
            if (option.mindate!="" && option.mindate>option.showday)
                option.showday = option.mindate;
            if (option.maxdate!="" && option.maxdate<option.showday)
                option.showday = option.maxdate;
            if (option.vstart && option.vend)
            {
                if (option.view=="month" || option.view=="nMonth")
                {
                    if (option.view=="month")
                        var meses = 1;
                    else
                        var meses = option.numberOfMonths;
                    var firstdate = new Date(option.showday.getFullYear(), option.showday.getMonth(), 1);
                    var m = (option.showday.getMonth()+meses)%12;
                    var y = option.showday.getFullYear()+Math.floor((option.showday.getMonth()+meses)/12);
                    var enddate = new Date(y, m, 1);
                    enddate = DateAdd("d", -1 , enddate);

                }
                else
                {
                    var firstdate = option.vstart;
                    var enddate = option.vend;
                }
                if (option.mindate>=firstdate && option.mindate<=enddate)
                {
                    $("#sfprevbtn"+option.thecontainer).find(".ui-icon-circle-triangle-w").css({ opacity: 0.3 });
                    $("#sfprevbtn"+option.thecontainer).addClass("non-navigate");
                }
                else
                {
                    $("#sfprevbtn"+option.thecontainer).find(".ui-icon-circle-triangle-w").css({ opacity: 1 });
                    $("#sfprevbtn"+option.thecontainer).removeClass("non-navigate");
                }
                if (option.maxdate>=firstdate && option.maxdate<=enddate)
                {
                    $("#sfnextbtn"+option.thecontainer).find(".ui-icon-circle-triangle-e").css({ opacity: 0.3 });
                    $("#sfnextbtn"+option.thecontainer).addClass("non-navigate");
                }
                else
                {
                    $("#sfnextbtn"+option.thecontainer).find(".ui-icon-circle-triangle-e").css({ opacity: 1 });
                    $("#sfnextbtn"+option.thecontainer).removeClass("non-navigate");
                }
            }

            var showday = new Date(option.showday.getFullYear(), option.showday.getMonth(), option.showday.getDate());
            var events = option.eventItems;

            var config = { view: option.view, weekstartday: option.weekstartday, theme: option.theme,thecontainer: option.thecontainer };
            if (option.view == "day" || option.view == "week" || option.view == "nDays" || option.view == "rowMonth") {
                var $dvtec = $("#dvtec"+option.thecontainer);
                if ($dvtec.length > 0) {
                    option.scoll = $dvtec.attr("scrollTop"); //get scroll bar position
                }
            }
            gridcontainer.parent().parent().width("100%");
            $(".gridcontainercover").attr("class","gridcontainercover view"+option.view);
            switch (option.view) {
                case "day":
                    BuildDaysAndWeekView(showday, 1, events, config);
                    //if (option.rowsList=="")
                    //    gridcontainer.css("overflow-y", "visible").height(option.height - 8);
                    //else
                        gridcontainer.height("auto");    
                    break;
                case "week":
                    BuildDaysAndWeekView(showday, 7, events, config);
                    //if (option.rowsList=="")
                    //    gridcontainer.css("overflow-y", "visible").height(option.height - 8);
                    //else
                        gridcontainer.height("auto");    
                    break;
                case "month":
                    BuildMonthView(showday, events, config);
                    gridcontainer.css("overflow-y", "visible").height(option.height - 8);
                    $("#gridcontainer"+option.thecontainer+" [display='0']").css("display","none");
                    var monthrowheight = 0;
                    $(".month-row").each(function() {
                    	      var st_grid_h = $(this).find(".st-grid").height()*1; 
                    	      var rowh = $(this).css("height").replace("px","")*1;
                    	      if (st_grid_h>0 && rowh<st_grid_h)
                    	          rowh = st_grid_h;
                    	      $(this).css("height",rowh);
                    	      $(this).css("top",monthrowheight);
                    	      monthrowheight += rowh; 
                    });
                    $(".mv-event-container").css("height",monthrowheight);
                    $(".gridcontainercover").children().css("height",monthrowheight+$(".mv-daynames-table").height()*1+2);
                    break;
                case "rowMonth":
                    showday = new Date(showday.getFullYear(), showday.getMonth(), 1);
                    var tmpday = DateAdd("d", 40, showday);
                    tmpday = new Date(tmpday.getFullYear(), tmpday.getMonth(), 1);
                    tmpday = DateAdd("d", -1, tmpday);
                    var monthdays = tmpday.getDate();
                    option.nOfDays = monthdays;
                    BuildDaysAndWeekView(showday, option.nOfDays, events, config);
                    gridcontainer.height("auto"); 
                    break;
                case "nDays":
                    option.nOfDays = option.numberOfDays;
                    BuildDaysAndWeekView(showday, option.nOfDays, events, config);
                    //if (option.rowsList=="")
                    //    gridcontainer.css("overflow-y", "visible").height(option.height - 8);
                    //else
                        gridcontainer.height("auto"); 
                    break;
                case "list":
                    BuildListView(showday, option.list_eventsPerPage, events, config);
                    gridcontainer.height("auto");
                    break;
                case "nMonth":
                    BuildYearView(showday, events, config);
                    gridcontainer.css("overflow-y", "visible");
                    var gW = gridcontainer.width()-2;//padding:5p
                    if (option.numberOfMonths==1)
                        if (option.newWidthGroup!=0)
                        {
                            gridcontainer.parent().parent().parent().width(option.newWidthGroup);
                            gridcontainer.children().children().width(option.newWidthGroup-12);//padding:5px
                        }
                        else
                        {
                            option.newWidthGroupCalculate = true;
                            gridcontainer.parent().parent().width($('#nmonths'+option.thecontainer).children().width()+12);//padding:5px
                        }
                    else if (option.newWidthGroup!=0)
                    {
                        $('#nmonths'+option.thecontainer).find('.ui-datepicker-multi').width(gW);
                        $('#nmonths'+option.thecontainer).find('.ui-datepicker-multi .ui-datepicker-group').width(option.newWidthGroup);
                    }
                    else
                    {
                        option.newWidthGroupCalculate = true;
                        $('#nmonths'+option.thecontainer).find('.ui-datepicker-multi').width(gW);
                        var iW = 2000;
                        $('#nmonths'+option.thecontainer).find('.ui-datepicker-group .ui-datepicker-calendar').each(function(i) {
                            if (iW>$(this).width())
                                iW=$(this).width();
                        });
                        iW +=4; //margin:1px;border:1px
                        var cN = (Math.floor(gW/iW)==0)?1:Math.floor(gW/iW);
                        var nW = Math.floor(gW/cN);
                        nW -=4; //margin:1px;border:1px
                        option.newWidthGroup = nW;
                        $('#nmonths'+option.thecontainer).find('.ui-datepicker-multi .ui-datepicker-group').width(nW);
                    }
                    gridcontainer.height($('#nmonths'+option.thecontainer).height());
                    break;
                default:
                    alert(i18n.dcmvcal.no_implemented);
                    break;
            }
            initevents(option.view);
            ResizeView(option);
            if ( !(option.rowsList=="" || (option.dayWithTime && option.view=="day")) )
                for (var i=0;i<option.rowsList.length;i++)
                {                    
                    if (Math.round((option.height - 50)/option.rowsList.length)>$("#weekViewAllDaywk"+option.thecontainer+i+" table").height())
                        $("#weekViewAllDaywk"+option.thecontainer+i).height(Math.round((option.height - 50)/option.rowsList.length));
                }    


        }
        function BuildYearView(showday, events, config) {

            var firstdate = new Date(showday.getFullYear(), showday.getMonth(), 1);
            var m = (showday.getMonth()+option.numberOfMonths)%12;
            var y = showday.getFullYear()+Math.floor((showday.getMonth()+option.numberOfMonths)/12);
            var enddate = new Date(y, m, 1);
            enddate = DateAdd("d", -1 , enddate);
            option.vstart = firstdate;
            option.vend = enddate;
            option.datestrshow = CalDateShow(option.vstart, option.vend);

            var html = [];
            html.push("<div id=\"nmonths"+config.thecontainer+"\" class=\"nmonths\" >");
            html.push("</div>");
            gridcontainer.html(html.join(""));


        //if (events.length>0)
        if (true)
        {
            var dates = [];
            for (i=0;i<events.length;i++)
            {
                var d1 = events[i][2];
                d1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
                var d2 = events[i][3];
                d2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());
                var item = "";
                while (d1<=d2)
                {
                    item = d1.getFullYear()+"/"+(d1.getMonth()+1)+"/"+d1.getDate();
                    if (!dates[item])
                        dates[item] = [];
                    dates[item][dates[item].length] =  events[i];

                    d1 = DateAdd("d", 1 , d1);
                }

            }

            var old_fn = $.datepicker._updateDatepicker;
            $.datepicker._updateDatepicker = function(inst) {
               old_fn.call(this, inst);
               adaptWH();
            }
            var mydatepicker = $( "#nmonths"+option.thecontainer ).datepicker({numberOfMonths: option.numberOfMonths,firstDay:option.weekstartday,defaultDate:showday,showOtherMonths: true,
                            monthNamesShort:__MonthName,
                            monthNames:__MonthNameLarge,
                            dayNamesShort:__WDAY,
                            dayNamesMin:__WDAY2,
                            onChangeMonthYear: function(year, month, inst){
                                var c = $(this).datepicker("getDate");
                                var n = new Date(year,(month-1),1);
                                if (c>n)
                                    var p = $("#gridcontainer"+option.thecontainer).previousRange().BcalGetOp();
                                else
                                    var p = $("#gridcontainer"+option.thecontainer).nextRange().BcalGetOp();
                                if (p && p.datestrshow)
                                    $("#txtdatetimeshow"+option.thecontainer).text(p.datestrshow);
                            },
                            beforeShowDay: function (d1){
                                if (__VIEWWEEKDAYS[0]==0 && d1.getDay()==0) return [true,"specialday"];
                                else if (__VIEWWEEKDAYS[1]==0 && d1.getDay()==1) return [true,"specialday"];
                                else if (__VIEWWEEKDAYS[2]==0 && d1.getDay()==2) return [true,"specialday"];
                                else if (__VIEWWEEKDAYS[3]==0 && d1.getDay()==3) return [true,"specialday"];
                                else if (__VIEWWEEKDAYS[4]==0 && d1.getDay()==4) return [true,"specialday"];
                                else if (__VIEWWEEKDAYS[5]==0 && d1.getDay()==5) return [true,"specialday"];
                                else if (__VIEWWEEKDAYS[6]==0 && d1.getDay()==6) return [true,"specialday"];
                                else
                                {
                                    var item = d1.getFullYear()+"/"+(d1.getMonth()+1)+"/"+d1.getDate();
                                    //alert(this.hasClass("ui-datepicker-other-month"));
                                    if (dates[item])
                                        return [true,"ui-state-active",dateFormat.call(d1, i18n.dcmvcal.dateformat.fulldayvalue)];
                                    else
                                        return [true,"ui-state-non-active",dateFormat.call(d1, i18n.dcmvcal.dateformat.fulldayvalue)];
                                }
                            }

                        });
             if (__VIEWWEEKDAYS[0]==0) $(".ui-datepicker span[title='Sunday']").parent().css("display","none");
             if (__VIEWWEEKDAYS[1]==0) $(".ui-datepicker span[title='Monday']").parent().css("display","none");
             if (__VIEWWEEKDAYS[2]==0) $(".ui-datepicker span[title='Tuesday']").parent().css("display","none");
             if (__VIEWWEEKDAYS[3]==0) $(".ui-datepicker span[title='Wednesday']").parent().css("display","none");
             if (__VIEWWEEKDAYS[4]==0) $(".ui-datepicker span[title='Thursday']").parent().css("display","none");
             if (__VIEWWEEKDAYS[5]==0) $(".ui-datepicker span[title='Friday']").parent().css("display","none");
             if (__VIEWWEEKDAYS[6]==0) $(".ui-datepicker span[title='Saturday']").parent().css("display","none");
             $("#nmonths"+option.thecontainer+" .ui-datepicker-other-month").attr("title","");
             if (option.date_box_with_color_in_nmonth_view)
             {              	
             	   var height = parseInt($("#nmonths"+option.thecontainer+" .ui-state-active").css("height"));
                 $("#nmonths"+option.thecontainer+" .ui-state-active").each(function(){
                     try{
                         var item = datetostr(strtodate($(this).attr("title")+" 00:00"));
                         if (item && dates[item] && (dates[item].length>0))
                         {
                            var colors = new Array();
                            var html = "";
                            var c = "#"+option.paletteDefault;
                            for (var i=0;i<dates[item].length;i++)
                            {
                                c = ((dates[item][i][7]!=-1 && dates[item][i][7]!=null)?dates[item][i][7]:"#"+option.paletteDefault);
                                if ($.inArray( c, colors)==-1)
                                    colors[colors.length] = c;
                            }
                            if (colors.length==1) //$(this).css("background",colors[colors.length-1]);
                                $(this).attr('style', 'background:'+colors[colors.length-1]+' !important');
                            else
                            {
                                var count = colors.length;
                                $(this).css("vertical-align","top");
                                
                                html += '<div style="position:relative;border:0px solid;padding:0px;margin:0px;height:'+(height)+'px;">';
                                var top = 0;
                                for (var i=0;i<count;i++)
                                {
                                    h = Math.round(height/count*(i+1))-top;

                                    html += '<div style="position:absolute;margin:0px;padding:0px;border:0px solid;width:100%;background:'+colors[i]+';height:'+h+'px;top:'+top+'px;left:0px;"></div>';
                                    top = Math.round(height/count*(i+1));
                                }
                                html += '<div style="position:absolute;margin:0px;padding:0px;border:0px solid;width:100%;background:transparent;white-space: nowrap;height:'+height+'px;top:0px;left:0px;">'+$(this).html()+'</div>';
                                html += '</div>';
                                $(this).html(html);
                                //$(this).find("a").bind('click', function(e) {return false;});
                            }
                         }
                     }catch (e) {}
                 });
             }
             $("#nmonths"+option.thecontainer+" .ui-state-active a").bind('click', function(e) {
                if (__VIEWWEEKDAYS[0]==0) $(".ui-datepicker span[title='Sunday']").parent().css("display","none");
                if (__VIEWWEEKDAYS[1]==0) $(".ui-datepicker span[title='Monday']").parent().css("display","none");
                if (__VIEWWEEKDAYS[2]==0) $(".ui-datepicker span[title='Tuesday']").parent().css("display","none");
                if (__VIEWWEEKDAYS[3]==0) $(".ui-datepicker span[title='Wednesday']").parent().css("display","none");
                if (__VIEWWEEKDAYS[4]==0) $(".ui-datepicker span[title='Thursday']").parent().css("display","none");
                if (__VIEWWEEKDAYS[5]==0) $(".ui-datepicker span[title='Friday']").parent().css("display","none");
                if (__VIEWWEEKDAYS[6]==0) $(".ui-datepicker span[title='Saturday']").parent().css("display","none");
                if (option.shownavigate)
                {
                    var item = datetostr(strtodate($(this).parents(".ui-state-active").attr("title")+" 00:00"));
                    var i = item.split("/");
                    var title = new Date(i[0],i[1]-1,i[2]);

                    title = dateFormat.call(title, i18n.dcmvcal.dateformat.fulldayvalue);
                    var navigateurl = option.navigateurl.replace(/the_current_date/g,title);
                    if (option.target==1)
		                document.location =  navigateurl;
		            else
          	            window.open(navigateurl);
          	    }
                e.stopPropagation();
                return false;
             });
             function showDialogNMonth(dates,item,idover)
             {
                 var i = item.split("/");
                 var titleDay = new Date(i[0],i[1]-1,i[2]);
                 title = dateFormat.call(titleDay, i18n.dcmvcal.dateformat.fulldayshow);
                 var str = "", d="", d1="",d2="", d1h="",d2h="";
                 var showTitle = true;
                 if (dates[item])
                 {
                     for (var i=0;i<dates[item].length;i++)
                     {
                         d1 = dateFormat.call(dates[item][i][2], i18n.dcmvcal.dateformat.fulldayshow);
                         d1h = fomartTimeAMPM(dates[item][i][2].getHours(),dates[item][i][2].getMinutes(),__MilitaryTime);
                         d2 = dateFormat.call(dates[item][i][3], i18n.dcmvcal.dateformat.fulldayshow);
                         d2h = fomartTimeAMPM(dates[item][i][3].getHours(),dates[item][i][3].getMinutes(),__MilitaryTime);

                         if (d1==d2)
                         {
                             d = "<div class=\"mv_dlg_nmonth_date\">" + d1 + '</div>';
                             if (dates[item][i][4]!=1)
                                 //d += " " + d1h+" - "+d2h;
                                 d += " " + d1h;
                         }
                         else
                         {
                             //if (showTitle && (d1!=title))
                                 showTitle = false;
                             if (dates[item][i][4]!=1)
                                 d = "<div class=\"mv_dlg_nmonth_date\">" + d1+ "</div> "+d1h+" - <div class=\"mv_dlg_nmonth_date\">"+d2+"</div> "+d2h;
                             else
                                 d = "<div class=\"mv_dlg_nmonth_date\">" + d1 +" - "+d2+'</div>';
                         }
                         if (option.readonly != true && (option.userEdit || option.userDel || ((option.userOwner==dates[item][i][12]) && (option.userEditOwner || option.userDelOwner))))
                             var classEdition = "dialogNMonth_event";
                         else
                             var classEdition = "";
                         str += '<div class="'+classEdition+'"><div class="dialogNMonth_event_links">';
                         //if (option.readonly != true && (option.userEdit || ((option.userOwner==dates[item][i][12]) && option.userEditOwner)))
                         //    str += '<a href="#" class="dlgNMonth_editlink" id="editlink'+dates[item][i][0]+'">' + i18n.dcmvcal.update_detail + '</a>';
                         //if (option.readonly != true && (option.userDel || ((option.userOwner==dates[item][i][12]) && option.userDelOwner)))
                         //    str += '<a href="#" class="dlgNMonth_dellink" id="dellink'+dates[item][i][0]+'">' + i18n.dcmvcal.i_delete + '</a>';
                         str += '</div><div class="dialogNMonth_event_content" style="border-left:3px solid '+((dates[item][i][7]!=-1 && dates[item][i][7]!=null)?dates[item][i][7]:"#"+option.paletteDefault)+';">' + d + "<div>"+dates[item][i][1]+"</div>"+((dates[item][i][9]!="" && dates[item][i][9]!=null)?"<div>"+dates[item][i][9]+"</div>":"")+((dates[item][i][11]!="" && dates[item][i][11]!="<br />" && dates[item][i][11]!=null)?"<div>"+dates[item][i][11]+"</div>":"") + "</div></div>";
                     }
                     if (!option.readonly && option.userAdd)
                         str += '<div><a href="#" class="dlgNMonth_createlink" id="createlink">' + i18n.dcmvcal.create_event + ' - ' +title+ '</a></div>';

                     try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}
                     try {$(".mv_dlg_nmonth").dialog("close");}catch (e) {}
                     if (showTitle)
                         str = "<div class=\"mv_dlg_nmonth_title\">" + title + "</div>" + str;
                     $(idover).html(str);
                     $(".mv_dlg_nmonth_date").css("font-weight","bold");
                     if (showTitle)
                         $(".mv_dlg_nmonth_date").css("display","none");
                     else
                         $(".mv_dlg_nmonth_date").css("display","inline");
                     try {$(idover).dialog( "option", "title", title)}catch (e) {}
                     for (var i=0;i<dates[item].length;i++)
                     {
                         $("#editlink"+dates[item][i][0]).data("cdata", dates[item][i]);
                         $("#dellink"+dates[item][i][0]).data("cdata", dates[item][i]);
                     }
                     $("#createlink").data("cdata", titleDay);
                     $(".dlgNMonth_createlink").click(function(e) {
                         try {$(".mv_dlg_nmonth").dialog("close");}catch (e) {}
                         if (option.EditCmdhandler && $.isFunction(option.EditCmdhandler))
                             option.EditCmdhandler.call(this, ['0', "", $("#createlink").data("cdata"), $("#createlink").data("cdata"), 1]);

                         realsedragevent();
                         e.stopPropagation();
                         return false;
                     });
                     $(".dlgNMonth_editlink").click(function(e) {
                         try {$(".mv_dlg_nmonth").dialog("close");}catch (e) {}
                         if (option.EditCmdhandler && $.isFunction(option.EditCmdhandler))
                             option.EditCmdhandler.call(this, $("#"+$(this).attr("id")).data("cdata"));
                         realsedragevent();
                         e.stopPropagation();
                         return false;
                     });
                     $(".dlgNMonth_dellink").bind("click",function(e) {

                         try {$(".mv_dlg_nmonth").dialog("close");}catch (e) {}
                         if (option.DeleteCmdhandler && $.isFunction(option.DeleteCmdhandler))
                             option.DeleteCmdhandler.call(this, $("#"+$(this).attr("id")).data("cdata"), quickd);
                         realsedragevent();
                         e.stopPropagation();
                         return false;
                     });
                     $(idover).dialog('open');
                     dialogUnBlur();
                     move_mv_dlg();
                 }
             }
             $("#nmonths"+option.thecontainer+" .ui-state-non-active a").bind('click', function(e) {
                var item = datetostr(strtodate($(this).parent().attr("title")+" 00:00"));
                var arrdays = item.split('/');
                var start = new Date(arrdays[0], arrdays[1]-1, arrdays[2]);
                quickadd(start, start, true, { left: e.pageX, top: e.pageY });
                e.stopPropagation();
                return false;
                })
             if (option.showtooltip || option.readonly != true)
             {
                 if (option.tooltipon!=0)
                 {
                 
                     $("#nmonths"+option.thecontainer+" .ui-state-active a").bind('click', function(e) {
                         var item = datetostr(strtodate($(this).parents(".ui-state-active").attr("title")+" 00:00"));
                         var idover = "myover"+item.replace(/\//g,"_");
                         $(".ui-dialog-content").remove();
                         $(this).parent().append("<div class=\""+idover+"\" ></div>");
                         idover = "."+idover;
                              $(idover).dialog({autoOpen: false ,width:option.dialogWidth,
                              modal: false,resizable: false,maxWidth: option.dialogWidth,fluid: true,open: function(event, ui){fluidDialog();},
                               position: {
                                 my: "left top",
                                 at: "center bottom",
                                 collision: "fit",
                                 of: $(idover).parent()
                               }
                             }).addClass("mv_dlg_nmonth").parent().addClass("mv_dlg") ;
                             $("<div id=\"mv_corner\" />").appendTo($(".mv_dlg .ui-dialog-titlebar"));
                             showDialogNMonth(dates,item,idover);
                          //e.stopPropagation();
                          e.stopPropagation();
                     }).bind('mouseout',function(){
                         });;
                 }
                 else if (option.tooltipon==0)
                 {
                     $("#nmonths"+option.thecontainer+" .ui-state-active").bind('mouseover', function(){
                         if (!$(this).hasClass("ui-datepicker-other-month"))
                         {
                             $(".ui-dialog-content").remove();
                             $(this).append("<div class=\"myover\" ></div>");
                             $(".myover").dialog({autoOpen: false ,width:option.dialogWidth,
                             modal: false,resizable: false,maxWidth: option.dialogWidth,fluid: true,open: function(event, ui){fluidDialog();},
                               position: {
                                 my: "left top",
                                 at: "center bottom",
                                 collision: "fit",
                                 of: $(".myover").parent()
                               }
                             }).addClass("mv_dlg_nmonth").parent().addClass("mv_dlg");
                             $("<div id=\"mv_corner\" />").appendTo($(".mv_dlg .ui-dialog-titlebar"));
                             try { var item = datetostr(strtodate($(this).attr("title")+" 00:00"));showDialogNMonth(dates,item,".myover"); }catch (e) {}
                        }
                     }).bind('mouseout',function(){
                     });
                 }
                 $(".mv_dlg_nmonth").remove();
             }
        }
        return;

        }
        //build list view
        function BuildListView(startday, l, events, config) {
            option.allevents = events.slice();
            if (!option.theme_list || option.theme_list=="")
                option.theme_list = '<div><div class="list_event_content" style="border-left:3px solid ${color};"><div class="list_event_date" option="1${option}"><div class="list_date">${date_start}</div></div><div class="list_event_date" option="2${option}"><div class="list_date">${date_start}</div><div class="list_time">${time_start} - ${time_end}</div></div><div class="list_event_date" option="3${option}"><div class="list_date">${date_start} - ${date_end}</div></div><div class="list_event_date" option="4${option}"><div class="list_date">${date_start}</div><div class="list_time">${time_start}</div> - <div class="list_date">${date_end}</div><div class="list_time">${time_end}</div></div><div class="itemlist_title">${title}</div><div class="itemlist_location">${location}</div><div class="itemlist_description" readmore_url="">${description}</div><div class="itemlist_edit">${edit_link}</div><div class="itemlist_delete">${delete_link}</div></div></div>';
            option.theme_list = option.theme_list.replace(/\n/g,"");
            option.theme_list = option.theme_list.replace(/\r/g,"");
            if (!option.header) option.header="";
            if (!option.footer) option.footer="";
            if (!option.find) option.find="";
            var header = option.theme_list.match("<header>(.*)</header>");
            if (header && header.length>1) option.header = header[1];
            option.theme_list = option.theme_list.replace(/<header>(.*)<\/header>/,"");
            var find = option.theme_list.match("<find>(.*)</find>");
            if (find && find.length>1) option.find = find[1].split(",");
            option.theme_list = option.theme_list.replace(/<find>(.*)<\/find>/,"");
            var footer = option.theme_list.match("<footer>(.*)<\/footer>");
            if (footer && footer.length>1) option.footer = footer[1];
            option.theme_list = option.theme_list.replace(/<footer>(.*)<\/footer>/,"");
            option.vstart = startday;
            option.vend = startday;
            var p = {};
            var html = [];
            if (option.searchvalue== undefined)
                option.searchvalue = "";  
            html.push("<div id=\"searchcontainer"+config.thecontainer+"\" class=\"searchcontainer\"><input type=\"text\" placeholder=\"Enter search term\" value=\""+option.searchvalue+"\"></div>");
            html.push("<div id=\"listcontainer"+config.thecontainer+"\" class=\"listcontainer\">");
            function showList()
            {
                //var events = events1.splice(0);
                if (option.searchvalue!= undefined && option.searchvalue!="")
                    for (var i = events.length-1; (i>=0);i--)
                        if (events[i][1].toLowerCase().indexOf(option.searchvalue)==-1 && events[i][9].toLowerCase().indexOf(option.searchvalue)==-1 && (events[i][11]==null || events[i][11].toLowerCase().indexOf(option.searchvalue)==-1))
                            events.splice(i, 1);  
                var str = "";
                var eNumber = 0;
                var noShow = false;
                if (option.cachepages.length>option.page)
                {
                    return option.cachepages[option.page];
                }
                else
                {
                    for (var i = 0; (i<events.length);i++)
                    {
                        noShow = false;
                        p.date_start = dateFormat.call(events[i][2], i18n.dcmvcal.dateformat.fulldayshow);
                        p.date_start_year = dateFormat.call(events[i][2], "yyyy");
                        p.date_start_month = dateFormat.call(events[i][2], "MM");
                        p.date_start_day = dateFormat.call(events[i][2], "dd");
                        p.date_start_monthName = __MonthName[events[i][2].getMonth()];
                        p.date_start_monthNameLarge = __MonthNameLarge[events[i][2].getMonth()];
                        p.date_start_weekday = __WDAYLarge[events[i][2].getDay()];
                
                        p.time_start = fomartTimeAMPM(events[i][2].getHours(),events[i][2].getMinutes(),__MilitaryTime);
                
                        p.date_end = dateFormat.call(events[i][3], i18n.dcmvcal.dateformat.fulldayshow);
                        p.date_end_year = dateFormat.call(events[i][3], "yyyy");
                        p.date_end_month = dateFormat.call(events[i][3], "MM");
                        p.date_end_day = dateFormat.call(events[i][3], "dd");
                        p.date_end_monthName = __MonthName[events[i][3].getMonth()];
                        p.date_end_monthNameLarge = __MonthNameLarge[events[i][3].getMonth()];
                        p.date_end_weekday = __WDAYLarge[events[i][3].getDay()];
                
                        p.time_end = fomartTimeAMPM(events[i][3].getHours(),events[i][3].getMinutes(),__MilitaryTime);
                
                        if (p.date_start==p.date_end)
                        {
                            p.option = 1;
                            if (events[i][4]!=1)
                                p.option = 2;
                        }
                        else
                        {
                            if (events[i][4]!=1)
                                p.option = 4;
                            else
                                p.option = 3;
                        }
                        var description = "";
                        if (events[i][11]!="" && events[i][11]!="<br />" && events[i][11]!=null)
                        {
                            if (option.list_readmore_numberofwords==0)
                                description   = events[i][11];
                            else
                            {
                                var val   = $.trim(events[i][11]), // Remove spaces from b/e of string
                                val = $("<div/>").html(val).text();
                                words = val.replace(/\s+/gi, ' ').split(' '); //  word-splits
                                if (words.length>option.list_readmore_numberofwords)
                                {
                                    val = "";
                                    for (var w=0;w<option.list_readmore_numberofwords;w++)
                                        val += " "+ words[w];
                                    description = '<div class="description_short">'+$.trim(val)+' ... <a href="" class="readmore short">'+i18n.dcmvcal.readmore+'</a></div>';
                                    description += '<div class="description_large">'+events[i][11]+' <a href="" class="readmore large">'+i18n.dcmvcal.readmore_less+'</a></div>';
                                }
                                else
                                {
                                    val = events[i][11];
                                    description   = events[i][11];
                                }
                
                            }
                        }
                        p.id = events[i][0];
                        p.color = ((events[i][7]!=-1 && events[i][7]!=null)?events[i][7]:"#"+option.paletteDefault);
                        p.title = events[i][1];
                        p.location = (events[i][9]!="" && events[i][9]!=null)?events[i][9]:"";
                        p.description = description;
                        p.edit_link = "";
                        p.delete_link = "";
                        if (option.readonly != true && (option.userEdit || option.userDel || ((option.userOwner==events[i][12]) && (option.userEditOwner || option.userDelOwner))))
                        {
                            if (option.userDel || ((option.userOwner==events[i][12]) && (option.userDelOwner)))
                            {
                                ///no delete from recurring events
                                if (!(events[i][6]!="" && events[i][6] != null && events[i][6] != undefined))
                                     p.edit_link = "<a class=\"edit_link_ev\" href=\"\">"+i18n.dcmvcal.update_detail+"</a>";
                            }
                            if (option.userEdit || ((option.userOwner==events[i][12]) && (option.userEditOwner)))
                                p.delete_link = "<a class=\"delete_link_ev\" href=\"\">"+i18n.dcmvcal.i_delete+"</a>";
                        }
                        
                        
                        if ((i==0) && (option.header!="")) str = '<div class="headerlist">'+Tp(option.header, p)+'</div>';
                        eNumber++;
                        var therule =  (events[i][6]!="" && events[i][6] != null && events[i][6] != undefined)
                        if (option.lastdate!="" && ((!therule && events[i][0]==option.currentlist.idend) || (therule  && events[i][2].toString()==option.currentlist.dend.toString())))
                        {
                            eNumber = 0;
                            str = "";
                            if (option.header!="") str = '<div class="headerlist">'+Tp(option.header, p)+'</div>';
                
                            noShow = true;
                        }
                        if (eNumber<=option.list_eventsPerPage && (!noShow))
                        {
                            var str1 = Tp(option.theme_list, p);                        
                            str1 = '<div class="ev_item_data" i="'+i+'">'+str1+'</div>';
                            for (var k=0;k<option.find.length;k++)
                                if (str1.toLowerCase().indexOf(option.find[k].toLowerCase())!=-1)
                                    str1 = str1.replace("find_and_replace","find_and_replace "+option.find[k]);
                            str += str1;
                            eMax = i;
                        }
                
                    }
                    if (eNumber>0)
                    {
                        option.currentlist = {dend:events[eMax][2],idend:events[eMax][0]};
                        str +='<div class="listnav">';
                        {
                            str +='<a href="#" id="listprevbtn'+option.thecontainer+'" class="listprevbtn '+((option.page==0)?"listbtndisabled":"")+'">'+i18n.dcmvcal.prev+'</a>';
                            str +='<a href="#" id="listnextbtn'+option.thecontainer+'" class="listnextbtn '+( (events.length-1==eMax)?"listbtndisabled":"")+'">'+i18n.dcmvcal.next+'</a>';
                        }
                        str +='<div style="clear:both"></div></div>';
                    }
                    if (str!="")
                        option.cachepages[option.page] = str;
                    return str;
                }
            }
            html.push(showList());    
            html.push("</div>");
            option.datestrshow = " ";
            gridcontainer.html(html.join(""));            
            $("#gridcontainer"+option.thecontainer).find(".searchcontainer input").keyup(function() {
                option.searchvalue = $(this).val().toLowerCase();
                option.page = 0;
                option.lastdate = "";
                option.currentlist = {dend:"",idend:0};                    
                option.cachepages = new Array();
                events = option.allevents.slice();
                $("#listcontainer"+config.thecontainer).html(showList());
                showevents();
                return false;
            });
            function showevents()
            {
                $("#gridcontainer"+option.thecontainer).find(".ev_item_data").each(function(){
                    $(this).data("cdata", events[$(this).attr("i")*1]);
                });
                // bud.data("cdata", data);//ev_item_data
                $("#gridcontainer"+option.thecontainer).find(".delete_link_ev").click(function() {
                    var data = $(this).parents(".ev_item_data").data("cdata");
                    if (option.DeleteCmdhandler && $.isFunction(option.DeleteCmdhandler)) {
                        option.page = 0;
                        option.lastdate = "";
                        option.currentlist = {dend:"",idend:0};                    
                        option.cachepages = new Array();
                        option.DeleteCmdhandler.call(this, data, quickd);
                    }
                    return false;
                });
                $("#gridcontainer"+option.thecontainer).find(".edit_link_ev").click(function(e) {
                    if (!option.EditCmdhandler) {
                        alert("EditCmdhandler" + i18n.dcmvcal.i_undefined);
                    }
                    else {
                        if (option.EditCmdhandler && $.isFunction(option.EditCmdhandler)) {
                            option.page = 0;
                            option.lastdate = "";
                            option.currentlist = {dend:"",idend:0};                    
                            option.cachepages = new Array();
                            var data = $(this).parents(".ev_item_data").data("cdata");
                            option.EditCmdhandler.call(this, data);  
                        }
                    }
                    return false;
                });                
                $("#gridcontainer"+option.thecontainer).find("#listprevbtn"+option.thecontainer).click(function(){
                    if (!$(this).hasClass("listbtndisabled"))
                        $("#gridcontainer"+option.thecontainer).previousRange().BcalGetOp();
                    return false;
                })
                $("#gridcontainer"+option.thecontainer).find("#listnextbtn"+option.thecontainer).click(function(){
                    if (!$(this).hasClass("listbtndisabled"))
                        $("#gridcontainer"+option.thecontainer).nextRange().BcalGetOp();
                    return false;
                })
                $("#gridcontainer"+option.thecontainer).find("#listcontainer"+option.thecontainer).find(".list_event_date").each(function(){
                    if ($(this).attr("option")!="11" && $(this).attr("option")!="22" && $(this).attr("option")!="33" && $(this).attr("option")!="44")
                        $(this).css("display","none");
                })
                $("#gridcontainer"+option.thecontainer).find("#listcontainer"+option.thecontainer).find(".readmore").click(function(){
                    if ($(this).parent().parent().attr("readmore_url")=="")
                    {
                        if ($(this).hasClass("short"))
                        {
                            $(this).parent().parent().find(".description_short").css("display","none");
                            $(this).parent().parent().find(".description_large").css("display","block");
                        }
                        else
                        {
                            $(this).parent().parent().find(".description_short").css("display","block");
                            $(this).parent().parent().find(".description_large").css("display","none");
                        }
                    }
                    else
                    {
                        document.location = $(this).parent().parent().attr("readmore_url");
                    }
                    return false;
                })
            }
            showevents();
            html = null;
        }
        //build day view
        function BuildDaysAndWeekView(startday, l, events, config) {
            var days = [];
            if (l == 1) {
                var show = dateFormat.call(startday, i18n.dcmvcal.dateformat.Md);
                days.push({ display: show, date: startday, day: startday.getDate(), year: startday.getFullYear(), month: startday.getMonth() + 1 });
                option.datestrshow = CalDateShow(days[0].date);
                option.vstart = days[0].date;
                option.vend = days[0].date;
            }
            else {
                var w = 0;
                if (l == 7) {
                    w = config.weekstartday - startday.getDay();
                    if (w > 0) w = w - l;
                    var formatdate = i18n.dcmvcal.dateformat.Md;
                }
                else if (option.view=='rowMonth')
                    var formatdate = i18n.dcmvcal.dateformat.day;
                else
                    var formatdate = i18n.dcmvcal.dateformat.nDaysView;
                var ndate;
                for (var i = w, j = 0; j < l; i = i + 1, j++) {
                    ndate = DateAdd("d", i, startday);
                    var show = dateFormat.call(ndate, formatdate);
                    days.push({ display: show, date: ndate, day: ndate.getDate(), year: ndate.getFullYear(), month: ndate.getMonth() + 1 });
                }
                option.vstart = days[0].date;
                option.vend = days[l - 1].date;
                option.datestrshow = CalDateShow(days[0].date, days[l - 1].date);
            }

            var allDayEvents = [];
            var scollDayEvents = [];


            var html = [];
            html.push("<div id=\"dvwkcontaienr"+config.thecontainer+"\" class=\"wktopcontainer\">");
            html.push("<table class=\"wk-top\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\" >");
            if (option.columnsList!="" && option.view=="day") //draw columns
            {
                html.push("<tr><th width=\""+option.hourswidth+"\" class=\"wk-dayWithColumns\">"+days[0].display+"</th>");
                for (var i=0;i<option.columnsList.length;i++)
                {
                    html.push("<th abbr='", dateFormat.call(days[0].date, "M/d/yyyy"), "' class='gcweekname' scope=\"col\"><div title='", "' ", " class='wk-dayname'><span class='", "'>", option.columnsList[i], "</span></div></th>");
                }

                html.push("<th width=\"16\" >&nbsp;</th></tr>");

            }
            else if (option.rowsList=="" || (option.dayWithTime && option.view=="day"))
            {
                html.push("<tr><th width=\""+option.hourswidth+"\" rowspan=\"2\">&nbsp;</th>");
                BuildWTHeader(html, days);
                html.push("<th width=\"16\" rowspan=\"2\">&nbsp;</th></tr>");
            }
            else  ////draw rows
            {
                html.push("<tr><th width=\""+option.hourswidth+"\">&nbsp;</th>");
                BuildWTHeader(html, days);
                html.push("<th width=\"16\">&nbsp;</th></tr>");
            }
            if (option.rowsList=="" || (option.dayWithTime && option.view=="day"))
            {
                var dM = PropareEvents(days, events, allDayEvents, scollDayEvents,"");
                if (option.columnsList!="" && option.view=="day") //draw columns
                {
                    html.push("<tr><th width=\""+option.hourswidth+"\" >&nbsp;</th>");
                    BuildWTBodyDayWithCol(html, days, allDayEvents, dM,config,0);
                }
                else
                {
                    html.push("<tr>");
                    BuildWTBody(html, days, allDayEvents, dM,config,"");
                }
            }
            else  ////draw rows
            {
                var dayarrs = days;
                for (var ii=0;ii<option.rowsList.length;ii++)
                {
                    html.push("<tr><th width=\"60\" class=\"wk-alldayList\">"+option.rowsList[ii]+"</th>");
                    var dM = PropareEvents(days, events, allDayEvents, scollDayEvents,option.rowsList[ii],"");
                    var dMax = dM;
                    var sufix = ii;

                    if (option.columnsList!="" && option.view=="day") //draw columns
                    {
                        BuildWTBodyDayWithCol(html, days, allDayEvents, dM,config,ii);

                    }
                    else
                    {
                        BuildWTBody(html, days, allDayEvents, dM,config,ii,"");
                    }
                }



            }
            html.push("</table>");
            html.push("</div>");

            if (option.rowsList=="" || (option.dayWithTime && option.view=="day"))
            {
                html.push("<div id=\"dvtec"+config.thecontainer+"\"  class=\"scolltimeevent\"><table style=\"table-layout: fixed;", $.browser.msie ? "" : "width:100%", "\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><td>");
                html.push("<table style=\"height: "+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px\" id=\"tgTable"+config.thecontainer+"\" class=\"tg-timedevents\" cellspacing=\"0\" cellpadding=\"0\"><tbody>");
                BuildDayScollEventheader(html, days, scollDayEvents,config);
                if (option.columnsList!="" && option.view=="day") //draw columns
                    BuildDayScollEventbodyWithCol(html, days, scollDayEvents,config);
                else
                    BuildDayScollEventbody(html, days, scollDayEvents,config);
                html.push("</tbody></table></td></tr></tbody></table></div>");
            }
            gridcontainer.html(html.join(""));
            html = null;
        }
        //build month view
        function BuildMonthView(showday, events, config) {
            var cc = "<div id='cal-month-cc"+config.thecontainer+"' class='cc'><div id='cal-month-cc-header"+config.thecontainer+"'><div class='cc-close' id='cal-month-closebtn"+config.thecontainer+"'></div><div id='cal-month-cc-title"+config.thecontainer+"' class='cc-title'></div></div><div id='cal-month-cc-body"+config.thecontainer+"' class='cc-body'><div id='cal-month-cc-content"+config.thecontainer+"' class='st-contents'><table class='st-grid' cellSpacing='0' cellPadding='0'><tbody></tbody></table></div></div></div>";
            var html = [];
            html.push(cc);
            //build header
            html.push("<div id=\"mvcontainer"+config.thecontainer+"\" class=\"mv-container\">");
            html.push("<table id=\"mvweek"+config.thecontainer+"\" class=\"mv-daynames-table\" cellSpacing=\"0\" cellPadding=\"0\"><tbody><tr>");
            for (var i = config.weekstartday, j = 0; j < 7; i++, j++) {
                if (i > 6) i = 0;
                var p = { dayname: __WDAY[i] };
                if (__VIEWWEEKDAYS[i]!=0)
                    html.push("<th class=\"mv-dayname\" title=\"", __WDAY[i], "\">", __WDAY[i], "");
            }
            html.push("</tr></tbody></table>");
            html.push("</div>");
            var bH = GetMonthViewBodyHeight() - GetMonthViewHeaderHeight();

            html.push("<div id=\"mvEventContainer"+config.thecontainer+"\" class=\"mv-event-container\" style=\"top:18px;height:", bH, "px;", "\">");
            BuilderMonthBody(html, showday, config.weekstartday, events, bH,config);
            html.push("</div>");
            gridcontainer.html(html.join(""));
            html = null;
            $("#cal-month-closebtn"+config.thecontainer).click(closeCc);
        }
        function closeCc() {
            $("#cal-month-cc"+option.thecontainer).css("visibility", "hidden");
        }

        //all-day event, including more-than-one-day events
        function PropareEvents(dayarrs, events, aDE, sDE,filter) {
            var l = dayarrs.length;
            var el = events.length;
            var fE = [];
            var deB = aDE;
            var deA = sDE;
            var startRange = dayarrs[0].date;
            var endRange = dayarrs[dayarrs.length-1].date;
            endRange = new Date(endRange.getFullYear(),endRange.getMonth(),endRange.getDate(),23,59,59);
            for (var j = 0; j < el; j++) {
                var sD = events[j][2];
                var eD = events[j][3];

                var diff = DateDiff("d", sD, eD);
                if (diff > 0 && !(events[j][4] == 1) && !(option.rowsList.length>0 && option.view=="week")  ) {//Fixed bug related to week view with rows and not all day events //added && !(option.rowsList.length>0 && option.view=="week")
                    if (sD < startRange) { //start date out of range
                        sD = startRange;
                    }
                    if (eD > endRange) { //end date out of range
                        eD = endRange;
                    }
                    var stmp = sD;
                    for (sD;sD<=eD;sD = DateAdd("d", 1, sD))
                    {
                        var s = {};
                        s.event = events[j];
                        s.day = sD.getDate();
                        s.year = sD.getFullYear();
                        s.month = sD.getMonth() + 1;
                        if (option.rowsList=="" || (option.dayWithTime && option.view=="day"))
                            s.allday = events[j][4] == 1;
                        else
                            s.allday = 1;
                        s.crossday = events[j][5] == 1;
                        s.reevent = events[j][6];//  == 1; //Recurring event
                        s.daystr = [s.year, s.month, s.day].join("/");
                        s.noResizer = true;

                        s.st = {};
                        if (sD>events[j][2])
                        {
                            s.st.hour = 0;
                            s.st.minute = 0;
                            s.noStarttime = true;
                        }
                        else
                        {
                            s.st.hour = sD.getHours();
                            s.st.minute = sD.getMinutes();
                        }
                        s.st.p = s.st.hour * 60 + s.st.minute; // start time
                        s.et = {};
                        if (DateAdd("d", 1, sD)<events[j][3])
                        {
                            s.et.hour = 23;
                            s.et.minute = 59;
                        }
                        else
                        {
                            s.et.hour = eD.getHours();
                            s.et.minute = eD.getMinutes();
                        }
                        s.et.p = s.et.hour * 60 + s.et.minute; // end time
                        //if (s.allday || (   (s.st.hour>=option.hoursStart) && (s.st.hour<=option.hoursEnd)   ))
                          //if ( filter=="" || (filter!="" && ((option.rowsByCategory=="dc_locations" && events[j][9]==filter) || (option.rowsByCategory=="dc_subjects" && events[j][1]==filter)) ) )
                            fE.push(s);
                    }
                }
                else
                {
                    var s = {};
                    s.event = events[j];
                    s.day = sD.getDate();
                    s.year = sD.getFullYear();
                    s.month = sD.getMonth() + 1;
                    if (option.rowsList=="" || (option.dayWithTime && option.view=="day"))
                        s.allday = events[j][4] == 1;
                    else
                        s.allday = 1;
                    s.crossday = events[j][5] == 1;
                    s.reevent = events[j][6];// == 1; //Recurring event
                    s.daystr = [s.year, s.month, s.day].join("/");
                    s.st = {};
                    s.st.hour = sD.getHours();
                    s.st.minute = sD.getMinutes();
                    s.st.p = s.st.hour * 60 + s.st.minute; // start time
                    s.et = {};
                    s.et.hour = eD.getHours();
                    s.et.minute = eD.getMinutes();
                    s.et.p = s.et.hour * 60 + s.et.minute; // end time
                    if (s.allday || (   (s.st.hour>=option.hoursStart) && (s.st.hour<=option.hoursEnd)   ))
                        if ( filter=="" || (filter!="" && ((option.rowsByCategory=="dc_locations" && events[j][9]==filter) || (option.rowsByCategory=="dc_subjects" && events[j][1]==filter)) ) )
                            fE.push(s);
                }
            }
            var dMax = 0;
            for (var i = 0; i < l; i++) {
                var da = dayarrs[i];
                deA[i] = []; deB[i] = [];
                da.daystr = da.year + "/" + da.month + "/" + da.day;
                for (var j = 0; j < fE.length; j++) {
                    if (!fE[j].crossday && !fE[j].allday) {
                        if (da.daystr == fE[j].daystr)
                            deA[i].push(fE[j]);
                    }
                    else {
                        if (da.daystr == fE[j].daystr) {
                            deB[i].push(fE[j]);
                            dMax++;
                        }
                        else {
                            if (i == 0 && da.date >= fE[j].event[2] && da.date <= fE[j].event[3])//first more-than-one-day event
                            {
                                deB[i].push(fE[j]);
                                dMax++;
                            }
                        }
                    }
                }
            }
            var lrdate = dayarrs[l - 1].date;
            for (var i = 0; i < l; i++) { //to deal with more-than-one-day event
                var de = deB[i];
                if (de.length > 0) { //
                    for (var j = 0; j < de.length; j++) {
                        var end = DateDiff("d", lrdate, de[j].event[3]) > 0 ? lrdate : de[j].event[3];


                        de[j].colSpan = 0;
                        for (var x=dayarrs[i].date;x<=end;x=DateAdd("d", 1, x))
                            de[j].colSpan += __VIEWWEEKDAYS[x.getDay()];

                        //de[j].colSpan = DateDiff("d", dayarrs[i].date, end) + 1;
                    }
                }
                de = null;
            }
            //for all-day events
            for (var i = 0; i < l; i++) {
                var de = deA[i];
                if (de.length > 0) {
                    var x = [];
                    var y = [];
                    var D = [];
                    var dl = de.length;
                    var Ia;
                    for (var j = 0; j < dl; ++j) {
                        var ge = de[j];
                        for (var La = ge.st.p, Ia = 0; y[Ia] > La; ) Ia++;
                        ge.PO = Ia; ge.ne = []; //PO is how many events before this one
                        y[Ia] = ge.et.p || 1440;
                        x[Ia] = ge;
                        if (!D[Ia]) {
                            D[Ia] = [];
                        }
                        D[Ia].push(ge);
                        if (Ia != 0) {
                            ge.pe = [x[Ia - 1]]; //previous event
                            x[Ia - 1].ne.push(ge); //next event
                        }
                        for (Ia = Ia + 1; y[Ia] <= La; ) Ia++;
                        if (x[Ia]) {
                            var k = x[Ia];
                            ge.ne.push(k);
                            k.pe.push(ge);
                        }
                        ge.width = 1 / (ge.PO + 1);
                        ge.left = 1 - ge.width;
                    }
                    var k = Array.prototype.concat.apply([], D);
                    x = y = D = null;
                    var t = k.length;
                    for (var y = t; y--; ) {
                        var H = 1;
                        var La = 0;
                        var x = k[y];
                        for (var D = x.ne.length; D--; ) {
                            var Ia = x.ne[D];
                            La = Math.max(La, Ia.VL);
                            H = Math.min(H, Ia.left)
                        }
                        x.VL = La + 1;
                        x.width = H / (x.PO + 1);
                        x.left = H - x.width;
                    }
                    for (var y = 0; y < t; y++) {
                        var x = k[y];
                        x.left = 0;
                        if (x.pe) for (var D = x.pe.length; D--; ) {
                            var H = x.pe[D];
                            x.left = Math.max(x.left, H.left + H.width);
                        }
                        var p = (1 - x.left) / x.VL;
                        x.width = Math.max(x.width, p);
                        x.aQ = Math.min(1 - x.left, x.width + 0.7 * p); //width offset
                    }
                    de = null;
                    deA[i] = k;
                }
            }
            return dMax;
        }
        function BuildWTHeader(ht, dayarrs) {
            //1:
            //ht.push("<tr>", "<th width=\""+option.hourswidth+"\" rowspan=\"3\">&nbsp;</th>");
            for (var i = 0; i < dayarrs.length; i++) {
                var ev, title, cl;
                if (dayarrs.length == 1) {
                    ev = "";
                    title = "";
                    cl = "";
                }
                else {
                    ev = ""; // "onclick=\"javascript:FunProxy('week2day',event,this);\"";
                    title = i18n.dcmvcal.to_date_view;
                    cl = "wk-daylink";
                }
                if (dayarrs.length == 1 || __VIEWWEEKDAYS[dayarrs[i].date.getDay()])
                    ht.push("<th abbr='", dateFormat.call(dayarrs[i].date, "M/d/yyyy"), "' class='gcweekname' scope=\"col\"><div title='", title, "' ", ev, " class='wk-dayname'><span class='", cl, "'>", dayarrs[i].display, "</span></div></th>");

            }
            //ht.push("<th width=\"16\" rowspan=\"3\">&nbsp;</th>");
            //ht.push("</tr>"); //end tr1;
        }
        function BuildWTBodyDayWithCol(ht, dayarrs, events, dMax,config,sufix) {
            var xx = sufix;
            ht.push("<td colspan=\""+option.columnsList.length+"\" class=\"wk-allday\"");
            ht.push("><div id=\"weekViewAllDaywk"+config.thecontainer+sufix+"\"><table class=\"st-grid\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\" ><tbody>");
            sufix = ' row="'+sufix+'"';

            if (dMax == 0) {
                ht.push("<tr class=\"wk-allday-last\">");
                for (var i=0;i<option.columnsList.length;i++)
                    ht.push("<td  class=\"st-c st-s\"", " ch='qkadd' abbr='", dateFormat.call(dayarrs[0].date, "yyyy-M-d"), "' axis='00:00'>&nbsp;</td>");
                ht.push("</tr>");
            }
            else  {
                var l = events.length;
                var el = 0;
                var x = [];
                for (var j = 0; j < l; j++) {
                    x.push(0);
                }
                var ev = new Array();
                var evlength = 0;

                for (var j = 0; ((el < dMax) && (j < dMax)); j++) {
                    for (var h = 0; h < l; ) {
                        var e = events[h][x[h]];
                        for (var ii=0;ii<option.columnsList.length;ii++)
                        {
                            if (e) { //if exists
                                if ( ((option.dayWithColumns=="dc_locations" && e.event[9]==option.columnsList[ii]) || (option.dayWithColumns=="dc_subjects" && e.event[1]==option.columnsList[ii])) )
                                {
                                    x[h] = x[h] + 1;
                                    var t = BuildMonthDayEvent(e, dayarrs[h].date, l - h);
                                    if (!ev[ii]) ev[ii] = new Array();
                                    ev[ii][ev[ii].length] = "<td class='st-c' ch='show'>"+ t + "</td>";;
                                    if (ev[ii].length > evlength)
                                        evlength = ev[ii].length;
                                    el++;
                                }
                            }

                        }
                        h++;
                    }
                }
                for (var j = 0; j < evlength; j++)
                {
                    ht.push("<tr>");
                    for (var ii=0;ii<option.columnsList.length;ii++)
                        if (ev[ii] && ev[ii][j])
                            ht.push(ev[ii][j]);
                        else
                            ht.push("<td class='st-c' ch='show'>&nbsp;</td>");
                    ht.push("<tr>");

                }
                ht.push("<tr height=\"100%\" class=\"wk-allday-last\">");
                for (var ii=0;ii<option.columnsList.length;ii++)
                    for (var h = 0; h < l; h++) {
                        ht.push("<td height=\"100%\" class='st-c st-s' ch='qkadd' abbr='", dateFormat.call(dayarrs[h].date, "M/d/yyyy"), "' axis='00:00'>&nbsp;</td>");
                    }
                ht.push("</tr>");
            }
            ht.push("</tbody></table></div></td></tr>"); // stgrid end //wvAd end //td2 end //tr2 end
            //3:
            ht.push("<tr>");
            ht.push("<td style=\"height: 5px;\"");
            if (dayarrs.length > 1) {
                if (option.view == "week")
                    ht.push(" colSpan='",__VIEWWEEKDAYSTOTAL+2, "'");
                else
                    ht.push(" colSpan='",option.nOfDays+2, "'");
            }
            ht.push("></td>");
            ht.push("</tr>");
        }
        function BuildWTBody(ht, dayarrs, events, dMax,config,sufix) {
            //2:
            var sufixIndex = sufix;
            ht.push("<td  class=\"wk-allday\"");
            if (dayarrs.length > 1) {
                if (option.view == "week")
                    ht.push(" colSpan='",__VIEWWEEKDAYSTOTAL, "'"); //dayarrs.length
                else
                    ht.push(" colSpan='",option.nOfDays, "'"); //dayarrs.length
            }
            //onclick=\"javascript:FunProxy('rowhandler',event,this);\"
            ht.push("><div id=\"weekViewAllDaywk"+config.thecontainer+sufix+"\"><table class=\"st-grid\" height=\"100%\" cellpadding=\"0\" cellspacing=\"0\" ><tbody>");
            sufix = ' row="'+sufix+'"';
            if (dMax == 0) {
                ht.push("<tr class=\"wk-allday-last\">");
                for (var i = 0; i < dayarrs.length; i++) {
                    if (__VIEWWEEKDAYS[i]!=0)

                        ht.push("<td  class=\"st-c st-s\"", " ch='qkadd' abbr='", dateFormat.call(dayarrs[i].date, "yyyy-M-d"), "' axis='00:00'>&nbsp;</td>");

                }
                ht.push("</tr>");
            }
            else {
                var l = events.length;
                var el = 0;
                var x = [];
                for (var j = 0; j < l; j++) {
                    x.push(0);
                }
                //var c = tc();
                var rowsByCategoryArray = new Array();
                for (var j = 0; ((el < dMax) && (j < dMax)); j++) {
                    ht.push("<tr>");
                    for (var h = 0; h < l; ) {
                        var e = events[h][x[h]];
                        var tmp_h = h;
                        if (__VIEWWEEKDAYS[((dayarrs[tmp_h].date.getDay())%option.nOfDays)]!=0) ht.push("<td class='st-c");
                        if ((e) && ( (option.rowsByCategory=="") || ( (option.rowsByCategory=="dc_locations" && e.event[9]==option.rowsList[sufixIndex] && ($.inArray( e.event[0], rowsByCategoryArray)==-1 || e.event[6]!="") ) || (option.rowsByCategory=="dc_subjects" && e.event[1]==option.rowsList[sufixIndex] && ($.inArray( e.event[0], rowsByCategoryArray)==-1 || e.event[6]!="") ) ) ))
                        {
                            rowsByCategoryArray[rowsByCategoryArray.length]=e.event[0];
                            x[h] = x[h] + 1;
                            if (__VIEWWEEKDAYS[((dayarrs[tmp_h].date.getDay())%option.nOfDays)]!=0) ht.push("'");

                            var t = BuildMonthDayEvent(e, dayarrs[h].date, l - h);
                            if (sufix!="")
                                t = t.replace('class="rb-o', sufix+' class="rb-o');
                            if (e.colSpan > 1) {
                                if (__VIEWWEEKDAYS[((dayarrs[tmp_h].date.getDay())%option.nOfDays)]!=0) ht.push(" colSpan='", e.colSpan, "'");

                                var zz = 0;
                                for (var p=0; (p<e.colSpan) && (h+zz < option.nOfDays);)
                                {
                                    p += __VIEWWEEKDAYS[dayarrs[h+zz].date.getDay()];
                                    zz++;
                                }

                                h += zz;
                            }
                            else {
                                h++;
                            }
                            if (__VIEWWEEKDAYS[((dayarrs[tmp_h].date.getDay())%option.nOfDays)]!=0) ht.push(" ch='show'>", t);
                            t = null;
                            el++;
                        }
                        else {
                            if (__VIEWWEEKDAYS[((dayarrs[tmp_h].date.getDay())%option.nOfDays)]!=0) ht.push(" st-s' ch='qkadd' abbr='", dateFormat.call(dayarrs[h].date, "M/d/yyyy"), "' axis='00:00'>&nbsp;");
                            h++;
                        }
                        if (__VIEWWEEKDAYS[((dayarrs[tmp_h].date.getDay())%option.nOfDays)]!=0) ht.push("</td>");
                    }
                    ht.push("</tr>");
                }
                ht.push("<tr height=\"100%\" class=\"wk-allday-last\">");
                for (var h = 0; h < l; h++) {
                    if (__VIEWWEEKDAYS[((dayarrs[h].date.getDay())%option.nOfDays)]!=0)
                        ht.push("<td height=\"100%\" class='st-c st-s' ch='qkadd' abbr='", dateFormat.call(dayarrs[h].date, "M/d/yyyy"), "' axis='00:00'>&nbsp;</td>");
                }
                ht.push("</tr>");
            }
            ht.push("</tbody></table></div></td></tr>"); // stgrid end //wvAd end //td2 end //tr2 end
            //3:
            ht.push("<tr>");
            ht.push("<td style=\"height: 5px;\"");
            if (dayarrs.length > 1) {
                if (option.view == "week")
                    ht.push(" colSpan='",__VIEWWEEKDAYSTOTAL+2, "'");
                else
                    ht.push(" colSpan='",option.nOfDays+2, "'");
            }
            ht.push("></td>");
            ht.push("</tr>");
        }

        function BuildDayScollEventheader(ht, dayarrs, events,config) {
            //1:
            ht.push("<tr>");
            ht.push("<td style='width:"+option.hourswidth+"px;'></td>");
            ht.push("<td");
            if (dayarrs.length > 1) {
                if (option.view == "week")
                    ht.push(" colSpan='",__VIEWWEEKDAYSTOTAL, "'");
                else
                    ht.push(" colSpan='",option.nOfDays, "'");
            }
            else if (option.columnsList!="" && option.view=="day")
                ht.push(" colSpan='",option.columnsList.length, "'");

            ht.push(" ><div id=\"tgspanningwrapper"+config.thecontainer+"\" class=\"tg-spanningwrapper\"><div style=\"font-size: 20px\" class=\"tg-hourmarkers\">");
            var hh = (option.cellheight/2)  ;
            for (var i = option.hoursStart; i <= option.hoursEnd; i++) {
            //for (var i = 0; i < 24; i++) {
                ht.push("<div class=\"tg-dualmarker\"style=\"height:"+(option.cellheight-hh)+"px;line-height:"+(option.cellheight-hh)+"px;margin-bottom:"+hh+"px\"></div>");
            }
            ht.push("</div></div></td></tr>");

            //2:
            ht.push("<tr>");
            ht.push("<td style=\"width: "+option.hourswidth+"px\" class=\"tg-times\">");

            //get current time
            var now = new Date(); var h = now.getHours(); var m = now.getMinutes();
            var mHg = gP(h, m) - 4; //make middle alignment vertically
            ht.push("<div id=\"tgnowptr"+config.thecontainer+"\" class=\"tg-nowptr\" style=\"left:0px;top:", mHg, "px\"></div>");
            var tmt = "";
            for (var i = option.hoursStart; i <= option.hoursEnd; i++) {
                tmt = fomartTimeAMPM(i,0,__MilitaryTime);
                ht.push("<div style=\"height: "+(option.cellheight)+"px\" class=\"tg-time\">", tmt, "</div>");
            }
            ht.push("</td>");
        }
        function BuildDayScollEventbody(ht, dayarrs, events,config) {
            var now = new Date(); var h = now.getHours(); var m = now.getMinutes();
            var mHg = gP(h, m) - 4; //make middle alignment vertically
            var l = dayarrs.length;
            for (var i = 0; i < l; i++)
            {
                if (__VIEWWEEKDAYS[dayarrs[i].date.getDay()]!=0)
                {
                    ht.push("<td class=\"tg-col\" ch='qkadd' abbr='", dateFormat.call(dayarrs[i].date, "M/d/yyyy"), "'>");
                    var istoday = dateFormat.call(dayarrs[i].date, "yyyyMMdd") == dateFormat.call(new Date(), "yyyyMMdd");
                    // Today
                    if (istoday) {
                        ht.push("<div style=\"margin-bottom: -"+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px; height:"+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px\" class=\"tg-today\"></div>");
                    }
                    //var eventC = $(eventWrap);
                    //onclick=\"javascript:FunProxy('rowhandler',event,this);\"
                    ht.push("<div  style=\"margin-bottom: -"+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px; height: "+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px\" id='tgCol"+config.thecontainer+"", i, "' class=\"tg-col-eventwrapper\">");
                    BuildEvents(ht, events[i], dayarrs[i]);
                    ht.push("</div>");

                    ht.push("<div class=\"tg-col-overlaywrapper\" id='tgOver"+config.thecontainer+"", i, "'>");
                    if (istoday) {
                        var mhh = mHg + 4;
                        ht.push("<div id=\"tgnowmarker"+config.thecontainer+"\" class=\"tg-hourmarker tg-nowmarker\" style=\"left:0px;top:", mhh, "px\"></div>");
                    }
                    ht.push("</div>");
                    ht.push("</td>");
                }
            }
            ht.push("</tr>");
        }
        function BuildDayScollEventbodyWithCol(ht, dayarrs, events,config) {
            var i = 0;
            //for (var j = 0; j < events[i].length; j++)
            //    alert(events[i][j].event[1]+"--------"+events[i][j].event[9]);
            var now = new Date(); var h = now.getHours(); var m = now.getMinutes();
            var mHg = gP(h, m) - 4; //make middle alignment vertically
            var l = dayarrs.length;
            var i = 0;
            {
                for (var ii=0;ii<option.columnsList.length;ii++)
                {
                    ht.push("<td class=\"tg-col\" ch='qkadd' col='"+option.columnsList[ii]+"' abbr='", dateFormat.call(dayarrs[i].date, "M/d/yyyy"), "'>");
                    var istoday = dateFormat.call(dayarrs[i].date, "yyyyMMdd") == dateFormat.call(new Date(), "yyyyMMdd");
                    // Today
                    if (istoday) {
                        ht.push("<div style=\"margin-bottom: -"+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px; height:"+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px\" class=\"tg-today\"></div>");
                    }
                    ht.push("<div  style=\"margin-bottom: -"+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px; height: "+((option.hoursEnd-option.hoursStart+1)*option.cellheight)+"px\" id='tgCol"+config.thecontainer+"", i, "' class=\"tg-col-eventwrapper\">");
                    var eventbyColumns = new Array();
                    for (var j = 0; j < events[i].length; j++)
                    {
                        var e = events[i][j];
                        e.left = 0;
                        e.aQ = 1;
                        //alert(e);
                        if ( ((option.dayWithColumns=="dc_locations" && e.event[9]==option.columnsList[ii]) || (option.dayWithColumns=="dc_subjects" && e.event[1]==option.columnsList[ii])) )
                            eventbyColumns[eventbyColumns.length] = e;

                    }
                    BuildEvents(ht, eventbyColumns, dayarrs[i]);
                    ht.push("</div>");

                    ht.push("<div class=\"tg-col-overlaywrapper\" id='tgOver"+config.thecontainer+"", i, "'>");
                    if (istoday) {
                        var mhh = mHg + 4;
                        ht.push("<div id=\"tgnowmarker"+config.thecontainer+"\" class=\"tg-hourmarker tg-nowmarker\" style=\"left:0px;top:", mhh, "px\"></div>");
                    }
                    ht.push("</div>");
                    ht.push("</td>");
                }
            }
            ht.push("</tr>");
        }

        //show events to calendar
        function BuildEvents(hv, events, sday) {
            for (var i = 0; i < events.length; i++) {
                var c;
                //if (events[i].event[7] && events[i].event[7] >= 0) {
                    c = tc(events[i].event[7]); //theme
                //}
                //else {
                //    c = tc(); //default theme
                //}
                var tt = BuildDayEvent(c, events[i], i);

                hv.push(tt);
            }
        }
        function getTitle(event) {
            var timeshow, locationshow, attendsshow, eventshow;
            var showtime = event[4] != 1;
            eventshow = event[1];
            var startformat = getymformat(event[2], null, showtime, true);
            var endformat = getymformat(event[3], event[2], showtime, true);
            timeshow = dateFormat.call(event[2], startformat) + " - " + dateFormat.call(event[3], endformat);
            locationshow = (event[9] != undefined && event[9] != "") ? ($.browser.mozilla?"":"\r\n")+i18n.dcmvcal.location + ":" + event[9] : "";
            attendsshow = (event[10] != undefined && event[10] != "") ? event[10] : "";
            var ret = [];
            if (event[4] == 1) {
                ret.push("[" + i18n.dcmvcal.allday_event + "]",$.browser.mozilla?"":"\r\n" );
            }
            else {
                if (event[5] == 1) {
                    ret.push("[" + i18n.dcmvcal.repeat_event + "]",$.browser.mozilla?"":"\r\n");
                }
            }
            ret.push(i18n.dcmvcal.time + ":", timeshow, $.browser.mozilla?"":"\r\n", i18n.dcmvcal.event + ":", eventshow, locationshow);
            if (attendsshow != "") {
                ret.push($.browser.mozilla?"":"\r\n", i18n.dcmvcal.participant + ":", attendsshow);
            }
            return ret.join("");
        }
        function BuildDayEvent(theme, e, index) {

            var p = { bdcolor: theme[0], bgcolor2: theme[0], bgcolor1: theme[2], width: "70%", icon: "", title: "", data: "" };

            if (e.noStarttime)
                p.starttime = "";
            else
                p.starttime = fomartTimeAMPM(e.st.hour,e.st.minute,__MilitaryTime);
            if (e.noResizer)
                p.endtime = "";
            else
                p.endtime = fomartTimeAMPM(e.et.hour,e.et.minute,__MilitaryTime);
            p.content = e.event[1];
            p.title = getTitle(e.event);
            p.data = e.event.join("$*$");
            var icons = [];
            icons.push("<I class=\"cic cic-tmr\">&nbsp;</I>");
            if (e.reevent) {
                icons.push("<I class=\"cic cic-spcl\">&nbsp;</I>");
            }
            p.icon = icons.join("");
            var sP = gP(e.st.hour, e.st.minute);
            var eP = gP(e.et.hour, e.et.minute);
            p.top = sP + "px";
            p.left = (e.left * 100) + "%";
            p.width = (e.aQ * 100) + "%";
            if (eP==0 && sP>0)
                p.height = (sP - 4);
            else
                p.height = (eP - sP - 4);
            p.i = index;
            if (option.enableDrag && (option.readonly != true && (option.userEdit || ((option.userOwner==e.event[12]) && option.userEditOwner ))) && e.event[8] == 1 && !e.noResizer) {
                p.drag = "drag";
                p.redisplay = "block";
            }
            else {
                p.drag = "";
                p.redisplay = "none";
            }
            p.userEdition = ( ((option.userOwner==e.event[12]) && (option.userEditOwner || option.userDelOwner))?"uEdition":"" );
            p.location = (e.event[9]!=null)?e.event[9]:"";
            p.description = (e.event[11]!=null)?e.event[11]:"";
            var newtemp = Tp(__SCOLLEVENTTEMP, p);
            p = null;
            return newtemp;
        }

        //get body height in month view
        function GetMonthViewBodyHeight() {
            return option.height;
        }
        function GetMonthViewHeaderHeight() {
            return 26;
        }
        function BuilderMonthBody(htb, showday, startday, events, bodyHeight,config) {
            var firstdate = new Date(showday.getFullYear(), showday.getMonth(), 1);
            var diffday = startday - firstdate.getDay();
            var showmonth = showday.getMonth();
            if (diffday > 0) {
                diffday -= 7;
            }
            var startdate = DateAdd("d", diffday, firstdate);
            var enddate = DateAdd("d", 34, startdate);
            var rc = 5;

            if (enddate.getFullYear() == showday.getFullYear() && enddate.getMonth() == showday.getMonth() && enddate.getDate() < __MonthDays[showmonth]) {
                enddate = DateAdd("d", 7, enddate);
                rc = 6;
            }
            option.vstart = startdate;
            option.vend = enddate;
            var themonth = DateAdd("d", 15, startdate);
            option.datestrshow = __MonthNameLarge[themonth.getMonth()]+" "+themonth.getFullYear() ;//CalDateShow(startdate, enddate);
            bodyHeight = bodyHeight - 18 * rc;
            var rowheight = bodyHeight / rc;
            var roweventcount = parseInt(rowheight / (option.cellheight/2) /*21*/);
            if (rowheight % (option.cellheight/2) /*21*/ > 15) {
                roweventcount++;
            }
            if (roweventcount==0) roweventcount++;
            var p = 100 / rc;
            var formatevents = [];
            var hastdata = formartEventsInHashtable(events, startday, 7, startdate, enddate);
            var B = [];
            var C = [];
            for (var j = 0; j < rc; j++) {
                var k = 0;
                formatevents[j] = b = [];
                for (var i = 0; i < 7; i++) {
                    var newkeyDate = DateAdd("d", j * 7 + i, startdate);
                    C[j * 7 + i] = newkeyDate;
                    var newkey = dateFormat.call(newkeyDate, "MMddyyyy");
                    b[i] = hastdata[newkey];
                    if (b[i] && b[i].length > 0) {
                        k += b[i].length;
                    }

                }
                B[j] = k;
            }

            //var c = tc();
            eventDiv.data("mvdata", formatevents);
            for (var j = 0; j < rc; j++) {
                //onclick=\"javascript:FunProxy('rowhandler',event,this);\"
                htb.push("<div id='mvrow"+config.thecontainer+"_", j, "' style=\"HEIGHT:", p, "%; TOP:", p * j, "%\"  class=\"month-row\">");
                htb.push("<table class=\"st-bg-table\" cellSpacing=\"0\" cellPadding=\"0\"><tbody><tr>");
                var dMax = B[j];

                for (var iweek = config.weekstartday,i = 0; i < 7; iweek++,i++) {
                	  if (iweek > 6) iweek = 0;
                    var day = C[j * 7 + i];
                    if (__VIEWWEEKDAYS[iweek]!=0)
                    {
                        htb.push("<td display=\""+__VIEWWEEKDAYS[iweek]+"\" abbr='", dateFormat.call(day, "M/d/yyyy"), "' ch='qkadd' axis='00:00' title=''");

                        if (dateFormat.call(day, "yyyyMMdd") == dateFormat.call(new Date(), "yyyyMMdd")) {
                            htb.push(" class=\"st-bg st-bg-today\">");
                        }
                        else {
                            htb.push(" class=\"st-bg\">");
                        }
                        htb.push("&nbsp;</td>");
                    }
                }
                //bgtable
                htb.push("</tr></tbody></table>");

                //stgrid
                htb.push("<table class=\"st-grid\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");

                //title tr
                htb.push("<tr>");
                var titletemp = "<td display=\"${display}\" class=\"st-dtitle${titleClass}\" ch='qkadd' abbr='${abbr}' axis='00:00' title=\"${title}\"><span class='monthdayshow'>${dayshow}</span></a></td>";

                for (var i = 0; i < 7; i++) {
                    var o = { titleClass: "", dayshow: "", display:__VIEWWEEKDAYS[(startday+i)%7]+"i"+i };
                    var day = C[j * 7 + i];
                    if (dateFormat.call(day, "yyyyMMdd") == dateFormat.call(new Date(), "yyyyMMdd")) {
                        o.titleClass = " st-dtitle-today";
                    }
                    if (day.getMonth() != showmonth) {
                        o.titleClass = " st-dtitle-nonmonth";
                    }
                    o.title = dateFormat.call(day, i18n.dcmvcal.dateformat.fulldayshow);
                    if (day.getDate() == 1) {
                        if (day.getMonth == 0) {
                            o.dayshow = dateFormat.call(day, i18n.dcmvcal.dateformat.fulldayshow);
                        }
                        else {
                            o.dayshow = dateFormat.call(day, i18n.dcmvcal.dateformat.Md3);
                        }
                    }
                    else {
                        o.dayshow = day.getDate();
                    }
                    o.abbr = dateFormat.call(day, "M/d/yyyy");
                    if (__VIEWWEEKDAYS[(startday+i)%7]!=0)
                        htb.push(Tp(titletemp, o));
                }
                htb.push("</tr>");
                var sfirstday = C[j * 7];
                BuildMonthRow(htb, formatevents[j], dMax, roweventcount, sfirstday,startday);
                //htb=htb.concat(rowHtml); rowHtml = null;

                htb.push("</tbody></table>");
                //month-row
                htb.push("</div>");
            }

            formatevents = B = C = hastdata = null;
            //return htb;
        }

        //formate datetime
        function formartEventsInHashtable(events, startday, daylength, rbdate, redate) {
            var hast = new Object();
            var l = events.length;


            for (var i = 0; i < l; i++) {
                var sD = events[i][2];
                var eD = events[i][3];
                var diff = DateDiff("d", sD, eD);
                var s = {};
                s.event = events[i];
                s.day = sD.getDate();
                s.year = sD.getFullYear();
                s.month = sD.getMonth() + 1;
                s.allday = events[i][4] == 1;
                s.crossday = events[i][5] == 1;
                s.reevent = events[i][6];// == 1; //Recurring event
                s.daystr = s.year + "/" + s.month + "/" + s.day;
                s.st = {};
                s.st.hour = sD.getHours();
                s.st.minute = sD.getMinutes();
                s.st.p = s.st.hour * 60 + s.st.minute; // start time position
                s.et = {};
                s.et.hour = eD.getHours();
                s.et.minute = eD.getMinutes();
                s.et.p = s.et.hour * 60 + s.et.minute; // end time postition

                if (diff > 0) {
                    if (sD < rbdate) { //start date out of range
                        sD = rbdate;
                    }
                    if (eD > redate) { //end date out of range
                        eD = redate;
                    }
                    var f = startday - sD.getDay();
                    if (f > 0) { f -= daylength; }
                    sD = new Date(sD.getFullYear(), sD.getMonth(), sD.getDate());
                    var sdtemp = DateAdd("d", f, sD);

                    for (; sdtemp <= eD; sD = sdtemp = DateAdd("d", daylength, sdtemp)) {
                        var d = Clone(s);

                        while (!__VIEWWEEKDAYS[sD.getDay()] && sdtemp <= eD)
                        {
                            sD = DateAdd("d", 1, sD);
                        }

                        var key = dateFormat.call(sD, "MMddyyyy");

                        var x = DateDiff("d", sdtemp, eD);
                        var y = DateDiff("d", sdtemp, sD);
                        if (hast[key] == null) {
                            hast[key] = [];
                        }
                        //d.colSpan = (x >= daylength) ? daylength - DateDiff("d", sdtemp, sD) : DateDiff("d", sD, eD) + 1;
                        if (x >= daylength)
                        {
                            if (y==0)
                                d.colSpan = __VIEWWEEKDAYSTOTAL
                            else
                            {
                                var sdtemp2 = DateAdd("d", daylength, sdtemp);
                                d.colSpan = 0;

                                for (var x=sD;x<sdtemp2;x=DateAdd("d", 1, x))
                                    d.colSpan += __VIEWWEEKDAYS[x.getDay()];
                            }
                        }
                        else
                        {
                            d.colSpan = 0;
                            for (var x=sD;x<=eD;x=DateAdd("d", 1, x))
                                d.colSpan += __VIEWWEEKDAYS[x.getDay()];
                        }
                        if (d.colSpan > 0)
                            hast[key].push(d);
                        d = null;
                    }
                }
                else {
                    var key = dateFormat.call(events[i][2], "MMddyyyy");
                    if (hast[key] == null) {
                        hast[key] = [];
                    }
                    s.colSpan = 1;
                    hast[key].push(s);
                }
                s = null;
            }
            return hast;
        }
        function BuildMonthRow(htr, events, dMax, sc, day,startday) {
            var x = [];
            var y = [];
            var z = [];
            var cday = [];
            if (__VIEWWEEKDAYSTOTAL!=events.length)
            {
            	  var clone = __VIEWWEEKDAYS.slice(0);
            	  var clone_start = clone.splice(0,startday);
            	  clone = clone.concat(clone_start);
                for (var i=6;i>=0;i--)
                    if (clone[i]==0)
                        events.splice(i,1);
            }
            var l = events.length;
            var maxEventsRow = 0;
            for (var i=0;i<l;i++)
                if (events[i] && maxEventsRow<events[i].length)
                    maxEventsRow = events[i].length;
            sc = maxEventsRow+1;        
            var el = 0;
            //var c = tc();
            for (var j = 0; j < l; j++) {
                x.push(0);
                y.push(0);
                z.push(0);
                cday.push(DateAdd("d", j, day));
            }
            for (var j = 0; j < l; j++) {
                var ec = events[j] ? events[j].length : 0;
                y[j] += ec;
                for (var k = 0; k < ec; k++) {
                    var e = events[j][k];
                    //alert(e.colSpan);
                    if (e && e.colSpan > 1) {
                        for (var m = 1; m < e.colSpan; m++) {
                            y[j + m]++;
                        }
                    }
                }
            }
            //var htr=[];
            var tdtemp = "<td class='${cssclass}' display='${display}' axis='${axis}' ch='${ch}' abbr='${abbr}' title='${title}' ${otherAttr}>${html}</td>";
            var tmp_h = 0;
            for (var j = 0; j < sc && el < dMax; j++) {
                htr.push("<tr class='mv_month_row' maxEventsRow='"+maxEventsRow+"'>");
                //var gridtr = $(__TRTEMP);
                for (var h = 0; h < l; ) {
                    var cdisplay = 0;
                    var e = events[h] ? events[h][x[h]] : undefined;
                    var tempdata = { "class": "", axis: "", ch: "", title: "", abbr: "", html: "", otherAttr: "", click: "javascript:void(0);" };
                    var tempCss = ["st-c"];
                    if (e)
                    {
                        x[h] = x[h] + 1;
                        //last event of the day
                        var bs = false;
                        if (z[h] + 1 == y[h] && e.colSpan == 1) {
                            bs = true;
                        }
                        if (!bs && j == (sc - 1) && z[h] < y[h]) {
                            el++;//here
                            $.extend(tempdata, { "axis": h, ch: "more", "abbr": dateFormat.call(cday[h], "M/d/yyyy"), html: i18n.dcmvcal.others + " " + (y[h] - z[h]) + i18n.dcmvcal.item, click: "javascript:alert('more event');" });
                            tempCss.push("st-more st-moreul");
                            h++;
                        }
                        else {
                            tempdata.html = BuildMonthDayEvent(e, cday[h], l - h);
                            tempdata.ch = "show";
                            if (e.colSpan > 1) {
                                tempdata.otherAttr = " colSpan='" + e.colSpan + "'";
                                for (var m = 0; m < e.colSpan; m++) {
                                    z[h + m] = z[h + m] + 1;
                                }

                                var zz = 0;
                                for (var p=0; p<e.colSpan;)
                                {
                                    p += __VIEWWEEKDAYS[cday[h+zz].getDay()];
                                    zz++;
                                }

                                h += zz;

                            }
                            else {
                                z[h] = z[h] + 1;
                                h++;
                            }
                            el++;
                        }
                    }
                    else {
                        if (j == (sc - 1) && z[h] < y[h] && y[h] > 0) {
                            $.extend(tempdata, { "axis": h, ch: "more", "abbr": dateFormat.call(cday[h], "M/d/yyyy"), html: i18n.dcmvcal.others + " " + (y[h] - z[h]) + i18n.dcmvcal.item, click: "javascript:alert('more event');" });
                            tempCss.push("st-more st-moreul");
                            h++;
                        }
                        else {
                            cdisplay = 1;
                            $.extend(tempdata, { html: "&nbsp;", ch: "qkadd", display:1, "axis": "00:00", "abbr": dateFormat.call(cday[h], "M/d/yyyy"), title: "" });
                            tempCss.push("st-s");
                            tmp_h = h;
                            h++;
                        }
                    }
                    tempdata.cssclass = tempCss.join(" ");
                    tempCss = null;
                    if (cdisplay==0)
                        htr.push(Tp(tdtemp, tempdata));
                    else
                        if (__VIEWWEEKDAYS[((cday[tmp_h].getDay())%7)]!=0)
                            htr.push(Tp(tdtemp, tempdata));

                    tempdata = null;
                }
                htr.push("</tr>");
            }
            x = y = z = cday = null;
            //return htr;
        }
        function BuildMonthDayEvent(e, cday, length) {
            var theme;
            //if (e.event[7] && e.event[7] >= 0) {
                theme = tc(e.event[7]);
            //}
            //else {
            //    theme = tc();
            //}
            var p = { color: theme[2], title: "", extendClass: "", extendHTML: "", data: "" };

            p.title = getTitle(e.event);
            p.id = "bbit_cal_event_" + e.event[0];
            if (option.enableDrag && (option.readonly != true && (option.userEdit || ((option.userOwner==e.event[12]) && option.userEditOwner ))) && e.event[8] == 1) {
                p.eclass = "drag";
            }
            else {
                p.eclass = "cal_" + e.event[0];
            }
            p.data = e.event.join("$*$");
            var sp = "<span style=\"cursor: pointer\">${content}</span>";
            var i = "<I class=\"cic cic-tmr\">&nbsp;</I>";
            var i2 = "<I class=\"cic cic-rcr\">&nbsp;</I>";
            var ml = "<div class=\"st-ad-ml\"></div>";
            var mr = "<div class=\"st-ad-mr\"></div>";
            var arrm = [];
            var sf = e.event[2] < cday;
            var ef = DateDiff("d", cday, e.event[3]) >= length;  //e.event[3] >= DateAdd("d", 1, cday);
            if (sf || ef) {
                if (sf) {
                    arrm.push(ml);
                    p.extendClass = "st-ad-mpad ";
                }
                if (ef)
                { arrm.push(mr); }
                p.extendHTML = arrm.join("");

            }
            var cen;
            if (!e.allday && !sf) {
                cen = "<span class=\"t-time\">" + fomartTimeAMPM(e.st.hour,e.st.minute,__MilitaryTime) + "</span> " + e.event[1];
            }
            else {
                cen = e.event[1];
            }
            var content = [];
            content.push(Tp(sp, { content: cen }));
            content.push(i);
            if (e.reevent)
            { content.push(i2); }
            p.content = content.join("");
            p.location = (e.event[9]!=null)?e.event[9]:"";
            p.description = (e.event[11]!=null)?e.event[11]:"";
            p.userEdition = ( ((option.userOwner==e.event[12]) && (option.userEditOwner || option.userDelOwner))?"uEdition":"" );

            return Tp(__ALLDAYEVENTTEMP, p);
        }
        //to populate the data
        function populate() {
            if (option.isloading) {
                return true;
            }
            if (option.url && option.url != "") {
                option.isloading = true;
                //clearcontainer();
                if (option.onBeforeRequestData && $.isFunction(option.onBeforeRequestData)) {
                    option.onBeforeRequestData(1);
                }
                var zone = new Date().getTimezoneOffset() / 60 * -1;
                var param = [
                { name: "showdate", value: dateFormat.call(option.showday, "M/d/yyyy HH:mm") },
                { name: "startdate", value: dateFormat.call(option.vstart, "M/d/yyyy HH:mm") },
                { name: "enddate", value: dateFormat.call(option.vend, "M/d/yyyy HH:mm") },
                { name: "viewtype", value: option.view },
                { name: "list_start", value: option.list_start },
                { name: "list_end", value: option.list_end },
                { name: "list_eventsPerPage", value: option.list_eventsPerPage },
                { name: "lastdate", value: ((option.lastdate=="")?"":dateFormat.call(option.lastdate, "M/d/yyyy HH:mm")) },
                { name: "list_order", value: option.list_order },
				 { name: "timezone", value: zone }
                ];
                if (option.extParam) {
                    for (var pi = 0; pi < option.extParam.length; pi++) {
                        param[param.length] = option.extParam[pi];
                    }
                }

                $.ajax({
                    type: option.method, //
                    url: option.url,
                    data: param,
			        //dataType: "text",  // fixed jquery 1.4 not support Ms Date Json Format /Date(@Tickets)/
                    dataType: "json",
                    dataFilter: function(data, type) {
                        //return data.replace(/"\\\/(Date\([0-9-]+\))\\\/"/gi, "new $1");

                        return data;
                      },
                    success: function(data) {//function(datastr) {
						//datastr =datastr.replace(/"\\\/(Date\([0-9-]+\))\\\/"/gi, 'new $1');
                        //var data = (new Function("return " + datastr))();
                        if (data != null && data.error != null) {
                            if (option.onRequestDataError) {
                                option.onRequestDataError(1, data);
                            }
                        }
                        else {
                            try {
                                $.each(data.events, function(index, value) {

                                    value[2] = parseDate(value[2]);
                                    value[3] = parseDate(value[3]);
                                });
                                if (option.view!="list")
                                {
                                    data["start"] = parseDate(data["start"]);
                                    data["end"] = parseDate(data["end"]);
                                }
                                if (option.view=="list" && option.lastdate=="" && option.list_order=="desc" && data.end!="")
                                    option.lastdate  = parseDate(data["end"]);
                                if (option.view=="list" && option.lastdate=="" && option.list_order=="asc" && data.start!="")
                                    option.lastdate  = parseDate(data["start"]);
                                responseData(data, data.start, data.end);
                                if (option.view!="list")
                                    pushER(data.start, data.end);
                            } catch (e) { }
                        }
                        if (option.onAfterRequestData && $.isFunction(option.onAfterRequestData)) {
                            option.onAfterRequestData(1);
                        }
                        option.isloading = false;
                    },
                    error: function(data) {
						try {
                            if (option.onRequestDataError) {
                                option.onRequestDataError(1, data);
                            } else {
                                alert(i18n.dcmvcal.get_data_exception);
                            }
                            if (option.onAfterRequestData && $.isFunction(option.onAfterRequestData)) {
                                option.onAfterRequestData(1);
                            }
                            option.isloading = false;
                        } catch (e) { }
                    }
                });
            }
            else {
                alert("url" + i18n.dcmvcal.i_undefined);
            }
        }
        function responseData(data, start, end) {
            var events,v,r,ne,tmp,tmpArray=new Array(),excludeEventsSpecial=new Array();
            for (var i=0;i<data.events.length;i++)
            {
                excludeEvents=new Array();
                v = data.events[i];
                if (v[6]!="" && v[6] != null && v[6] != undefined)
                {
                    if ( (v[6]+"").match(/^\d+$/) )  //special events between recurring events
                    {
                    	  if (!(excludeEventsSpecial["uid"+v[6]]))
                    	      excludeEventsSpecial["uid"+v[6]] = new Array();
                        excludeEventsSpecial["uid"+v[6]][excludeEventsSpecial["uid"+v[6]].length] = new Date(v[2].getFullYear(), v[2].getMonth(), v[2].getDate()).toString();
                        tmpArray[tmpArray.length] = v.slice(0);
                    }
                    else
                    {
                        if (/;exdate=/i.test(v[6])) // delete event from recurring events
                        {
                             var vv = v[6].split(";exdate=,");
                             v[6] = vv[0];
                             var delEv = vv[1].split(",");
                             for (var j=0;j<delEv.length;j++)
                             {
                                var d = delEv[j].split("/");
                                var iEv = new Date(d[2],d[0]-1,d[1]);
                                excludeEvents[excludeEvents.length]= iEv.toString();
                             }
                        }
                        try
                        {
                            var options = RRule.parseString(v[6]);
                            options.dtstart = v[2];
                            var r = new RRule(options);
                            var diff = v[3]-v[2];
                            if (option.view=="list")
                            {
                                if (option.list_order=="desc")
                                {
                                    ne = r.between( parseDate(start),option.lastdate);
                                    for (var j=0;j<=option.list_eventsPerPage;j++)
                                    {
                                        var thenext = r.before( ne[ne.length-1], false)
                                        if (thenext != null && (start=="" || parseDate(start)<=thenext )&& (end=="" || parseDate(end)>=thenext ))
                                            ne[ne.length] = thenext;
                                    }
                                }
                                else
                                {
                                    if (option.lastdate!="")
                                        ne = r.between(option.lastdate, ((end!="")?parseDate(end):false),true);
                                    else if (start!="")
                                        ne = r.between( parseDate(start), ((end!="")?parseDate(end):false),true);
                                    else
                                        ne = r.between( v[2], ((end!="")?parseDate(end):false),true);
                                    for (var j=0;j<=option.list_eventsPerPage;j++)
                                    {
                                        var thenext = r.after( ne[ne.length-1], false)
                                        if (thenext != null && (start=="" || parseDate(start)<=thenext )&& (end=="" || parseDate(end)>=thenext ))
                                            ne[ne.length] = thenext;
                                    }
                                }
                            }
                            else
                                ne = r.between( DateAdd("d", -1, start), DateAdd("d", 1, end));
                            if ((excludeEventsSpecial["uid"+v[0]]))    
                                excludeEvents =  $.merge(excludeEvents, excludeEventsSpecial["uid"+v[0]]);     
                            for (var j=0;j<ne.length;j++)
                            {
                                var date00 = new Date(ne[j].getFullYear(), ne[j].getMonth(), ne[j].getDate());
                                if (($.inArray(date00.toString(), excludeEvents))==-1)
                                {
                                    ne[j] = new Date(ne[j].getFullYear(), ne[j].getMonth(), ne[j].getDate(),v[2].getHours(),v[2].getMinutes());
                                    tmp = v.slice(0);
                                    tmp[2] = ne[j];
                                    tmp[3] = DateAdd("l", diff , ne[j]);
                                    tmpArray[tmpArray.length] = tmp;
                                }
                            }
                        }catch (e) {}
                    }
                }
                else
                    tmpArray[tmpArray.length] = v.slice(0);
            }
            data.events = tmpArray;
            //if (data.issort == false) {

            //if (option.view!="list"){
                if (data.events && data.events.length > 0) {
                    if (option.view=="list" && option.list_order=="desc")
                        events = data.events.sort(function(l, r) { return ((l[2].toString() == r[2].toString())? (l[0] > r[0] ? -1 : 1) : (l[2] > r[2] ? -1 : 1) ); });
                    else
                        events = data.events.sort(function(l, r) { return ((l[2].toString() == r[2].toString())? (l[0] > r[0] ? 1 : -1) : (l[2] > r[2] ? 1 : -1) ); });
                }
                else {
                    events = [];
                }
            //}
            //else {
            //    events = data.events;
            //}
            if (option.view=="list")
                option.eventItems = [];
            ConcatEvents(events, start, end);
            render();


        }
        function clearrepeat(events, start, end) {
            var jl = events.length;
            if (jl > 0) {
                var es = events[0][2];
                var el = events[jl - 1][2];
                for (var i = 0, l = option.eventItems.length; i < l; i++) {
                    if (option.eventItems[i][2] > el || jl == 0) {
                        break;
                    }

                    if (option.eventItems[i][2] >= es) {
                        for (var j = 0; j < jl; j++) {
                            if (
                                (option.eventItems[i][0] == events[j][0])
                                && (option.eventItems[i][2].toString() == events[j][2].toString())
                                && ((option.eventItems[i][2] < start)
                                    || (option.eventItems[i][2] > end))
                               ) {
                                events.splice(j, 1); //for duplicated event
                                jl--;
                                break;
                            }
                        }
                    }
                }
            }
        }
        function ConcatEvents(events, start, end) {
            if (!events) {
                events = [];
            }
            if (events) {
                if (option.eventItems.length == 0) {
                    option.eventItems = events;
                }
                else {
                    //remove duplicated one
                    clearrepeat(events, start, end);
                    var l = events.length;
                    var sl = option.eventItems.length;
                    var sI = -1;
                    var eI = sl;
                    var s = start;
                    var e = end;
                    if (option.eventItems[0][2] > e)
                    {
                        option.eventItems = events.concat(option.eventItems);
                        return;
                    }
                    if (option.eventItems[sl - 1][2] < s)
                    {
                        option.eventItems = option.eventItems.concat(events);
                        return;
                    }
                    for (var i = 0; i < sl; i++) {
                        if (option.eventItems[i][2] >= s && sI < 0) {
                            sI = i;
                            continue;
                        }
                        if (option.eventItems[i][2] > e) {
                            eI = i;
                            break;
                        }
                    }

                    var e1 = sI <= 0 ? [] : option.eventItems.slice(0, sI);
                    var e2 = eI == sl ? [] : option.eventItems.slice(eI);
                    option.eventItems = [].concat(e1, events, e2);
                    events = e1 = e2 = null;
                }
            }
        }
        //utils goes here
        function weekormonthtoday(e) {
            $('#show'+option.view+"btn"+option.thecontainer).removeClass("ui-state-active");
            var th = $(this);
            var daystr = th.attr("abbr");
            option.showday = str_MdyyyyHHmm_todate(daystr + " 00:00");
            option.view = "day";
            $('#show'+option.view+"btn"+option.thecontainer).addClass("ui-state-active");
            render();
            if (option.onweekormonthtoday) {
                option.onweekormonthtoday(option);
            }
            e.stopPropagation();
        }
        function move_mv_dlg(){
            $(".mv_dlg").css("top",parseFloat($(".mv_dlg").css("top"))+17);
            $(".mv_dlg").css("left",parseFloat($(".mv_dlg").css("left"))-29);
            $(".mv_dlg").css("height","0px");
        }
        function parseDate(str){
            var s = str.split(" ");
            var s0 = s[0].split("/");
            var s1 = s[1].split(":");
            if (s1.length!=2)
                s1 = new Array(0,0);
            return new Date(s0[2]*1, s0[0]*1-1, s0[1]*1,s1[0]*1,s1[1]*1);
        }
        function gP(h, m) {
            //return h * 42 + parseInt(m / 60 * 42);
            if (h>option.hoursEnd)
                return (option.hoursEnd-option.hoursStart+1) * option.cellheight ;
            else
                return (h-option.hoursStart) * option.cellheight + parseInt(m / 60 * option.cellheight);
        }
        function gW(ts1, ts2) {
        	  if (ts1>=ts2)
                ts2 = ts1+ (option.cellheight/2);
            var t1 = ts1 / option.cellheight;
            var t2 = parseInt(t1) + option.hoursStart;
            var t3 = t1 - t2 +option.hoursStart >= 0.5 ? 30 : 0;
            var t4 = ts2 / option.cellheight;
            var t5 = parseInt(t4) + option.hoursStart;
            var t6 = t4 - t5 + option.hoursStart>= 0.5 ? 30 : 0;
            if (t5>23)
            {
                t5 = 23;
                t6 = 30;
            }
            if (t2==t5 && t3==t6)
                if (t3==0)
                    t6 = 30;
                else
                {
                	 t5++;
                	 t6 = 0;
                }     
            return { sh: t2, sm: t3, eh: t5, em: t6, h: ts2 - ts1 };
        }
        function gH(y1, y2, pt) {
            var sy1 = Math.min(y1, y2);
            var sy2 = Math.max(y1, y2);
            var t1 = (sy1 - pt) / option.cellheight;
            var t2 = parseInt(t1) + option.hoursStart;
            var t3 = t1 - t2 +option.hoursStart>= 0.5 ? 30 : 0;
            var t4 = (sy2 - pt) / option.cellheight;
            var t5 = parseInt(t4) + option.hoursStart;
            var t6 = t4 - t5 +option.hoursStart>= 0.5 ? 30 : 0;
            return { sh: t2, sm: t3, eh: t5, em: t6, h: sy2 - sy1 };
        }
        function pZero(n) {
            return n < 10 ? "0" + n : "" + n;
        }
        //to get color list array
        function tc(d) {
            function zc(c, i) {
                var d = "666666888888aaaaaabbbbbbdddddda32929cc3333d96666e69999f0c2c2b1365fdd4477e67399eea2bbf5c7d67a367a994499b373b3cca2cce1c7e15229a36633cc8c66d9b399e6d1c2f029527a336699668cb399b3ccc2d1e12952a33366cc668cd999b3e6c2d1f01b887a22aa9959bfb391d5ccbde6e128754e32926265ad8999c9b1c2dfd00d78131096184cb05288cb8cb8e0ba52880066aa008cbf40b3d580d1e6b388880eaaaa11bfbf4dd5d588e6e6b8ab8b00d6ae00e0c240ebd780f3e7b3be6d00ee8800f2a640f7c480fadcb3b1440edd5511e6804deeaa88f5ccb8865a5aa87070be9494d4b8b8e5d4d47057708c6d8ca992a9c6b6c6ddd3dd4e5d6c6274878997a5b1bac3d0d6db5a69867083a894a2beb8c1d4d4dae54a716c5c8d8785aaa5aec6c3cedddb6e6e41898951a7a77dc4c4a8dcdccb8d6f47b08b59c4a883d8c5ace7dcce";
                return "#" + d.substring(c * 30 + i * 6, c * 30 + (i + 1) * 6);
            }
            var c = d != null && d != undefined ? d : option.theme;
            d = d != null && d != undefined && d != -1 ? d : option.theme;
            if (d=="") d = option.theme;
            return [d,d,d,d];
        }
        function Tp(temp, dataarry) {
            return temp.replace(/\$\{([\w]+)\}/g, function(s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { return s; } else { return s1; } });
        }
        function Ta(temp, dataarry) {
            return temp.replace(/\{([\d])\}/g, function(s1, s2) { var s = dataarry[s2]; if (typeof (s) != "undefined") { return encodeURIComponent(s); } else { return ""; } });
        }
        function fomartTimeShow(h) {
            //return h < 10 ? "0" + h + ":00" : h + ":00";//ampm
            var tmp = ((h%12) < 10) && h!=12 ? "0" + (h%12) + ":00" : (h==12?"12":(h%12))  + ":00";
            tmp += " " + ((h>=12)?"pm":"am");
            return tmp ;
        }

        function getymformat(date, comparedate, isshowtime, isshowweek, showcompare) {
            var showyear = isshowtime != undefined ? (date.getFullYear() != new Date().getFullYear()) : true;
            var showmonth = true;
            var showday = true;
            var showtime = isshowtime || false;
            var showweek = isshowweek || false;
            if (comparedate) {
                showyear = comparedate.getFullYear() != date.getFullYear();
                //showmonth = comparedate.getFullYear() != date.getFullYear() || date.getMonth() != comparedate.getMonth();
                if (comparedate.getFullYear() == date.getFullYear() &&
					date.getMonth() == comparedate.getMonth() &&
					date.getDate() == comparedate.getDate()
					) {
                    showyear = showmonth = showday = showweek = false;
                }
            }

            var a = [];
            if (showyear) {
                a.push(i18n.dcmvcal.dateformat.fulldayshow)
            } else if (showmonth) {
                a.push(i18n.dcmvcal.dateformat.Md3)
            } else if (showday) {
                a.push(i18n.dcmvcal.dateformat.day);
            }
            a.push(showweek ? " (W)" : "", showtime ? " HH:mm" : "");
            return a.join("");
        }
        function CalDateShow(startday, endday, isshowtime, isshowweek) {
            if (!endday) {
                return dateFormat.call(startday, getymformat(startday,null,isshowtime));
            } else {
                var strstart= dateFormat.call(startday, getymformat(startday, null, isshowtime, isshowweek));
				var strend=dateFormat.call(endday, getymformat(endday, startday, isshowtime, isshowweek));
				var join = (strend!=""? " - ":"");
				return [strstart,strend].join(join);
            }
        }

        function dochange() {
            var d = getRdate();
            var loaded = checkInEr(d.start, d.end);
            //if (!loaded)
            {
                populate();
            }
        }

        function checkInEr(start, end) {
            var ll = option.loadDateR.length;
            if (ll == 0) {
                return false;
            }
            var r = false;
            var r2 = false;
            for (var i = 0; i < ll; i++) {
                r = false, r2 = false;
                var dr = option.loadDateR[i];
                if (start >= dr.startdate && start <= dr.enddate) {
                    r = true;
                }
                if (dateFormat.call(start, "yyyyMMdd") == dateFormat.call(dr.startdate, "yyyyMMdd") || dateFormat.call(start, "yyyyMMdd") == dateFormat.call(dr.enddate, "yyyyMMdd")) {
                    r = true;
                }
                if (!end)
                { r2 = true; }
                else {
                    if (end >= dr.startdate && end <= dr.enddate) {
                        r2 = true;
                    }
                    if (dateFormat.call(end, "yyyyMMdd") == dateFormat.call(dr.startdate, "yyyyMMdd") || dateFormat.call(end, "yyyyMMdd") == dateFormat.call(dr.enddate, "yyyyMMdd")) {
                        r2 = true;
                    }
                }
                if (r && r2) {
                    break;
                }
            }
            return r && r2;
        }

        function buildtempdayevent(sh, sm, eh, em, h, title, w, resize, thindex) {
            var theme = thindex != undefined && thindex != -1 && thindex != "" ? tc(thindex) : tc();
            var newtemp = Tp(__SCOLLEVENTTEMP, {
                location:"",
                description:"",
                bdcolor: theme[0],
                bgcolor2: theme[0],
                bgcolor1: theme[2],
                data: "",
                starttime: [pZero(sh), pZero(sm)].join(":"),
                endtime: [pZero(eh), pZero(em)].join(":"),
                content: title ? title : i18n.dcmvcal.new_event,
                title: title ? title : i18n.dcmvcal.new_event,
                icon: "<I class=\"cic cic-tmr\">&nbsp;</I>",
                top: "0px",
                left: "",
                width: w ? w : "100%",
                height: h - 4,
                i: "-1",
                drag: "drag-chip",
                redisplay: resize ? "block" : "none"
            });
            return newtemp;
        }

        function getdata(chip) {
            var hddata = chip.find("div.dhdV");
            if (hddata.length == 1) {
                var str = hddata.html();
                return parseED(str.split("$*$"));
            }
            return null;
        }
        function parseED(data) {
            if (data.length > 6) {
                var e = [];
                e.push(data[0], data[1], new Date(data[2]), new Date(data[3]), parseInt(data[4]), parseInt(data[5]), (data[6]), data[7] != undefined ? (data[7]) : -1, data[8] != undefined ? parseInt(data[8]) : 0);
                for (var i=9;i<data.length;i++)
                    e.push(data[i]);
                return e;
            }
            return null;

        }
        function quickd(type,calid) {
            try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}
            try {$(".mv_dlg_nmonth").dialog("close");}catch (e) {}
            //var calid = $("#bbit-cs-id").val();
            var param = [{ "name": "calendarId", value: calid },
                        { "name": "type", value: type}];
            var de = rebyKey(calid, true);
            option.onBeforeRequestData && option.onBeforeRequestData(3);
            $.post(option.quickDeleteUrl, param, function(data) {
                if (data) {
                    if (data.IsSuccess) {
                        de = null;
                        populate();
                        option.onAfterRequestData && option.onAfterRequestData(3);
                    }
                    else {
                        option.onRequestDataError && option.onRequestDataError(3, data);
                        Ind(de);
                        //render();
                        populate();
                        option.onAfterRequestData && option.onAfterRequestData(3);
                    }
                }
            }, "json");
            //render();
            populate();
        }
        function getbuddlepos(x, y) {
            //return { left: 0, top: 0, hide: false };
            var tleft = x - 110;
            var ttop = y - 217;
            var maxLeft = document.documentElement.clientWidth;
            var maxTop = document.documentElement.clientHeight;
            var ishide = false;
            if (tleft <= 0 || ttop <= 0 || tleft + 400 > maxLeft) {
                tleft = x - 200 <= 0 ? 10 : x - 200;
                ttop = y - 159 <= 0 ? 10 : y - 159;
                if (tleft + 400 >= maxLeft) {
                    tleft = maxLeft - 410;
                }
                if (ttop + 164 >= maxTop) {
                    ttop = maxTop - 165;
                }
                ishide = true;
            }
            return { left: tleft, top: ttop, hide: ishide };
        }
        function dayshow(e, data) {
            if (data == undefined) {
                data = getdata($(this));
            }
            if (data != null) {
                //if (option.quickDeleteUrl != "" && data[8] == 1 && ( (option.readonly != true) || (option.readonly == true && option.showtooltipdwm) || (option.showtooltipdwm_mouseover)   )) {
                     var csbuddle = '<div id="bbit-cs-buddle">'+data[1]+'<hr/>'+data[11]+'</div>';
                    $("#bbit-cal-buddle").remove();
                    $(".mv_dlg").remove();
                    $("#bbit-cs-buddle").remove();
                    var bud = $("#bbit-cs-buddle");
                    if (bud.length == 0) {
                        //
                        bud = $(csbuddle).appendTo(document.body);
                        bud.dialog({width:option.dialogWidth,resizable: false,
                           modal: false,resizable: false,maxWidth: option.dialogWidth,fluid: true,open: function(event, ui){fluidDialog();},
                           position: {
                             my: "left top",
                             at: "center bottom",
                             collision: "fit",
                             of: $(this)
                           }})
                        dialogUnBlur();   
                        $("#bbit-cs-buddle").parent().addClass("mv_dlg");
                        $("<div id=\"mv_corner\" />").appendTo($(".mv_dlg .ui-dialog-titlebar"));
                        move_mv_dlg();
                        var calbutton = $("#bbit-cs-delete");
                        var lbtn = $("#bbit-cs-editLink");
                        var closebtn = $("#bubbleClose2").click(function() {
                            try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}
                        });
                   }
                //}
            }          
        }
        function dayshow1(e, data) {
            if (data == undefined) {
                data = getdata($(this));
            }
            if (data != null) {
                if (option.quickDeleteUrl != "" && data[8] == 1 && ( (option.readonly != true) || (option.readonly == true && option.showtooltipdwm) || (option.showtooltipdwm_mouseover)   )) {
                     var csbuddle = '<div id="bbit-cs-buddle">'
                        +'<div class="dialogdwm_event_content" style="border-left:3px solid '+((data[7] && data[7]!=-1 && data[7]!=null)?data[7]:"#"+option.paletteDefault)+';padding-left:5px"><div id="bbit-cs-buddle-timeshow" class="bubbletime"></div>'
                        +'<div id="bbit-cs-title" class="bubbletitle"></div>'
                        +'<div id="bbit-cs-location" class="bubblelocation"></div>'
                        +'<div id="bbit-cs-description" class="bubbledescription"></div></div>';
                        if (option.readonly != true && (option.userEdit || option.userDel || ((option.userOwner==data[12]) && (option.userEditOwner || option.userDelOwner))))
                        {
                            csbuddle +='<div class="bbit-cs-split"><input id="bbit-cs-id" type="hidden" value=""/>';
                            if (option.userDel || ((option.userOwner==data[12]) && (option.userDelOwner)))
                            {
                                ///no delete from recurring events
                                if (!(data[6]!="" && data[6] != null && data[6] != undefined))
                                     csbuddle +='[ <a id="bbit-cs-delete" class="lk">'+ i18n.dcmvcal.i_delete + '</a> ]&nbsp;';
                            }
                            if (option.userEdit || ((option.userOwner==data[12]) && (option.userEditOwner)))
                    	        csbuddle +=' <a id="bbit-cs-editLink" class="lk">'+ i18n.dcmvcal.update_detail + ' <StrONG>&gt;&gt;</StrONG></a>';
                    	    csbuddle +='</div>';
                        }

                    	csbuddle +='</div>';
                    $("#bbit-cal-buddle").remove();
                    $(".mv_dlg").remove();
                    $("#bbit-cs-buddle").remove();
                    var bud = $("#bbit-cs-buddle");
                    if (bud.length == 0) {
                        //
                        bud = $(csbuddle).appendTo(document.body);
                        bud.dialog({width:option.dialogWidth,resizable: false,
                           modal: false,resizable: false,maxWidth: option.dialogWidth,fluid: true,open: function(event, ui){fluidDialog();},
                           position: {
                             my: "left top",
                             at: "center bottom",
                             collision: "fit",
                             of: $(this)
                           }})
                        $("#bbit-cs-buddle").parent().addClass("mv_dlg");
                        $("<div id=\"mv_corner\" />").appendTo($(".mv_dlg .ui-dialog-titlebar"));
                        move_mv_dlg();
                        var calbutton = $("#bbit-cs-delete");
                        var lbtn = $("#bbit-cs-editLink");
                        var closebtn = $("#bubbleClose2").click(function() {
                            try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}
                        });
                        calbutton.click(function() {
                            var data = $("#bbit-cs-buddle").data("cdata");
                            if (option.DeleteCmdhandler && $.isFunction(option.DeleteCmdhandler)) {
                                option.DeleteCmdhandler.call(this, data, quickd);
                            }
                            //else {
                            //    if (confirm(i18n.dcmvcal.confirm_delete_event + "?")) {
                            //        var s = 0; //0 single event , 1 for Recurring event
                            //        if (data[6] == 1) {
                            //            if (confirm(i18n.dcmvcal.confrim_delete_event_or_all)) {
                            //                s = 0;
                            //            }
                            //            else {
                            //                s = 1;
                            //            }
                            //        }
                            //        else {
                            //            s = 0;
                            //        }
                            //        quickd(s);
                            //    }
                            //}
                        });
                        lbtn.click(function(e) {
                            if (!option.EditCmdhandler) {
                                alert("EditCmdhandler" + i18n.dcmvcal.i_undefined);
                            }
                            else {
                                if (option.EditCmdhandler && $.isFunction(option.EditCmdhandler)) {
                                    var data = $("#bbit-cs-buddle").data("cdata");
                                    var pos = $("#bbit-cs-buddle").dialog( "option", "position" );
                                    $("#bbit-cs-buddle").remove();
                                    option.EditCmdhandler.call(this, data,pos);
                                }
                            }

                            e.stopPropagation();
                        });
                        bud.click(function(e) {
                            e.stopPropagation();
                            return;
                        });
                    }
                    var ss = [];
                    var iscos = DateDiff("d", data[2], data[3]) != 0;
                    ss.push(dateFormat.call(data[2], i18n.dcmvcal.dateformat.fulldayshow));
                    if (data[4] != 1) {
                        ss.push(" ",fomartTimeAMPM(data[2].getHours(),data[2].getMinutes(),__MilitaryTime))
                    }

                    if (iscos) {
                        ss.push(" - ", dateFormat.call(data[3], i18n.dcmvcal.dateformat.fulldayshow));
                        if (data[4] != 1) {
                            ss.push(" ",fomartTimeAMPM(data[3].getHours(),data[3].getMinutes(),__MilitaryTime))
                        }
                    }
                    else if (data[4] != 1)
                        ss.push(" - ",fomartTimeAMPM(data[3].getHours(),data[3].getMinutes(),__MilitaryTime));
                    var ts = $("#bbit-cs-buddle-timeshow").html(ss.join(""));
                    $("#bbit-cs-id").val(data[0]);
                    $(".dialogdwm_event_content").find("#bbit-cs-title").html(data[1]);
                    $(".dialogdwm_event_content").find("#bbit-cs-location").html(data[9]);
                    $(".dialogdwm_event_content").find("#bbit-cs-description").html(data[11]);

                    bud.data("cdata", data);
                    //bud.css({ "visibility": "visible", left: pos.left, top: pos.top });

                    $(document).one("click", function() {
                        try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}
                    });
                }
                else {
                    if (!option.ViewCmdhandler) {
                        alert("ViewCmdhandler" + i18n.dcmvcal.i_undefined);
                    }
                    else {
                        if (option.ViewCmdhandler && $.isFunction(option.ViewCmdhandler)) {
                            option.ViewCmdhandler.call(this, data);
                        }
                    }
                }
            }
            else {
                alert(i18n.dcmvcal.data_format_error);
            }
            e.stopPropagation();
        }

        function moreshow(mv) {
            var me = $(this);
            var divIndex = mv.id.replace(option.thecontainer,"").split('_')[1];
            var pdiv = $(mv);
            var offsetMe = me.position();
            var offsetP = pdiv.position();
            var width = (me.width() + 2) * 1.5;
            var top = offsetP.top + 15;
            var left = offsetMe.left;

            var daystr = $(this).attr("abbr");
            var day = str_MdyyyyHHmm_todate(daystr + " 00:00");
            var cc = $("#cal-month-cc"+option.thecontainer);
            var ccontent = $("#cal-month-cc-content"+option.thecontainer+" table tbody");
            var ctitle = $("#cal-month-cc-title"+option.thecontainer);
            ctitle.html(dateFormat.call(day, i18n.dcmvcal.dateformat.Md3) + " " + __WDAY[day.getDay()]);
            ccontent.empty();
            //var c = tc()[2];
            var edata = $("#gridEvent"+option.thecontainer).data("mvdata");
            var events = edata[divIndex];
            var index = parseInt(this.axis);
            var htm = [];
            for (var i = 0; i <= index; i++) {
                var ec = events[i] ? events[i].length : 0;
                for (var j = 0; j < ec; j++) {
                    var e = events[i][j];
                    if (e) {
                        if ((e.colSpan + i - 1) >= index) {
                            htm.push("<tr><td class='st-c'>");
                            htm.push(BuildMonthDayEvent(e, day, 1));
                            htm.push("</td></tr>");
                        }
                    }
                }
            }
            ccontent.html(htm.join(""));
            //click
            ccontent.find("div.rb-o").each(function(i) {
                $(this).click(dayshow);
                if (option.showtooltipdwm_mouseover) {
                    $(this).mouseover(dayshow);
                    //if (option.readonly == true) $(this).mouseout(function() {try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}});
                }
            });

            edata = events = null;
            var height = cc.height();
            var maxleft = document.documentElement.clientWidth;
            var maxtop = document.documentElement.clientHeight;
            if (left + width >= maxleft) {
                left = offsetMe.left - (me.width() + 2) * 0.5;
            }
            if (top + height >= maxtop) {
                top = maxtop - height - 2;
            }
            var newOff = { left: left, top: top,  width: width, "visibility": "visible" };//"z-index": 180,
            cc.css(newOff);
            $(document).one("click", closeCc);
            return false;
        }
        function dayupdate(data, start, end) {
            if ((data[6]!="" &&  data[6]!="0"))
        	  {
        	  	  alert("Information: Recurrent events cannot be moved this way. Edit its details to modify it.")
        	      populate();
        	      return false;
        	  }
            if (option.quickUpdateUrl != "" && data[8] == 1 && (option.readonly != true && (option.userEdit || ((option.userOwner==data[12]) && option.userEditOwner ))) ) {
                if (option.isloading) {
                    return false;
                }
                option.isloading = true;
                var id = data[0];
                var os = data[2];
                var od = data[3];
                var zone = new Date().getTimezoneOffset() / 60 * -1;
                var param = [{ "name": "calendarId", value: id },
							{ "name": "CalendarStartTime", value: dateFormat.call(start, "M/d/yyyy HH:mm") },
							{ "name": "CalendarEndTime", value: dateFormat.call(end, "M/d/yyyy HH:mm") },
							{ "name": "timezone", value: zone }
						   ];
                var d;
                if (option.quickUpdateHandler && $.isFunction(option.quickUpdateHandler)) {
                    option.quickUpdateHandler.call(this, param);
                }
                else {
                    option.onBeforeRequestData && option.onBeforeRequestData(4);
                    $.post(option.quickUpdateUrl, param, function(data) {
                        if (data) {
                            if (data.IsSuccess == true) {
                                option.isloading = false;
                                option.onAfterRequestData && option.onAfterRequestData(4);
                            }
                            else {
                                option.onRequestDataError && option.onRequestDataError(4, data);
                                option.isloading = false;
                                d = rebyKey(id, true);
                                d[2] = os;
                                d[3] = od;
                                Ind(d);
                                render();
                                d = null;
                                option.onAfterRequestData && option.onAfterRequestData(4);
                            }
                        }
                    }, "json");
                    d = rebyKey(id, true);
                    if (d) {
                        d[2] = start;
                        d[3] = end;
                    }
                    Ind(d);
                    render();
                }
            }
        }
        function quickadd(start, end, isallday, pos) {
            if ((!option.quickAddHandler && option.quickAddUrl == "") || option.readonly || !option.userAdd) {
                return;
            }
            var location = "";
            $("#bbit-cal-buddle").remove();
            $(".mv_dlg").remove();
            $("#bbit-cs-buddle").remove();
            var buddle = $("#bbit-cal-buddle");
            if (buddle.length == 0) {
                var temparr = [];
                temparr.push('<div id="bbit-cal-buddle">');
                temparr.push('<div><div class="bbit-cal-buddle-event">',i18n.dcmvcal.event,'</div>');
                temparr.push(i18n.dcmvcal.time, ':<div id="bbit-cal-buddle-timeshow" style="display:inline"></div></div><div>');
                temparr.push(i18n.dcmvcal.content, ':</div><div><div class="textbox-fill-wrapper"><div class="textbox-fill-mid">');
                if (dc_subjects && dc_subjects!="")
                {
                    temparr.push('<select id="bbit-cal-what" class="textbox-fill-input">');
                    for (var i=0;i<dc_subjects.length;i++)
                        temparr.push('<option value="'+dc_subjects[i]+'" '+((pos.col && pos.col==dc_subjects[i])?"selected=\"selected\"":"")+'>'+dc_subjects[i]+'</option>');
                    temparr.push('</select>');

                }
                else
                    temparr.push('<input id="bbit-cal-what" class="textbox-fill-input"/>');
                if (dc_locations && dc_locations!="")
                {
                	  try {
                	  var target = _dragdata.target;
                	  if (target.attr("class") == "tg-col") 
                	      location = target.attr("col");
                	  else
                	  {        
                        var loc = parseInt(target.attr("id").replace("weekViewAllDaywk"+option.thecontainer,""));
                        if (dc_locations.length>0 && loc>=0 && loc<dc_locations.length)
                        {
                        	location = dc_locations[loc];
                        }
                    }
                    }catch (e) {}
                }
                temparr.push('</div></div><div class="cb-example">');
                temparr.push(i18n.dcmvcal.example, '</div></div><input id="bbit-cal-start" type="hidden"/><input id="bbit-cal-end" type="hidden"/><input id="bbit-cal-allday" type="hidden"/>');
                temparr.push('<div style="float:left;display:block;cursor:pointer" class="fbutton" id="bbit-cal-AddBTN"><span style="float: left;display: block;" class="ui-icon ui-icon-new"></span><span style="float: left;display: block;height:18px;text-decoration:none;color:#000" id="bbit-cal-quickAddBTN" class="lk">', i18n.dcmvcal.create_event, '</span></div><div style="float:left;margin-left:20px"><SPAN id="bbit-cal-editLink" class="lk">');
                temparr.push(i18n.dcmvcal.update_detail, ' <StrONG>&gt;&gt;</StrONG></SPAN></div><div style="clear:both"></div><div id="bubbleClose" class="bubble-closebutton"></div><div style="clear:both;margin-bottom:10px"></div></div>');
                var tempquickAddHanler = temparr.join("");
                temparr = null;

                $(document.body).append(tempquickAddHanler);
                try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}
                buddle = $("#bbit-cal-buddle");
                if (option.view!="nMonth")
                var pp = {
                                 my: "left top",
                                 at: "center bottom",
                                 collision: "fit",
                                 of: ($(".drag-chip").length>0)?$(".drag-chip"):$(".drag-lasso")
                               };
                else
                    pp = {
                                 my: "left top",
                                 at: "center bottom",
                                 collision: "fit",
                                 of:$("#nmonths"+option.thecontainer+" .ui-state-non-active[title='"+dateFormat.call(start, i18n.dcmvcal.dateformat.fulldayvalue)+"']")
                                 };
                buddle.dialog({width:option.dialogWidth,resizable: false,
                           modal: false,resizable: false,maxWidth: option.dialogWidth,fluid: true,open: function(event, ui){fluidDialog();},
                           position:pp

                           });
                buddle.dialog( "open" );
                move_mv_dlg();
                $("#bbit-cal-buddle").parent().addClass("mv_dlg");
                $("<div id=\"mv_corner\" />").appendTo($(".mv_dlg .ui-dialog-titlebar"));
                var calbutton = $("#bbit-cal-quickAddBTN");
                var lbtn = $("#bbit-cal-editLink");

                var closebtn = $("#bubbleClose1").click(function() {
                    $("#bbit-cal-buddle").dialog( "close" );
                    realsedragevent();
                });
                $("#bbit-cal-what").on('keypress', function (event) {
                    if(event.which === 13){
                        $("#bbit-cal-quickAddBTN").trigger("click");
                    }
                });
                calbutton.click(function(e) {
                    if (option.isloading) {
                        e.stopPropagation();
                    }
                    option.isloading = true;
                    var what = $("#bbit-cal-what").val();
                    var datestart = $("#bbit-cal-start").val();
                    var dateend = $("#bbit-cal-end").val();

                    var allday = $("#bbit-cal-allday").val();
                    var f = /^[^\$\<\>]+$/.test(what);
                    if (!f) {
                        alert(i18n.dcmvcal.invalid_title);
                        $("#bbit-cal-what").focus();
                        option.isloading = false;
                        e.stopPropagation();
                        return false;
                    }
                    var zone = new Date().getTimezoneOffset() / 60 * -1;
                    var param = [{ "name": "CalendarTitle", value: what },
						{ "name": "CalendarStartTime", value: datestart },
						{ "name": "CalendarEndTime", value: dateend },
						{ "name": "IsAllDayEvent", value: allday },
						{ "name": "colorvalue", value: ((dc_subjects && dc_subjects!="" && option.colorBySubject)?"#"+option.paletteFull[$("#bbit-cal-what")[0].selectedIndex]:"") },
						{ "name": "location", value: ( (dc_locations && dc_locations!="")?location:"") },
						{ "name": "timezone", value: zone}];

                    if (option.extParam) {
                        for (var pi = 0; pi < option.extParam.length; pi++) {
                            param[param.length] = option.extParam[pi];
                        }
                    }

                    if (option.quickAddHandler && $.isFunction(option.quickAddHandler)) {
                        option.quickAddHandler.call(this, param);
                        $("#bbit-cal-buddle").dialog( "close" );
                        realsedragevent();
                    }
                    else {
                        $("#bbit-cal-buddle").dialog( "close" );
                        var newdata = [];
                        var tId = -1;
                        option.onBeforeRequestData && option.onBeforeRequestData(2);
                        $.post(option.quickAddUrl, param, function(data) {
                            if (data) {
                                if (data.IsSuccess == true) {
                                    option.isloading = false;
                                    newdata.push(-1, what);
                                    var sd = str_MdyyyyHHmm_todate(datestart);
                                    var ed = str_MdyyyyHHmm_todate(dateend);
                                    var diff = DateDiff("d", sd, ed);
                                    newdata.push(sd, ed, allday == "1" ? 1 : 0, diff > 0 ? 1 : 0, 0);
                                    newdata.push(-1, 0, ((dc_locations && dc_locations!="")?dc_locations[location]:""), "");
                                    tId = Ind(newdata);
                                    option.eventItems[tId][0] = data.Data;
                                    option.eventItems[tId][8] = 1;
                                    populate();
                                    option.onAfterRequestData && option.onAfterRequestData(2);
                                }
                                else {
                                    option.onRequestDataError && option.onRequestDataError(2, data);
                                    option.isloading = false;
                                    option.onAfterRequestData && option.onAfterRequestData(2);
                                }

                            }

                        }, "json");
                        realsedragevent();
                        render();
                    }
                });
                lbtn.click(function(e) {
                    try {$("#bbit-cal-buddle").dialog("close");}catch (e) {}
                    if (!option.EditCmdhandler) {
                        alert("EditCmdhandler" + i18n.dcmvcal.i_undefined);
                    }
                    else {
                        if (option.EditCmdhandler && $.isFunction(option.EditCmdhandler)) {
                            option.EditCmdhandler.call(this, ['0', $("#bbit-cal-what").val(), $("#bbit-cal-start").val(), $("#bbit-cal-end").val(), $("#bbit-cal-allday").val()]);
                        }
                        realsedragevent();
                    }
                    e.stopPropagation();
                });
                buddle.mousedown(function(e) { e.stopPropagation(); });
            }
            var dateshow = CalDateShow(start, end, !isallday, true);

            $("#bbit-cal-buddle-timeshow").html(dateshow);
            $("#bbit-cal-allday").val(isallday ? "1" : "0");
            $("#bbit-cal-start").val(dateFormat.call(start, "M/d/yyyy HH:mm"));
            $("#bbit-cal-end").val(dateFormat.call(end, "M/d/yyyy HH:mm"));

            buddle.css({ "visibility": "visible"});
            var postmp = $("#bbit-cal-buddle").dialog( "option", "position");
            postmp.at = "center bottom"
            $("#bbit-cal-buddle").dialog( "option", "position",postmp);
            $("#bbit-cal-buddle").dialog( "open" );
            move_mv_dlg();
			      $("#bbit-cal-what").blur().focus(); //add 2010-01-26 blur() fixed chrome
            $(document).one("mousedown", function() {
                $("#bbit-cal-buddle").dialog( "close" );
                realsedragevent();
            });
            return false;
        }
        //format datestring to Date Type
        function strtodate(str) {
            var arr = str.split(" ");
            var arr2 = arr[0].split(i18n.dcmvcal.dateformat.separator);
            var arr3 = arr[1].split(":");

            var y = arr2[i18n.dcmvcal.dateformat.year_index];
            var m = arr2[i18n.dcmvcal.dateformat.month_index].indexOf("0") == 0 ? arr2[i18n.dcmvcal.dateformat.month_index].substr(1, 1) : arr2[i18n.dcmvcal.dateformat.month_index];
            var d = arr2[i18n.dcmvcal.dateformat.day_index].indexOf("0") == 0 ? arr2[i18n.dcmvcal.dateformat.day_index].substr(1, 1) : arr2[i18n.dcmvcal.dateformat.day_index];
            var h = arr3[0].indexOf("0") == 0 ? arr3[0].substr(1, 1) : arr3[0];
            var n = arr3[1].indexOf("0") == 0 ? arr3[1].substr(1, 1) : arr3[1];
            return new Date(y, parseInt(m) - 1, d, h, n);
        }
        //str yyyy/m/d
        function datetostr(d)
        {
            return d.getFullYear()+"/"+(d.getMonth()+1)+"/"+d.getDate();
        }
        function str_MdyyyyHHmm_todate(str) {
            var arr = str.split(" ");
            var arr2 = arr[0].split("/");
            var arr3 = arr[1].split(":");
            var y = arr2[2];
            var m = arr2[0].indexOf("0") == 0 ? arr2[0].substr(1, 1) : arr2[0];
            var d = arr2[1].indexOf("0") == 0 ? arr2[1].substr(1, 1) : arr2[1];
            var h = arr3[0].indexOf("0") == 0 ? arr3[0].substr(1, 1) : arr3[0];
            var n = arr3[1].indexOf("0") == 0 ? arr3[1].substr(1, 1) : arr3[1];
            return new Date(y, parseInt(m) - 1, d, h, n);
        }

        function rebyKey(key, remove) {
            if (option.eventItems && option.eventItems.length > 0) {
                var sl = option.eventItems.length;
                var i = -1;
                for (var j = 0; j < sl; j++) {
                    if (option.eventItems[j][0] == key) {
                        i = j;
                        break;
                    }
                }
                if (i >= 0) {
                    var t = option.eventItems[i];
                    if (remove) {
                        option.eventItems.splice(i, 1);
                    }
                    return t;
                }
            }
            return null;
        }
        function Ind(event, i) {
            var d = 0;
            if (!i) {
                if (option.eventItems && option.eventItems.length > 0) {
                    var sl = option.eventItems.length;
                    var s = event[2];
                    var d1 = s.getTime() - option.eventItems[0][2].getTime();
                    var d2 = option.eventItems[sl - 1][2].getTime() - s.getTime();
                    var diff = d1 - d2;
                    if (d1 < 0 || diff < 0) {
                        for (var j = 0; j < sl; j++) {
                            if (option.eventItems[j][2] >= s) {
                                i = j;
                                break;
                            }
                        }
                    }
                    else if (d2 < 0) {
                        i = sl;
                    }
                    else {
                        for (var j = sl - 1; j >= 0; j--) {
                            if (option.eventItems[j][2] < s) {
                                i = j + 1;
                                break;
                            }
                        }
                    }
                }
                else {
                    i = 0;
                }
            }
            else {
                d = 1;
            }
            if (option.eventItems && option.eventItems.length > 0) {
                if (i == option.eventItems.length) {
                    option.eventItems.push(event);
                }
                else { option.eventItems.splice(i, d, event); }
            }
            else {
                option.eventItems = [event];
            }
            return i;
        }


        function ResizeView(config) {
            var _MH = document.documentElement.clientHeight;
            var _viewType = option.view;
            if (_viewType == "day" || _viewType == "week" || _viewType == "nDays" || _viewType == "rowMonth") {
                var $dvwkcontaienr = $("#dvwkcontaienr"+config.thecontainer);
                var $dvtec = $("#dvtec"+config.thecontainer);
                if (($dvwkcontaienr.length == 0 || $dvtec.length == 0) && (option.rowsList=="" || (option.dayWithTime && option.view=="day"))  ) {
                    alert(i18n.dcmvcal.view_no_ready); return;
                }
                var dvwkH = $dvwkcontaienr.height() + 2;
                var calH = option.height - 8 - dvwkH;
                $dvtec.height(calH);
                $dvtec.height("auto");
                if (typeof (option.scoll) == "undefined") {
                    var currentday = new Date();
                    var h = currentday.getHours();
                    var m = currentday.getMinutes();
                    var th = gP(h, m);
                    var ch = $dvtec.attr("clientHeight");
                    var sh = th - 0.5 * ch;
                    var ph = $dvtec.attr("scrollHeight");
                    if (sh < 0) sh = 0;
                    if (sh > ph - ch) sh = ph - ch - 10 * (23 - h);
                    $dvtec.attr("scrollTop", sh);
                }
                else {
                    $dvtec.attr("scrollTop", option.scoll);
                }
            }
            else if (_viewType == "month") {
                //Resize GridContainer
            }
        }
        function initevents(viewtype) {
            if (viewtype == "week" || viewtype == "day" || viewtype == "nDays" || viewtype == "rowMonth") {
                $("div.chip", gridcontainer).each(function(i) {
                    var chip = $(this);
                    chip.click(dayshow);
                    if (option.showtooltipdwm_mouseover) {
                        chip.mouseover(dayshow);
                        //if (option.readonly == true) chip.mouseout(function() {try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}});
                    }
                    if (chip.hasClass("drag")) {
                        chip.mousedown(function(e) { dragStart.call(this, "dw3", e); e.stopPropagation(); });
                        //resize
                        chip.find("div.resizer").mousedown(function(e) {
                            dragStart.call($(this).parent().parent(), "dw4", e); e.stopPropagation();
                        });
                    }
                    else {
                        chip.mousedown(function(e) {e.stopPropagation();})
                    }
                });
                $("div.rb-o", gridcontainer).each(function(i) {
                    var chip = $(this);
                    chip.click(dayshow);
                    if (option.showtooltipdwm_mouseover) {
                        chip.mouseover(dayshow);
                        //if (option.readonly == true) chip.mouseout(function() {try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}});
                    }
                    if (chip.hasClass("drag") && (viewtype == "week" || viewtype == "nDays" || viewtype == "rowMonth" ) ) {
                        //drag;
                        chip.mousedown(function(e) { dragStart.call(this, {dw5:"dw5",row:chip.attr("row")}, e); e.stopPropagation(); });
                    }
                    else {
                        chip.mousedown(function(e) {e.stopPropagation();})
                    }
                });
                if (option.readonly == false && option.userAdd) {
                    $("td.tg-col", gridcontainer).each(function(i) {
                        $(this).mousedown(function(e) { dragStart.call(this, "dw1", e); e.stopPropagation(); });
                    });
                    $("#weekViewAllDaywk"+option.thecontainer).mousedown(function(e) { dragStart.call(this, "dw2", e); e.stopPropagation(); });
                    if ( !(option.rowsList=="" || (option.dayWithTime && option.view=="day")) )
                        for (var i=0;i<option.rowsList.length;i++)
                            $("#weekViewAllDaywk"+option.thecontainer+i).mousedown(function(e) { dragStart.call(this, "dw2", e); e.stopPropagation(); });
                }

                if (viewtype == "week" || viewtype == "nDays" || viewtype == "rowMonth" ) {
                    $("#dvwkcontaienr"+option.thecontainer+" th.gcweekname").each(function(i) {
                        $(this).click(weekormonthtoday);
                    });
                }


            }
            else if (viewtype = "month") {

                $("div.rb-o", gridcontainer).each(function(i) {
                    var chip = $(this);
                    chip.click(dayshow);
                    if (option.showtooltipdwm_mouseover) {
                        chip.mouseover(dayshow);
                        //if (option.readonly == true) chip.mouseout(function() {try {$("#bbit-cs-buddle").dialog("close");}catch (e) {}});
                    }
                    if (chip.hasClass("drag")) {
                        //drag;//aqui
                        chip.mousedown(function(e) { dragStart.call(this, "m2", e); e.stopPropagation(); });
                    }
                    else {
                        chip.mousedown(function(e) {e.stopPropagation();})
                    }
                });
                $("td.st-more", gridcontainer).each(function(i) {

                    $(this).click(function(e) {
                        moreshow.call(this, $(this).parent().parent().parent().parent()[0]); e.stopPropagation();
                    }).mousedown(function() { e.stopPropagation(); });
                });
                if (option.readonly == false && option.userAdd) {
                    $("#mvEventContainer"+option.thecontainer).mousedown(function(e) { dragStart.call(this, "m1", e); e.stopPropagation(); });
                }
            }

        }
        function realsedragevent() {
            if (_dragevent) {
                _dragevent();
                _dragevent = null;
            }
        }
        function dragStart(type, e) {
            var obj = $(this);
            var source = e.srcElement || e.target;
            realsedragevent();
            var row = "";
            if (type.dw5=="dw5")
            {
                var row = type.row;
                type = "dw5";
            }
            switch (type) {
                case "dw1":
                    _dragdata = { type: 1, target: obj, sx: e.pageX, sy: e.pageY };
                    break;
                case "dw2":
                    var w = obj.width();
                    var h = obj.height();
                    var offset = obj.offset();
                    var left = offset.left;
                    var top = offset.top;
                    var l = option.view == "day" ? 1 : (option.view == "week" ? __VIEWWEEKDAYSTOTAL : option.nOfDays);
                    var py = w % l;
                    var pw = (w / l);
                    var xa = [];
                    var ya = [];
                    for (var i = 0; i < l; i++)
                        xa.push({ s: parseInt(i * pw + left), e: parseInt((i + 1) * pw + left) });
                    ya.push({ s: top, e: top + h });
                    _dragdata = { type: 2, target: obj, sx: e.pageX, sy: e.pageY, pw: parseInt(pw), xa: xa, ya: ya, h: h };
                    w = left = l = py = pw = xa = null;
                    break;
                case "dw3":
                    var evid = obj.parent().attr("id").replace("tgCol"+option.thecontainer, "");
                    var p = obj.parent();
                    var pos = p.offset();
                    var w = p.width() + 10;
                    var h = obj.height();
                    var data = getdata(obj);
                    _dragdata = { type: 4, target: obj, sx: e.pageX, sy: e.pageY,
                        pXMin: pos.left, pXMax: pos.left + w, pw: w, h: h,
                        cdi: parseInt(evid), fdi: parseInt(evid), data: data
                    };
                    break;
                case "dw4": //resize;
                    var h = obj.height();
                    var data = getdata(obj);
                    _dragdata = { type: 5, target: obj, sx: e.pageX, sy: e.pageY, h: h, data: data };
                    break;
                case "dw5":
                    //try {

                    var con = $("#weekViewAllDaywk"+option.thecontainer+row);
                    var w = con.width();
                    var h = con.height();
                    var offset = con.offset();
                    var moffset = obj.offset();
                    var left = offset.left;
                    var top = offset.top;
                    if (option.view == "week")
                        var l = 7;//ht.push(" colSpan='",__VIEWWEEKDAYSTOTAL, "'"); //dayarrs.length
                    else
                        var l = option.nOfDays; //ht.push(" colSpan='",option.nOfDays, "'"); //dayarrs.length
                    var py = w % l;
                    var pw = parseInt(w / l);
                    if (py > l / 2 + 1) {
                        pw++;
                    }
                    var xa = [];
                    var ya = [];
                    var di = 0;
                    for (var i = 0; i < l; i++) {
                        xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
                        if (moffset.left >= xa[i].s && moffset.left < xa[i].e) {
                            di = i;
                        }
                    }
                    var fdi = { x: di, y: 0, di: di };
                    ya.push({ s: top, e: top + h });
                    var data = getdata(obj);
                    var dp = DateDiff("d", data[2], data[3]) + 1;
                    _dragdata = { type: 6, target: obj, sx: e.pageX, sy: e.pageY, data: data, xa: xa, ya: ya, fdi: fdi, h: h, dp: dp, pw: pw };
                    //}catch (e) {}
                    break;
                case "m1":
                    var w = obj.width();
                    var offset = obj.offset();
                    var left = offset.left;
                    var top = offset.top;
                    var l = __VIEWWEEKDAYSTOTAL;
                    var yl = obj.children().length;
                    var py = w % l;
                    var pw = parseInt(w / l);
                    if (py > l / 2 + 1) {
                        pw++;
                    }
                    var h = $("#mvrow"+option.thecontainer+"_0").height();
                    /**var xa = [];
                    var ya = [];
                    for (var i = 0; i < l; i++) {
                        xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
                    }*/
                    var xa = [];
                    var ya = [];
                    for (var i = 0; i < l; i++) {
                            xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
                    }
                    var h = 0, s1 = top, e1 = 0;
                    for (var i = 0; i < yl; i++) {
                    	  h = $("#mvrow"+option.thecontainer+"_"+i).height();
                    	  e1 = s1 + h;
                        ya.push({ s: s1, e: e1 });
                        s1 = e1;    
                    }
                    _dragdata = { type: 3, target: obj, sx: e.pageX, sy: e.pageY, pw: pw, xa: xa, ya: ya, h: h };
                    break;
                case "m2":
                    var row0 = $("#mvrow"+option.thecontainer+"_0");
                    var row1 = $("#mvrow"+option.thecontainer+"_1");
                    var w = row0.width();
                    var offset = row0.offset();
                    var diffset = row1.offset();
                    var moffset = obj.offset();
                    var h = diffset.top - offset.top;
                    var left = offset.left;
                    var top = offset.top;
                    var l = 7;
                    var yl = row0.parent().children().length;
                    var py = w % l;
                    var pw = parseInt(w / l);
                    if (py > l / 2 + 1) {
                        pw++;
                    }
                    var xa = [];
                    var ya = [];
                    var xi = 0;
                    var yi = 0;
                    for (var i = 0; i < l; i++) {
                        xa.push({ s: i * pw + left, e: (i + 1) * pw + left });
                        if (moffset.left >= xa[i].s && moffset.left < xa[i].e) {
                            xi = i;
                        }
                    }
                    for (var i = 0; i < yl; i++) {
                        ya.push({ s: i * h + top, e: (i + 1) * h + top });
                        if (moffset.top >= ya[i].s && moffset.top < ya[i].e) {
                            yi = i;
                        }
                    }
                    var fdi = { x: xi, y: yi, di: yi * 7 + xi };
                    var data = getdata(obj);
                    var dp = DateDiff("d", data[2], data[3]) + 1;
                    _dragdata = { type: 7, target: obj, sx: e.pageX, sy: e.pageY, data: data, xa: xa, ya: ya, fdi: fdi, h: h, dp: dp, pw: pw };
                    break;
            }
            $('body').noSelect();
        }
        function dragMove(e) {
            if (_dragdata) {
                //if (e.pageX < 0 || e.pageY < 0
				//	|| e.pageX > document.documentElement.clientWidth
				//	|| e.pageY >= document.documentElement.clientHeight) {
                //    dragEnd(e);
                //    return false;
                //}
                var d = _dragdata;
                switch (d.type) {
                    case 1:
                        var sy = d.sy;
                        var y = e.pageY;
                        var diffy = y - sy;
                        if (diffy > (option.cellheight/4) /*11*/ || diffy < -1*(option.cellheight/4) /*11*/ || d.cpwrap) {
                            if (diffy == 0) { diffy =(option.cellheight/2) /*21*/; }
                            var dy = diffy % (option.cellheight/2) /*21*/;
                            if (dy != 0) {
                                diffy = dy > 0 ? diffy + (option.cellheight/2) /*21*/ - dy : diffy - (option.cellheight/2) /*21*/ - dy;
                                y = d.sy + diffy;
                                if (diffy < 0) {
                                    sy = sy + (option.cellheight/2) /*21*/;
                                }
                            }
                            if (!d.tp) {
                                d.tp = $(d.target).offset().top;
                            }
                            var gh = gH(sy, y, d.tp);
                            var ny = gP(gh.sh, gh.sm);
                            var tempdata;
                            if (!d.cpwrap) {
                                tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h);
                                var cpwrap = $("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
                                $(d.target).find("div.tg-col-overlaywrapper").append(cpwrap);
                                d.cpwrap = cpwrap;
                            }
                            else {
                                if (d.cgh.sh != gh.sh || d.cgh.eh != gh.eh || d.cgh.sm != gh.sm || d.cgh.em != gh.em) {
                                    tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h);
                                    d.cpwrap.css("top", ny + "px").html(tempdata);
                                }
                            }
                            d.cgh = gh;
                        }
                        break;
                    case 2:
                        var sx = d.sx;
                        var x = e.pageX;
                        var diffx = x - sx;
                        if (diffx > 5 || diffx < -5 || d.lasso) {
                            if (!d.lasso) {
                                d.lasso = $("<div style='display: block' class='drag-lasso-container'/>");
                                $(document.body).append(d.lasso);
                            }
                            if (!d.sdi) {
                                d.sdi = getdi(d.xa, d.ya, sx, d.sy);
                            }
                            var ndi = getdi(d.xa, d.ya, x, e.pageY);
                            if (!d.fdi || d.fdi.di != ndi.di) {
                                addlasso(d.lasso, d.sdi, ndi, d.xa, d.ya, d.h);
                            }
                            d.fdi = ndi;
                        }
                        break;
                    case 3:
                        var sx = d.sx;
                        var x = e.pageX;
                        var sy = d.sy;
                        var y = e.pageY;
                        var diffx = x - sx;
                        var diffy = y - sy;
                        if (diffx > 5 || diffx < -5 || diffy < -5 || diffy > 5 || d.lasso) {
                            if (!d.lasso) {
                                d.lasso = $("<div style='display: block' class='drag-lasso-container'/>");
                                $(document.body).append(d.lasso);
                            }
                            if (!d.sdi) {
                                d.sdi = getdi(d.xa, d.ya, sx, sy);
                            }
                            var ndi = getdi(d.xa, d.ya, x, y);
                            if (!d.fdi || d.fdi.di != ndi.di) {
                                addlasso(d.lasso, d.sdi, ndi, d.xa, d.ya, d.h);
                            }
                            d.fdi = ndi;
                        }
                        break;
                    case 4:
                        var data = d.data;
                        if (data != null && data[8] == 1) {
                            var sx = d.sx;
                            var x = e.pageX;
                            var sy = d.sy;
                            var y = e.pageY;
                            var diffx = x - sx;
                            var diffy = y - sy;
                            if (diffx > 5 || diffx < -5 || diffy > 5 || diffy < -5 || d.cpwrap) {
                                var gh, ny, tempdata;
                                if (!d.cpwrap) {
                                    gh = { sh: data[2].getHours(),
                                        sm: data[2].getMinutes(),
                                        eh: data[3].getHours(),
                                        em: data[3].getMinutes(),
                                        h: d.h
                                    };
                                    d.target.hide();
                                    ny = gP(gh.sh, gh.sm);
                                    d.top = ny;
                                    tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], false, false, data[7]);
                                    var cpwrap = $("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
                                    var evid = d.target.parent().attr("id").replace("tgCol"+option.thecontainer, "#tgOver"+option.thecontainer);
                                    $(evid).append(cpwrap);
                                    d.cpwrap = cpwrap;
                                    d.ny = ny;
                                }
                                else {
                                    var pd = 0;
                                    if (x < d.pXMin) {
                                        pd = -1;
                                    }
                                    else if (x > d.pXMax) {
                                        pd = 1;
                                    }
                                    if (pd != 0) {

                                        d.cdi = d.cdi + pd;
                                        var ov = $("#tgOver"+option.thecontainer + d.cdi);
                                        if (ov.length == 1) {
                                            d.pXMin = d.pXMin + d.pw * pd;
                                            d.pXMax = d.pXMax + d.pw * pd;
                                            ov.append(d.cpwrap);
                                        }
                                        else {
                                            d.cdi = d.cdi - pd;
                                        }
                                    }
                                    ny = d.top + diffy;
                                    var pny = ny % (option.cellheight/2) /*21*/;
                                    if (pny != 0) {
                                        ny = ny - pny;
                                    }
                                    if (d.ny != ny) {
                                        //log.info("ny=" + ny);
                                        gh = gW(ny, ny + d.h);
                                        //log.info("sh=" + gh.sh + ",sm=" + gh.sm);
                                        tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], false, false, data[7]);
                                        d.cpwrap.css("top", ny + "px").html(tempdata);
                                    }
                                    d.ny = ny;
                                }
                            }
                        }

                        break;
                    case 5:
                        var data = d.data;
                        if (data != null && data[8] == 1) {
                            var sy = d.sy;
                            var y = e.pageY;
                            var diffy = y - sy;
                            if (diffy != 0 || d.cpwrap) {
                                var gh, ny, tempdata;
                                if (!d.cpwrap) {
                                    gh = { sh: data[2].getHours(),
                                        sm: data[2].getMinutes(),
                                        eh: data[3].getHours(),
                                        em: data[3].getMinutes(),
                                        h: d.h
                                    };
                                    d.target.hide();
                                    ny = gP(gh.sh, gh.sm);
                                    d.top = ny;
                                    tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], "100%", true, data[7]);
                                    var cpwrap = $("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
                                    var evid = d.target.parent().attr("id").replace("tgCol"+option.thecontainer, "#tgOver"+option.thecontainer);
                                    $(evid).append(cpwrap);
                                    d.cpwrap = cpwrap;
                                }
                                else {
                                    nh = d.h + diffy;
                                    var pnh = nh % (option.cellheight/2) /*21*/;
                                    nh = pnh > 1 ? nh - pnh + (option.cellheight/2) /*21*/ : nh - pnh;
                                    if (d.nh != nh) {
                                        var sp = gP(data[2].getHours(), data[2].getMinutes());
                                        var ep = sp + nh;
                                        gh = gW(d.top, d.top + nh);
                                        tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h, data[1], "100%", true, data[7]);
                                        d.cpwrap.html(tempdata);
                                        
                                    }
                                    d.nh = nh;
                                }
                            }
                        }
                        break;
                    case 6:
                        var sx = d.sx;
                        var x = e.pageX;
                        var y = e.pageY;
                        var diffx = x - sx;
                        if (diffx > 5 || diffx < -5 || d.lasso) {
                            if (!d.lasso) {
                                var w1 = d.dp > 1 ? (d.pw - 4) * 1.5 : (d.pw - 4);
                                var cp = d.target.clone();
                                if (d.dp > 1) {
                                    cp.find("div.rb-i>span").prepend("(" + d.dp + " " + i18n.dcmvcal.day_plural + ")&nbsp;");
                                }
                                var cpwrap = $("<div class='drag-event st-contents' style='width:" + w1 + "px'/>").append(cp).appendTo(document.body);
                                d.cpwrap = cpwrap;
                                d.lasso = $("<div style='display: block' class='drag-lasso-container'/>");
                                $(document.body).append(d.lasso);
                                cp = cpwrap = null;
                            }
                            fixcppostion(d.cpwrap, e, d.xa, d.ya);
                            var ndi = getdi(d.xa, d.ya, x, e.pageY);
                            if (!d.cdi || d.cdi.di != ndi.di) {
                                addlasso(d.lasso, ndi, { x: ndi.x, y: ndi.y, di: ndi.di + d.dp - 1 }, d.xa, d.ya, d.h);
                            }
                            d.cdi = ndi;
                        }
                        break;
                    case 7:
                        var sx = d.sx;
                        var sy = d.sy;
                        var x = e.pageX;
                        var y = e.pageY;
                        var diffx = x - sx;
                        var diffy = y - sy;
                        if (diffx > 5 || diffx < -5 || diffy > 5 || diffy < -5 || d.lasso) {
                            if (!d.lasso) {
                                var w1 = d.dp > 1 ? (d.pw - 4) * 1.5 : (d.pw - 4);
                                var cp = d.target.clone();
                                if (d.dp > 1) {
                                    cp.find("div.rb-i>span").prepend("(" + d.dp + " " + i18n.dcmvcal.day_plural + ")&nbsp;");
                                }
                                var cpwrap = $("<div class='drag-event st-contents' style='width:" + w1 + "px'/>").append(cp).appendTo(document.body);
                                d.cpwrap = cpwrap;
                                d.lasso = $("<div style='display: block' class='drag-lasso-container'/>");
                                $(document.body).append(d.lasso);
                                cp = cpwrap = null;
                            }
                            fixcppostion(d.cpwrap, e, d.xa, d.ya);
                            var ndi = getdi(d.xa, d.ya, x, e.pageY);
                            if (!d.cdi || d.cdi.di != ndi.di) {
                                addlasso(d.lasso, ndi, { x: ndi.x, y: ndi.y, di: ndi.di + d.dp - 1 }, d.xa, d.ya, d.h);
                            }
                            d.cdi = ndi;
                        }
                        break;
                }
            }
            e.stopPropagation();
        }
        function dragEnd(e) {
            if (_dragdata) {

                var d = _dragdata;
                switch (d.type) {
                    case 1: //day view
                        var wrapid = new Date().getTime();
                        tp = d.target.offset().top;
                        if (!d.cpwrap) {
                            var gh = gH(d.sy, d.sy + option.cellheight, tp);
                            var ny = gP(gh.sh, gh.sm);
                            var tempdata = buildtempdayevent(gh.sh, gh.sm, gh.eh, gh.em, gh.h);
                            d.cpwrap = $("<div class='ca-evpi drag-chip-wrapper' style='top:" + ny + "px'/>").html(tempdata);
                            $(d.target).find("div.tg-col-overlaywrapper").append(d.cpwrap);
                            d.cgh = gh;
                        }

                        var pos = d.cpwrap.offset();
                        pos.left = pos.left + 30;
                        d.cpwrap.attr("id", wrapid);
                        var start = str_MdyyyyHHmm_todate(d.target.attr("abbr") + " " + d.cgh.sh + ":" + d.cgh.sm);
                        var end = str_MdyyyyHHmm_todate(d.target.attr("abbr") + " " + d.cgh.eh + ":" + d.cgh.em);
                        _dragevent = function() { $("#" + wrapid).remove(); $("#bbit-cal-buddle").dialog( "close" ); };
                        try {pos.col = d.cpwrap.parent().parent().attr("col");}catch (e) {}
                        quickadd(start, end, false, pos);
                        break;
                    case 2: //week view
                    case 3: //month view
                        var source = e.srcElement || e.target;
                        var lassoid = new Date().getTime();
                        if (!d.lasso) {
							 if ($(source).hasClass("monthdayshow"))
							{
								weekormonthtoday.call($(source).parent()[0],e);
								break;
							}
                            d.fdi = d.sdi = getdi(d.xa, d.ya, d.sx, d.sy);
                            d.lasso = $("<div style='display: block' class='drag-lasso-container'/>");
                            $(document.body).append(d.lasso);
                            addlasso(d.lasso, d.sdi, d.fdi, d.xa, d.ya, d.ya[d.fdi.y].e-d.ya[d.fdi.y].s);
                        }
                        d.lasso.attr("id", lassoid);
                        var si = Math.min(d.fdi.di, d.sdi.di);
                        var ei = Math.max(d.fdi.di, d.sdi.di);
                        var firstday = option.vstart;

                        var zz = 0;
                        for (var p=0; (p<=si);)
                        {
                            var x = DateAdd("d", zz, firstday);
                            p += __VIEWWEEKDAYS[x.getDay()];
                            zz++;
                        }
                        zz--;
                        si = zz;
                        ei = zz;

                        var start = DateAdd("d", si, firstday);
                        var end = DateAdd("d", ei, firstday);
                        _dragevent = function() { $("#" + lassoid).remove(); };
                        if (!$(source).hasClass("st-more")) quickadd(start, end, true, { left: e.pageX, top: e.pageY });
                        break;
                    case 4: // event moving
                        if (d.cpwrap) {
                            var start = DateAdd("d", d.cdi, option.vstart);
                            var end = DateAdd("d", d.cdi, option.vstart);
                            var gh = gW(d.ny, d.ny + d.h);
                            start.setHours(gh.sh, gh.sm);
                            end.setHours(gh.eh, gh.em);
                            if (start.getTime() == d.data[2].getTime() && end.getTime() == d.data[3].getTime()) {
                                d.cpwrap.remove();
                                d.target.show();
                            }
                            else {
                                dayupdate(d.data, start, end);
                            }
                        }
                        break;
                    case 5: //Resize
                        if (d.cpwrap) {
                            var start = new Date(d.data[2].toString());
                            var end = new Date(d.data[3].toString());
                            var gh = gW(d.top, d.top + nh);
                            start.setHours(gh.sh, gh.sm);
                            end.setHours(gh.eh, gh.em);

                            if (start.getTime() == d.data[2].getTime() && end.getTime() == d.data[3].getTime()) {
                                d.cpwrap.remove();
                                d.target.show();
                            }
                            else {
                                dayupdate(d.data, start, end);
                            }
                        }
                        break;
                    case 6:
                    case 7:
                        if (d.lasso) {
                            d.cpwrap.remove();
                            d.lasso.remove();
                            var start = new Date(d.data[2].toString());
                            var end = new Date(d.data[3].toString());
                            var currrentdate = DateAdd("d", d.cdi.di, option.vstart);
                            var diff = DateDiff("d", start, currrentdate);
                            start = DateAdd("d", diff, start);
                            end = DateAdd("d", diff, end);
                            if (start.getTime() != d.data[2].getTime() || end.getTime() != d.data[3].getTime()) {
                                dayupdate(d.data, start, end);
                            }
                        }
                        break;
                }
                d = _dragdata = null;
                $('body').noSelect(false);
                e.stopPropagation();
            }
        }
        function getdi(xa, ya, x, y) {
            var ty = 0;
            var tx = 0;
            var lx = 0;
            var ly = 0;
            if (xa && xa.length != 0) {
                lx = xa.length;
                if (x >= xa[lx - 1].e) {
                    tx = lx - 1;
                }
                else {
                    for (var i = 0; i < lx; i++) {
                        if (x > xa[i].s && x <= xa[i].e) {
                            tx = i;
                            break;
                        }
                    }
                }
            }
            if (ya && ya.length != 0) {
                ly = ya.length;
                if (y >= ya[ly - 1].e) {
                    ty = ly - 1;
                }
                else {
                    for (var j = 0; j < ly; j++) {
                        if (y > ya[j].s && y <= ya[j].e) {
                            ty = j;
                            break;
                        }
                    }
                }
            }
            return { x: tx, y: ty, di: ty * lx + tx };
        }
        function addlasso(lasso, sdi, edi, xa, ya, height) {
            var diff = sdi.di > edi.di ? sdi.di - edi.di : edi.di - sdi.di;
            diff++;
            var sp = sdi.di > edi.di ? edi : sdi;
            var ep = sdi.di > edi.di ? sdi : edi;
            var l = xa.length > 0 ? xa.length : 1;
            var h = ya.length > 0 ? ya.length : 1;
            var play = [];
            var width = xa[0].e - xa[0].s+1;
            var i = sp.x;
            var j = sp.y;
            var max = Math.min(document.documentElement.clientWidth, xa[l - 1].e) - 2;

            while (j < h && diff > 0) {
                var left = xa[i].s;
                var d = i + diff > l ? l - i : diff;
                var wid = width * d;
                //while (left + wid >= max) {
                //    wid--;
                //}
                play.push(Tp(__LASSOTEMP, { left: left+1, top: ya[j].s+4, height: height, width: wid }));
                i = 0;
                diff = diff - d;
                j++;
            }
            lasso.html(play.join(""));
        }
        function fixcppostion(cpwrap, e, xa, ya) {
            var x = e.pageX - 6;
            var y = e.pageY - 4;
            var w = cpwrap.width();
            var h = (option.cellheight/2) /*21*/;
            var lmin = xa[0].s + 6;
            var tmin = ya[0].s + 4;
            var lmax = xa[xa.length - 1].e - w - 2;
            var tmax = ya[ya.length - 1].e - h - 2;
            if (x > lmax) {
                x = lmax;
            }
            if (x <= lmin) {
                x = lmin + 1;
            }
            if (y <= tmin) {
                y = tmin + 1;
            }
            if (y > tmax) {
                y = tmax;
            }
            cpwrap.css({ left: x, top: y });
        }
        $(document)
		.mousemove(dragMove)
		.mouseup(dragEnd);
        //.mouseout(dragEnd);

        var c = {
            sv: function(view) { //switch view
                if (view == option.view) {
                    return;
                }
                clearcontainer();
                option.view = view;
                if (option.view=="list")
                {
                    option.eventItems = [];
                    option.lastdate = "";
                    option.currentlist = {dend:"",idend:0};
                    option.cachepages = new Array();
                }
                render();
                dochange();
            },
            rf2: function() {
            option.newWidthGroup = 0;
                render();
            },
            rf: function() {
            populate();

            },
            gt: function(d) {
                if (!d) {
                    d = new Date();
                }
                option.showday = d;
                render();
                dochange();
            },

            pv: function() {
                switch (option.view) {
                    case "day":
                        option.showday = DateAdd("d", -1, option.showday);
                        break;
                    case "week":
                        option.showday = DateAdd("w", -1, option.showday);
                        break;
                    case "nDays":
                    case "rowMonth":
                        option.showday = DateAdd("d",(-1 * option.nOfDays), option.showday);
                        break;
                    case "list":
                        option.page--;
                        break;
                    case "month":
                    case "nMonth":
                        option.showday = DateAdd("m", -1, option.showday);
                        break;
                }
                render();
                if (option.view!="list") dochange();
            },
            nt: function() {
                switch (option.view) {
                    case "day":
                        option.showday = DateAdd("d", 1, option.showday);
                        break;
                    case "week":
                        option.showday = DateAdd("w", 1, option.showday);
                        break;
                    case "nDays":
                    case "rowMonth":
                        option.showday = DateAdd("d", option.nOfDays, option.showday);
                        break;
                    case "list":
                        option.lastdate = option.currentlist.dend;
                        option.page++;
                        break;
                    case "month":
                    case "nMonth":
						var od = option.showday.getDate();
						option.showday = DateAdd("m", 1, option.showday);
						var nd = option.showday.getDate();
						if(od !=nd) //we go to the next month
						{
							option.showday= DateAdd("d", 0-nd, option.showday); //last day of last month
						}
                        break;
                }
                if (option.view!="list" || (option.view=="list" && (option.cachepages.length>option.page))) render();
                if (option.view!="list" || (option.view=="list" && (option.cachepages.length<=option.page))) dochange();
            },
            go: function() {
                return option;
            },
            so: function(p) {
                option = $.extend(option, p);
            }
        };
        this[0].bcal = c;
        return this;
    };

    /**
     * @description {Method} swtichView To switch to another view.
     * @param {String} view View name, one of 'day', 'week', 'month'.
     */
    $.fn.swtichView = function(view) {
        $(".mv_dlg").remove();
        return this.each(function() {
            if (this.bcal) {
                this.bcal.sv(view);
            }
        })

    };

    /**
     * @description {Method} reload To reload event of current time range.
     */
    $.fn.reload = function() {
        return this.each(function() {
            if (this.bcal) {
                this.bcal.rf();
            }
        })
    };
    $.fn.reload2 = function() {
        return this.each(function() {
            if (this.bcal) {
                this.bcal.rf2();
            }
        })
    };

    /**
     * @description {Method} gotoDate To go to a range containing date.
     * If view is week, it will go to a week containing date.
     * If view is month, it will got to a month containing date.
     * @param {Date} date. Date to go.
     */
    $.fn.gotoDate = function(d) {
        return this.each(function() {
            if (this.bcal) {
                this.bcal.gt(d);
            }
        })
    };

    /**
     * @description {Method} previousRange To go to previous date range.
     * If view is week, it will go to previous week.
     * If view is month, it will got to previous month.
     */
    $.fn.previousRange = function() {
        return this.each(function() {
            if (this.bcal) {
                this.bcal.pv();
            }
        })
    };

    /**
     * @description {Method} nextRange To go to next date range.
     * If view is week, it will go to next week.
     * If view is month, it will got to next month.
     */
    $.fn.nextRange = function() {
        return this.each(function() {
            if (this.bcal) {
                this.bcal.nt();
            }
        })
    };


    $.fn.BcalGetOp = function() {
        if (this[0].bcal) {
            return this[0].bcal.go();
        }
        return null;
    };


    $.fn.BcalSetOp = function(p) {
        if (this[0].bcal) {
            return this[0].bcal.so(p);
        }
    };

})(jQuery);
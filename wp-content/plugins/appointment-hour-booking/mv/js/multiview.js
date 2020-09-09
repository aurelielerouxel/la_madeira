$jc = jQuery.noConflict();
function waitvisible(gridcontainer)
                    {
                        if ($jc(gridcontainer).width()==0)
                            setTimeout("waitvisible('"+gridcontainer+"')",100);
                        else
                            $jc(gridcontainer).reload2();    
                    }
function fluidDialog() {
        var $visible = $jc(".ui-dialog:visible");
        // each open dialog
        $visible.each(function () {
            var $this = $jc(this);
            var dialog = $this.find(".ui-dialog-content");
            if (dialog.dialog("option","fluid")) {
                var wWidth = $jc(window).width();
                // check window width against dialog width
                if (wWidth < (parseInt(dialog.dialog("option","maxWidth")) + 50))  {
                    // keep dialog from filling entire screen
                    $this.css("max-width", "90%");
                } else {
                    // fix maxWidth bug
                    $this.css("max-width", dialog.dialog("option","maxWidth") + "px");
                }
                //reposition dialog
                dialog.dialog("option","position", dialog.dialog("option","position"));
            }
        });
    
    }
    $jc(window).resize(function () {
       fluidDialog();
    });
    $jc(document).on("dialogopen", ".ui-dialog", function (event, ui) {
        fluidDialog();
    });
window.$ = jQuery;
function initMultiViewCal(container,calendarId,config)
{
    $jc(document).ready(function($jc) {
        (function( $jc ) {            
            var def = {
            numberOfMonths:6,
            viewNew : config.edition,
            viewToday : config.btoday,
            viewDay : false,
            viewWeek : false,
            viewMonth : false,
            viewNMonth : false,
            viewRowMonth : false,
            viewNDays : false,
            viewList : false,
            numberOfDays : 10,
            list_start:"", //"","now" or string compatible with strtotime 
            list_end:"",  //"","now" or string compatible with strtotime 
            list_order:"asc",//asc or desc
            list_totalEvents:0, //0 = unlimited
            list_eventsPerPage:10,            
            list_readmore_numberofwords:0, //0 = unlimited, 
            viewRefresh : config.brefresh,
            viewNavigation : config.bnavigation,
            view: config.viewdefault, //'day','week','month','nMonth','nDays'
            weekstartday:config.start_weekday,
            showtooltip:false,
            tooltipon:1,
            shownavigate:false,
            navigateurl:config.url,
            target:0,
            cssStyle:"ui-darkness",
            readonly:!config.edition,
            nmonths:12,
            dialogWidth:300,
            dialogCloseAuto:false,
            height:0,
            showtooltipdwm:false,
            viewWeekDays:[1,1,1,1,1,1,1],
            militaryTime:true,
            path:"",
            hoursStart:0,
            hoursEnd:23,
            cellheight:42,
            hourswidth:52,
            rowsByCategory:"",
            rowsList:"",
            dayWithColumns:"",
            dayWithTime:true,
            thecontainer:container,
            userAdd:true,
            userEdit:true,
            userDel:true,
            userEditOwner:true,
            userDelOwner:true,
            userOwner:43,
            columnsList:false,
            rowsList:false,
            palette:0,
            paletteDefault:"f00"
            }
            if (config.rowsByCategory!="" && !config.dayWithTime)
                config.dayWithTime = false;
            config = $jc.extend(def, config);
            if (!config.userAdd)
                config.viewNew = false;
            var tabs = 0;
            if (config.viewNew && !config.readonly) tabs++;
            if (config.viewToday) tabs++;
            if (config.viewDay) tabs++;
            if (config.viewWeek) tabs++;
            if (config.viewMonth) tabs++;
            if (config.viewRowMonth) tabs++;
            if (config.viewNDays) tabs++;
            if (config.viewList) tabs++;
            if (config.viewNMonth) tabs++;
            if (config.viewRefresh) tabs++;
            if (config.viewNavigation && ((tabs==1 && config.viewList) || (tabs==1 && config.viewNMonth) || (tabs==2 && config.viewList && config.viewNMonth))) config.viewNavigation=false;
            if (config.viewNavigation) tabs++;
            var string = '<div id="calhead'+config.thecontainer+' "> '+
            
              ((tabs>1)?
                  '      <div id="caltoolbar'+config.thecontainer+'" class="ctoolbar">'+
                  ((config.viewNew && !config.readonly)?
                  '          <div id="faddbtn'+config.thecontainer+'" class="fbutton ui-state-default">'+
                  '              <div><span class="ui-icon ui-icon-new"></span><span title="'+i18n.dcmvcal.click_to_create_new_event+'" >'+i18n.dcmvcal.new_event+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewRefresh)?
                  '          <div  id="showreflashbtn'+config.thecontainer+'" class="fbutton ui-state-default">'+
                  '              <div><span class="ui-icon ui-icon-refresh"></span><span title="'+i18n.dcmvcal.refresh_view+'" class="showdayflash">'+i18n.dcmvcal.refresh+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewToday)?
                  '          <div class="btnseparator"></div>'+
                  '          <div id="showtodaybtn'+config.thecontainer+'" class="fbutton ui-state-default">'+
                  '              <div><span class="ui-icon ui-icon-today"></span><span title="'+i18n.dcmvcal.click_to_back_to_today+'" class="showtoday">'+i18n.dcmvcal.today+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewDay)?
                  '          <div id="showdaybtn'+config.thecontainer+'" class="fbutton ui-state-default '+((config.view=="day")?'ui-state-active':'')+'">'+
                  '              <div><span title="'+i18n.dcmvcal.sday+'" class="showdayview">'+i18n.dcmvcal.sday+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewNDays)?
                  '          <div  id="shownDaysbtn'+config.thecontainer+'" class="fbutton ui-state-default '+((config.view=="nDays")?'ui-state-active':'')+'">'+
                  '              <div><span title="'+i18n.dcmvcal.ndays+'" class="shownMonthview">'+i18n.dcmvcal.ndays+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewWeek)?
                  '          <div  id="showweekbtn'+config.thecontainer+'" class="fbutton ui-state-default '+((config.view=="week")?'ui-state-active':'')+'">'+
                  '              <div><span title="'+i18n.dcmvcal.week+'" class="showweekview">'+i18n.dcmvcal.week+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewMonth)?
                  '          <div  id="showmonthbtn'+config.thecontainer+'" class="fbutton ui-state-default '+((config.view=="month")?'ui-state-active':'')+'">'+
                  '              <div><span title="'+i18n.dcmvcal.month+'" class="showmonthview">'+i18n.dcmvcal.month+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewRowMonth)?
                  '          <div  id="showrowMonthbtn'+config.thecontainer+'" class="fbutton ui-state-default '+((config.view=="rowMonth")?'ui-state-active':'')+'">'+
                  '              <div><span title="'+i18n.dcmvcal.rowmonth+'" class="showrowMonthview">'+i18n.dcmvcal.rowmonth+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewNMonth)?
                  '          <div  id="shownMonthbtn'+config.thecontainer+'" class="fbutton ui-state-default '+((config.view=="nMonth")?'ui-state-active':'')+'">'+
                  '              <div><span title="'+i18n.dcmvcal.nmonth+'" class="shownMonthview">'+i18n.dcmvcal.nmonth+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewList)?
                  '          <div  id="shownListbtn'+config.thecontainer+'" class="fbutton ui-state-default '+((config.view=="list")?'ui-state-active':'')+'">'+
                  '              <div><span title="'+i18n.dcmvcal.list+'" class="showListview">'+i18n.dcmvcal.list+'</span></div>'+
                  '          </div>':'')+
                  ((config.viewNavigation)?
                  '          <div class="btnseparator"></div>'+
                  '          <div id="sfprevbtn'+config.thecontainer+'" title="'+i18n.dcmvcal.prev+'"  class="fbutton fprevbtn ">'+
                  '            <span class="ui-icon ui-icon-circle-triangle-w"></span>'+
                  '          </div>'+
                  '          <div id="sfnextbtn'+config.thecontainer+'" title="'+i18n.dcmvcal.next+'" class="fbutton ui-state-default">'+
                  '              <span class="ui-icon ui-icon-circle-triangle-e"></span>'+
                  '          </div>'+
                  '          <div class="fshowdatep">'+
                  '              <div>'+
                  '                  <input type="hidden" name="txtshow" id="hdtxtshow'+config.thecontainer+'" />'+
                  '                  <span id="txtdatetimeshow'+config.thecontainer+'">'+i18n.dcmvcal.loading+'</span>'+
                  '              </div>'+
                  '          </div>':'')+
                  ((config.print_button)?
                  '          <div  id="showprintbtn'+config.thecontainer+'" class="fbutton ui-state-default showprintbtn">'+
                  '              <div><span title="Print" class="shownprintview">Print</span></div>'+
                  '          </div>':'')+
                  ((config.export_ical_button)?
                  '          <div  id="shownICALbtn'+config.thecontainer+'" class="fbutton ui-state-default ">'+
                  '              <div><span title="iCal" class="showicalview">iCal</span></div>'+
                  '          </div>':'')+
                  '      <div style="clear:both"></div></div>':'')+
              '</div>'+
              '<div id="editEventContainer"></div>'+
              '<div>'+
              '    <div id="dvCalMain'+config.thecontainer+'" class="calmain">'+
              '          <div id="loadingpannel'+config.thecontainer+'" class="ptogtitle loadicon" style="display: none;">'+i18n.dcmvcal.loading_data+'</div>'+
              '          <div id="errorpannel'+config.thecontainer+'" class="ptogtitle loaderror" style="display: none;">'+i18n.dcmvcal.sorry_could_not_load_your_data+'</div>'+
            
              '        <div  class="gridcontainercover"><div id="gridcontainer'+config.thecontainer+'" style="position:relative;overflow-y: visible;"></div></div>'+
              '    </div>'+
              '</div>';
            var $container = $jc("#"+container);
            if (tabs<=1 && config.viewList)
               $jc("#"+container).parent().addClass("mvlist");
            if (tabs<=1 && config.viewNMonth)
               $jc("#"+container).parent().addClass("mvNMonth");   
            $container.html(string);
                    var DATA_FEED_URL = pathCalendar+"&f=datafeed";
                    var DATA_EDIT_URL = pathCalendar+"&f=edit&month_index="+i18n.dcmvcal.dateformat.month_index+"&delete="+((config.userDel)?"1":"0")+"&palette="+config.palette+"&paletteDefault="+config.paletteDefault+"&calid="+calendarId;
                    var op = {
                        numberOfMonths:config.numberOfMonths,
                        view: config.view,
                        readonly:config.readonly,
                        weekstartday: config.weekstartday,
                        showtooltip:config.showtooltip,
                        tooltipon:config.tooltipon,
                        shownavigate:config.shownavigate,
                        navigateurl:config.navigateurl,
                        target:config.target,
                        showday: new Date(),
                        EditCmdhandler:Edit,
                        DeleteCmdhandler:Delete,
                        ViewCmdhandler:View,
                        onWeekOrMonthToDay:wtd,
                        onBeforeRequestData: cal_beforerequest,
                        onAfterRequestData: cal_afterrequest,
                        onRequestDataError: cal_onerror,
                        autoload:true,
                        url: DATA_FEED_URL + "&method=list&calid="+calendarId,
                        quickAddUrl: DATA_FEED_URL + "&month_index="+i18n.dcmvcal.dateformat.month_index+"&method=add&calid="+calendarId,
                        quickUpdateUrl: DATA_FEED_URL + "&method=update&calid="+calendarId,
                        quickDeleteUrl: DATA_FEED_URL + "&method=remove&calid="+calendarId,
                        dialogWidth:config.dialogWidth,
                        dialogCloseAuto:config.dialogCloseAuto,
                        height:config.height
            
                    };
                    op = $jc.extend(config, op);
                    if (op.startdate && (op.startdate.length>=8) && (op.startdate.length<=10))
                    {
                        var i = op.startdate.split("-");
                        op.startdate = new Date(i[0]*1,i[1]*1-1,i[2]*1);
                        op.showday = op.startdate;
                    }
                    else
                        op.startdate = "";
                    if (op.mindate && (op.mindate.length>=8) && (op.mindate.length<=10))
                    {
                        var i = op.mindate.split("-");
                        op.mindate = new Date(i[0]*1,i[1]*1-1,i[2]*1);
                    }
                    else
                        op.mindate = "";
                    if (op.maxdate && (op.maxdate.length>=8) && (op.maxdate.length<=10))
                    {
                        var i = op.maxdate.split("-");
                        op.maxdate = new Date(i[0]*1,i[1]*1-1,i[2]*1);
                    }
                    else
                        op.maxdate = "";     
                    var $dv = $jc("#calhead"+op.thecontainer);
                    var _MH = document.documentElement.clientHeight;
                    var dvH = $dv.height() + 2;
                    //op.height = _MH - dvH;
                    //op.height = "100%";
                    op.eventItems =[];
                    setTimeout("waitvisible('#gridcontainer"+op.thecontainer+"')",100);
                    var p = $jc("#gridcontainer"+op.thecontainer).bcalendar(op).BcalGetOp();
                    if (p && p.datestrshow) {
                        $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                    }
                    $jc("#caltoolbar"+op.thecontainer).noSelect();
                    try {
                    $jc("#hdtxtshow"+op.thecontainer).datepicker({ picker: "#txtdatetimeshow"+op.thecontainer, showtarget: $jc("#txtdatetimeshow"+op.thecontainer),
                    onReturn:function(r){
                                    var p = $jc("#gridcontainer"+op.thecontainer).gotoDate(r).BcalGetOp();
                                    if (p && p.datestrshow) {
                                        $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                                    }
                             }
                    });
                    } catch(e){};
                    function cal_beforerequest(type)
                    {
                        var t=i18n.dcmvcal.loading_data;
                        switch(type)
                        {
                            case 1:
                                t=i18n.dcmvcal.loading_data;
                                break;
                            case 2:
                            case 3:
                            case 4:
                                t=i18n.dcmvcal.request_processed;
                                break;
                        }
                        $jc("#errorpannel"+op.thecontainer).hide();
                        $jc("#loadingpannel"+op.thecontainer).html(t);
                        $jc("#loadingpannel"+op.thecontainer).show();
                    }
                    function cal_afterrequest(type)
                    {
                        switch(type)
                        {
                            case 1:
                                $jc("#loadingpannel"+op.thecontainer).hide();
                                break;
                            case 2:
                            case 3:
                            case 4:
                                $jc("#loadingpannel"+op.thecontainer).html(i18n.dcmvcal.success);
                                window.setTimeout(function(){ $jc("#loadingpannel"+op.thecontainer).hide();},2000);
                            break;
                        }
            
                    }
                    function cal_onerror(type,data)
                    {
                        if (type!=2)
                        $jc("#errorpannel"+op.thecontainer).show();
                        if (data.Msg=='OVERLAPPING')
                            alert(i18n.dcmvcal.error_overlapping);
                        //else
                            //alert(data.Msg);    
                    }
                    function Edit(data,pos)
                    {
                    	 if (pos === undefined) pos = "";
                       var eurl=DATA_EDIT_URL+"&mt="+(config.militaryTime?"true":"false")+"&css="+config.cssStyle+"&lang="+config.language+"&weekstartday="+config.weekstartday+"&hoursStart="+config.hoursStart+"&hoursEnd="+config.hoursEnd+"&id={0}&start={2}&end={3}&isallday={4}";
                        if(data)
                        {
                            var url = StrFormat(eurl,data); 
                            showEditEvent(url,pos);
                        }
                    }
                    function View(data)
                    {
                        var str = "";
                        $jc.each(data, function(i, item){
                            str += "[" + i + "]: " + item + "\n";
                        });
                    }
                    function Delete(data,callback)
                    {
            
                        $jc.alerts.okButton=i18n.dcmvcal.ok;
                        $jc.alerts.cancelButton=i18n.dcmvcal.cancel;
                        hiConfirm(i18n.dcmvcal.are_you_sure_delete, 'Confirm',function(r){ r && callback(0,data[0]);});
                    }
                    function wtd(p)
                    {
                       if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc("#showdaybtn"+op.thecontainer).addClass("ui-state-active");
                    }
                    //to show day view
                    try {
                    $jc("#showdaybtn"+op.thecontainer).click(function(e) {
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc(this).addClass("ui-state-active");
                        var p = $jc("#gridcontainer"+op.thecontainer).swtichView("day").BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                    });
                    } catch(e){};
                    //to show week view
                    try {
                    $jc("#showweekbtn"+op.thecontainer).click(function(e) {
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc(this).addClass("ui-state-active");
                        var p = $jc("#gridcontainer"+op.thecontainer).swtichView("week").BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
            
                    });
                    } catch(e){};
                    //to show month view
                    try {
                    $jc("#showmonthbtn"+op.thecontainer).click(function(e) {
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc(this).addClass("ui-state-active");
                        var p = $jc("#gridcontainer"+op.thecontainer).swtichView("month").BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                    });
                    } catch(e){};
                    //to show nDays view
                    try {
                    $jc("#shownDaysbtn"+op.thecontainer).click(function(e) {
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc(this).addClass("ui-state-active");
                        var p = $jc("#gridcontainer"+op.thecontainer).swtichView("nDays").BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                    });
                    } catch(e){};
                    //to show List view
                    try {
                    $jc("#shownListbtn"+op.thecontainer).click(function(e) {
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc(this).addClass("ui-state-active");
                        var p = $jc("#gridcontainer"+op.thecontainer).swtichView("list").BcalGetOp();
                        
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                    });                    
                    } catch(e){};
                    //to show rowMonth view
                    try {
                    $jc("#showrowMonthbtn"+op.thecontainer).click(function(e) {
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc(this).addClass("ui-state-active");
                        var p = $jc("#gridcontainer"+op.thecontainer).swtichView("rowMonth").BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                    });                    
                    } catch(e){};
                    //to show nMonth view
                    try {
                    $jc("#shownMonthbtn"+op.thecontainer).click(function(e) {
                        $jc("#caltoolbar"+op.thecontainer+" div.ui-state-active").each(function() {
                            $jc(this).removeClass("ui-state-active");
                        })
                        $jc(this).addClass("ui-state-active");
                        var p = $jc("#gridcontainer"+op.thecontainer).swtichView("nMonth").BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                    });
                    } catch(e){};
                    try {
                    $jc("#showreflashbtn"+op.thecontainer).click(function(e){
                        $jc("#gridcontainer"+op.thecontainer).reload();
                    });
                    } catch(e){};
                    try {
                    $jc("#shownICALbtn"+op.thecontainer).click(function(e){
                        window.location = DATA_FEED_URL.replace("datafeed","ical")+"&id="+calendarId;
                    });
                    } catch(e){};
                    function CallPrint(code)
                    {
                        var printWindow = window.open();
                        printWindow.document.write('<html>\n');  
                        printWindow.document.write('<head><style>#multicalendar .ctoolbar{height:22px}#multicalendar .fbutton{display:none}</style>\n');                 
                        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1)
                        {
                        }
                        else
                        {         
                           printWindow.document.write('<link href="'+config.mvcsspath+config.cssStyle+'/calendar.css" rel="Stylesheet" type="text/css" />\n');
                           printWindow.document.write('<link href="'+config.mvcsspath+'main.css" rel="Stylesheet" type="text/css" />\n');
                        }
                        printWindow.document.write('<script>\n');
                        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1)
                        {         
                           printWindow.document.write('var chromeCss = document.createElement("link");\n'); 
                           printWindow.document.write('chromeCss.rel = "stylesheet";\n');      
                           printWindow.document.write('chromeCss.href = "'+config.mvcsspath+config.cssStyle+'/calendar.css";\n');            
                           printWindow.document.write('document.getElementsByTagName("head")[0].appendChild(chromeCss);\n');
                           printWindow.document.write('var chromeCss = document.createElement("link");\n'); 
                           printWindow.document.write('chromeCss.rel = "stylesheet";\n');      
                           printWindow.document.write('chromeCss.href = "'+config.mvcsspath+'main.css";\n');            
                           printWindow.document.write('document.getElementsByTagName("head")[0].appendChild(chromeCss);\n');                                               
                        }
                        printWindow.document.write('function winPrint()\n');
                        printWindow.document.write('{\n');
                        printWindow.document.write('window.focus();\n');
                        if (navigator.userAgent.toLowerCase().indexOf("chrome") > -1)
                            printWindow.document.write('printChrome();\n');
                        else
                        	  printWindow.document.write('window.print();\n');
                        if(navigator.userAgent.toLowerCase().indexOf("firefox") > -1)
                            printWindow.document.write('window.close();\n');
                        else
                            printWindow.document.write('chkstate();\n');         
                        printWindow.document.write('}\n');              
                        
                        printWindow.document.write('function chkstate()\n');
                        printWindow.document.write('{\n');
                        printWindow.document.write('if(document.readyState=="complete")');
                        printWindow.document.write('{\n');                  
                        printWindow.document.write('window.close();\n'); 
                        printWindow.document.write('}\n'); 
                        printWindow.document.write('else{\n');          
                        printWindow.document.write('setTimeout("chkstate();",3000);\n'); 
                        printWindow.document.write('}\n'); 
                        printWindow.document.write('}\n');
                        
                        printWindow.document.write('function printChrome()\n');
                        printWindow.document.write('{\n');         
                        printWindow.document.write('if(document.readyState=="complete")');
                        printWindow.document.write('{\n');                                                      
                        printWindow.document.write('window.print();\n'); 
                        printWindow.document.write('}\n'); 
                        printWindow.document.write('else{\n');                       
                        printWindow.document.write('setTimeout("printChrome();",3000);\n'); 
                        printWindow.document.write('}\n'); 
                        printWindow.document.write('}\n');                       
                        
                        printWindow.document.write('</scr');
                        printWindow.document.write('ipt>');         
                        
                        printWindow.document.write('</head>');
                        printWindow.document.write('<body onload="winPrint()" >');
                        printWindow.document.write('<div id="multicalendar">'+code+'</div>');
                        printWindow.document.write('</body>');  
                        printWindow.document.write('</html>');  
                        printWindow.document.close();
                    }	
                    try {
                    $jc("#showprintbtn"+op.thecontainer).click(function(e){
                         //var printWindow=window.open();
                         var code = $jc("#"+op.thecontainer).parent().html()+"";
                         if ($jc("#gridcontainer"+op.thecontainer).BcalGetOp().view=="nMonth")
                             code = code.replace(/width:/g,"width-");
                             CallPrint(code);                             
                    });
                    } catch(e){};	
                    function showEditEvent(url,pos)
                    {   
                    	  if (pos === undefined) pos = "";
                        var width = 600;
                        var height = 520;
                        try {
                        $jc("#editEvent").remove();
                        var content = '<iframe id="dailog_iframe_1305934814858" frameborder="0" style="border:none;width:100%;height:'+(height-50)+'px" src="'+url+'" border="0" scrolling="no">';
                        $jc("#editEventContainer").append("<div id=\"editEvent\" >"+content+"</div>");                            
                        if (pos=="")
                            pos = { 
                                 my: "left top",
                                 at: "left top",
                                 collision:"fit flip",
                                 of: $jc("#gridcontainer"+op.thecontainer)
                               }                           
                        $jc("#editEvent").dialog({
                            width: width,
                            height: height,
                            modal: true,resizable: false,maxWidth: width,
                            fluid: true,
                            open: function(event, ui){fluidDialog();},
                            //position: 'center',
                            position: pos,
                            title:i18n.dcmvcal.manage_the_calendar
                            ,close: function(event, ui) {$jc("#editEvent").remove();$jc("#gridcontainer"+op.thecontainer).reload();  }
                        }).parent().addClass("mv_dlg").addClass("mv_dlg_editevent");
                        $jc(".ui-widget-overlay").css("position","absolute");
                        $jc(".ui-widget-overlay").css("top","0");
                        $jc(".ui-widget-overlay").css("left","0");
                        $jc(".ui-widget-overlay").css("background","#aaaaaa");
                        $jc(".ui-widget-overlay").css("opacity","0.3");
                        } catch(e){};
                    }
                    //Add a new event
                    try {
                    $jc("#faddbtn"+op.thecontainer).click(function(e) {
                        var url =DATA_EDIT_URL+"&r="+Math.random()+"&css="+config.cssStyle+"&lang="+config.language+"&weekstartday="+config.weekstartday+"&hoursStart="+config.hoursStart+"&hoursEnd="+config.hoursEnd;
                        showEditEvent(url);
            
            
                    });
                    } catch(e){};
                    //go to today
                    try {
                    $jc("#showtodaybtn"+op.thecontainer).click(function(e) {
                        var p = $jc("#gridcontainer"+op.thecontainer).gotoDate().BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
            
            
                    });
                    } catch(e){};
                    //previous date range
                    try {
                    $jc("#sfprevbtn"+op.thecontainer).click(function(e) {
                        if (!$jc("#sfprevbtn"+op.thecontainer).hasClass("non-navigate"))
                        {
                            
                        var p = $jc("#gridcontainer"+op.thecontainer).previousRange().BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                        }
                    });
                    } catch(e){};
                    //next date range
                    try {
                    $jc("#sfnextbtn"+op.thecontainer).click(function(e) {
                        if (!$jc("#sfnextbtn"+op.thecontainer).hasClass("non-navigate"))
                        {
                        var p = $jc("#gridcontainer"+op.thecontainer).nextRange().BcalGetOp();
                        if (p && p.datestrshow) {
                            $jc("#txtdatetimeshow"+op.thecontainer).text(p.datestrshow);
                        }
                        }
                    });
                    } catch(e){};
                    
            
            
            
            
            
            
            
            
           })($jc); 

        });
}
/*! calendar - v1.2 - 2014-02-17 2:45:51 PM
* Copyright (c) 2014 昂天; Licensed  */
KISSY.add("gallery/calendar/1.2/datetools",function(a){var b=/\d+/g;return{parse:function(a){return a=a.match(b),a?new Date(a[0],a[1]-1,a[2]):null},stringify:function(b){return a.isDate(b)?b.getFullYear()+"-"+this.filled(1*b.getMonth()+1)+"-"+this.filled(b.getDate()):null},siblings:function(a,c){return a=a.match(b),this.stringify(new Date(a[0],a[1]-1,1*a[2]+1*c))},siblingsMonth:function(a,b){return new Date(a.getFullYear(),1*a.getMonth()+b)},differ:function(a,b){return parseInt(Math.abs(this.parse(a)-this.parse(b))/24/60/60/1e3)},week:function(a){return"\u661f\u671f"+["\u65e5","\u4e00","\u4e8c","\u4e09","\u56db","\u4e94","\u516d"][this.parse(a).getDay()]},isDate:function(a){var c=/^((19|2[01])\d{2})-(0?[1-9]|1[012])-(0?[1-9]|[12]\d|3[01])$/;return c.test(a)?1*this.parse(a).getMonth()+1==a.match(b)[1]:!1},filled:function(a){return String(a).replace(/^(\d)$/,"0$1")}}}),KISSY.add("gallery/calendar/1.2/holidays",function(a,b){var c={yuandan:{name:"\u5143\u65e6",dates:["2013-01-01","2014-01-01","2015-01-01","2016-01-01","2017-01-01","2018-01-01","2019-01-01","2020-01-01"]},chuxi:{name:"\u9664\u5915",dates:["2013-02-09","2014-01-30","2015-02-18","2016-02-07","2017-01-27","2018-02-15","2019-02-04","2020-01-24"]},chunjie:{name:"\u6625\u8282",dates:["2013-02-10","2014-01-31","2015-02-19","2016-02-08","2017-01-28","2018-02-16","2019-02-05","2020-01-25"]},yuanxiao:{name:"\u5143\u5bb5\u8282",dates:["2013-02-24","2014-02-14","2015-03-05","2016-02-22","2017-02-11","2018-03-02","2019-02-19","2020-02-08"]},qingming:{name:"\u6e05\u660e",dates:["2013-04-04","2014-04-05","2015-04-05","2016-04-04","2017-04-04","2018-04-05","2019-04-05","2020-04-04"]},wuyi:{name:"\u52b3\u52a8\u8282",dates:["2013-05-01","2014-05-01","2015-05-01","2016-05-01","2017-05-01","2018-05-01","2019-05-01","2020-05-01"]},duanwu:{name:"\u7aef\u5348\u8282",dates:["2013-06-12","2014-06-02","2015-06-20","2016-06-09","2017-05-30","2018-06-18","2019-06-07","2020-06-25"]},zhongqiu:{name:"\u4e2d\u79cb\u8282",dates:["2013-09-19","2014-09-08","2015-09-27","2016-09-15","2017-10-04","2018-09-24","2019-09-13"]},guoqing:{name:"\u56fd\u5e86\u8282",dates:["2013-10-01","2014-10-01","2015-10-01","2016-10-01","2017-10-01","2018-10-01","2019-10-01","2020-10-01"]}};return{dates:function(){var d,e={};return a.each(c,function(c){a.each(c.dates,function(a){for(d=0;7>d;d++)!function(a,b,c){e[a]=e[a]?b>2?c:e[a]:c}(b.siblings(a,d-3),d,c.name+(3!=d?(3>d?"\u524d":"\u540e")+Math.abs(d-3)+"\u5929":""))})}),e},getClassName:function(b){for(var d in c)if(a.inArray(b,c[d].dates))return d;return""}}},{requires:["./datetools"]}),KISSY.add("gallery/calendar/1.2/index",function(a,b,c,d,e){function f(){var a=this;f.superclass.constructor.apply(a,arguments),a._initializer()}var g=b.all,h=a.substitute,i=a.one(window),j=a.one(document);return a.extend(f,c,{_initializer:function(){var a=this;a.get("isHoliday")&&(a._dateMap=e.dates()),a._setUniqueTag(),a.renderUI(),a.boundingBox&&(a._minDateCache=a.get("minDate"),a._clickoutside=function(b){var c=g(b.target);c.hasClass(a._triggerNodeClassName)||c.hasClass(a._triggerNodeIcon)||c.parent("#"+a._calendarId)||!a._hide||a.hide()},a.get("container")||(a._hide=!0,a.hide()))},renderUI:function(){var b=this,c=a.one(b.get("container"));(c||g("body")).append(b._initCalendarHTML(b.get("date"))),b.boundingBox=a.one("#"+b._calendarId),b.boundingBox&&(b.boundingBox.css("position",c?"relative":"absolute"),b._dateBox=b.boundingBox.one(".date-box"),b._contentBox=b.boundingBox.one(".content-box"),b._messageBox=b.boundingBox.one(".message-box"),c||(b._inputWrap()._setDefaultValue(),b.boundingBox.css("top","-9999px")),b.set("boundingBox",b.boundingBox),b.bindUI()._fixSelectMask()._setWidth()._setBtnStates()._setDateStyle())},bindUI:function(){var a=this;return a.on("afterMessageChange",a._setMessage),a.boundingBox.delegate("click","."+a._delegateClickClassName,a._DELEGATE.click,a),a.boundingBox.delegate("change","."+a._delegateChangeClassName,a._DELEGATE.change,a),a.get("container")?a:(a.boundingBox.delegate("mouseenter mouseleave","a",a._DELEGATE.mouse,a),j.delegate("focusin","."+a._triggerNodeClassName,a._DELEGATE.focusin,a),j.delegate("keyup","."+a._triggerNodeClassName,a._DELEGATE.keyup,a),j.delegate("keydown","."+a._triggerNodeClassName,a._DELEGATE.keydown,a),j.delegate("click","."+a._triggerNodeIcon,a._DELEGATE.iconClick,a),j.delegate("click","."+a._triggerNodeClassName,a._DELEGATE.triggerNodeClick,a),i.on("resize",a._setPos,a),a)},detachEvent:function(){var a=this;a.detach("afterMessageChange",a._setMessage),a.boundingBox.detach(),j.undelegate("focusin","."+a._triggerNodeClassName,a._DELEGATE.focusin,a),j.undelegate("keyup","."+a._triggerNodeClassName,a._DELEGATE.keyup,a),j.undelegate("keydown","."+a._triggerNodeClassName,a._DELEGATE.keydown,a),j.undelegate("click","."+a._triggerNodeIcon,a._DELEGATE.iconClick,a),j.undelegate("click","."+a._triggerNodeClassName,a._DELEGATE.triggerNodeClick,a),i.detach("resize",a._setPos,a)},destroy:function(){var a=this;a.detachEvent(),a.boundingBox.remove()},syncUI:function(){var a=this;a.get("container")||!a.get("triggerNode")&&!a.get("finalTriggerNode")||a._inputWrap()},render:function(){var a=this;return a._dateBox.html(a._dateHTML()),a._setWidth()._setDateStyle()._setBtnStates(),a.fire("render"),a},nextMonth:function(){var a=this;return a.set("date",f.DATE.siblingsMonth(a.get("date"),1)),a.render(),a.fire("nextmonth"),a},prevMonth:function(){var a=this;return a.set("date",f.DATE.siblingsMonth(a.get("date"),-1)),a.render(),a.fire("prevmonth"),a},show:function(){var b=this;return b.boundingBox.show(),b._setDefaultDate().render(),b.fire("show",{node:b.currentNode}),a.later(function(){j.on("click",b._clickoutside,b)},100,!1),b},hide:function(){var a=this;return j.detach("click",a._clickoutside,a),a.boundingBox.hide(),a.hideMessage(),a.currentNode&&(a.currentNode.getDOMNode()._selected=null),a._cacheNode=null,a._hide=!0,a.fire("hide",{node:a.currentNode}),a},showMessage:function(){var b=this;return b.fire("showmessage"),a.later(function(){b._messageBox.addClass("visible")},5,!1),b},hideMessage:function(){var a=this;return a._messageBox.removeClass("visible"),a.fire("hidemessage"),a},getSelectedDate:function(){var a=this;return a.get("selectedDate")},getCurrentNode:function(){var a=this;return a.currentNode},getDateInfo:function(a){var b=f.DATE.stringify(f.DATE.parse(a)),c=-1,d=f.DATE.stringify(new Date),e=["\u4eca\u5929","\u660e\u5929","\u540e\u5929"];switch(!0){case b==d:c=0;break;case b==f.DATE.siblings(d,1):c=1;break;case b==f.DATE.siblings(d,2):c=2}return this._dateMap&&this._dateMap[b]||e[c]||f.DATE.week(b)},setDateInfo:function(b,c){var d=this;d._setDateInfo(b,a.one(c))},_getDateStatus:function(b){var c=this;return c.get("minDate")&&f.DATE.parse(b)<f.DATE.parse(c.get("minDate"))||c.get("maxDate")&&f.DATE.parse(b)>f.DATE.parse(c.get("maxDate"))||a.inArray(b,c.get("disabled"))},_getHolidaysClass:function(a,b){var c=this;switch(!0){case b:case!c.get("isHoliday"):return"";case a==f.DATE.stringify(new Date):return"today";case!0:return e.getClassName(a)}},_setWidth:function(){var b=this,c=b.boundingBox,d=b._contentBox;return c.all(".inner, h4").css("width",c.one("table").outerWidth()),c.css("width",c.one(".inner").outerWidth()*b.get("count")+parseInt(d.css("borderLeftWidth"))+parseInt(d.css("borderRightWidth"))+parseInt(d.css("paddingLeft"))+parseInt(d.css("paddingRight"))),6==a.UA.ie&&c.one("iframe").css({width:c.outerWidth(),height:c.outerHeight()}),b},_setValue:function(b,c){var d=this;if(this.set("selectedDate",b),this.get("container"))return d;switch(d._isInput(d.currentNode)&&!c&&d.currentNode.val(b),!0){case d.boundingBox.hasClass("calendar-bounding-box-style"):d.set("endDate",b);break;case!d.boundingBox.hasClass("calendar-bounding-box-style")&&!!d.get("finalTriggerNode"):var e=a.one(d.get("finalTriggerNode"));d.set("startDate",b),e&&d.get("isAutoSwitch")&&e.getDOMNode().select();break;default:d.set("selectedDate",b)}return d},_setDateInfo:function(a,b){var c=this,b=b||c.currentNode;return!c.get("container")&&c.get("isDateInfo")&&c._isInput(b)&&b.prev().html(f.DATE.isDate(a)?c.getDateInfo(a):""),c},_setDefaultValue:function(){var b=this,c=a.one(b.get("triggerNode")),d=a.one(b.get("finalTriggerNode")),e=c&&c.val(),g=d&&d.val();return b.get("isDateInfo")&&(f.DATE.isDate(e)&&(b.set("startDate",e),b._setDateInfo(e,c)),f.DATE.isDate(g)&&(b.set("endDate",g),b._setDateInfo(g,d))),b},_setDefaultDate:function(){var a=this;if(a.get("container"))return a;var b=a.get("date"),c=a.get("startDate"),d=a.get("endDate"),e=a.boundingBox.hasClass("calendar-bounding-box-style");return a.get("startDate")&&a.set("minDate",e?c:a._minDateCache),e&&f.DATE.parse(c)>f.DATE.parse(d)?(a.set("date",c||b),a):(a.set("date",a.currentNode.val()||b),a)},_setDateStyle:function(){var a=this,b=a.get("startDate"),c=a.get("endDate");return a.boundingBox.all("td").each(function(d){var e=d.attr("data-date");if(d.hasClass("disabled"))return a;d.removeClass("start-date").removeClass("end-date").removeClass("selected-range").removeClass("selected-date"),e==b&&d.addClass("start-date"),e==c&&d.addClass("end-date"),e==a.get("selectedDate")&&d.addClass("selected-date");var g=f.DATE.parse(e),h=f.DATE.parse(b),i=f.DATE.parse(c);return!b||!c||h>i?a:void(g>h&&i>g&&d.addClass("selected-range"))}),a},_setBtnStates:function(){var a=this,b=+f.DATE.siblingsMonth(a.get("date"),0),c=a.get("maxDate"),d=a.get("minDate"),e=a.boundingBox.one(".prev-btn"),g=a.boundingBox.one(".next-btn"),h=a.boundingBox.one(".close-btn");return d&&(d=+f.DATE.parse(d)),c&&(c=+f.DATE.siblingsMonth(f.DATE.parse(c),1-a.get("count"))),e[b<=(d||Number.MIN_VALUE)?"addClass":"removeClass"]("prev-btn-disabled"),g[b>=(c||Number.MAX_VALUE)?"addClass":"removeClass"]("next-btn-disabled"),a.get("container")&&h.hide(),a},_setMessage:function(){var a=this;return a._messageBox.html(a.get("message")),a},_setUniqueTag:function(){var b=this,c=a.guid();return b._calendarId="calendar-"+c,b._delegateClickClassName="delegate-click-"+c,b._delegateChangeClassName="delegate-change-"+c,b._triggerNodeIcon="trigger-icon-"+c,b._triggerNodeClassName="trigger-node-"+c,b},_setPos:function(){var b=this,c=b.currentNode,d=b.boundingBox;return c?(a.later(function(){var b=c.offset().left,e=c.offset().top+c.outerHeight(),f=d.outerWidth(),g=d.outerHeight(),h=c.outerWidth(),i=c.outerHeight(),j=a.DOM.viewportWidth()-f,k=a.DOM.viewportHeight()-g;!function(a,c){e>k&&(e=0>a?e:a),b>j&&(b=0>c?b:c)}(e-g-i,b+h-f),d.css({top:e,left:b})},10,!1),b):b},_inputWrap:function(){var a=this,b=g(a.get("triggerNode")),c=g(a.get("finalTriggerNode")),d=a.get("isDateInfo")||a.get("isDateIcon");return b.each(function(b){if(d&&a._isInput(b)&&!b.parent(".calendar-input-wrap")){var c=g(f.INPUT_WRAP_TEMPLATE);b.after(c),c.append(h(f.START_DATE_TEMPLATE,{delegate_icon:a._triggerNodeIcon})).append(b),a.get("isDateIcon")||b.prev().removeClass("calendar-start-icon")}b.addClass(a._triggerNodeClassName),a._isInput(b)&&b.attr("autocomplete","off")}),c.each(function(b){if(d&&a._isInput(b)&&!b.parent(".calendar-input-wrap")){var c=g(f.INPUT_WRAP_TEMPLATE);b.after(c),c.append(h(f.END_DATE_TEMPLATE,{delegate_icon:a._triggerNodeIcon})).append(b),a.get("isDateIcon")||b.prev().removeClass("calendar-end-icon")}b.addClass(a._triggerNodeClassName),a._isInput(b)&&b.attr("autocomplete","off")}),a},_fixSelectMask:function(){var b=this;return 6==a.UA.ie&&b.boundingBox.append("<iframe />"),b},_mouseenter:function(a){var b=this,c=b.boundingBox,d=b.get("startDate"),e=a.attr("data-date"),g=c.all("td");return clearTimeout(b.leaveTimer),g.removeClass("hover"),f.DATE.parse(d)>f.DATE.parse(e)?b:void g.each(function(a){var b=f.DATE.parse(a.attr("data-date"));!a.hasClass("disabled")&&b>f.DATE.parse(d)&&b<f.DATE.parse(e)&&a.addClass("hover")})},_mouseleave:function(){var a=this;clearTimeout(a.leaveTimer),a.leaveTimer=setTimeout(function(){a.boundingBox.all("td").removeClass("hover")},30)},_DELEGATE:{click:function(b){var c=this;b.preventDefault();var d=a.one(b.currentTarget),e=d.attr("data-date");switch(!0){case d.hasClass("prev-btn")&&!d.hasClass("prev-btn-disabled"):c.prevMonth();break;case d.hasClass("next-btn")&&!d.hasClass("next-btn-disabled"):c.nextMonth();break;case d.hasClass("close-btn"):c.hide();break;case d&&d.hasClass(c._delegateClickClassName)&&c.boundingBox.hasClass("calendar-bounding-box-style")&&e==c.get("minDate")&&!c.get("isSameDate"):break;case!!e&&!d.hasClass("disabled"):c.get("container")||c.hide(),c._setValue(e)._setDateInfo(e)._setDateStyle().fire("dateclick",{date:e,dateInfo:c.getDateInfo(e)})}},change:function(){var b=this,c=b.boundingBox.all("."+b._delegateChangeClassName),d=c.item(0).val(),e=c.item(1).val(),g=b.get("maxDate");g&&g.substr(0,4)==d&&(e=f.DATE.filled(Math.min(e,g.substr(5,2)))),b.set("date",d+"-"+e+"-01"),b.render(),b.fire("selectchange",{year:d,month:e}),b._hide=!1,a.later(function(){b._hide=!0},0)},mouse:function(b){var c=this,d=a.one(b.currentTarget).parent("td");if(!d.hasClass("disabled"))switch(b.type){case"mouseenter":c.boundingBox.hasClass("calendar-bounding-box-style")&&c.get("startDate")&&c._mouseenter(d);break;case"mouseleave":c._mouseleave()}},focusin:function(b){var c=this,d=c.currentNode=a.one(b.currentTarget);c.boundingBox[c._inNodeList(d,g(c.get("triggerNode")))?"removeClass":"addClass"]("calendar-bounding-box-style"),c.hideMessage(),c._cacheNode&&c._cacheNode.getDOMNode()!=d.getDOMNode()&&c.hide(),"none"==c.boundingBox.css("display")&&c.show()._setWidth()._setPos(),c._cacheNode=d},keyup:function(b){var c=this;if(c.get("isKeyup")){clearTimeout(this.keyupTimer);var d=a.one(b.currentTarget);if(c._isInput(d)){var e=d.val();f.DATE.isDate(e)&&(c._setDateInfo(e),c.keyupTimer=setTimeout(function(){var a=f.DATE.parse(e);c.set("date",a),c._setValue(f.DATE.stringify(a),!0),c.render()},200))}}},keydown:function(a){var b=this;9==a.keyCode&&b.hide()},iconClick:function(b){var c=this,d=a.one(b.target).parent(".calendar-input-wrap").one("."+c._triggerNodeClassName),e=d?d.getDOMNode():null,f=c.currentNode?c.currentNode.getDOMNode():null;(e!=f||"none"==c.boundingBox.css("display"))&&e.focus()},triggerNodeClick:function(b){var c=this,d=b.target;!d._selected&&c._isInput(a.one(d))&&(d.select(),d._selected=!0)}},_maxCell:function(){for(var a=this,b=a.get("date"),c=b.getFullYear(),d=b.getMonth()+1,e=[],f=0;f<a.get("count");f++)e.push(new Date(c,d-1+f,1).getDay()+new Date(c,d+f,0).getDate());return Math.max.apply(null,e)},_isInput:function(a){return a.getDOMNode&&"INPUT"===a.getDOMNode().tagName.toUpperCase()&&("text"===a.attr("type")||"date"===a.attr("type"))},_inNodeList:function(b,c){var d=!1;return a.each(c,function(a){b.equals(a)&&(d=!0)}),d},_createSelect:function(){var a=this,b=a.get("date"),c=a.get("minDate"),d=a.get("maxDate"),e=b.getFullYear(),g=f.DATE.filled(b.getMonth()+1),i=c&&c.substr(0,4)||1900,j=d&&d.substr(0,4)||(new Date).getFullYear()+3,k=c&&c.substr(5,2)||1,l=d&&d.substr(5,2)||12,m=' selected="selected"',n={};switch(n.delegate_change=a._delegateChangeClassName,n.year_template="",n.month_template="",!0){case e==i:l=12;break;case e==j:k=1;break;default:k=1,l=12}for(var o=i;j>=o;o++)n.year_template+="<option"+(e==o?m:"")+' value="'+o+'">'+o+"</option>";for(var o=k;l>=o;o++)n.month_template+="<option"+(g==o?m:"")+' value="'+f.DATE.filled(o)+'">'+f.DATE.filled(o)+"</option>";return h(f.SELECT_TEMPLATE,n)},_initCalendarHTML:function(){var a=this,b={};return b.delegate_click=a._delegateClickClassName,b.bounding_box_id=a._calendarId,b.message_template=a.get("message"),b.date_template=a._dateHTML(),h(f.CALENDAR_TEMPLATE,b)},_dateHTML:function(a){for(var b=this,a=b.get("date"),c=a.getFullYear(),d=a.getMonth(),e="",g=0;g<b.get("count");g++)e+=h(f.DATE_TEMPLATE,b._singleDateHTML(new Date(c,d+g)));return e},_singleDateHTML:function(b){var c=this,d=b.getFullYear(),e=b.getMonth()+1,g=new Date(d,e-1,1).getDay(),i=new Date(d,e,0).getDate(),j=[{name:"\u65e5",cls:"weekend"},{name:"\u4e00",cls:""},{name:"\u4e8c",cls:""},{name:"\u4e09",cls:""},{name:"\u56db",cls:""},{name:"\u4e94",cls:""},{name:"\u516d",cls:"weekend"}],k="";a.each(j,function(a){k+=h(f.HEAD_TEMPLATE,{week_name:a.name,week_cls:a.cls})});for(var l="",m=[];g--;)m.push(0);for(var n=1;i>=n;n++)m.push(n);m.length=c._maxCell();for(var o=Math.ceil(m.length/7),n=(c.get("data"),0);o>n;n++){for(var p="",q=0;6>=q;q++){var r=m[q+7*n]||"",b=r?d+"-"+f.DATE.filled(e)+"-"+f.DATE.filled(r):"";p+=h(f.DAY_TEMPLATE,{day:r,date:b,disabled:c._getDateStatus(b)||!r?"disabled":c._delegateClickClassName,date_class:c._getHolidaysClass(b,c._getDateStatus(b)||!r)})}l+=h(f.BODY_TEMPLATE,{calday_row:p})}var s={};s.head_template=k,s.body_template=l;var t={};return t.date=c.get("isSelect")?c._createSelect():d+"\u5e74"+e+"\u6708",t.table_template=h(f.TABLE_TEMPLATE,s),t}},{DATE:d,CALENDAR_TEMPLATE:'<div id="{bounding_box_id}" class="calendar-bounding-box"><div class="calendar-container"><div class="message-box">{message_template}</div><div class="content-box"><div class="arrow"><span class="close-btn {delegate_click}" title="\u5173\u95ed">close</span><span class="prev-btn {delegate_click}" title="\u4e0a\u6708">prev</span><span class="next-btn {delegate_click}" title="\u4e0b\u6708">next</span></div><div class="date-box">{date_template}</div></div></div></div>',DATE_TEMPLATE:'<div class="inner"><h4>{date}</h4>{table_template}</div>',SELECT_TEMPLATE:'<select class="{delegate_change}">{year_template}</select>\u5e74<select class="{delegate_change}">{month_template}</select>\u6708',TABLE_TEMPLATE:"<table><thead><tr>{head_template}</tr></thead><tbody>{body_template}</tbody></table>",HEAD_TEMPLATE:'<th class="{week_cls}">{week_name}</th>',BODY_TEMPLATE:"<tr>{calday_row}</tr>",DAY_TEMPLATE:'<td data-date="{date}" class="{disabled}"><a href="javascript:;" class="{date_class}">{day}</a></td>',INPUT_WRAP_TEMPLATE:'<div class="calendar-input-wrap" />',START_DATE_TEMPLATE:'<span class="calendar-icon calendar-start-icon {delegate_icon}" />',END_DATE_TEMPLATE:'<span class="calendar-icon calendar-end-icon {delegate_icon}" />',ATTRS:{boundingBox:{readOnly:!0},date:{value:new Date,setter:function(b){return a.isDate(b)||(b=f.DATE.isDate(b)?b:new Date),b},getter:function(b){return a.isDate(b)?b:a.isString(b)?(b=b.match(/\d+/g),new Date(b[0],b[1]-1)):void 0}},count:{value:2,getter:function(a){return this.get("isSelect")&&(a=1),a}},selectedDate:{value:null,setter:function(b){return a.isDate(b)&&(b=f.DATE.stringify(b)),f.DATE.isDate(b)?b:null},getter:function(b){return a.isString(b)&&(b=f.DATE.stringify(f.DATE.parse(b))),b||""}},minDate:{value:null,setter:function(b){return a.isDate(b)&&(b=f.DATE.stringify(b)),f.DATE.isDate(b)?b:null},getter:function(b){return a.isString(b)&&(b=f.DATE.stringify(f.DATE.parse(b))),b||""}},maxDate:{value:null,setter:function(b){return a.isDate(b)&&(b=f.DATE.stringify(b)),f.DATE.isDate(b)?b:null},getter:function(b){return a.isString(b)&&(b=f.DATE.stringify(f.DATE.parse(b))),b||""}},startDate:{value:""},endDate:{value:""},afterDays:{value:0,setter:function(a){return a>0&&this.set("maxDate",f.DATE.siblings(this.get("minDate")||f.DATE.stringify(new Date),a)),a},getter:function(a){return a&&!this.get("minDate")&&this.set("minDate",new Date),a}},message:{value:""},triggerNode:{value:"",getter:function(a){return/\,/.test(a)&&(a=a.replace(/\s+/g,""),a=a.split(new RegExp("\\s+"+a+"+\\s","g")),a=a.join().replace(/^,+|,+$/g,"")),a}},finalTriggerNode:{value:"",getter:function(a){return/\,/.test(a)&&(a=a.replace(/\s+/g,""),a=a.split(new RegExp("\\s+"+a+"+\\s","g")),a=a.join().replace(/^,+|,+$/g,"")),a}},container:{value:null,getter:function(a){return/\,/.test(a)&&(a=a.replace(/\s+/g,""),a=a.split(new RegExp("\\s+"+a+"+\\s","g")),a=a.join().replace(/^,+|,+$/g,"")),a}},isSelect:{value:!1},isKeyup:{value:!0},isDateInfo:{value:!0},isDateIcon:{value:!0},isHoliday:{value:!0,setter:function(a){return this._dateMap=a?e.dates():null,a}},isAutoSwitch:{value:!1},isSameDate:{value:!1},disabled:{value:[]}}}),f},{requires:["node","base","./datetools","./holidays","./index.css"]});
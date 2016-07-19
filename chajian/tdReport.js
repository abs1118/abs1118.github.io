$.extend({          
	showTDReport: function(TDReportInfo) {  

		TDReportInfo = getNewTDReportInfo(TDReportInfo);

		// TDReportInfo.td_formatDateTime = function () {
		//     return function (text, render) {
		//       return td_format(render(text), 'yyyy-MM-dd HH:mm:ss');
		//     }
		//   }
		template.helper('$td_formatDateTime', function (content) {
		    return td_format(content, 'yyyy-MM-dd HH:mm:ss');
		});

		
		template.helper('$td_risk_detail_display', function (content) {
		      var render = template.compile(getTDRiskDetailTemplate());
			 var tdDetailtml = render(content);
			 return tdDetailtml;
		});

		template.helper('$td_replace', function (content) {
			 return content.replace(':',': ');
		});
        if ($('body').find('.td-dialog').length<1) {
        	$('body').append("<div class='td-dialog'><div class='td-dialog-l1'><div class='td-dialog-l2'><div class='td-dialog-container'> "+
	    	"<div class='report-a-close' id='report-a-close'><a href='javascript:void(0)'><span style = 'size:20px;'>X</span>"+
	    	"</a></div><div id='content'>正在加载，请稍后....</div></div></div></div></div>");  
        };
	    
		
		addCSSFile();
  
        showBg();

        showTDReportContent();

        var len  = $('.risk-items-flag').length;
    	$('#risk-count').text(len+'条');

         if ($('#canvas-main').length > 0) 
         {
	        var canvasMain = $('#canvas-main')[0];
	        var mainCtx = canvasMain.getContext('2d');
	        var score = parseInt($('#result-score').text(), 10);
	        var resultCat = $('#result-cat').text();
	        var i = 1;
	        if (score > 0 && score < 100) {
	            i = (100 - score) / 100;
	        }
	        if (score === 0) {
	            i = 1;
	        }
	        // console.log(i);
	        mainCtx.rotate(-Math.PI / 2);
	        mainCtx.lineWidth = 8;
	        // console.log(resultCat);
	        if (resultCat.indexOf('拒绝') > -1) {
	            $('#result-cat').addClass('reject');
	            mainCtx.strokeStyle = '#ff6c5c';
	        } else if (resultCat.indexOf('通过') > -1) {
	            $('#result-cat').addClass('accept');
	            mainCtx.strokeStyle = '#8cdb65';
	        } else if (resultCat.indexOf('审核') > -1) {
	            $('#result-cat').addClass('review');
	            mainCtx.strokeStyle = '#f8d436';
	        }
	        mainCtx.beginPath();
	        mainCtx.arc(-75, 75, 69, 0, Math.PI * (i * 2), true);
	        mainCtx.stroke();
	        // 75, 75, 0
	        // 17, 103, 0.1
	        // -17, 104

	        var canvasBg = $('#canvas-bg')[0];
	        var bgCtx = canvasBg.getContext('2d');
	        bgCtx.fillStyle = '#fafafa';
	        bgCtx.beginPath();
	        bgCtx.arc(61, 61, 52, 0, Math.PI * 2, true);
	        bgCtx.closePath();
	        bgCtx.fill();
   		 }

   		  //点击查看详情
	    $(".check-table").on("click",".table-href",function(){
	        $(".a-detail").hide();
	        $(this).parents('td:first').find('.a-detail').show(200);
	    });

	    $(".container").on("click",function(e){
	        e = e || window.event;
	        e.stopPropagation();
	        e.preventDefault();
	    })

	    //详情关闭
	    $(".detail-close-x").on("click", function (e) {
	        $(this).parent().parent().hide(200);
	    });
    
		//显示灰色 jQuery 遮罩层 
		function showBg() { 
			$(".td-dialog").css({ 
				display:"block" 
			});  
		} 
		
		//关闭灰色 jQuery 遮罩 
		function closeBg() { 
			$(".td-dialog").hide(); 
		} 

		$('.report-a-close').on('click',function(){
			closeBg();
		})

		function showTDReportContent(){
			// $('#content').html('');
			 var render = template.compile(getTDTemplate());
			 var renderedhtml = render(TDReportInfo);
	         $('#content').html(renderedhtml);
		}
    
	    function addCSSFile() {
		    var link = document.createElement('link');
		    link.type = 'text/css';
		    link.rel = 'stylesheet';
		    link.href = '/test/tddialog.css';
		    document.getElementsByTagName('head')[0].appendChild(link);
		}

		function getNewTDReportInfo(TDReportInfo){
			var td_risk_items = {};
			var old_risk_items = TDReportInfo['risk_items'];
			delete TDReportInfo.risk_items;
			$.each(old_risk_items, function(i,item){    
			     if(td_risk_items[item['group']]) {
					td_risk_items[item['group']].push(item);
			     } else
			     {
			     	td_risk_items[item['group']] = new Array();
			     	td_risk_items[item['group']].push(item);
			     };
			      
			});   
			TDReportInfo.risk_items = td_risk_items;
			return TDReportInfo;
		}

		function getTDTemplate(){
			var tdtpl = "<div class='header'>"+
						    "<h1 class='header-title fl'>贷前审核报告</h1>"+
						    "<div class='header-report-id fl'>"+
						        "<span class='label-number'>报告编号:</span>"+
						        "<span id='monitor-detail-id'><%=report_id%></span>"+
						    "</div>"+
						    "<div class='header-scan-time fr'>"+
						        "<span class='label-number'>报告时间:</span>"+
						        "<span id='monitor-scan-time'><%= $td_formatDateTime(report_time)%></span>"+
						    "</div>"+
						"</div>"+
						"<div class='risk-score'>"+
						    "<div class='fl result-score-wrap'>"+
						        "<div class='result-score-canvas-main'>"+
						            "<canvas id='canvas-main'></canvas>"+
						        "</div>"+
						        "<div class='result-score-canvas-bg'>"+
						         "   <canvas id='canvas-bg'></canvas>"+
						        "</div>"+
						        "<div class='result-score-text'>"+
						           " <div id='result-score' class='result-score'><%=final_score%></div>"+
						            "<div id='result-cat' class='result-cat'>"+
						                "<% if(final_decision == 'Accept'){%>"+
						                   "建议通过"+
						                "<%} else if(final_decision == 'Reject'){%>"+
						                    "建议拒绝"+
						                "<% } else if (final_decision == 'Review'){%>"+
						                   "建议审核"+
						                "<%}%>"+
						            "</div>"+
						        "</div>"+
						    "</div>"+
						    "<div class='fl result-text'>"+
						        "<% if(final_decision == 'Accept'){%>"+
						            " <p class='tip'>申请用户未检出高危风险，建议通过</p>"+
						        "<%} else if(final_decision == 'Reject'){%>"+
						            "<p class='tip'>申请用户检测出高危风险，建议拒绝</p>"+
						        "<% } else if (final_decision == 'Review'){%>"+
						           " <p class='tip'>申请用户存在较大风险，建议进行人工审核</p>"+
						        "<%}%>"+
						        "<p class='result'>共发现<a id='risk-count' href='javascript:void(0)'></a>异常信息</p>"+
						    "</div>"+
						"</div>"+
						"<div class='rp-item rp-basic-check' id='risk-items'>"+
						    "<h2 class='rpi-title'>贷前风险情况</h2>"+
						    "<div class='table-wrap'>"+
						        "<table class='check-table'>"+
						            "<thead>"+
						            "<tr>"+
						                "<th>&nbsp;</th>"+
						                "<th class='row1'>检查项目</th>"+
						                "<th class='row2'>风险等级</th>"+
						                "<th class='row3'>备注</th>"+
						            "</tr>"+
						            "</thead>"+
						            "<tbody>"+
						               "<%if(risk_items) {%>"+
					                      " <% for(var key in risk_items){%>"+
					                            "<% var td_risk_items = risk_items[key]; var risk_items_size = td_risk_items.length %>"+
					                            "<% if(risk_items_size == 1){%>"+
					                                "<% for(var i=0;i< td_risk_items.length;i++){ var risk = td_risk_items[i];%>"+
					                            "<tr class='risk-items-flag border-bottom-2'>"+
					                                "<td><%=risk.group%></td>"+
					                                "<td class='risk-item-name'><%=risk.item_name%></td>"+
					                                "<td class='risk-item-level'><% if(risk.risk_level=='high'){%>高<%} else if(risk.risk_level=='medium'){%>中<%} else if(risk.risk_level=='low'){%>低<%}%></td>"+
					                                "<td>"+
					                                "<%=#$td_risk_detail_display(risk)%>"+
					                                "</td>"+
					                            "</tr>"+
					                                "<%}%>"+
					                             "<%}else{%>"+
					                                 "<% for(var i=0;i< td_risk_items.length;i++){ var risk = td_risk_items[i];var risk_index = i+1;%>"+
					                                   " <% if(risk_index == 1) {%>"+
					                                    "<tr class='risk-items-flag border-bottom-1'>"+
					                                       " <td rowspan='<%=risk_items_size%>'><%=risk.group%></td>"+
					                                        "<td class='risk-item-name'><%=risk.item_name%></td>"+
					                                        "<td class='risk-item-level'><% if(risk.risk_level=='high'){%>高<%} else if(risk.risk_level=='medium'){%>中<%} else if(risk.risk_level=='low'){%>低<%}%></td>"+
					                                        "<td>"+
					                                        "<%=#$td_risk_detail_display(risk)%>"+
					                                        "</td>"+
					                                    "</tr>"+
					                                    "<% }else {%>"+
					                                    "<tr class='risk-items-flag <% if(risk_index == risk_items_size){ %>border-bottom-2 <%} else { %>border-bottom-1 <% } %>'>"+
					                                       " <td class='risk-item-name'><%=risk.item_name%></td>"+
					                                       " <td class='risk-item-level'><% if(risk.risk_level=='high'){%>高<%} else if(risk.risk_level=='medium'){%>中<%} else if(risk.risk_level=='low'){%>低<%}%></td>"+
					                                       " <td>"+
					                                       "<%=#$td_risk_detail_display(risk)%>"+
					                                        "</td>"+
					                                    "</tr>"+
					                                     "<%}%>"+
					                                 "<%}%>"+
					                            "<%}%>"+
					                       " <%}%>"+
					                    "<%}%>"+
						            "</tbody>"+
						        "</table>"+
						    "</div>"+
						"</div>";
						
			return tdtpl;
		}

		function getTDRiskDetailTemplate(){
			var tdrdtpl = "<% if(item_detail && item_detail.court_details){%>"+
							"<a class='table-href' id='<%= item_id%>' href='javascript:void(0)'>查看详情</a>"+
							"<div class='a-detail'>"+
							    "<div class='detail-a-close'>"+
							        "<a href='javascript:void(0)' class='detail-close-x' id='detail-close'><img src='/htdocs/images/close-btn.png' alt='' style=' width: 20px;'/></a></div>"+
							    "<div class='detail-table'>"+
							        "<% if(item_detail && item_detail.court_details){%>"+
							            "<% for(var i =0;i<item_detail.court_details.length;i++) { var court_detail = item_detail.court_details[i]%>"+
							                "<table>"+
							                    "<% if(court_detail.name && court_detail.name != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>被执行人姓名:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.name %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.gender && court_detail.gender != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>性别:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.gender %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.age && court_detail.age != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>年龄:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.age %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.id_number && court_detail.id_number != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>身份证号码:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.id_number %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.court_name && court_detail.court_name != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>执行法院:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.court_name %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.province && court_detail.province != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>省份:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.province %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.execution_base && court_detail.execution_base != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>执行依据文号:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.execution_base %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.filing_time && court_detail.filing_time != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>立案时间:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.filing_time %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.case_number && court_detail.case_number != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>案号:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.case_number %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.execution_number && court_detail.execution_number != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>执行标的:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.execution_number %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.execution_status && court_detail.execution_status != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>执行状态:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.execution_status %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.execution_department && court_detail.execution_department != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>做出执行依据单位:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.execution_department %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.duty && court_detail.duty != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>做生效法律文书确定的义务:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.duty %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.situation && court_detail.situation != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>被执行人的履行性质:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.situation %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                    "<% if(court_detail.discredit_detail && court_detail.discredit_detail != '-') { %>"+
							                        "<tr>"+
							                            "<td class='col1'>失信被执行人行为具体情形:"+
							                            "</td>"+
							                            "<td class='col2'>"+
							                                "<%= court_detail.discredit_detail %>"+
							                            "</td>"+
							                        "</tr>"+
							                    "<% } %>"+
							                "</table>"+
							            "<% } %>"+
							        "<% } %>"+
							    "</div>"+
							"</div>"+
							"<%} else if(item_detail) { %>"+
							"<ul class='table-mark'>"+
							    "<% if(item_detail['discredit_times'] || item_detail.overdue_details) { %>"+
							            "<li>失信次数: <%= item_detail.discredit_times %></li>"+
							            "<% if(item_detail.overdue_details && item_detail.overdue_details.length>0) { %>"+
							                "<% for(var i=0;i< item_detail.overdue_details.length;i++) { var overdue = item_detail.overdue_details[i]%>"+
							                    "<li>逾期金额: <%= overdue.overdue_amount %>逾期笔数: <%= overdue.overdue_count %>逾期天数: <%= overdue.overdue_day %>"+
							                    "</li>"+
							                "<% } %>"+
							            "<% } %>"+
							    "<%} else if(item_detail.high_risk_areas) { %>"+
							        "<% if(item_detail.high_risk_areas && item_detail.high_risk_areas.length>0){%>"+
							            "<li>高风险较为集中地区: <% var risk_ares=item_detail.high_risk_areas.join(); %>"+
							                "<%= risk_ares %></li>"+
							        "<% } %>"+
							    "<%} else if(item_detail.hit_list_datas){ %>"+
							        "<% if(item_detail.hit_list_datas && item_detail.hit_list_datas.length>0) { %>"+
							            "<li>单位名称疑似中介关键词:<% var hit_datas=item_detail.hit_list_datas.join(); %>"+
							                "<%= hit_datas %></li>"+
							        "<% } %>"+
							    "<% } %>"+
							    "<% if(item_detail.platform_detail) { %>"+
							        "<li style='list-style: none; margin-left: -16px;padding-bottom: 3px;'>总个数：<%= item_detail.platform_count %></li>"+
							        "<% for(var i =0;i<item_detail.platform_detail.length;i++) { %>"+
							            "<li><%= $td_replace(item_detail.platform_detail[i])%></li>"+
							        "<% } %>"+
							    "<% } %>"+
							    "<% if(item_detail.platform_detail_dimension) { %>"+
							        "<div class='dimension-section'>"+
							            "<span class='dimension-title'><i class='iconfont icon-list'></i> 各维度多头详情</span>"+
							            "<ul class='dimension-list'>"+
							                "<% for(var i =0;i< item_detail.platform_detail_dimension.length;i++) { var dimension = item_detail.platform_detail_dimension[i]%>"+
							                    "<li class='dimension-item'>"+
							                        "<span class='dimension-item-title'><%= dimension.dimension %>:</span>"+
							                        "<ul class='dimension-sub-list'>"+
							                            "<li>总个数：<%= dimension.count %></li>"+
							                            "<% for(var i=0;i< dimension.detail.length;i++) { var item = dimension.detail[i]%>"+
							                                "<li class='dimension-sub-item'><%= $td_replace(item) %></li>"+
							                            "<% } %>"+
							                        "</ul>"+
							                    "</li>"+
							                "<% } %>"+
							            "</ul>"+
							        "</div>"+
							    "<% } %>"+
							    "<% if(item_detail.frequency_detail) { %>"+
							        "<% for(var i=0;i< item_detail.frequency_detail.length;i++) { var frequency =  item_detail.frequency_detail[i]%>"+
							            "<li><%= $td_replace(frequency) %></li>"+
							        "<% } %>"+
							    "<%} else if(item_detail.frequency_detail_list) { %>"+
							        "<div class='risk-detail-section'>"+
							            "<span class='risk-detail-title'><i class='iconfont icon-list'></i> 频度规则详情</span>"+
							            "<ul class='risk-detail-list'>"+
							                "<% for(var i=0;i< item_detail.frequency_detail_list.length;i++) { var detail = item_detail.frequency_detail_list[i]%>"+
							                    "<li class='risk-detail-item'>"+
							                        "<span class='risk-detail-item-title'><%= detail.detail %></span>"+
							                        "<ul class='risk-detail-sub-list'>"+
							                            "<% for(var i=0;i< detail.data.length;i++) {  var detail_data = detail.data[i]%>"+
							                                "<li class='risk-detail-sub-item'><%= detail_data %></li>"+
							                            "<% } %>"+
							                        "</ul>"+
							                    "</li>"+
							                "<% } %>"+
							            "</ul>"+
							        "</div>"+
							    "<% } %>"+
							    "<% if(item_detail.fraud_type) { %>"+
							        "<li>风险类型：<%= item_detail.fraud_type %></li>"+
							    "<% } %>"+
							"</ul>"+
							"<% } %>";
			return tdrdtpl;
		}

		function td_format(time, format){
		    var t = new Date(Number(time));
		    var tf = function(i){return (i < 10 ? '0' : '') + i};
		    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){
		        switch(a){
		            case 'yyyy':
		                return tf(t.getFullYear());
		                break;
		            case 'MM':
		                return tf(t.getMonth() + 1);
		                break;
		            case 'mm':
		                return tf(t.getMinutes());
		                break;
		            case 'dd':
		                return tf(t.getDate());
		                break;
		            case 'HH':
		                return tf(t.getHours());
		                break;
		            case 'ss':
		                return tf(t.getSeconds());
		                break;
		        }
		    })
		}	

	},
    tdToHtml:function(template, data){
    		
    	    function addFns(template, data){
		        var ifs = getConditions(template);
		        var key = "";
		        for (var i = 0; i < ifs.length; i++) {
		            key = "if(" + ifs[i] + ")";
		            if (data[key]) {
		                continue;
		            }
		            else {
		                data[key] = buildFn(ifs[i]);
		            }
		        }
		    }
		    function getConditions(template){
		        var ifregexp_ig = /\{{2,3}[\^#]?if\((.*?)\)\}{2,3}?/ig;
		        var ifregexp_i = /\{{2,3}[\^#]?if\((.*?)\)\}{2,3}?/i;
		        var gx = template.match(ifregexp_ig);
		        var ret = [];
		        if (gx) {
		            for (var i = 0; i < gx.length; i++) {
		                ret.push(gx[i].match(ifregexp_i)[1]);
		            }
		        }
		        return ret;
		    }

		    String.prototype.trim=function() {

			    return this.replace(/(^\s*)|(\s*$)/g,'');
			}

		    function buildFn(key){
		        key = key.split("==");
		        var res = function(text,render){
		            var ns = key[0].split("."), value = key[1].trim();
		            var curData = this;
		            for (var i = ns.length - 1; i > -1; i--) {
		                var cns = ns.slice(i);
		                var d = curData;
		                try {
		                    for (var j = 0; j < cns.length - 1; j++) {
		                        d = d[cns[j]];
		                    }
		                    var tdAttr = cns[cns.length - 1].trim();
		                    if (d[tdAttr]) {
		                        if (d[tdAttr].toString() == value) {
		                            return true;
		                        }
		                        else {
		                            return false;
		                        }
		                    }
		                } 
		                catch (err) {
		                }
		            }
		            return false;
		        };
		        return res;
		    }
		    // new to_html for exports
		    function to_html(template, data){
		        addFns(template, data);
		        return Mustache.to_html.apply(this, arguments);    
		    }


		    return to_html(template, data);

    }
});  

!function(){function a(a){return a.replace(t,"").replace(u,",").replace(v,"").replace(w,"").replace(x,"").split(y)}function b(a){return"'"+a.replace(/('|\\)/g,"\\$1").replace(/\r/g,"\\r").replace(/\n/g,"\\n")+"'"}function c(c,d){function e(a){return m+=a.split(/\n/).length-1,k&&(a=a.replace(/\s+/g," ").replace(/<!--[\w\W]*?-->/g,"")),a&&(a=s[1]+b(a)+s[2]+"\n"),a}function f(b){var c=m;if(j?b=j(b,d):g&&(b=b.replace(/\n/g,function(){return m++,"$line="+m+";"})),0===b.indexOf("=")){var e=l&&!/^=[=#]/.test(b);if(b=b.replace(/^=[=#]?|[\s;]*$/g,""),e){var f=b.replace(/\s*\([^\)]+\)/,"");n[f]||/^(include|print)$/.test(f)||(b="$escape("+b+")")}else b="$string("+b+")";b=s[1]+b+s[2]}return g&&(b="$line="+c+";"+b),r(a(b),function(a){if(a&&!p[a]){var b;b="print"===a?u:"include"===a?v:n[a]?"$utils."+a:o[a]?"$helpers."+a:"$data."+a,w+=a+"="+b+",",p[a]=!0}}),b+"\n"}var g=d.debug,h=d.openTag,i=d.closeTag,j=d.parser,k=d.compress,l=d.escape,m=1,p={$data:1,$filename:1,$utils:1,$helpers:1,$out:1,$line:1},q="".trim,s=q?["$out='';","$out+=",";","$out"]:["$out=[];","$out.push(",");","$out.join('')"],t=q?"$out+=text;return $out;":"$out.push(text);",u="function(){var text=''.concat.apply('',arguments);"+t+"}",v="function(filename,data){data=data||$data;var text=$utils.$include(filename,data,$filename);"+t+"}",w="'use strict';var $utils=this,$helpers=$utils.$helpers,"+(g?"$line=0,":""),x=s[0],y="return new String("+s[3]+");";r(c.split(h),function(a){a=a.split(i);var b=a[0],c=a[1];1===a.length?x+=e(b):(x+=f(b),c&&(x+=e(c)))});var z=w+x+y;g&&(z="try{"+z+"}catch(e){throw {filename:$filename,name:'Render Error',message:e.message,line:$line,source:"+b(c)+".split(/\\n/)[$line-1].replace(/^\\s+/,'')};}");try{var A=new Function("$data","$filename",z);return A.prototype=n,A}catch(B){throw B.temp="function anonymous($data,$filename) {"+z+"}",B}}var d=function(a,b){return"string"==typeof b?q(b,{filename:a}):g(a,b)};d.version="3.0.0",d.config=function(a,b){e[a]=b};var e=d.defaults={openTag:"<%",closeTag:"%>",escape:!0,cache:!0,compress:!1,parser:null},f=d.cache={};d.render=function(a,b){return q(a,b)};var g=d.renderFile=function(a,b){var c=d.get(a)||p({filename:a,name:"Render Error",message:"Template not found"});return b?c(b):c};d.get=function(a){var b;if(f[a])b=f[a];else if("object"==typeof document){var c=document.getElementById(a);if(c){var d=(c.value||c.innerHTML).replace(/^\s*|\s*$/g,"");b=q(d,{filename:a})}}return b};var h=function(a,b){return"string"!=typeof a&&(b=typeof a,"number"===b?a+="":a="function"===b?h(a.call(a)):""),a},i={"<":"&#60;",">":"&#62;",'"':"&#34;","'":"&#39;","&":"&#38;"},j=function(a){return i[a]},k=function(a){return h(a).replace(/&(?![\w#]+;)|[<>"']/g,j)},l=Array.isArray||function(a){return"[object Array]"==={}.toString.call(a)},m=function(a,b){var c,d;if(l(a))for(c=0,d=a.length;d>c;c++)b.call(a,a[c],c,a);else for(c in a)b.call(a,a[c],c)},n=d.utils={$helpers:{},$include:g,$string:h,$escape:k,$each:m};d.helper=function(a,b){o[a]=b};var o=d.helpers=n.$helpers;d.onerror=function(a){var b="Template Error\n\n";for(var c in a)b+="<"+c+">\n"+a[c]+"\n\n";"object"==typeof console&&console.error(b)};var p=function(a){return d.onerror(a),function(){return"{Template Error}"}},q=d.compile=function(a,b){function d(c){try{return new i(c,h)+""}catch(d){return b.debug?p(d)():(b.debug=!0,q(a,b)(c))}}b=b||{};for(var g in e)void 0===b[g]&&(b[g]=e[g]);var h=b.filename;try{var i=c(a,b)}catch(j){return j.filename=h||"anonymous",j.name="Syntax Error",p(j)}return d.prototype=i.prototype,d.toString=function(){return i.toString()},h&&b.cache&&(f[h]=d),d},r=n.$each,s="break,case,catch,continue,debugger,default,delete,do,else,false,finally,for,function,if,in,instanceof,new,null,return,switch,this,throw,true,try,typeof,var,void,while,with,abstract,boolean,byte,char,class,const,double,enum,export,extends,final,float,goto,implements,import,int,interface,long,native,package,private,protected,public,short,static,super,synchronized,throws,transient,volatile,arguments,let,yield,undefined",t=/\/\*[\w\W]*?\*\/|\/\/[^\n]*\n|\/\/[^\n]*$|"(?:[^"\\]|\\[\w\W])*"|'(?:[^'\\]|\\[\w\W])*'|\s*\.\s*[$\w\.]+/g,u=/[^\w$]+/g,v=new RegExp(["\\b"+s.replace(/,/g,"\\b|\\b")+"\\b"].join("|"),"g"),w=/^\d[^,]*|,\d[^,]*/g,x=/^,+|,+$/g,y=/^$|,+/;"function"==typeof define?define(function(){return d}):"undefined"!=typeof exports?module.exports=d:this.template=d}();

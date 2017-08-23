(function(){var f=YAHOO.util.Dom;var c=Alfresco.util.encodeHTML;Alfresco.TagFilter=function(i){Alfresco.TagFilter.superclass.constructor.call(this,"Alfresco.TagFilter",i);this.uniqueEventKey="tag-link";YAHOO.Bubbling.on("tagRefresh",this.onTagRefresh,this);YAHOO.Bubbling.on("changeFilter",this.onTagRefresh,this);if(Alfresco.util.createTwister.collapsed===undefined){var j=new Alfresco.service.Preferences();Alfresco.util.createTwister.collapsed=Alfresco.util.findValueByDotNotation(j.get(),Alfresco.service.Preferences.COLLAPSED_TWISTERS)||""}return this};YAHOO.extend(Alfresco.TagFilter,Alfresco.component.BaseFilter,{options:{siteId:"",containerId:"",rootNode:null,numTags:-1},onReady:function h(){Alfresco.TagFilter.superclass.onReady.call(this);var i=YUISelector.query("h2",this.id)[0];YUIEvent.addListener(i,"click",this.onTagRefresh,this,true)},handleFilterIdNotFound:function e(j){var k=Alfresco.util.generateDomId(),i=this._generateTagMarkup({name:j.filterData,domId:k});f.get(this.id+"-tags").innerHTML+=i;this.selectedFilter=f.get(k);YUIDom.addClass(this.selectedFilter,"selected")},onTagRefresh:function d(k,j){if(Alfresco.util.createTwister.collapsed.indexOf(this.filterName)>0){return}var i;if(this.options.siteId){i=YAHOO.lang.substitute(Alfresco.constants.PROXY_URI+"api/tagscopes/site/{site}/{container}/tags?d={d}&topN={tn}",{site:this.options.siteId,container:this.options.containerId,d:new Date().getTime(),tn:this.options.numTags})}else{i=YAHOO.lang.substitute(Alfresco.constants.PROXY_URI+"collaboration/tagQuery?d={d}&m={m}&s={s}&n={n}",{d:new Date().getTime(),m:this.options.numTags,s:"count",n:encodeURIComponent(this.options.rootNode)})}Alfresco.util.Ajax.request({method:Alfresco.util.Ajax.GET,url:i,successCallback:{fn:this.onTagRefresh_success,scope:this},failureCallback:{fn:this.onTagRefresh_failure,scope:this}})},onTagRefresh_success:function g(j){if(j&&j.json&&!YAHOO.lang.isUndefined(j.json.tags)){var m="",k=j.json.tags;for(var l=0,n=k.length;l<n;l++){m+=this._generateTagMarkup(k[l])}f.get(this.id+"-tags").innerHTML=m}},onTagRefresh_failure:function b(i){if(i.serverResponse.status===403){f.get(this.id+"-tags").innerHTML="<span>"+this.msg("message.refresh.failure.forbidden")+"</span>"}else{f.get(this.id+"-tags").innerHTML='<span class="error-alt">'+this.msg("message.refresh.failure")+"</span>"}},_generateTagMarkup:function a(i){var k=i.domId?' id="'+c(i.domId)+'"':"",j="<li"+k+'><span class="tag">';j+='<a href="#" class="'+this.uniqueEventKey+'" rel="'+c(i.name)+'">'+c(i.name)+"</a>";if(i.count){j+="&nbsp;("+i.count+")"}j+="</span></li>";return j}})})();
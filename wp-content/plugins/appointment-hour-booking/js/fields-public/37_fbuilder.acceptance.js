	$.fbuilder.controls[ 'facceptance' ]=function(){};
	$.extend(
		$.fbuilder.controls[ 'facceptance' ].prototype,
		$.fbuilder.controls[ 'ffields' ].prototype,
		{
			title:"Accept terms and conditions",
			ftype:"facceptance",
			value:"I accept",
			required:true,
			url:"",
			message:"",
			show:function()
				{
					var me = this,
						dlg = '',
						label = me.title;

					if(!/^\s*$/.test(me.url))
					{
						label = '<a href="'+$.fbuilder.htmlEncode($.trim(me.url))+'" target="_blank">'+label+'</a>';
					}
					else if(!/^\s*$/.test(me.message))
					{
						label = '<a href="javascript:void(0);" class="cff-open-dlg">'+label+'</a>';
						dlg += '<div class="cff-dialog hide"><span class="cff-close-dlg"></span><div class="cff-dialog-content">'+me.message+'</div></div>'
					}
					return '<div class="fields '+me.csslayout+' cff-checkbox-field" id="field'+me.form_identifier+'-'+me.index+'"><div class="dfield">'+
					'<div class="one_column"><label><input name="'+me.name+'" id="'+me.name+'" class="field required" value="'+$.fbuilder.htmlEncode(me.value)+'" vt="'+$.fbuilder.htmlEncode((/^\s*$/.test(me.value)) ? me.title : me.value)+'" type="checkbox" /> <span>'+
					$.fbuilder.htmlDecode( label )+''+((me.required)?'<span class="r">*</span>':'')+
					'</span></label></div>'+
					dlg+
					'</div><div class="clearer"></div></div>';
				},
			after_show:function()
				{
					$(document).on('click','.cff-open-dlg', function(){
						var dlg = $(this).closest('.fields').find('.cff-dialog'), w = dlg.data('width'), h=dlg.data('height');
						dlg.removeClass('hide');

						if('undefined' == typeof w) w = Math.min($(this).closest('form').width(), $(window).width(), dlg.width());
						if('undefined' == typeof h) h = Math.min($(this).closest('form').height(), $(window).height(), dlg.height());

						dlg.data('width',w);
						dlg.data('height',h);

						dlg.css({'width': w+'px', 'height': h+'px', 'margin-top': (-1*h/2)+'px', 'margin-left': (-1*w/2)+'px'});
					});
					$(document).on('click','.cff-close-dlg', function(){$(this).closest('.cff-dialog').addClass('hide');});
				},
			val:function()
				{
					var e = $('[id="'+this.name+'"]:checked:not(.ignore)');
					if( e.length )
					{
						var t = $.fbuilder.parseValStr( e[0].value );
						if(!$.isNumeric(t)) t = t.replace(/^"/,'').replace(/"$/,'');
					}
					return (v) ? (($.isNumeric(v)) ? v : '"'+v+'"') : 0;
				}
		}
	);
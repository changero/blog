/**
 * Created by Changero_ on 2016/4/1.
 */
;(function(window,$,document,undefined){

        $(document).bind("mousemove",function(){return false});

        var Scroll = (function(){

            function Scroll($elem,option){
                this.$elem = $elem;
                this.opt = $.extend({}, $.fn.scroll.defaultOption , option || {});
                this.bca = this.opt.theme ? this.opt.theme.match(/(\d{1,3})/g) : this.opt.bcolor.match(/(\d{1,3})/g);
                this.opt.bcolor = "rgba(" + this.bca[0] + "," + this.bca[1] + "," + this.bca[2] + ",";
                return this.init();
            };

            Scroll.prototype.init = function(){
                this.$wrap = $("<div></div>",{class : "scroll-wrap"}).css({height : this.opt.height});
                this.$toolHandler = $("<div></div>",{class : 'scroll-handler'}).css({height : "10%","background" : this.opt.bcolor + "0.4)"});
                this.$tool = $("<div></div>",{class : 'scroll-tool'}).css({"background":this.opt.bcolor + "0.3)","width" : 10}).append(this.$toolHandler);
                this.addHandlerEvent();
                return this.$elem.wrap(this.$wrap).after(this.$tool).addClass("scroll-content").css(this.opt.content);
            };

            Scroll.prototype.addHandlerEvent = function(){
                var  _this = this;
                _this.$toolHandler.hover(function(){
                    $(this).css({
                        background : _this.opt.bcolor + '1)'
                })},function(){
                    $(this).css({
                        background : _this.opt.bcolor +  '0.4)'
                    })
                }).bind("mousedown",function(e){
                    var dis = e.pageY - _this.$toolHandler.offset().top;
                    if(e.button == 0){
                        $(document).unbind("mousemove.handle").bind("mousemove.handle",function(e){
                            _this.$toolHandler.offset({
                                top : e.pageY - dis < _this.$tool.offset().top ? _this.$tool.offset().top : e.pageY - dis > _this.$tool.offset().top + _this.$tool.height() - _this.$toolHandler.height() ? _this.$tool.offset().top + _this.$tool.height() - _this.$toolHandler.height() : e.pageY - dis
                            });

                            var percent = _this.$toolHandler.position().top / (_this.opt.height - _this.$toolHandler.height());

                            _this.$elem.css({
                                top : -(_this.$elem.height() - _this.opt.height) * percent
                            })
                        }).unbind("mouseup").bind("mouseup",function(){
                            $(document).unbind("mousemove.handle");
                        })
                    }
                })
            };

            return Scroll;
        })();

        $.fn.scroll = function(option){
            if(this.height() > (option.height || $.fn.scroll.defaultOption.height)){
                return new Scroll(this,option)
            }
        };
        $.fn.scroll.defaultOption = {
            bcolor : "rgba(177, 139, 199,",     //ÓÐè¦´Ã
            height : 300
        }
    }
)(window,jQuery,document);
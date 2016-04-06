/**
 * Created by Changero_ on 2016/4/5.
 */
;(function(window,$,document){

    var Color = (function(){

        var Color = function(elem,opt){
            this.$elem = elem;
            this.opt = opt;
        };

        Color.prototype.init = function(){
          if(this.opt){
              return this.setColor()
          }
            else{
              return this.getColor();
          }
        };

        Color.prototype.setColor = function(){
           return this.$elem.css("color",this.opt);
        };

        Color.prototype.getColor = function(){
          return this.$elem.eq(0).css("color");
        };
        return Color;
    })();

    $.fn.color=function(option){
        var color = new Color(this,option);
        return color.init();
    }
})(window,jQuery,document);
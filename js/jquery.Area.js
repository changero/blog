/**
 * Created by Changero_ on 2016/4/6.
 */
;(function(window,$,document){
    var Area = (function(){
        function Area(elem,province,pcity,city,carea,option){
            this.$elem = elem;
            this.option = option;

            this.provinceData = province;
            this.pcityData = pcity;
            this.cityData = city ;
            this.careaData = carea;

            return this.draw();

        }

        Area.prototype.draw = function(){
            var _this = this;
            this.province = $("<select></select>",{class:'area-province'});
            this.city = $("<select></select>",{class:'area-city'});
            this.area = $("<select></select>",{class:'area-area'});
            var i=0;
            $.each(this.provinceData,function(index,value){
                if(value){
                    _this.province[0][i++] = new Option(value,index);
                }
            });

            this.city[0][0] = new Option("请选择",0);
            this.area[0][0] = new Option("请选择",0);

            this.bindEvent();

            this.province.trigger("change",[this.option.province]);
            this.city.trigger("change",[this.option.city]);
            this.area.trigger("setValue",[this.option.area]);

            return this.$elem.wrapInner(this.province).append(this.city).append(this.area);
        };

        Area.prototype.bindEvent = function(){
            var _this = this;
            _this.province.bind('change',function(e,province){
                _this.city.html('');
                _this.area.html('').get(0)[0] = new Option("请选择",0);
                var i = 0 , province = province || _this.province.val();
                _this.province.val(province);
                if(_this.pcityData[province]){
                    $.each(_this.pcityData[province],function(index,value){
                        if(value){
                            _this.city[0][i++] = new Option(value,index);
                        }
                    });
                }
            });
            _this.city.bind('change',function(e,city,area){
                _this.area.html('').get(0)[0] = new Option("请选择",0);
                var i = 0 , city = city || _this.city.val();
                if(city && !_this.option.province){
                    $.each(_this.pcityData,function(index,value){
                        var _index = index;
                        if(value){
                            value.forEach(function(elem,index){
                                if(index == city){
                                    var i = 0;
                                    value.forEach(function(elem,index){
                                        _this.city[0][i++] = new Option(elem,index);
                                    });
                                    _this.city.val(city);
                                    _this.province.val(_index)
                                }
                            });
                        }
                    })
                }

                if(_this.careaData[city]){
                    $.each(_this.careaData[city],function(index,value){
                        if(value){
                            _this.area[0][i++] = new Option(value,index);
                        }
                    });
                    _this.area.val(area || 0);
                }
            });

            _this.area.bind("setValue",function(e,area){
                if(!_this.option.city){
                    _this.careaData.forEach(function(item,index){
                        if(item){
                            item.forEach(function(_item,_index){
                                if(_index == area){
                                    _this.city.trigger("change",[index,_this.option.area]);
                                }
                            })
                        }
                    })
                }
                else{
                    _this.city.trigger("change",[_this.option.city,_this.option.area]);
                }
            })
        };

        return Area;
    })();


    $.fn.area = function(option){
        return new Area(this,area_array,sub_array,l_arr,sub_arr,option);
    }

})(window,jQuery,document);
<template>
  <div class="main">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/66">
              请描述HTML元素的显示优先级?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                <code>
 在html中，帧元素（frameset）的优先级最高，表单元素比非表单元素的优先级要高。
表单元素:
文本输入框，密码输入框，单选框，复选框，文本输入域，列表框等等
非表单元素
链接（a），div, table, span 等等
有窗口元素比无窗口元素的优先级高
有窗口元素
select元素，object元素，以及frames元素等等
无窗口元素
大部分html元素都是无窗口元素
                </code>
                </pre>
        </div>
      </div>
    </el-card>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/67">
              要让Chrome支持小于12px的文字怎么做?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                    <code>
Chrome 中有最小字号的限制，一般为 12px。原因是 Chrome 认为小于这个字号会影响阅读。

当需要小于 12px 字体的时候，有以下几个方法可以使用。

-webkit-text-size-adjust:none; 这个属性在高版本的 Chrome 中已经被废除。
使用 transform: scale(0.5, 0.5)，但使用 transform 需要注意下面几点：
transform 对行内元素无效，因此要么使用 display: block; 要么使用 display: inline-block;
transform 即使进行了缩放，原来元素还是会占据对应的位置。因此需要做调整，最好是在外面再包一层元素，以免影响其他元素。
作为图片。
最好的办法还是进行切图，或者就不要使用小于 12px 的字体
                    </code>
                    </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/68">
              写一个验证身份证号的方法?</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>
       ```

       检测省份码
function checkProvice(val)
{
    var patten=/^[1-9][0-9]/;
    if(patten.test(val))
    {
        var prov={11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",51:"四川",52:"贵州",53:"云南",54:"西藏",50:"重庆",61:"陕西",62:"甘肃",63:"青海",64:"宁夏",65:"新疆",81:"香港",82:"澳门",83:"台湾"};
        if(prov[val])
        {
            return true;
        };
    }


   return false;
}


检测出生日期
function checkBirthDay(val)
{
    var patten=/^(19|20)\d{2}((0[1-9])|1[0-2])(([0-2][1-9])|(10|20|30|31))/;
    if(patten.test(val))
    {
        var year=val.substring(0,4);
        var month=val.substring(4,6);
        var day=val.substring(6,8);
         
        var date=new Date(year+"-"+month+"-"+day);
        if(date&&date.getMonth()==(parseInt(month)-1))
        {
            return true;
        }
 
    }
    return false;
}

检测校验码
function checkVerifyCode(val)
{
    var patten=/^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|(10|20|30|31))\d{3}[0-9X]$/;
    var ratio=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2];
    var codeArr=[1,0,"X",9,8,7,6,5,4,3,2];
    var code=val.substring(17);
    if(patten.test(val))
    {
        var sum=0;
        for(var i=0;i &lt; 17;i++)
        {
            sum+=val[i]*ratio[i];
        }
        console.log(sum)
        var remainder=sum%11;
        if(codeArr[remainder]==code)
        {
            return true;
        }
    }
    return false;
}

function checkIndetityCardNo(val){
    var province=val.substring(0,2);
    if(checkProvice(province))
    {
         var date=val.substring(6,14);
         if(checkBirthDay(date))
         { 
             return checkVerifyCode(val);
         }
    }
    return false;
}
       
       
       ```
     



                        </code>
                    </pre>
        </div>
      </div>
    </el-card>

    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span
            ><a href="https://github.com/haizlin/fe-interview/issues/65">
              你会手写原生js代码吗</a
            ></span
          >
        </div>
      </template>
      <div class="text item">
        <div v-highlight>
          <pre>
                        <code>
                            其实是要看你理解原生的定义了。不管现在用的什么框架，我们很多写的业务代码不都是原生的嘛。还有很多公用的方法，一般用的是原生的js

                            我都是用脚写的  有意思
                        </code>
                    </pre>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped></style>

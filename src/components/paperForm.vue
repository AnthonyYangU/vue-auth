<template>
<div>
    <div class="crumbs">
        <el-breadcrumb separator="/">
            <!-- <el-breadcrumb-item><i class="el-icon-calendar"></i> 表单</el-breadcrumb-item> -->
            <el-breadcrumb-item class="el-icon-document-remove"> 论文格式</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <div class="container ">
    <el-row :gutter="20">
        <el-col :span="12">
                <div class="title">
                    <span>摘 要</span>
                    <i class="el-icon-caret-bottom" @click="show(0)"></i>
                </div>
                <span v-show="flag[0].cut" class="formatBody"> 
                    <p>一、 摘要标题</p>
                        &#12288;    1)   论文应有摘要部分<br>
                        &#12288;    2)   摘要标题两字之间应有2个空格<br>
                        &#12288;    3)   摘要标题对齐方式应为居中<br>
                        &#12288;    4)   摘要标题行间距应为：固定值 20 磅<br>
                        &#12288;    5)   摘要标题段前间距应为：段前 18 磅<br>
                        &#12288;    6)   摘要标题段后间距应为：段后 30 磅<br>
                        &#12288;    7)   字体：黑体<br>
                        &#12288;    8)   字号：三号<br>
                        &#12288;    9)   摘要标题不需要加粗<br>
                    <p>二、  摘要正文<br></p>
                        &#12288;    1)   摘要正文段落应：首行缩进2字符<br>
                        &#12288;    2)   摘要正文行距应为：固定值 20 磅<br>
                        &#12288;    3)   摘要正文段前间距应为：段前 0 磅<br>
                        &#12288;    4)   摘要正文段后间距应为：段后 0 磅<br>
                        &#12288;    5)   字体：宋体<br>
                        &#12288;    6)   字号：小四<br>
                        &#12288;    7)   摘要正文应与关键词空一行<br>
                    <p>三、  摘要中文关键词</p>
                        &#12288;    1)   “关键词：”中间不能有空格<br>
                        &#12288;   2)   关键词：前不能有空格<br>
                        &#12288;    3)   关键词：中的冒号应为中文：<br>
                        &#12288;    4)   “关键词：”的字体：宋体<br>
                        &#12288;    5)   关键词内容的字体：宋体<br>
                        &#12288;    6)   关键词部分的字号：小四<br>
                        &#12288;    7)   关键词部分的末尾不应加符号<br>
                        &#12288;    8)   关键词之间以中文分号间隔<br>
                        &#12288;    9)   关键词需要加粗<br>
                        &#8194;    10)   论文应有关键词部分<br>
                        &#8194;    11)   关键词一般列3-5个<br>
                    <p>四、 Abstract</p>   
                        &#12288;    1)   论文应有Abstract部分<br>
                        &#12288;    2)   “Abstract”标题之间不需要空格<br>
                        &#12288;    3)   “Abstract”标题对齐方式应为居中<br>
                        &#12288;    4)   “Abstract”标题行间距应为：固定值 20 磅"<br>
                        &#12288;    5)   “Abstract”标题段前间距应为：18 磅<br>
                        &#12288;    6)   “Abstract”标题段后间距应为：段后 30 磅<br>
                        &#12288;    7)   “Abstract”字体：Times New Roman<br>
                        &#12288;    8)   “Abstract”字号：三号<br>
                        &#12288;    9)   “Abstract”标题需要加粗<br>
                    <p>五、 Abstract正文</p> 
                        &#12288;    1)    abstract正文段落应为每段落首行缩进2字符<br>
                        &#12288;    2)    abstract正文行距应为：固定值 20 磅<br>
                        &#12288;    3)    abstract正文段前间距应为：段前 0 磅<br>
                        &#12288;    4)    abstract正文段后间距应为：段后 0 磅<br>
                         &#12288;   5)    abstract正文字体：Times New Roman<br>
                        &#12288;    6)    abstract正文字号：小四<br>
                        &#12288;    7)    abstract正文对齐方式应为两端对齐<br>
                         &#12288;   8)    abstract正文的句首单词首字母应该大写<br>
                        &#12288;    9)    abstract正文不需加粗<br>
                        &#8194;    10)   abstract正文中的大写应正确使用，除句首字母和专有名词外不能出现大写<br>
                        &#8194;   11)   abstract正文应与key Words：空一行<br>
                    <p> 六、  Key Words摘要英文关键词</p> 
                        &#12288;    1)   “Key Words：”格式应完全正确<br>
                        &#12288;    2)   “Key Words：”中的大小写<br>
                        &#12288;    3)   “Key Words：”中间应有一个空格<br>
                        &#12288;    4)   “Key Words：”前没有空格<br>
                        &#12288;    5)   “Key Words：”的分号应为英文：<br>
                        &#12288;    6)   “Key Words：”的字体：Times New Roman<br>
                        &#12288;    7)    Key Words内容的字体：Times New Roman<br>
                        &#12288;    8)    Key Words部分的字号：小四<br>
                        &#12288;    8)    Key Words需要加粗<br>
                        &#12288;    9)    每个英文关键词前有且只有1个空格<br>
                        &#8194;    10)   英文关键词之间应该以英文分号间隔<br>
                </span>
                    
                <!-- </div> -->
                <div class="title">
                    <span>目 录</span>
                    <i class="el-icon-caret-bottom" @click="show(1)"></i>
                </div>
                <span v-show="flag[1].cut" class="formatBody">
                    <p>1  目录标题</p>
                        &#12288;    1)   居中<br>
                        &#12288;    2)   字体：黑体<br>
                        &#12288;    3)   字号：三号<br>
                        &#12288;    4)   不需加粗<br>
                        &#12288;    5)   段前间距：18 磅<br>
                        &#12288;    6)   段后间距：30 磅<br>
                        &#12288;    7)   行间距：20 磅<br>
                    <p>2  目录内容</p>
                        &#12288;    1)   一级标题文字部分:黑体，其他字体：中文宋体、英文和数字Times New Roman<br>
                        &#12288;    2)   正文一级标题形式应为：第X章<br>
                        &#12288;    3)   字号：小四<br>
                        &#12288;    4)   段前间距：0 磅<br>
                        &#12288;    5)   段后间距：0 磅<br>
                        &#12288;    6)   行间距：20 磅<br>
                        &#12288;    7)   目录缩进<br>
                        &#12288;    8)   目录序号连续<br>
                        &#12288;    9)   不超过三级目录<br>
                        &#8194;    10)   标题序号与内容之间有两个空格<br>
                </span>    

                <div class="title">
                    <span>正 文</span>
                    <i class="el-icon-caret-bottom" @click="show(2)"></i>
                </div>
                <span v-show="flag[2].cut" class="formatBody">
                    <p>1  章标题</p>
                        &#12288;    1)   标题的序号和内容之间空两格<br>
                        &#12288;    2)   黑体<br>
                        &#12288;    3)   居中<br>
                        &#12288;     4)   字号：三号<br>
                        &#12288;     5)   行间距：20 磅<br>
                        &#12288;    6)   段后：30 磅<br>
                        &#12288;    7)   段前：18 磅<br>
                        &#12288;    8)   一级标题为第X章的格式<br>
                        &#12288;    9)   二级和三级序号为阿拉伯数字<br>
                        &#12288;    10)   另起一页<br>
                    <p>    2  节标题</P>
                        &#12288;        1)   字体：黑体<br>
                        &#12288;        2)   居左<br>
                        &#12288;        3)   字号：四号<br>
                        &#12288;        4)   行间距：20 磅<br>
                        &#12288;        5)   段后：30 磅<br>
                        &#12288;        6)   段前：18 磅<br>
                        &#12288;        7)   序号为阿拉伯数字<br>
                        &#12288;        8)   节标题序号与内容之间空两行<br>
                    <P>    3  小节标题</P>
                        &#12288;        1)   字体：黑体<br>
                        &#12288;        2)   居左<br>
                        &#12288;        3)   字号：小四<br>
                        &#12288;        4)   行间距：20 磅<br>
                        &#12288;        5)   段后：30 磅<br>
                        &#12288;        6)   段前：18 磅<br>
                        &#12288;        7)   序号为阿拉伯数字<br>
                        &#12288;        8)   序号与标题之间空两行<br>
                      <p>  4  正文内容</P>
                        &#12288;        1)   每段落首行缩进2字<br>
                        &#12288;        2)   字体：宋体<br>
                        &#12288;        3)   字号：小四<br>
                        &#12288;        4)   行距：固定值 20 磅<br>
                        &#12288;        5)   间距：段前 0 磅<br>
                        &#12288;        6)   间距：段后 0 磅<br>
                </span>    
                <div class="title">
                    <span>结 论</span>
                    <i class="el-icon-caret-bottom" @click="show(3)"></i>
                </div>
                <span v-show="flag[3].cut" class="formatBody">
                    <P>1  结论标题</P>
                &#12288;           1)   字体：黑体<br>
                &#12288;           2)   字号：三号<br>
                &#12288;           3)   对齐方式：居中<br>
                &#12288;           4)   段前距：18 磅<br>
                &#12288;           5)   段后距：30 磅<br>
                &#12288;           6)   段间距：20 磅<br>
                &#12288;           7)   加粗：不加粗<br>
                    <P>2  结论内容</P>
                &#12288;            1)   字体：宋体<br>
                &#12288;            2)   字号：小四<br>
                &#12288;            3)   缩进：2 个字符<br>
                &#12288;            4)   对齐方式：两端对齐<br>
                &#12288;            5)   段前距：0 磅<br>
                &#12288;            6)   段后距：0 磅<br>
                &#12288;            7)   段间距：20 磅<br>
                </span>
              
                <div class="title">
                    <span>参考文献</span>
                    <i class="el-icon-caret-bottom" @click="show(4)"></i>
                </div>
                <span v-show="flag[4].cut" class="formatBody">        
                      <p>      1  参考文献标题 </p>
                     &#12288;   1)   字体：黑体
                    <br> &#12288;                2)   字号：三号
                    <br> &#12288;                3)   行距：20 磅
                    <br> &#12288;                4)   段前间距：18 磅
                    <br> &#12288;                5)   段后间距：30 磅
                    <br> &#12288;                6)   居中
                    <p>        2  参考文献数量</p>
                     &#12288;                1)   总量不少于20篇
                    <br> &#12288;                2)   期刊不少于10篇
                    <br> &#12288;                3)   包含一定数量的外文期刊
                     <p>    3  参考文献内容</p>
                     &#12288;                1)   字体：宋体
                    <br> &#12288;                2)   字号：小四
                    <br> &#12288;                3)   行距：20 磅
                    <br> &#12288;                4)   段前间距：0 磅
                    <br> &#12288;                5)   段后间距：0 磅
                    <br> &#12288;                6)   须有编号
                    <br> &#12288;                7)   须以句点结尾
                    <br> &#12288;                8)   须有标明参考文献类型的标志代码
                    <p>       4  图书类参考文献</p>
                     &#12288;                1)   作者和专著名间用“.”隔开
                    <br> &#12288;                2)   作者少于三人时全部写出；作者多于三人时，只写前三个，后加“等”或“et al”
                    <br> &#12288;                3)   出版地和出版者之间用“:”（英文）隔开
                    <br> &#12288;                4)   要有出版年份，放于结尾处
                    <br> &#12288;                5)   出版者和出版年之间用“,”（英文）隔开
                    <p>       5  期刊类参考文献 </p>
                     &#12288;                1)   作者和篇名间用“.”隔开
                    <br> &#12288;                2)   作者少于三人时全部写出；作者多于三人时，只写前三个，后加“等”或“et al”
                    <br> &#12288;                3)   要有出版年
                    <br> &#12288;                4)   要有期号
                    <br> &#12288;                5)   要有起止页，放于结尾处
                    <br> &#12288;                6)   起止页中间的符号是“-”
                    <br> &#12288;                7)   期号和起止页之间用“:”隔开
                    <p>       6  论文集或会议录类参考文献</p>
                     &#12288;                1)   作者和篇名间用“.”隔开
                    <br> &#12288;                2)   作者少于三人时全部写出；作者多于三人时，只写前三个，后加“等”或“et al”
                    <br> &#12288;                3)   要有出版地
                    <br> &#12288;                4)   标志代码和出版地之间用“.”分隔
                    <br> &#12288;                5)   要有出版者
                    <br> &#12288;                6)   出版地和出版者之间用“:”分隔
                    <br> &#12288;                7)   要有出版年份，放于结尾处
                    <br> &#12288;                8)   出版者和出版年份之间用“,”分隔
                    <p>       7  学位论文类参考文献</p>
                     &#12288;                1)   作者和篇名间用“.”隔开
                    <br> &#12288;                2)   作者少于三人时全部写出；作者多于三人时，只写前三个，后加“等”或“et al”
                    <br> &#12288;                3)   要有授学位地
                    <br> &#12288;                4)   标志代码和授学位地之间用“.”分隔
                    <br> &#12288;                5)   要有授学位单位（院或系）
                    <br> &#12288;                6)   授学位地和授学位单位之间用“:”分隔
                    <br> &#12288;                7)   要有授学位年份，放于结尾处
                    <br> &#12288;                8)   授学位单位和授学位年份之间用“,”分隔
                    <p>        8  报纸类参考文献</p>
                     &#12288;                1)   作者和篇名间用“.”隔开
                    <br> &#12288;                2)   作者少于三人时全部写出；作者多于三人时，只写前三个，后加“等”或“et al”
                    <br> &#12288;                3)   要有出版年份
                    <br> &#12288;                4)   报纸名和出版年之间用“,”（英文）隔开
                    <p>       9  电子类参考文献</p>
                     &#12288;                1)   作者和篇名间用“.”隔开
                    <br> &#12288;                2)   作者少于三人时全部写出；作者多于三人时，只写前三个，后加“等”或“et al”
                    <br> &#12288;                3)   要有网址
                    <P>       10  参考文献在正文中的引用</P>
                     &#12288;                1)   引用数字要连续
                    <br> &#12288;                2)   引用数字不应超过参考文献总数目
                </span> 
                <div class="title">
                    <span>致谢</span>
                    <i class="el-icon-caret-bottom" @click="show(5)"></i>
                </div>
                <span v-show="flag[5].cut" class="formatBody">   
             <p>       1  致谢标题 </p>
             &#12288;                1)   字体：黑体
            <br> &#12288;                2)   字号：三号
            <br> &#12288;                3)   对齐方式：居中
            <br> &#12288;                4)   段前距：18 磅
            <br> &#12288;                5)   段后距：30 磅
            <br> &#12288;                6)   段间距：20 磅
            <br> &#12288;                7)   加粗：无需加粗
            <br> &#12288;                8)   致谢之间的空格：两个空格
            <p>       2  致谢内容</p>
            &#12288;                1)   字体：宋体
            <br> &#12288;                2)   字号：小四
            <br> &#12288;                3)   缩进：2 个字符
            <br> &#12288;                4)   对齐方式：两端对齐
            <br> &#12288;                5)   段前距：0 磅
            <br> &#12288;                6)   段后距：0 磅
            <br> &#12288;                7)   段间距：20 磅
                </span>    

        </el-col>
        <el-col :span="12">
            <div class="title">
                <span>公 式</span>
                <i class="el-icon-caret-bottom" @click="show(6)"></i>
            </div>
            <span v-show="flag[6].cut" class="formatBody">  
                <p>       1 公式内容</p>
                &#12288;                 1)   公式部分居中
                <p>     2 采用word自带公式编辑器</p>
                &#12288;                 2)   公式要有编号
                <br> &#12288;                 3)   公式应分章编号，采用（M-N）的格式
                <br> &#12288;                 3)   公式编号的括号为中文括号
                <br> &#12288;                 4)   公式编号中-左边数字为公式所在的章节数
                <br> &#12288;                 5)   公式编号中-右边数字为该章节中该公式的序号
                <p>         3 采用mathtype</p>
                &#12288;                 请自行更改公式格式
            </span>

            <div class="title">
                <span>表 格</span>
                <i class="el-icon-caret-bottom" @click="show(7)"></i>
            </div>
            <span v-show="flag[7].cut" class="formatBody">  
                <p>1  表的位置</p>
            &#12288;             1)   表格居中
            <br> &#12288;             2)   表格左右边框线与页面左右边距应为0厘米
            <p>     2  表的版式</p>
             &#12288;             1)   表为三线表
            <br> &#12288;             2)   表内中文文字字体：宋体
            <br> &#12288;             3)   表内英文文字字体：Times New Roman
            <br> &#12288;             4)   表内文字字号：五号
            <br> &#12288;             5)   表格不能跨页
            <p>     3  表名</p>
             &#12288;             1)   表名在表的上方
            <br> &#12288;             2)   表名居中
            <br> &#12288;             3)   表名字号：五号
            <br> &#12288;             4)   表名字体：中文宋体，英文Times New Roman
            <br> &#12288;             5)   “表”与表名序号不空格
            <br> &#12288;             6)   表名编号应分章编号，采用表M-N的格式
            <br> &#12288;             7)   表格编号中-左边数字为表格所在的章节数
            <br> &#12288;             8)   表名序号与名称之间空1格                
            </span>
            <div class="title">
                <span>图 像</span>
                <i class="el-icon-caret-bottom" @click="show(8)"></i>
            </div>
            <span v-show="flag[8].cut" class="formatBody">  
              <p>  1  中文图名</p>
            &#12288;            1)   字体：宋体
            <br> &#12288;            2)   字号：五号
            <br> &#12288;            3)   对齐方式：居中
            <br> &#12288;            4)   中文图名序号与“图”之间不应有空格
            <br> &#12288;            5)   中文图名序号应为M-N的形式
            <br> &#12288;            6)   中文图名序号与章节号要一致
            <br> &#12288;            7)   中文图名序号与图名内容之间应有1个空格
            <br> &#12288;            8)   中文图编号中-左边数字为图所在的章节数
            <br> &#12288;            9)   中文图名与图之间不应有空行
            <p>    2  图</p>
            &#12288;            1)   对齐方式：居中
            <br> &#12288;            2)   图与图名不应跨页
            <br> &#12288;            2)   图的宽度不得超过页边距                
            </span>
            <div class="title">
                <span>页眉页脚</span>
                <i class="el-icon-caret-bottom" @click="show(9)"></i>
            </div>
            <span v-show="flag[9].cut" class="formatBody">  
            <p>   1  页眉</p>
             &#12288;            1)  封面和独创性声明无页眉
            <br> &#12288;            2)   页眉内容：中国民航大学本科毕业设计（论文）
            <br> &#12288;            3)  页眉字体：宋体
            <br> &#12288;            4)  页眉字号：五号
            <br> &#12288;            5)   页眉居中
            <p>  2  页脚</p>
               &#12288;            1)   封面和独创性声明无页脚
            <br> &#12288;            2)   页码居中
            <br> &#12288;            3)   页码字体：宋体
            <br> &#12288;            4)   页码字号：五号
            </span>
            <div class="title">
                <span>标点符号</span>
                <i class="el-icon-caret-bottom" @click="show(10)"></i>
            </div>
            <span v-show="flag[10].cut" class="formatBody">  
               <p> 1  标点符号</p>
            &#12288;             1)  符合新的国家标准GB/T15834-1995《标点符号用法》<br> 
            </span>    

            <div class="title">
                <span>量、单位和数字</span>
                <i class="el-icon-caret-bottom" @click="show(11)"></i>
            </div>
            <span v-show="flag[11].cut" class="formatBody"> 
                               <p> 1  量和单位</p>
            &#12288;             1)   采用新的国家标准GB3100~3102-93《量和单位》<br> 
            <p> 2  数字</p>
                    &#12288;   1)符合新的国家标准GB/T15835-1995《出版物上数字用法的规定》<br> 
            </span>                    
        </el-col>
    </el-row>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return{
            flag:[{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false},{cut:false}],
            ops:{
                bar: {
                    showDelay: 500,
                    background: '#c1c1c1',
                    opacity: 0.5,
                    minSize: 0,
                    size: '6px',
                }        
            }
        }
    },
    methods:{
        show(serial){
            this.flag[serial].cut = !this.flag[serial].cut;
        }
    },
    mounted(){
    }
}
</script>

<style>
.title{
    height:20px;
    padding-bottom: 20px;
    padding-top: 5px;
    border-bottom:solid .0625rem rgb(221, 209, 209);
    font-size:18px;
    font-weight: 700
}

.container .formatBody{
    padding-top: 5px;
    font-size:12px;
}
.container .formatBody p{
    font-size:14px;
    font-weight: 700
}

</style>
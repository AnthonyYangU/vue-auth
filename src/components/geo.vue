<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-pie-chart"></i> echart图表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-row :gutter="20">
            <el-col :span="24">
                <el-card shadow="hover" >
                    <div ref="myChart" class = "echart"></div>
                </el-card>
            </el-col>
        </el-row>
        <el-button  type="primary" icon="el-icon-upload" @click = "test">测试</el-button>    
    </div>
</template>

<script>
var data = [
    {name: '海门', value: 9},
    {name: '鄂尔多斯', value: 12},
    {name: '招远', value: 12},
    {name: '舟山', value: 12},
    {name: '齐齐哈尔', value: 14},
    {name: '盐城', value: 15},
    {name: '赤峰', value: 16},
    {name: '青岛', value: 18},
    {name: '乳山', value: 18},
    {name: '金昌', value: 19},
    {name: '泉州', value: 21},
    {name: '莱西', value: 21},
    {name: '日照', value: 21},
    {name: '胶南', value: 22},
    {name: '南通', value: 23},
    {name: '拉萨', value: 24},
    {name: '云浮', value: 24},
    {name: '梅州', value: 25},
];

var geoCoordMap = {
    '海门':[121.15,31.89],
    '鄂尔多斯':[109.781327,39.608266],
    '招远':[120.38,37.35],
    '舟山':[122.207216,29.985295],
    '齐齐哈尔':[123.97,47.33],
    '盐城':[120.13,33.38],
    '赤峰':[118.87,42.28],
    '青岛':[120.33,36.07],
    '乳山':[121.52,36.89],
    '金昌':[102.188043,38.520089],
    '泉州':[118.58,24.93],
    '莱西':[120.53,36.86],
    '日照':[119.46,35.42],
    '胶南':[119.97,35.88],
    '南通':[121.05,32.08],
    '拉萨':[91.11,29.97],
    '云浮':[112.02,22.93],
    '梅州':[116.1,24.55],
};

export default {
    name:"geoMap",
    data(){
        return{    
        }
    },
    mounted(){
        this.test();
    },
    methods:{
        test(){
            let option = {
                backgroundColor: 'transparent',
                title: {
                    text: '全国主要城市空气质量',
                    subtext: 'Data from PM25.in',
                    sublink: 'http://www.pm25.in',
                    left: 'center',
                    textStyle: {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item'
                },
                bmap: {
                    center: [104.114129, 37.550339],
                    zoom: 5,
                    roam: true,
                    mapStyle: {
                        styleJson: [
                                {
                                    "featureType": "water",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#044161"
                                    }
                                },
                                {
                                    "featureType": "land",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#004981"
                                    }
                                },
                                {
                                    "featureType": "boundary",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#064f85"
                                    }
                                },
                                {
                                    "featureType": "railway",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "highway",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#004981"
                                    }
                                },
                                {
                                    "featureType": "highway",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#005b96",
                                        "lightness": 1
                                    }
                                },
                                {
                                    "featureType": "highway",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "arterial",
                                    "elementType": "geometry",
                                    "stylers": {
                                        "color": "#004981"
                                    }
                                },
                                {
                                    "featureType": "arterial",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#00508b"
                                    }
                                },
                                {
                                    "featureType": "poi",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "green",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#056197",
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "subway",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "manmade",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "local",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "arterial",
                                    "elementType": "labels",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                },
                                {
                                    "featureType": "boundary",
                                    "elementType": "geometry.fill",
                                    "stylers": {
                                        "color": "#029fd4"
                                    }
                                },
                                {
                                    "featureType": "building",
                                    "elementType": "all",
                                    "stylers": {
                                        "color": "#1a5787"
                                    }
                                },
                                {
                                    "featureType": "label",
                                    "elementType": "all",
                                    "stylers": {
                                        "visibility": "off"
                                    }
                                }
                        ]
                    }
                },
                series : [
                    {
                        name: 'pm2.5',
                        type: 'scatter',
                        coordinateSystem: 'bmap',
                        data: this.convertData(data),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: false
                            },
                            emphasis: {
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#ddb926'
                            }
                        }
                    },
                    {
                        name: 'Top 5',
                        type: 'effectScatter',
                        coordinateSystem: 'bmap',
                        data: this.convertData(data.sort(function (a, b) {
                            return b.value - a.value;
                        }).slice(0, 6)),
                        symbolSize: function (val) {
                            return val[2] / 10;
                        },
                        showEffectOn: 'emphasis',
                        rippleEffect: {
                            brushType: 'stroke'
                        },
                        hoverAnimation: true,
                        label: {
                            normal: {
                                formatter: '{b}',
                                position: 'right',
                                show: true
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 10,
                                shadowColor: '#333'
                            }
                        },
                        zlevel: 1
                    },
                    {
                        type: 'custom',
                        coordinateSystem: 'bmap',
                        renderItem: this.renderItem,
                        itemStyle: {
                            normal: {
                                opacity: 0.5
                            }
                        },
                        animation: false,
                        silent: true,
                        data: [0],
                        z: -10
                    }
                ]
            };
            let mychart = this.$echarts.init(this.$refs.myChart);
            mychart.setOption(option); 
        },
        convertData(data){
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        },
        renderItem(params, api){
            var coords = [
                [116.7,39.53],
                [103.73,36.03],
                [112.91,27.87],
                [120.65,28.01],
                [119.57,39.95]
            ];
            var points = [];
            for (var i = 0; i < coords.length; i++) {
                points.push(api.coord(coords[i]));
            }
            var color = api.visual('color');
            return {
                type: 'polygon',
                shape: {
                    points: this.$echarts.graphic.clipPointsByRect(points, {
                        x: params.coordSys.x,
                        y: params.coordSys.y,
                        width: params.coordSys.width,
                        height: params.coordSys.height
                    })
                },
                style: api.style({
                    fill: color,
                    stroke: this.$echarts.color.lift(color)
                })
            };
        },
    }
}
</script>

<style scoped>
    .echart{
        width:100%;
        height:500px
    }
</style>
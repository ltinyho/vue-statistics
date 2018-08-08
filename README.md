## 安装

```
yarn add  vue-statistics
```
or
```
npm install   vue-statistics
```

## 使用


```js
import VueStat from 'vue-statistics'

Vue.use(VueStat,{})
```




```js
/*
 * 使用示例
 * v-stat="{'name':'首页-免费题库',data:{'名称':'免费题库'}}"
 * name 为事件名称
 * type 当需要上传页面事件时，设置为page，当页面初始化时上报，绑定到页面根元素  eg:
 * * v-stat="{'name':'首页-免费题库',type:'page',data:{ '名称':'免费题库'}}"
 * data 为事件属性
 * options.track 为自定义发送track事件,参数为data
 * */
```


```html
<!--  简单记录  -->
<div v-stat="'首页顶部-推荐'"></div>

<!-- data 属性自定义 -->
<div v-stat="{name:`课程学习-${courseInfo.title}`,type:'page',data:{'课程名称':courseInfo.title,'课程类型':'普通课程'}}"></div>
```

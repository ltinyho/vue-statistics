const isEqual = require('lodash/isEqual');
const ctx = '@@stat';
/*
 * 使用示例
 * v-stat="{'name':'首页-免费题库',data:{'名称':'免费题库'}}"
 * name 为事件名称
 * type 当需要上传页面事件时，设置为page，当页面初始化时上报，绑定到页面根元素  eg:
 * * v-stat="{'name':'首页-免费题库',type:'page',data:{ '名称':'免费题库'}}"
 * data 为事件属性
 * options.track 为自定义发送track事件,参数为data
 * */
export default {
  install(Vue, options = {}) {
    if (!options.track) {
      console.log('请配置 track ');
      return;
    }
    const doBind = function () {
      const directive = this;
      const value = directive.value;
      directive.clickListener = function (e) {
        if (typeof value === 'string') {
          options.track(value);
        } else if (typeof value === 'object') {
          if (value.name) {
            options.track({
              name: value.name,
              data: value.data,
            });
          } else {
            console.log('事件统计未绑定名称');
          }
        }
      }.bind(directive);
      directive.el.addEventListener('click', directive.clickListener);
    };
    const stat = {
      name: 'stat',
      bind(el, binding, vnode) {
        const value = binding.value;
        el[ctx] = {
          el,
          vm: vnode.context,
          value: value,
        };
        const args = arguments;
        el[ctx].vm.$on('hook:mounted', function () {
          bind();
        });
        el[ctx].vm.$on('hook:updated', function () {
          bind();
        });

        function bind() {
          if (el[ctx].binded) return;
          el[ctx].binded = true;
          if (typeof value === 'object' && !value.type) {
            doBind.call(el[ctx], args);
          } else if (typeof value === 'string') {
            doBind.call(el[ctx], args);
          }
        }
      },
      update(el, binding, vnode, oldVnode) {
        const val = binding.value;
        if (val.type === 'page') {
          if (val.data && Object.keys(val.data).length > 0 && !el[ctx].updated) {
            const hasNullValue = Object.values(val.data).some(d => !d);
            if (!hasNullValue) {
              el[ctx].updated = true;
              options.track({
                name: val.name,
                data: val.data,
              });
            }
          }
        } else {
          if (!isEqual(el[ctx].value, val)) {
            options.track({
              name: val.name,
              data: val.data,
            });
          }
        }
      },
      unbind(el, binding) {
        if (el && el[ctx]) {
          const directive = el[ctx];
          directive.el.removeEventListener('click', directive.clickListener);
        }
      },
    };
    Vue.directive('stat', stat);
  },
};
import Vue from 'vue';
import App from './App.vue';
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css'
import jszip from 'jszip';


Vue.use(ElementUi);
Vue.use(jszip);


new Vue({
    el: '#appIndex',
    render: h => h(App)
})

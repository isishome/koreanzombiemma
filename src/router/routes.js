const routes = [{
  path: '',
  name: 'main',
  component: () => import(/* webpackChunkName: "layout" */ '@/components/Main.vue'),
  children: [{
    path: ':sec',
    name: 'section',
    component: () => import(/* webpackChunkName: "layout" */ '@/components/Main.vue'),
    props: true
  }]
}]
export default routes
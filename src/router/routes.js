const routes = [{
  path: '',
  name: 'main',
  component: () => import('@/components/Main.vue'),
  children: [{
    path: ':sec',
    name: 'section',
    component: () => import('@/components/Main.vue'),
    props: true
  }]
}]
export default routes
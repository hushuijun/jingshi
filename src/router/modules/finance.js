import Layout from '@/views/layout/financeLayout'
const divided = {
    path: 'divided',
    component: () => import('@/views/finance/divided/DividedIndex'),
    meta: {
        title: '分润管理',
        icon: 'productstatistics',
    }
}
const financeRouter = {
    path: '/finance',
    component: Layout,
    redirect: '/finance/divided',
    name: 'finance',
    meta: {
        icon: 'workbench',
        title: '财务管理'
    },
    children: [
        divided
    ]
}

export default financeRouter
export const divideds = [ divided]

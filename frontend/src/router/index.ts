import { createRouter, createWebHistory } from 'vue-router';
import { useAuthStore } from '@/stores/auth.store';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // Public
    { path: '/', component: () => import('@/pages/LandingPage.vue') },
    { path: '/shops', component: () => import('@/pages/ShopsPage.vue') },
    { path: '/shops/:slug', component: () => import('@/pages/ShopDetailPage.vue') },
    { path: '/about', component: () => import('@/pages/AboutPage.vue') },
    { path: '/contact', component: () => import('@/pages/ContactPage.vue') },
    { path: '/help', component: () => import('@/pages/HelpPage.vue') },

    // Auth (guest only)
    { path: '/login', component: () => import('@/pages/LoginPage.vue'), meta: { guest: true } },
    { path: '/register', component: () => import('@/pages/RegisterPage.vue'), meta: { guest: true } },
    { path: '/register/shop', component: () => import('@/pages/RegisterShopPage.vue'), meta: { guest: true } },

    // Admin
    { path: '/admin/login', component: () => import('@/pages/admin/AdminLoginPage.vue'), meta: { guest: true } },
    { path: '/admin', redirect: '/admin/dashboard' },
    {
      path: '/admin',
      component: () => import('@/layouts/AdminLayout.vue'),
      meta: { requiresAuth: true, role: 'system_admin' },
      children: [
        { path: 'dashboard', component: () => import('@/pages/admin/AdminDashboard.vue') },
        { path: 'shops', component: () => import('@/pages/admin/AdminShops.vue') },
        { path: 'users', component: () => import('@/pages/admin/AdminUsers.vue') },
      ]
    },

    // Shop owner
    {
      path: '/shop-panel',
      component: () => import('@/layouts/ShopLayout.vue'),
      meta: { requiresAuth: true, role: 'shop_owner' },
      children: [
        { path: '', redirect: 'dashboard' },
        { path: 'dashboard', component: () => import('@/pages/shop/ShopDashboard.vue') },
        { path: 'appointments', component: () => import('@/pages/shop/ShopAppointments.vue') },
        { path: 'schedule', component: () => import('@/pages/shop/ShopSchedule.vue') },
        { path: 'settings', component: () => import('@/pages/shop/ShopSettings.vue') },
      ]
    },

    // Customer
    {
      path: '/panel',
      component: () => import('@/layouts/CustomerLayout.vue'),
      meta: { requiresAuth: true, role: 'customer' },
      children: [
        { path: '', redirect: 'appointments' },
        { path: 'appointments', component: () => import('@/pages/customer/MyAppointments.vue') },
      ]
    },

    { path: '/:pathMatch(.*)*', component: () => import('@/pages/NotFoundPage.vue') },
  ]
});

router.beforeEach((to, _from, next) => {
  const auth = useAuthStore();

  if (to.meta.guest && auth.isLoggedIn) {
    if (auth.isAdmin) return next('/admin/dashboard');
    if (auth.isShopOwner) return next('/shop-panel');
    return next('/panel');
  }

  if (to.meta.requiresAuth && !auth.isLoggedIn) return next('/login');

  if (to.meta.role && auth.role !== to.meta.role) return next('/');

  next();
});

export { router };

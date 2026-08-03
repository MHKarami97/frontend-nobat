<template>
  <div class="min-h-screen bg-neutral-50 font-sans selection:bg-primary-100">
    
    <!-- Navbar (Glassmorphism) -->
    <header class="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-xl border-b border-neutral-100 transition-all duration-300">
      <div class="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <!-- Logo -->
        <RouterLink to="/" class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gradient-to-br from-primary-500 to-purple-600 rounded-xl flex items-center justify-center text-white text-xl shadow-lg shadow-primary-500/30">د</div>
          <span class="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-l from-neutral-900 to-neutral-600">دور گردون</span>
        </RouterLink>
        
        <!-- Desktop Nav -->
        <nav class="hidden md:flex items-center gap-8 text-sm font-bold text-neutral-600">
          <RouterLink to="/" class="text-primary-600">صفحه اصلی</RouterLink>
          <button @click="scrollTo('categories')" class="hover:text-primary-600 transition-colors">خدمات</button>
          <button @click="scrollTo('features')" class="hover:text-primary-600 transition-colors">امکانات</button>
          <RouterLink to="/about" class="hover:text-primary-600 transition-colors">درباره ما</RouterLink>
          <RouterLink to="/contact" class="hover:text-primary-600 transition-colors">تماس با ما</RouterLink>
        </nav>
        
        <!-- Desktop Auth Actions -->
        <div class="hidden md:flex items-center gap-4">
          <RouterLink to="/login" class="text-sm font-bold text-neutral-600 hover:text-primary-600 transition-colors px-4 py-2 rounded-full hover:bg-primary-50">
            ورود به حساب
          </RouterLink>
          <div class="h-6 w-px bg-neutral-200"></div>
          <RouterLink to="/register" class="text-sm font-bold bg-primary-600 text-white px-6 py-2.5 rounded-full hover:bg-primary-700 transition-colors shadow-md shadow-primary-600/20">
            ثبت‌نام
          </RouterLink>
        </div>

        <!-- Mobile Hamburger -->
        <button @click="isMobileMenuOpen = !isMobileMenuOpen" class="md:hidden p-2 text-neutral-600 rounded-xl hover:bg-neutral-100 transition-colors">
          <svg v-if="!isMobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div v-if="isMobileMenuOpen" class="md:hidden absolute top-full left-0 w-full bg-white border-b border-neutral-100 shadow-2xl flex flex-col p-6 gap-4 animate-[slideDown_0.2s_ease-out]">
        <button @click="scrollTo('categories'); isMobileMenuOpen=false" class="text-right text-lg font-bold text-neutral-800 pb-3 border-b border-neutral-50">دسته‌بندی خدمات</button>
        <button @click="scrollTo('features'); isMobileMenuOpen=false" class="text-right text-lg font-bold text-neutral-800 pb-3 border-b border-neutral-50">امکانات پلتفرم</button>
        <RouterLink to="/about" class="text-lg font-bold text-neutral-800 pb-3 border-b border-neutral-50">درباره ما</RouterLink>
        <RouterLink to="/contact" class="text-lg font-bold text-neutral-800 pb-3 border-b border-neutral-50">تماس با ما</RouterLink>
        
        <div class="flex flex-col gap-3 mt-4">
          <RouterLink to="/login" class="w-full text-center py-3 rounded-xl font-bold text-primary-600 bg-primary-50 border border-primary-100">ورود کاربران و پذیرندگان</RouterLink>
          <RouterLink to="/register" class="w-full text-center py-3 rounded-xl font-bold text-white bg-primary-600 shadow-lg shadow-primary-600/30">ثبت‌نام رایگان</RouterLink>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-white">
      <!-- Decorative Blobs -->
      <div class="absolute top-0 right-0 w-96 h-96 bg-primary-200/50 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/50 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/3 pointer-events-none"></div>
      
      <div class="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div class="inline-flex items-center gap-2 bg-primary-50 border border-primary-100 text-primary-700 px-4 py-1.5 rounded-full text-sm font-bold mb-8">
          <span class="relative flex h-2.5 w-2.5"><span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span><span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500"></span></span>
          سیستم جامع رزرواسیون آنلاین
        </div>
        
        <h1 class="text-5xl md:text-7xl font-black text-neutral-900 tracking-tight leading-[1.1] md:leading-[1.1] max-w-4xl mx-auto">
          زمان شما ارزشمند است، <br />
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-purple-600">هوشمندانه نوبت بگیرید.</span>
        </h1>
        
        <p class="mt-6 text-lg md:text-xl text-neutral-500 max-w-2xl mx-auto leading-relaxed">
          فرقی نمی‌کند مشتری هستید یا صاحب کسب‌وکار؛ دور گردون فرآیند رزرو نوبت آرایشگاه، کلینیک، سالن ورزشی و ده‌ها شغل دیگر را در کسری از ثانیه مدیریت می‌کند.
        </p>
        
        <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
          <RouterLink to="/shops" class="px-8 py-4 bg-neutral-900 text-white font-bold rounded-2xl hover:bg-neutral-800 transition-all shadow-xl shadow-neutral-900/20 text-lg flex items-center justify-center gap-2 hover:-translate-y-1">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            جستجوی خدمات و رزرو
          </RouterLink>
          <RouterLink to="/register/shop" class="px-8 py-4 bg-white text-neutral-800 border-2 border-neutral-200 font-bold rounded-2xl hover:border-primary-500 hover:bg-primary-50 hover:text-primary-700 transition-all text-lg flex items-center justify-center gap-2 hover:-translate-y-1">
            ثبت فروشگاه رایگان
          </RouterLink>
        </div>

        <!-- Quick Stats -->
        <div class="mt-16 pt-8 border-t border-neutral-100 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
          <div><div class="text-3xl font-black text-neutral-900">۱۰۰۰+</div><div class="text-sm font-medium text-neutral-500 mt-1">فروشگاه فعال</div></div>
          <div><div class="text-3xl font-black text-neutral-900">۵۰k+</div><div class="text-sm font-medium text-neutral-500 mt-1">رزرو موفق</div></div>
          <div><div class="text-3xl font-black text-neutral-900">۲۴/۷</div><div class="text-sm font-medium text-neutral-500 mt-1">پشتیبانی سیستم</div></div>
          <div><div class="text-3xl font-black text-neutral-900">۱۰۰٪</div><div class="text-sm font-medium text-neutral-500 mt-1">تضمین امنیت</div></div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section id="categories" class="py-24 bg-neutral-50 border-t border-neutral-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black text-neutral-900">دسته‌بندی‌های خدمات</h2>
          <p class="mt-4 text-lg text-neutral-500">هر آنچه نیاز دارید را با چند کلیک پیدا کنید.</p>
        </div>
        
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          <template v-if="categories.length > 0">
            <button v-for="cat in categories" :key="cat.id" @click="$router.push({ path: '/shops', query: { category: cat.slug } })" class="bg-white rounded-3xl p-6 text-center border border-neutral-100 shadow-sm hover:shadow-xl hover:border-primary-200 transition-all group">
              <div class="w-16 h-16 mx-auto bg-neutral-50 rounded-2xl flex items-center justify-center text-3xl group-hover:scale-110 group-hover:bg-primary-50 transition-all duration-300 mb-4">
                {{ cat.icon }}
              </div>
              <h3 class="font-bold text-neutral-800">{{ cat.name }}</h3>
            </button>
          </template>
          <template v-else>
            <!-- Skeletons -->
            <div v-for="i in 8" :key="i" class="bg-white rounded-3xl p-6 text-center border border-neutral-100">
               <div class="w-16 h-16 mx-auto bg-neutral-100 rounded-2xl shimmer mb-4"></div>
               <div class="h-4 bg-neutral-100 shimmer w-2/3 mx-auto rounded-lg"></div>
            </div>
          </template>
        </div>
        
        <div class="mt-12 text-center">
          <RouterLink to="/shops" class="inline-flex items-center gap-2 font-bold text-primary-600 hover:text-primary-700 transition-colors">
            مشاهده تمام فروشگاه‌ها
            <svg class="w-5 h-5 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 bg-white">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl md:text-4xl font-black text-neutral-900 leading-tight mb-6">مدیریت نوبت‌ها هیچ‌وقت اینقدر ساده نبود!</h2>
            <p class="text-lg text-neutral-500 mb-10 leading-relaxed">
              دور گردون با معماری ابری و تکنولوژی عالی یک راهکار همه‌جانبه برای از بین بردن تداخل نوبت‌ها، صف‌های طولانی و اتلاف وقت است.
            </p>
            
            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl shrink-0">📅</div>
                <div>
                  <h4 class="font-bold text-neutral-900 text-lg">تقویم هوشمند و ضدتداخل</h4>
                  <p class="text-neutral-500 text-sm mt-1 leading-relaxed">الگوریتم‌های ما به صورت خودکار از رزرو همزمان یک تایم توسط دو نفر جلوگیری می‌کنند.</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-green-50 text-green-600 flex items-center justify-center text-xl shrink-0">📱</div>
                <div>
                  <h4 class="font-bold text-neutral-900 text-lg">بدون نیاز به نصب اپلیکیشن</h4>
                  <p class="text-neutral-500 text-sm mt-1 leading-relaxed">طراحی موبایل‌محور به شما اجازه می‌دهد سیستم را مستقیماً در مرورگر گوشی با سرعت بومی اجرا کنید.</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">📊</div>
                <div>
                  <h4 class="font-bold text-neutral-900 text-lg">داشبورد قدرتمند پذیرندگان</h4>
                  <p class="text-neutral-500 text-sm mt-1 leading-relaxed">مشاهده آمار روزانه، تایید یا لغو نوبت‌ها و تعیین روزهای تعطیل با یک کلیک.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="relative">
            <div class="absolute inset-0 bg-gradient-to-tr from-primary-500 to-purple-500 rounded-[3rem] rotate-3 opacity-10"></div>
            <div class="bg-neutral-900 rounded-[3rem] p-8 shadow-2xl relative">
              <div class="flex items-center gap-2 mb-6">
                <div class="w-3 h-3 rounded-full bg-red-500"></div><div class="w-3 h-3 rounded-full bg-yellow-500"></div><div class="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div class="space-y-4">
                <div class="bg-neutral-800 rounded-2xl p-4 flex justify-between items-center animate-pulse">
                  <div class="h-4 bg-neutral-700 rounded w-1/3"></div>
                  <div class="h-6 bg-primary-600/50 rounded-full w-20"></div>
                </div>
                <div class="bg-neutral-800 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <div class="text-white font-bold">علی محمدی</div>
                    <div class="text-neutral-400 text-xs mt-1">دوشنبه ۱۴۰۲/۰۸/۱۲ - ۱۸:۳۰</div>
                  </div>
                  <div class="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">تایید شده</div>
                </div>
                <div class="bg-neutral-800 rounded-2xl p-4 flex justify-between items-center">
                  <div>
                    <div class="text-white font-bold">زهرا کریمی</div>
                    <div class="text-neutral-400 text-xs mt-1">سه‌شنبه ۱۴۰۲/۰۸/۱۳ - ۱۰:۰۰</div>
                  </div>
                  <div class="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-xs font-bold">در انتظار</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-24 bg-neutral-50 border-t border-neutral-100">
      <div class="max-w-7xl mx-auto px-6">
        <div class="text-center mb-16">
          <h2 class="text-3xl md:text-4xl font-black text-neutral-900">نظرات کاربران سیستم</h2>
          <p class="mt-4 text-lg text-neutral-500">تجربه کسانی که به دور گردون اعتماد کردند.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <!-- Review 1 -->
          <div class="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm relative">
            <div class="text-4xl text-primary-200 absolute top-6 left-6 font-serif">"</div>
            <div class="flex gap-1 mb-4 text-yellow-400">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-neutral-600 leading-relaxed mb-6 font-medium">
              از وقتی سالن زیبایی‌مون رو در دور گردون ثبت کردیم، تماس‌های تلفنی برای رزرو ۹۰٪ کم شده و وقتمون کاملاً آزاده تا به کارمون برسیم.
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-pink-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">س</div>
              <div>
                <div class="font-bold text-neutral-900 text-sm">سارا رضایی</div>
                <div class="text-xs text-neutral-500">مدیر سالن زیبایی ماه</div>
              </div>
            </div>
          </div>
          
          <!-- Review 2 -->
          <div class="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm relative">
            <div class="text-4xl text-primary-200 absolute top-6 left-6 font-serif">"</div>
            <div class="flex gap-1 mb-4 text-yellow-400">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-neutral-600 leading-relaxed mb-6 font-medium">
              به عنوان یک کاربر عادی، پیدا کردن تایم خالی برای دندانپزشکی همیشه برام یک کابوس بود. الان با گوشی چک میکنم و راحت رزرو میکنم.
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center text-white font-bold">م</div>
              <div>
                <div class="font-bold text-neutral-900 text-sm">محمد حسینی</div>
                <div class="text-xs text-neutral-500">کاربر سیستم</div>
              </div>
            </div>
          </div>

          <!-- Review 3 -->
          <div class="bg-white p-8 rounded-3xl border border-neutral-100 shadow-sm relative">
            <div class="text-4xl text-primary-200 absolute top-6 left-6 font-serif">"</div>
            <div class="flex gap-1 mb-4 text-yellow-400">
              <svg v-for="i in 5" :key="i" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            </div>
            <p class="text-neutral-600 leading-relaxed mb-6 font-medium">
              سیستم جلوگیری از تداخل نوبت‌ها عالیه! پنل مدیریت فوق‌العاده تمیز و سریعه و کلاً رابط کاربری خیلی روونی داره.
            </p>
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-400 rounded-full flex items-center justify-center text-white font-bold">ع</div>
              <div>
                <div class="font-bold text-neutral-900 text-sm">علی علوی</div>
                <div class="text-xs text-neutral-500">مدیر کلینیک فیزیوتراپی</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-neutral-900 text-neutral-400 py-12 text-center text-sm border-t-4 border-primary-500">
      <div class="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="flex items-center gap-2">
          <div class="w-8 h-8 bg-gradient-to-br from-primary-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-md">د</div>
          <span class="text-xl font-black text-white">دور گردون</span>
        </div>
        
        <div class="flex flex-wrap justify-center gap-6">
          <button @click="scrollTo('categories')" class="hover:text-white transition-colors">لیست خدمات</button>
          <RouterLink to="/about" class="hover:text-white transition-colors">درباره ما</RouterLink>
          <RouterLink to="/contact" class="hover:text-white transition-colors">پشتیبانی</RouterLink>
          <RouterLink to="/help" class="hover:text-white transition-colors">سوالات متداول</RouterLink>
        </div>
        
        <p>© ۱۴۰۳ دور گردون. تمامی حقوق محفوظ است.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
@keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
</style>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '@/services/api';

const isMobileMenuOpen = ref(false);
const categories = ref<Array<{ id: number; name: string; icon: string; slug: string }>>([]);

const scrollTo = (id: string) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
};

onMounted(async () => {
  try {
    categories.value = await api.get('/api/categories');
  } catch (e) {
    console.error('Failed to load categories', e);
  }
});
</script>
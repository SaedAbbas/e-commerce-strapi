// كود ميدل وير في ملف جديد اسمه set-jwt-cookie.js في مجلد middlewares
module.exports = (config, { strapi }) => {
    return async (ctx, next) => {
      await next();
  
      // التحقق من طلب تسجيل الخروج
    if (ctx.request.url === '/api/auth/logout') {
      // حذف الكوكي
      ctx.cookies.set('jwt', null, {
        httpOnly: true,
        secure: false , // true إذا كنت بتستخدم HTTPS
        sameSite: 'lax',
        expires: new Date(0), // تاريخ منتهي للحذف
      });

      ctx.cookies.set('jwt.sig', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(0),
        path: '/',
      });

      ctx.cookies.set('jwt.sig.sig', '', {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        expires: new Date(0),
        path: '/',
      });
      

      ctx.response.status = 200;
      ctx.response.body = { message: 'Logged out successfully' };
      return;
    }
    

      // فقط نفذ الكود ده لو الريكويست راجع من /api/auth/local
      if (
        (ctx.request.url === '/api/auth/local' || ctx.request.url === '/api/auth/local/register') &&
        ctx.response.status === 200
      )
       {
        try {
          const jwt = ctx.body?.jwt;
          const user = ctx.body?.user;
  
          if (!jwt || !user) {
            strapi.log.warn('JWT or User not found in response body.');
            return;
          }
  
          // ✅ حط التوكن في الكوكي
          ctx.cookies.set('jwt', jwt, {
            httpOnly: true,
            secure: false, // ← مهم حتى لو شغال على localhost
            sameSite: 'lax', // ← عشان تتقبل في cross-origin
            maxAge: 1000 * 60 * 60 * 24 * 7, // أسبوع
            path: '/',
            signed: false,
          });
  
          // ❌ امسح التوكن من الرد النهائي
          ctx.body = { user };
  
        } catch (error) {
          strapi.log.error('Error in set-jwt-cookie middleware:', error);
          ctx.throw(500, 'Internal Server Error');
        }
      }
    };
  };
  
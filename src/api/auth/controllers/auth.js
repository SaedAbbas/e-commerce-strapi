module.exports = {
  async logout(ctx) {
    try {
      // حذف الكوكي عن طريق تعيين تاريخ انتهاء صلاحية قديم
      ctx.cookies.set('jwt', null, {
        httpOnly: true,
        secure: false, // true إذا كنت بتستخدم HTTPS
        sameSite: 'none', // أو حسب إعداداتك
        expires: new Date(0), // تاريخ منتهي للحذف
      });

      return ctx.send({
        message: 'Logged out successfully',
      });
    } catch (error) {
      ctx.throw(500, 'Error during logout');
    }
  },
};
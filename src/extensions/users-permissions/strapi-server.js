module.exports = (plugin) => {
    const originalRegister = plugin.controllers.auth.register;
  
    plugin.controllers.auth.register = async (ctx) => {
      // 1️⃣ تسجيل المستخدم الأساسي
      const response = await originalRegister(ctx);
  
      try {
        const userId = response.user.id;
  
        // 2️⃣ إنشاء كارت تلقائي مربوط باليوزر
        await strapi.entityService.create("api::cart.cart", {
          data: {
            user: userId,
            products: [], // مبدئيًا فاضي
          },
        });
  
        console.log("✅ كارت اتعمل تلقائيًا لليوزر:", userId);
      } catch (err) {
        console.error("❌ فشل إنشاء الكارت:", err.message);
      }
  
      return response;
    };
  
    return plugin;
  };
  
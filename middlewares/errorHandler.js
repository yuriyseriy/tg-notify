module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    console.log(err);

    ctx.status = err.statusCode || err.status || 500;
    ctx.body = {
      error: err.message
    };
    ctx.app.emit('error', err, ctx);
  }
};
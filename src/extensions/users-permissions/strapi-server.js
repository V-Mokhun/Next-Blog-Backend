// ref doc: https://docs.strapi.io/developer-docs/latest/development/plugins-extension.html#extending-a-plugin-s-interface
module.exports = (plugin) => {
  // plugin.controllers.auth.refreshToken = async (ctx) => {
  // refresh userself token
  // const newJwt = strapi.plugins['users-permissions'].services.jwt.issue({
  //   id: ctx.state.user.id
  // })
  // return { jwt: newJwt }

  // comment out next lines, and refresh the request body's token like {token: 'xxx'}
  // const { token } = ctx.request.body;
  // console.log("STRAPI TOKEN: ", token);
  // const payload =
  //   strapi.plugins["users-permissions"].services.jwt.verify(token);
  // const newJwt = strapi.plugins["users-permissions"].services.jwt.issue({
  //   id: payload.id,
  // });
  // return { token: newJwt };
  // };

  plugin.controllers.auth.refreshToken = async (ctx) => {
    const payload = await strapi.plugins["users-permissions"].services.jwt
      .verify(ctx.request.body.token)
      .catch((error) => {
        return {
          jwt: strapi.plugins["users-permissions"].services.jwt.issue({
            id: ctx.request.body.id,
          }),
        };
      });

    return { token: payload.jwt };
  };

  plugin.routes["content-api"].routes.push({
    method: "POST",
    path: "/auth/refreshToken",
    handler: "auth.refreshToken",
    config: {
      prefix: "",
    },
  });

  return plugin;
};

module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "cloudinary",
      providerOptions: {
        cloud_name: env("CLOUDINARY_NAME"),
        api_key: env("CLOUDINARY_KEY"),
        api_secret: env("CLOUDINARY_SECRET"),
      },
      actionOptions: {
        upload: {},
        delete: {},
      },
    },
  },
  email: {
    config: {
      provider: "sendmail",
      settings: {
        defaultFrom: "mohunmax1408@gmail.com",
        defaultReplyTo: "mohunmax1408@gmail.com",
        testAddress: "spam54q@gmail.com",
      },
    },
  },
  "users-permissions": {
    config: {
      jwt: {
        expiresIn: "15m",
      },
    },
  },
});

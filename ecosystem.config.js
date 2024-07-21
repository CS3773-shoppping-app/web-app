module.exports = {
  apps : [{
    name: "next-app",
    cwd: "./next-shopping-app",
    script: "./next-shopping-app/build-start-next.sh",
    interpreter: "bash",
    watch: false,
    autorestart: true,
    env_production: {
      NODE_ENV: "production",
    }
    },
  ],
};
module.exports = {
  apps : [{
    name: "shopping-app-api",  // A name for your application
    script: "./api/server.js",  // The script file to launch the app
    instances: "max",  // This can be set to the number of CPU cores to use, or "max" to use all available
    autorestart: true,  // Automatically restart app if it crashes
    watch: false,  // Enable/disable watching file changes for automatic restart
    max_memory_restart: '1G',  // Optional: Restart app if it reaches a memory limit
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  },{
    name: "next-app",
    cwd: "./next-shopping-app",
    script: "./next-shopping-app/build-start-next.sh",
    interpreter: "bash",
    watch: false,
    autorestart: true,
    env_production: {
      NODE_ENV: "production",
    },
    },
  ],
};
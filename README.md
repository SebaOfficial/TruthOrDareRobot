# [@TrurhOrDareRobot](https://truthordarerobot.racca.me/)

Play Truth Or Dare on Telegram with multiple modes and available languages

## 🚀 Build & Deploy

If you want to create your own instance of the bot, ensure you have the following prerequisites:

### Prerequisites

- Web server
- Node.js + pnpm

### 📌 Manual Installation

To manually install an instance of the bot, follow these steps:

1. **Set up environment variables**
   See [Environment Variables](#-environment-variables).

2. **Install dependencies**

   ```bash
   pnpm i --frozen-lockfile
   ```

3. **Generate Prisma client**

   ```bash
   pnpm prisma generate --no-hints
   ```

4. **Build the project**

   ```bash
   pnpm build
   ```

5. **Start the server**

   ```bash
   node build/index.js
   ```

### 🐳 Docker Installation

1. **Set up environment variables**
   See [Environment Variables](#-environment-variables).

2. **Copy the [docker-compose.yml](./docker-compose.yml) file**

3. **Run the container**

   ```bash
   docker compose up
   ```

### 🌍 Environment Variables

Set up the environment variables by copying the [.env.example](./.env.example) file and updating it with your configurations.

## 🤝 Contribute

There are several ways to support the bot:

1. ⭐ Star the project on GitHub and share it with your friends.
2. 🧑‍💻 Add new [propmts](./data/)
3. 🛠️ [Contribute to the source code](./CONTRIBUTING.md).

## 📜 License

[@TruthOrDareRobot](https://truthordarerobot.racca.me/) by [Sebastiano Racca](https://racca.me) is licensed under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/).

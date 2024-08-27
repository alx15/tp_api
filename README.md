# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


# TrainingPeaks OAuth Integration with Nuxt 3

This project demonstrates OAuth integration with TrainingPeaks API using Nuxt 3. It includes features such as user authentication, workout creation, and athlete profile retrieval.

## Project Structure

```
.
├── components
│   ├── CreateWorkout.vue
│   └── auth
│       └── OAuthLogin.vue
├── composables
│   ├── useAuth.ts
│   └── useErrorHandler.ts
├── pages
│   ├── athlete
│   │   ├── [...slug].vue
│   │   └── profile.vue
│   ├── athlete.vue
│   ├── auth.vue
│   ├── callback.vue
│   └── index.vue
├── plugins
│   └── error-handler.ts
├── public
│   └── workout-template.json
├── server
│   └── api
│       ├── athlete
│       │   └── id.get.ts
│       ├── auth
│       │   ├── callback.get.ts
│       │   ├── check.ts
│       │   ├── initiate.ts
│       │   └── logout.post.ts
│       └── workouts
│           └── create.post.ts
├── app.vue
├── nuxt.config.ts
└── package.json
```

## Functionality

1. **OAuth Login**
   - `components/auth/OAuthLogin.vue`: Provides a UI for users to select OAuth scopes and initiate the login process.
   - `server/api/auth/initiate.ts`: Initiates the OAuth process by redirecting to TrainingPeaks authorization page.
   - `server/api/auth/callback.get.ts`: Handles the OAuth callback, exchanges the code for access tokens, and stores them in cookies.

2. **Athlete Profile**
   - `pages/athlete/profile.vue`: Displays the athlete's profile information.
   - `server/api/athlete/id.get.ts`: Retrieves the athlete's ID from the cookie.

3. **Workout Creation**
   - `components/CreateWorkout.vue`: Provides a UI for creating workouts.
   - `server/api/workouts/create.post.ts`: Handles the workout creation API call to TrainingPeaks.

4. **Error Handling**
   - `plugins/error-handler.ts`: Global error handler for consistent error logging and management.
   - `composables/useErrorHandler.ts`: Composable for centralized error handling logic.

5. **Authentication State Management**
   - `composables/useAuth.ts`: Manages authentication state and provides login/logout functionality.

## Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Create a `.env` file in the root directory with the following content:
   ```
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   APP_URL=http://localhost:3000
   ```
4. Run the development server: `npm run dev`

## Development

- The project uses Nuxt 3 with TypeScript.
- API routes are located in the `server/api` directory.
- Components are in the `components` directory.
- Pages are in the `pages` directory.

## Logging

Robust logging is implemented throughout the application for easier debugging and development:

- API responses and errors are logged in server-side API routes.
- Client-side errors are logged using the global error handler.
- Authentication processes log important steps and data.

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin feature/my-new-feature`
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

## Acknowledgments

- TrainingPeaks for providing the API and OAuth integration
- Nuxt.js team for the excellent framework
- Vue.js community for their support and resources
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


# TrainingPeaks OAuth Integration

This project is a Nuxt.js application that integrates with the TrainingPeaks API using OAuth authentication. It allows users to log in, view their athlete profile, create workouts, and log out.

## Project Structure



## Functionality

1. **OAuth Login**
   - `components/auth/OAuthLogin.vue`: Provides a UI for users to select OAuth scopes and initiate the login process.
   - `server/api/auth/initiate.ts`: Initiates the OAuth process by redirecting to TrainingPeaks authorization page.
   - `server/api/auth/callback.ts`: Handles the OAuth callback, exchanges the code for access tokens, and stores them in cookies.

2. **Athlete Profile**
   - `pages/athlete/profile.vue`: Displays the athlete's profile information.
   - `server/api/athlete/profile.ts`: Fetches the athlete's profile data from TrainingPeaks API.

3. **Workout Creation**
   - `components/CreateWorkout.vue`: Provides a form to create new workouts.
   - `server/api/workouts/create.post.ts`: Handles the creation of workouts using the TrainingPeaks API.

4. **Logout**
   - `components/auth/OAuthLogin.vue`: Provides a logout button when the user is logged in.
   - `server/api/auth/logout.post.ts`: Handles the logout process by clearing cookies.

5. **Error Handling**
   - `composables/useErrorHandler.ts`: Provides a reusable error handling system.

6. **Routing**
   - `pages/athlete/[...slug].vue`: Catch-all route for athlete-related pages.
   - `pages/callback.vue`: Handles the OAuth callback on the client-side.
   - `layouts/default.vue`: Provides a common layout for all pages.

7. **API Handling**
   - `server/api/index.ts`: Central file for handling API routes.

## How It Works

1. Users start on the home page (`pages/index.vue`) and initiate the OAuth login process.
2. The application redirects to TrainingPeaks for authentication.
3. After successful authentication, TrainingPeaks redirects back to the callback URL.
4. The server exchanges the authorization code for access tokens and stores them in cookies.
5. Users are redirected to the athlete dashboard (`pages/athlete.vue`).
6. The athlete dashboard displays profile information and allows workout creation.
7. Users can log out, which clears the cookies and redirects to the home page.

## Configuration

- Environment variables are used for sensitive information (client ID, client secret, etc.).
- `nuxt.config.ts` contains the Nuxt.js configuration, including runtime config and API route handling.

## Error Handling

The application now uses a global error handling system (`useErrorHandler` composable) to manage and display errors consistently across components.

## Dependencies

- Nuxt.js 3.13.0
- Vue.js (latest)
- @nuxtjs/axios for HTTP requests

## Getting Started

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables in a `.env` file:
   ```
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   APP_URL=http://localhost:3000
   ```

4. Run the development server: `npm run dev`
5. Open your browser and navigate to `http://localhost:3000`

## Troubleshooting

If you encounter issues with the OAuth flow:

1. Ensure your TrainingPeaks Developer account has the correct redirect URI set (`http://localhost:3000/api/auth/callback` for local development).
2. Check that the scopes you're requesting are allowed for your application in the TrainingPeaks Developer portal.
3. Verify that your `.env` file contains the correct `CLIENT_ID` and `CLIENT_SECRET`.
4. Clear your browser cookies and cache, then attempt the authentication process again.

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
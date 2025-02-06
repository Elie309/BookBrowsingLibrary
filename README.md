# Book Browsing Library

A library for browsing and managing books. This project allows users to search, view, and organize their book collections.

## Installation

To install the package, you need to have access to GitHub Packages. Follow these steps:

1. Create a `.npmrc` file in the root of your project and add the following lines:
    ```sh
    @elie309:registry=https://npm.pkg.github.com
    //npm.pkg.github.com/:_authToken=YOUR_GITHUB_PAT
    ```
    Replace `YOUR_GITHUB_PAT` with your GitHub personal access token.

2. Alternatively, you can login through the npm manager:
    ```sh
    npm login --registry=https://npm.pkg.github.com
    ```

3. Install the package using npm:
    ```sh
    npm install @elie309/bookbrowsinglibrary
    ```

### Creating a GitHub Personal Access Token

1. Go to [GitHub Settings](https://github.com/settings/tokens).
2. Click on **Generate new token**.
3. Give your token a descriptive name.
4. Select the scopes or permissions you'd like to grant this token. At a minimum, you need the `read:packages` scope.
5. Click **Generate token**.
6. Copy the token to your clipboard. You won't be able to see it again!

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

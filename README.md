![Tinel Workshop Logo](https://github.com/larrybarriosjr/tinel/blob/develop/src/assets/logo.png)

# **Tinel Workshop**

A simple webshop that sells workshops. An assignment for a job application at Locastic.

## **Workflow**

### _ASSET SETUP_

Using the design file given with the assignment, I created an svg for icons and logo similar to the file. I
also created a custom logo for favicon and mobile app logos based on the original logo of the webshop. This
adds completeness to the overall appearance of the site.

### _DEVELOPMENT SETUP_

To make a development environment that is consistent throughout the developers, I setup configurations for
code formatter and linter using Prettier and ES Lint. I also added ignore files to start the development
server faster and to display autocomplete much quicker.

### _BRANCHING STRATEGY_

I used three branches: _main_, _develop_ and _feature_.

I used the **feature branch** for adding a feature to the app. These features come from the stories given
with the assignment. I labeled the features depending on the page the story is on. There are also other
features I added that is not part of the story, but is otherwise important, such as initial configurations,
styling and setting up assets and APIs.

I used the **develop branch** to merge the completed features and act as a branch for ensuring minimal
bugfixes before merging to main.

Finally, the **main branch** is used for the release of the product. Currently, there is only version 1.0.0.

### _FEATURE DEVELOPMENT_

I followed a TDD (Test-Driven Development) approach using Jest, React Testing Library and Cypress for unit
and integration testing. I created the tests from the story criteria and based my components on them. I also
added automation when creating a pull request on develop branch to run the test first before merging.

I also followed a Mobile-First approach to ensure responsiveness all throughout the most commonly used
devices.

## **Technologies Used**

### _CLIENT_

- React
- TypeScript
- Redux/Redux Toolkit
- React Router
- Sass
- Formik/Yup

### _SERVER_

- JSON Server

### _TESTS_

- Jest
- React Testing Library
- Cypress

### _CONFIGS_

- ES Lint
- Prettier
- VS Code
- GitHub Actions

### _OTHER LIBRARIES_

- Day JS
- CLSX
- React Select
- React Datepicker
- React Hot Toast
- Redux Persist

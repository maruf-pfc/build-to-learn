# CS Resources Hub

Welcome to **CS Resources Hub**! This project is a comprehensive web application designed to provide high-quality resources for computer science topics, including algorithms, web development, machine learning, cybersecurity, mobile development, and cloud computing.

## Table of Contents

- [CS Resources Hub](#cs-resources-hub)
  - [Table of Contents](#table-of-contents)
  - [Project Overview](#project-overview)
  - [Features](#features)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
  - [Running the Project](#running-the-project)
  - [Project Structure](#project-structure)
  - [Content Management](#content-management)
    - [Adding New Resources](#adding-new-resources)
    - [Updating Existing Content](#updating-existing-content)
  - [Contributing](#contributing)
    - [Code Contributions](#code-contributions)
    - [Our Contributors](#our-contributors)
    - [Content Contributions](#content-contributions)
  - [Styling Guidelines](#styling-guidelines)
  - [Code of Conduct](#code-of-conduct)
  - [License](#license)

---

## Project Overview

**CS Resources Hub** is built using **Next.js**, **Tailwindcss**, and **MDX**. It aims to be a one-stop platform for computer science enthusiasts, students, and professionals to access curated learning materials, tutorials, and resources across various CS domains.

## Features

- Comprehensive coverage of CS topics, including Frontend, Backend, and DevOps
- Interactive UI with animated components like `TypewriterEffect` and `AnimatedTitle`
- Responsive design for seamless use on different devices
- MDX-based content for easy writing and maintenance
- Search functionality for quick resource access
- Nested routing structure for organized content presentation
- Dark mode support for comfortable reading in different lighting conditions

---

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v17.0.0 or later)
- [npm](https://www.npmjs.com/) (v6.0.0 or later)
- [Git](https://git-scm.com/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/programming-for-career/cs-resources.git
   ```

2. Navigate to the project directory:

   ```bash
   cd cs-resources
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

---

## Running the Project

To run the development server, use the following command:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```txt
cs-resources/
📦cs-resources
 ┣ 📂public
 ┃ ┗ 📜favicon.jpg
 ┣ 📂src
 ┃ ┣ 📂components
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📂resources
 ┃ ┃ ┃ ┣ 📂algorithms
 ┃ ┃ ┃ ┃ ┗ 📜introduction.mdx
 ┃ ┃ ┃ ┣ 📜algorithms.mdx
 ┃ ┃ ┃ ┣ 📜cloud-computing.mdx
 ┃ ┃ ┃ ┣ 📜cybersecurity.mdx
 ┃ ┃ ┃ ┣ 📜machine-learning.mdx
 ┃ ┃ ┃ ┣ 📜mobile-development.mdx
 ┃ ┃ ┃ ┗ 📜web-development.mdx
 ┃ ┃ ┣ 📜404.mdx
 ┃ ┃ ┣ 📜_app.mdx
 ┃ ┃ ┣ 📜_meta.json
 ┃ ┃ ┣ 📜about.mdx
 ┃ ┃ ┗ 📜index.mdx
 ┃ ┣ 📂styles
 ┃ ┃ ┗ 📜globals.css
 ┃ ┣ 📂types
 ┃ ┃ ┗ 📜environment.d.ts
 ┃ ┗ 📜utils.tsx
 ┣ 📜.eslintrc.json
 ┣ 📜.gitignore
 ┣ 📜.prettierignore
 ┣ 📜next-env.d.ts
 ┣ 📜next-sitemap.config.js
 ┣ 📜next.config.js
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┣ 📜postcss.config.js
 ┣ 📜tailwind.config.ts
 ┣ 📜theme.config.tsx
 ┗ 📜tsconfig.json
```

---

## Content Management

### Adding New Resources

1. Add a new MDX file to the appropriate directory in the `resources/` folder.
2. Include the necessary metadata (e.g., title, description, tags) in the MDX frontmatter.
3. Write the content using Markdown and React components.
4. Don't upload images directly to the repository. Instead, host them externally and link to them in the content.

### Updating Existing Content

1. Locate the MDX file for the content you want to update.
2. Edit the file as needed and save your changes.

---

## Contributing

We welcome contributions! Please follow the guidelines below.

### Code Contributions

1. Fork the repository.
2. Create a new branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Commit your changes:

   ```bash
   git commit -m "Add your message here"
   ```

4. Push to your branch:

   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a pull request.

### Our Contributors

<a href="https://github.com/programming-for-career/cs-resources/graphs/contributors">
   <img src="https://contrib.rocks/image?repo=programming-for-career/cs-resources" />
</a>

View All Contributors? [Click Here](./CONTRIBUTING.md)

### Content Contributions

- Submit suggestions for new topics or improvements via GitHub issues.
- If adding content, follow the [Content Management](#content-management) guidelines.

---

## Styling Guidelines

- Follow the Tailwindcss utility-first approach for styling.
- Ensure responsiveness by testing across multiple devices.

---

## Code of Conduct

Please read the [Code of Conduct](CODE_OF_CONDUCT.md) to understand expected behavior.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE.md) file for details.

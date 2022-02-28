#MERN STACK - Coza Store

This is an ecommerce web-app built with MERN stack.
This is a completely functional web-app where one can visit, register, purchase and make transaction with demo products.

## Development guide

The code consist of two main parts:

-   API backend: Written in NodeJS Express with database MongoDB
-   User Interface: Base on template [Coza Store](https://colorlib.com/wp/template/coza-store/), I myself rewrite UI in ReactJS with **Sass**.

## Build With

List major frameworks/libraries used to build the project:

-   API:
    -   express
    -   mongoose
    -   jsonwebtoken, crypto-js
    -   cloudinary, multer
    -   stripe
    -   nodemailer
-   Client UI:
    -   react
    -   react-router-dom v6, axios
    -   redux toolkit
    -   mui, styled-component, node-sass, fontawesome
    -   react-hook-form, yup
    -   react-select, react-date-picker, ckeditor
    -   react-slick, react-toastify
    -   stripe

## Getting Started

### Prerequisites

Use the package manager [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) to install project

### Installation

1. Clone the repo

```bash
    git clone https://github.com/hongocton0406/MERN_CozaStore.git
```

2. Install NPM packages

-   API:

```bash
    cd api & npm install
```

-   Client UI:

```bash
    cd client & npm install
```

3. Running

```
bash npm start
```

## Usage

When using the Payment with Strip, you must ensure that card number is _4242 4242 4242 4242_

## Contact

Facebook: [Ho Ngoc Ton](https://www.facebook.com/ton.ho.545/)

Email: [Ho Ngoc Ton](mailto:hongocton0406@gmail.com?subject=[Github])

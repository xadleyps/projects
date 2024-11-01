# Project App

Sucafina React Front-End Developer test.

## Server

### Prerequisites

* Ruby version: ruby 3.3.5
* Rails version: Rails 7.2.1.2

### Getting Started

* Navigate to `server` folder
* Run `bundle install` to install the gem
```
bundle install
```
* Run this command to init db (100 items, can change the amount here `server/db/seeds.rb`
```
rails db:seed
```
* Run this command to start server
```
rails server
```
* Default host should be
```
http://localhost:3000/api/projects
```

## Web

Can refer to demo video [here](https://drive.google.com/file/d/1vJOSiQcoge1nLVd7gwo2CEe5Ey7riMLc/view?usp=sharing).

### Getting Started
- Navigate to `web` folder
- Once you have Yarn, install the project dependencies by running:
  
  ```bash
  yarn install
  
- To run the application, execute the following command in your terminal:
  
  ```bash
  yarn start
  
### Testing

To run tests, use the following command:

 ```bash
  yarn test
```

## App

Can refer to demo video [here](https://drive.google.com/file/d/1vJOSiQcoge1nLVd7gwo2CEe5Ey7riMLc/view?usp=sharing).

### Prerequisites

Before you begin, ensure you have met the following requirements:

- **Node.js**: [Download and install Node.js](https://nodejs.org/) (v20.18.0)
- **Yarn**: [Install Yarn](https://classic.yarnpkg.com/en/docs/install/) (3.6.4)
- **React Native CLI**: Install React Native CLI globally
  
  ```bash
  npm install -g react-native-cli
  
- **Android Studio**: [Download and install Android Studio](https://reactnative.dev/docs/set-up-your-environment) and setup an emulator.
  
### Getting Started

- Once you have Yarn, install the project dependencies by running
  
  ```bash
  yarn install
  
- Open your emulator via Virtual Device Manager of Android Studio
- To run the application, execute the following command in your terminal:
  
  ```bash
  yarn android
  
## Testing
To run tests, use the following command:
 ```bash
  yarn test


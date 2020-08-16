# Autotweet

Autotweet is a Twitter monitoring and automation tool. Get insights about your audience with a single sign in.

![Views](https://user-images.githubusercontent.com/18191750/84209789-5335e700-aab7-11ea-991d-9ceac0fc0017.png)

## Contributing

### Requirements

Make sure the following dependencies are installed:
- [Go](https://golang.org/dl/)
- [yarn](https://yarnpkg.com/getting-started/install)

### Running



Start the backend (replace credentials with your [own values](https://developer.twitter.com/en/apps)):
```bash
$ cd server
$ go mod download
$ go run . --consumerKey 7YBPrscvh0RIThrWYVfGg --consumerSecret sMO1vDyJ9A0xfOA6RyWNjhTUS1sNqsa7Ae14gOZnw
```

Start the mobile app:

```bash
$ cd client
$ yarn
$ yarn web
```

## Codebase

#### Technologies
Here is a list of all the big technologies we use:

    - Typescript 
    - React Native
    - Go (backend)

#### Folder structure

```python
/autotweet
├── client  # Mobile native client
└── server  # Backend for the mobile client
```


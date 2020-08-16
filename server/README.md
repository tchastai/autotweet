# Autotweet Server

## Autotweet's Twitter Proxy

The server acts as a proxy between Twitter and the Autotweet clients to lighten the auth mecanisms.

We realized after several experiments that the browser Javascript environment was not
ideal to handle authentication with OAuth1. This led to the development of this server.

Server consists of:

- An authentication package providing an abstraction over the `OAuth1` mecanism used by Twitter

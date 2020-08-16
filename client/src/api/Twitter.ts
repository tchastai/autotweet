import * as AuthSession from "expo-auth-session";
import {
  openAuthSessionAsync,
  WebBrowserAuthSessionResult as AuthSessionResult,
  WebBrowserRedirectResult as RedirectResult,
} from "expo-web-browser";
import { Linking } from "expo";
import { AsyncStorage } from "react-native";
import { Base64 } from "js-base64";

interface AuthToken {
  token: string;
  tokenSecret: string;
}

interface TwitterOptions {
  twitter: {
    host: string;
    endpoints: {
      authenticate: string;
    };
  };
  backend: {
    host: string;
    endpoints: {
      accountInfo: string;
      requestToken: string;
      accessToken: string;
    };
  };
}

interface Account {
  profilePictureURL: string;
  username: string;
}

export interface Metrics {
  points: number;
  retweets: number;
  favorites: number;
  replies: number;
}

export class Twitter {
  options: TwitterOptions;

  constructor(options?: Partial<TwitterOptions>) {
    this.options = { ...defaultOptions, ...options };
  }

  async login() {
    const redirectURI = AuthSession.makeRedirectUri();

    const { token } = await this.getRequestToken(redirectURI);

    const {
      host,
      endpoints: { authenticate },
    } = this.options.twitter;

    const authRes = await openAuthSessionAsync(
      `${host}${authenticate}?oauth_token=${token}`,
      redirectURI
    );

    if (this.isRedirectResult(authRes)) {
      const verifier = this.getVerifierFromURL(authRes.url);
      if (!verifier) return;

      return this.getAccessToken(token, verifier);
    }
  }

  isRedirectResult(res: AuthSessionResult): res is RedirectResult {
    return !!(res as RedirectResult).url;
  }

  private async getRequestToken(redirect: string): Promise<AuthToken> {
    const url = `${this.options.backend.host}${this.options.backend.endpoints.requestToken}?oauth_callback=${redirect}`;

    const response = await fetch(url);

    const { token, tokenSecret } = await response.json();
    return { token, tokenSecret };
  }

  private async getAccessToken(
    requestToken: string,
    verifier: string
  ): Promise<AuthToken> {
    const res = await fetch(
      `${this.options.backend.host}${this.options.backend.endpoints.accessToken}?oauth_verifier=${verifier}&oauth_token=${requestToken}`
    );

    return res.json();
  }

  private getVerifierFromURL(url: string) {
    const q = Linking.parse(url).queryParams;
    if (q) {
      return q["oauth_verifier"];
    }
  }

  async getCredentials(): Promise<AuthToken> {
    const token = await AsyncStorage.getItem("accessToken");
    const tokenSecret = await AsyncStorage.getItem("accessTokenSecret");

    if (!token || !tokenSecret) {
      throw new Error("Missing or incomplete credentials");
    }

    return { token, tokenSecret };
  }

  async createAuthHeader() {
    const creds = await this.getCredentials();
    const encodedCreds = Base64.btoa(`${creds.token}:${creds.tokenSecret}`);

    return `Basic ${encodedCreds}`;
  }

  async getAccountInfo(): Promise<Account> {
    const request = new Request(
      `${this.options.backend.host}${this.options.backend.endpoints.accountInfo}`
    );
    const header = await this.createAuthHeader();
    request.headers.set("Authorization", header);

    const { profilePictureURL, username } = await (await fetch(request)).json();
    return { profilePictureURL, username };
  }

  async getMetrics(username: string): Promise<Metrics> {
    const request = new Request(
      `${this.options.backend.host}/trends/${username}/metrics`
    );
    const header = await this.createAuthHeader();
    request.headers.set("Authorization", header);

    const { points, retweets, favorites, replies } = await (
      await fetch(request)
    ).json();

    return { points, retweets, favorites, replies };
  }

  async getGraph(username: string, count: number): Promise<string> {
    const request = new Request(
      `${this.options.backend.host}/trends/${username}/graph?count=${count}`
    );

    const header = await this.createAuthHeader();
    request.headers.set("Authorization", header);

    const res = await fetch(request);

    return res.text();
  }
}

const defaultOptions = {
  twitter: {
    host: "https://api.twitter.com",
    endpoints: {
      authenticate: "/oauth/authenticate",
    },
  },
  backend: {
    host: "http://localhost:8080",
    endpoints: {
      accountInfo: "/accounts/info",
      requestToken: "/auth/request_token",
      accessToken: "/auth/access_token",
    },
  },
};

export default new Twitter();

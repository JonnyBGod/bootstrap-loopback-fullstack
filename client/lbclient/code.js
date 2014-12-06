if (window.accessToken) {
    if (!req.headers) {
      req.headers = {};
    }
    req.headers.authorization = window.accessToken;
  }
function getTOKEN(value) {
  // Intenta recuperar el token del localStorage
  const cachedToken = window.localStorage.getItem("firebaseToken");

  if (cachedToken) {
    // Token ya existente en caché, solo imprímelo
    const value = cachedToken;
    return value;
  } else {
    // Genera el token del dispositivo usando la id pública
    messaging
      .getToken({
        // Configuración del token
        vapidKey:
          "BPRhvp0upPy3JoG6Nocso6QfKZipK2RsFpANKzzL4gSs8b4wru3TsUZuPSj37JWh8RUZF2cBzXH6c1vj8Whi5OU",
      })
      .then((currentToken) => {
        if (currentToken) {
          // Guarda el token en localStorage
          window.localStorage.setItem("firebaseToken", currentToken);
          const value = currentToken;
          return value;
        } else {
          setTokenSentToServer(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setTokenSentToServer(false);
      });
  }
}

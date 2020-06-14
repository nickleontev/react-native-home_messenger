import LocalizedStrings from "react-localization";

export const Messages = new LocalizedStrings({
  en: {
    connectionErrorTitle: "Connection error",
    connectionErrorMessage:
      "An error occurred while loading data. Check your network connection.",
      autenficationFailedTitle: "Authentication failed",
      autenficationFailedMessage: "Incorrect username or password.",
      registrationFailedTitle: "Registration failed",
      registrationFailedMessage:"User with the same username already exists.",
      registrationSuccesfulTitle: "Registration",
      registrationSuccesfulMessage:"User successfully registered.",
  },
  ru: {
    connectionErrorTitle: "Ошибка подключения",
    connectionErrorMessage:
      "При загрузке данных произошла ошибка. Проверьте Ваше подключение к сети.",
      autenficationFailedTitle: "Ошибка аутентификации",
      autenficationFailedMessage: "Неправильный логин или пароль.",
      registrationFailedTitle: "Ошибка авторизации",
      registrationFailedMessage:"Пользователь с таким именем уже существует.",
      registrationSuccesfulTitle: "Регистрация",
      registrationSuccesfulMessage:"Пользователь успешно зарегистрирован.",
  }
});

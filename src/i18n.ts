import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  debug: false,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: {
        description: {
          part1: 'Edit <1>src/App.js</1> and save to reload.',
          part2: 'Learn React 18',
        },
        header: {
          main: 'Go to Main Page',
          board: 'Board',
          boardList: 'Board list',
          newBoard: 'New board',
          signIn: 'Sign in',
          signUp: 'Sign up',
        },
        sign: {
          login: 'login',
          password: 'password',
          name: 'name',
          signInQuestion: 'Already registered?',
          regQuestion: 'You are not registered yet? ',
          submit: 'Submit',
          editProfile: 'Edit profile',
          delete: 'Delete account',
          danger: 'Account will be permanently deleted!',
          question: 'Are you sure?',
          ok: 'Ok',
          cancel: 'Cancel',
        },
      },
    },
    ru: {
      translation: {
        description: {
          part1: 'Редактировать <1>src/App.js</1> и сохранить для перезагрузки.',
          part2: 'Выучи React',
        },
        header: {
          main: 'На главную',
          board: 'Доска',
          boardList: 'Список досок',
          newBoard: 'Новая доска',
          signIn: 'Войти',
          signUp: 'Зарегистрироваться',
        },
        sign: {
          login: 'логин',
          password: 'пароль',
          name: 'имя',
          signInQuestion: 'Уже зарегистрированы?',
          regQuestion: 'Еще не зарегистрированы? ',
          submit: 'Подтвердить',
          editProfile: 'Редактировать профиль',
          delete: 'Удалить профиль',
          danger: 'Учетная запись будет удалена безвозвратно',
          question: 'Вы уверены?',
          ok: 'Да',
          cancel: 'Отменить',
        },
      },
    },
  },
});

export default i18n;

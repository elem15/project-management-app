import i18n from 'i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

i18n
  .use(I18nextBrowserLanguageDetector)
  .use(initReactI18next)
  .init({
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
            signOut: 'Sign out',
            profile: 'Edit profile',
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
          formRules: {
            nameRequired: 'Please input your name!',
            nameLength: 'Name must be at least 3 characters',
            loginRequired: 'Please input your login!',
            loginLength: 'Login must be at least 3 characters',
            passwordRequired: 'Please input your password!',
            passwordLength: 'Password must be at least 8 characters',
            passwordPattern: 'Only numbers and english characters without space can be entered',
          },
          welcome: {
            appTitle: 'Kanban-board',
            appSubtitle:
              'Manage your projects, achieve maximum efficiency, help your AGILE and DevOps team streamline their daily work',
            team: 'Our team',
            teammate1: 'Denis Bazhenov',
            teammate2: 'Mikhail Dvorkin',
            teammate3: 'Yuri Labatsevich',
            api: 'Interaction with api',
            auth: 'Registration/login',
            main: 'Main page',
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
            signOut: 'Выйти',
            profile: 'Редактировать профиль',
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
          formRules: {
            nameRequired: 'Введите имя!',
            nameLength: 'Минимум 3 символа',
            loginRequired: 'Введите логин!',
            loginLength: 'Минимум 3 символа',
            passwordRequired: 'Введите пароль!',
            passwordLength: 'Минимум 8 символов',
            passwordPattern: 'Только цифры и латинские буквы без пробелов',
          },
          welcome: {
            appTitle: 'Канбан-доска',
            appSubtitle:
              'Упраляйте своими проектами, достигайте максимальной эффективности, помогите своей AGILE и DevOps команде упорядочить повседневную работу',
            team: 'Наша команда',
            teammate1: 'Денис Баженов',
            teammate2: 'Михаил Дворкин',
            teammate3: 'Юрий Лабацевич',
            api: 'Взаимодействие с api',
            auth: 'Регистрация/авторизация',
            main: 'Главная страница',
          },
        },
      },
    },
  });

export default i18n;

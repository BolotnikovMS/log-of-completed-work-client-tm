# Frontend часть приложения "Журнал выполненных работ".

Данное приложение позволяет вносить, просматривать, редактировать и удалять записи по проделанной работе на объекте. Также приложение позволяет хранить основные характеристики, документацию, фото, бэкапы установленных модулей объекта, что упрощает получение нужных сведений в случае необходимости.

## Основные функции приложени:

- *Аутентификация:* <br>Защищенные маршруты для авторизованных пользователей.
- *Ролевая система:* <br>Возможность присвоить пользователю роль с правами в приложении.
  - Admin.
  - Moderator.
  - User.
- *Добавление записей:*
  - По выполненным работа с привязкой к объекту.
  - Добавление новых объектов с заполнением характеристик и прикреплению необходимых файлов.
- *Просмотр записей:*
  - Просмотр записей по выполненным работам с возможностью фильтрации и сохранением в excel файл.
  - Просмотр записей по объектам с возможностью фильтрации и сохранением в excel файл.
- *Возможность редактирования и удаления записей:* <br>Изменения и удаления существующих записей в зависимости от роли в приложении.
- *Интуитивно понятный интерфейс:* <br>Удобный и доступный дизайн.

## Технологии:

- *React*
- *Zustand*
- *Axios*
- *Tanstack query*
- *TailwindCSS*
- *DaisyUI*
- *SASS*
- *React hook form*
- *Yup*
- *React router*
- *Toastify*
- *Date-fns*
- *Moment*
- *Awesome slider*

## Устанока:

1. Склонируйте репозиторий:
```
git clone https://github.com/BolotnikovMS/log-of-completed-work-client-tm.git
```
  - При необходимости добавьте в конце `./` чтобы не создавалась дополнительная папка.
2. Установить зависимости:
```
npm install
```
3. Скопировать файл `.env.example` и убрать приписку `.example`. Файле .env в переменных указать `url` адреса для работы с бэкендом. <br>Пример: <br>
`
VITE_API_URL=http://127.0.0.1:3333/api/v1.0 <br>
VIYE_FILE_URL=http://127.0.0.1:3333/
`

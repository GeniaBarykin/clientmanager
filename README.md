# clientmanager

Схема базы данных и вводных данных **/server/schema.sql** <br>
Создается юзер admin с __паролем admin__ и добавляются 3 клиента, но admin увидет только 2х, за кого он ответственный. <br>
Если создать аккаунт с ФИО Arkadiy Arkadievich Arkadiev, то у него будет доступ к записи клиента.
>ФИО не уникальны, поэтому лучше было бы использовать уникальный номер, но следую заданию в данном вопросе.


## Запуск

Для сервера: <br>
``
cd server <br>
npm install <br>
npm run dev <br>
``
Для клиента <br>
``
../cd client <br>
npm install  <br>
npm run start <br>
``



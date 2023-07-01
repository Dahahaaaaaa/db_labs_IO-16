# Модель прецедентів

## Загальна схема

<center style="
    border-radius:4px;
    border: 1px solid #cfd7e6;
    box-shadow: 0 1px 3px 0 rgba(89,105,129,.05), 0 1px 1px 0 rgba(0,0,0,.025);
    padding: 1em;"
>

@startuml

actor "**Користувач продукту проекту**" as ProjectUser
actor "**Менеджер (керівник) проекту**" as ProjectManager
actor "**Адміністратор системи**" as SystemAdministrator
usecase "Управляти \nпрофілем" as MngProf #pink
usecase "Управляти \nзавданнями" as MngTasks #pink
usecase "Управляти \nдошками \nпроєкту" as MngProjectBoards #pink
usecase "Управляти \nучасниками \nпроєкту" as MngProjectUsers #pink
usecase "Управляти \nкористувачами \nсистеми" as MngSystemUsers #pink
usecase "UserAuth" as UsAuth
usecase "UserReg" as UsReg
usecase "Support" as Sup

SystemAdministrator -u-|> ProjectManager
ProjectManager -u-|> ProjectUser
ProjectUser -u-|> SystemUser

SystemUser -> UsAuth
SystemUser -u-> MngProf
SystemUser -l-> UsReg

ProjectUser -> MngTasks

ProjectManager -> MngProjectBoards
ProjectManager -l-> MngProjectUsers

SystemAdministrator -l-> MngSystemUsers
SystemAdministrator -> Sup

@enduml

</center>

## Сценарії використання

|ID| USER.REGISTRATION|
|:--|:--|
|Назва:|Реєстрація користувача|
|Учасники:|Користувач, система|
|Передумови:|Обліковий запис користувача не створений у системі|
|Результат:|Користувач зареєстрований в системі|
|Виключні ситуації:| _USER.ERRORS.ALREADY_EXISTS_<br>- Користувач вже зареєстрований в системі<br>_USER.ERR.INVORSALID_DATA_<br>- Користувач ввів некоректні дані|
|Основний сценарій:|1. Користувач вводить свої логін та пароль<br>2. Система перевіряє коректність введених даних<br>3. Система реєструє користувача<br>4. Успішна реєстрація|

<center>

@startuml

    |Користувач|
     start
      :вводить свої логін та пароль;
    |Система|
      :перевіряє коректність введення даних;
       note right #ffaaaa
       USER.ERRORS.INVALID_DATA
       end note
      :реєструє користувача;
       note right #ffaaaa
       USER.ERRORS.ALREADY_EXISTS
       end note
    |Користувач|
      :отримує повідомлення про про успішну реєстрацію;
       stop;

@enduml

</center>

---

|ID| USER.LOGIN|
|:--|:--|
|Назва:|Вхід користувача|
|Учасники:|Користувач, система|
|Передумови:|Користувач ввів логін та пароль<br>Користувач зареєстрований в системі|
|Результат:|Користувач отримав доступ до функціоналу системи згідно своєї ролі|
|Виключні ситуації:|_USER.ERRORS.NOT_EXIST_<br>- Користувач не зареєстрований в системі<br>_USER.ERRORS.INVALID_CREDENTIALS_<br>- Користувач ввів невірний логін або пароль|
|Основний сценарій:|1. Користувач вводить свої логін та пароль<br>2. Система перевіряє коректність введених даних<br>3. Система авторизує користувача в систему<br>4. Користувач отримує повідомлення про успішну авторизацію|
   
<center>

@startuml

    |Користувач|
     start
      :вводить свої логін та пароль;
    |Система|
      :перевіряє коректність введення даних;
       note right #ffaaaa
       SER.ERRORS.INVALID_CREDENTIALS
       end note
      :авторизує користувача;
       note right #ffaaaa
       USER.ERRORS.NOT_EXISTS
       end note
    |Користувач|
      :отримує повідомлення про про успішну авторизацію;
     stop;
        
@enduml

</center>

---

|ID| PROJECT.CREATE|
|:--|:--|
|Назва:|Створення проекту|
|Учасники:|Користувач (Менеджер/Адміністратор), система|
|Передумови:|Користувач має необхідні права доступу до функціоналу системи|
|Результат:|Проект створено|
|Виключні ситуації:|_PROJECT.ERRORS.ACCESS_DENIED_<br>- Користувач не має необхідних прав доступу до функціоналу системи<br>_PROJECT.ERRORS.INVALID_DATA_<br>- Користувач ввів некоректні дані|
|Основний сценарій:|1. Користувач вводить назву проекту та опис<br>2. Система перевіряє коректність введених даних<br>3. Система створює проект<br>4. Користувач отримує повідомлення про успішне створення проекту|

<center>

@startuml

    |Користувач|
        start
        :вводить назву проекту та опис;
        note right #ffaaaa
        PROJECT.ERRORS.ACCESS_DENIED - Користувач не має
        необхідних прав доступу
        до функціоналу системи
        end note
    |Система|
        :перевіряє коректність введених даних;
        note right #ffaaaa
        PROJECT.ERRORS.INVALID_DATA - Користувач ввів 
        некоректні дані
        end note
        :створює проект;
    |Користувач|
        :отримує повідомлення 
        про успішне створення проекту;
        stop;
@enduml

</center>

---

|ID| PROJECT.EDIT|
|:--|:--|
|Назва:|Редагування проекту|
|Учасники:|Користувач (Менеджер/Адміністратор), система|
|Передумови:|Користувач має необхідні права доступу до функціоналу системи|
|Результат:|Проект відредаговано|
|Виключні ситуації:|_PROJECT.ERRORS.ACCESS_DENIED_<br>- Користувач не має необхідних прав доступу до функціоналу системи<br>_PROJECT.ERRORS.INVALID_DATA_<br>- Користувач ввів некоректні дані<br>_PROJECT.ERRORS.<br>NOT_EXIST_- Проекту не існує|
|Основний сценарій:|1. Користувач вводить назву проекту та опис<br>2. Система перевіряє коректність введених даних<br>3. Система відредаговує проект<br>4. Користувач отримує повідомлення про успішне відредагування проекту|

<center>

@startuml

    |Користувач|
     start
        :вводить назву проекту та опис;
         note right #ffaaaa
         PROJECT.ERRORS.NOT_EXIST - Проекту не існує
         PROJECT.ERRORS.ACCESS_DENIED - Користувач не має
         необхідних прав доступу
         до функціоналу системи
         end note
    |Система|
        :перевіряє коректність введених даних;
         note right #ffaaaa
         PROJECT.ERRORS.INVALID_DATA - Користувач ввів 
         некоректні дані
         end note
        :відредаговує проект;
    |Користувач|
        :отримує повідомлення про успішне відредагування проекту;       
      stop

@enduml
    
</center>

---
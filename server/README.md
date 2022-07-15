Faire cette commande si vous l'avez pas faites pour generer une clé.
```php
composer install
php bin/console lexik:jwt:generate-keypair
```


## inscription

1. utlisé la route :
```javascript
http://localhost:8000/account/register
```

2. utlisé la methode POST bien-sûr.

3. créez un objet json comme ça:

```javascript
{

	"name" : "majid",
	
	"adresse" : "rue de la paix",
	
	"email":"test@test.fr",

	"password":"test",
	
	"ville":"paris",
	
	"phone":"000000000"

}
```


4. Ne pas oublier le headers svp
```jvascript
 Content-Type': 'application/json
```

5. Et si c'est bon vous aurez une reponse comme ça:

```javascript
"parfait"
```






## Connexion
pour vous inscrire vous devez envoyé les information sous format json dans le body de la requette.

1. initialisé le header en mettant 
```jvascript
 Content-Type': 'application/json
```

2. dans le body créer un objet et mettre  
```javascript
  {email : "adressemail", password : "motDePasse"}
  ```
  
  3. L'url est :
  ```javascript
http://localhost:8000/api/login_check/
```

4. NE PAS OUBLIER D'UTILISER LA METHODE GET SVP.


5. Si tout se passe bien vous aurez un token en reponse comme ce si et ne pas oublier Bearer sinon le token ne sera reconnu:

```javascript
{

"token": "Bearer  eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2NTc3MjAwMzYsImV4cCI6MTY1NzcyMzYzNiwicm9sZXMiOlsiUk9MRV9BRE1JTiIsIlJPTEVfVVNFUiJdLCJ1c2VybmFtZSI6InRlc3RAdGVzdC5mciJ9.a2Lx9ojPRrnJzjoe-wlW2WusOLimcDUv-KnEZIUTpJ36lt3g26Rc8ANTrNfMhCst8q6vaTIv8CQqHRURrWsSHIYTdyJovSkHw1p06KvSfut1poltIINMvKuXsPMEegbM6aT4J8Ek4UDwvmMMhBvSy4IkEPQn8g943ioizJMkLgLAO7Xk4Pa272zjCMis9t7KmeA5m51WYNawUWMJxqY64-yMigiz5uLojC6g_HYvn4jp8qLo7D3uOHV2uGc4gQt4dXiIrr0AxWrx9EsUSYr6a81aXWeh4_rIEK62Nj4HBZNUHO1mN7fKOWxoQAvAXsAcxF7ToHqf1vFiQm8sYGtNUQ"

}
```


## Admin
  le back va automatiquement detecter si c'est un admin ou un user qui est connecté,
  si c'est un user qui est connecté, alors il n'aura pas accès a l'admin.
  
 ###### afficher tout les articles en tant que admin
 
 1. faire une requette GET sur l'url
  
  ```javascript
'http://localhost:8000/api/admin/show'
```
 

2. Set les headers 

```javascript
headers: {
'Content-Type': 'application/json',
'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQ...'
}
 
```

3. Si tout se passe correctement vous allez avoir une réponse et ça sere un tableau d'objet comme ça 

```javascript
[

{

"titre": "Dell Latitude 3420",

"prix": 908,

"photo": "https://www.rueducommerce.fr/media/images/web/produit/3285552/20210910082316/ordinateur-portable-classique-inspiron-15-3510-1_1140x1140.jpg",

"description": "Sunt natus id nihil. Vel iste rerum ducimus. Dolore eos voluptas aliquid ipsa natus.",

"caracteristique": "Aut et officiis neque nulla. Omnis id dolorum et nobis ipsam vitae cupiditate."

},
	
]	
````


###### Créer un article

1. methode POST et l'url c'est 
```javascript
	http://localhost:8000/api/admin/add

```

2. Set le headers comme dans l'exemple

```javascript
headers: {

'Content-Type': 'application/json',

'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE...'

}
```


3. Voici le schéma a utilisé pour le body avec les données en format JSON svp.

```javascript
{

"titre":"haribo",

"prix":10,

"description":"description",

"caracteristique":"carara",

"photo":"jdbjkdfbdkjf"

}
```


4. Si tout est bon alors vous aurez une réponse de ce type
```javascript
"parfait"
````




######  Supprimé un article

1. methode GET et l'url c'est 
```javascript
	http://localhost:8000/api/admin/delete/{id}

```

2. Set le headers comme dans l'exemple

```javascript
headers: {

'Content-Type': 'application/json',

'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE...'

}
```


###### Modifier un article

1.  methode GET et l'url c'est 
```javascript
	http://localhost:8000/api/admin/update/{id}

```

2.  Set le headers comme dans l'exemple

```javascript
headers: {

'Content-Type': 'application/json',

'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE...'

}
```

3. Voici le schéma a utilisé pour le body avec les données en format JSON svp.

```javascript
{

"titre":"haribo",

"prix":10,

"description":"description",

"caracteristique":"carara",

"photo":"jdbjkdfbdkjf"

}
```

4. si tout est bon vous allez avoir un message de confimation.
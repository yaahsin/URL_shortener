# URL Shortener

 
A website that reduces the length of your URL,  it is easier to share with shorten URL.

**Features**

 - Shorten the URL to just 5 random character (& base URL).
 - Easy to shorten URL then copy it.
 - Custom 404 Error Page.

![home page](https://raw.githubusercontent.com/yaahsin/URL_shortener/main/views/A11_%E7%9F%AD%E7%B6%B2%E5%9D%80%E7%94%A2%E7%94%9F%E5%99%A8_home.png)

![custom 404 error page](https://raw.githubusercontent.com/yaahsin/URL_shortener/main/views/A11_%E7%9F%AD%E7%B6%B2%E5%9D%80%E7%94%A2%E7%94%9F%E5%99%A8_404%20page.png)

## Installing

  

1. Open terminal.

2. Cloning the repository

```shell
// HTTPS
git clone https://github.com/yaahsin/URL_shortener.git
```

3. Move to the folder `cd URL_shortener`

4. Type in `npm install`

5. Create environment variable「MONGODB_UR」 to connect your database:

Terminal: 
```shell
set "MONGODB_URI= <MongoDB URI>"
```

6. Command `npm run dev`  to start the server

7. If `server is running on port 3000`, visit http://localhost:3000.

**Built With**
- Node.js v16.14.2
- express v4.16.4
- express-handlebars v3.0.0
- body-parser v1.20.0
- mongoose v5.9.7
- MongoDB database
- Bootstrap v5.1.3
- popper v2.9.1
- font-awesome v6.1.1

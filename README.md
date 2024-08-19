# EventManager

### Installation

Start EventManager forder path

```
npm install
cd Service
npm install
cd ../myapp
npm install
```

### Starting project

To start the project, simply execute the `npm start` command in the EventManager directory

```
npm start
```

### Server details


#### .ENV
In order for the server to start, a mysql server and an `.env` file must be created in the Server directory.
Example .env file is as follows
```
APP_PORT=5001
DB_USER=event360
DB_PASSWORD=123456
DB_DATABASE=event360
DB_PORT=3306
DB_HOST=localhost
JWT_SECRET=J9L9LxCZ36E4VBRM
```

#### Database
For database preparation, you should run the `database.sql` and `seed_event_categories.sql` files in the EventManager directory on your mysql server.

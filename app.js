import createError from 'http-errors';

import express from 'express';

import cookieParser from 'cookie-parser';

import logger from 'morgan';




import indexRouter from './routes/index.js'; // Add .js extension in all import of local files for ES2015 module 

import usersRouter from './routes/users.js';

// 1. --UPDATES-- 

import commentsRouter from './routes/comments.js';




const app = express();




// view engine setup 

app.set('views', 'views'); // __dirname is not available when ES2015 module is used. 

app.set('view engine', 'pug');




app.use(logger('dev'));

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(express.static('public'));  // __dirname is not available when ES2015 module is used. 




app.use('/', indexRouter);

app.use('/users', usersRouter);

// 2. --UPDATES-- 

app.use('/comments', commentsRouter);




// catch 404 and forward to error handler 

app.use((req, res, next) => { // arrow function used for ES2015 module 

  next(createError(404));

});




// error handler 

app.use((err, req, res, next) => {  // arrow function used for ES2015 module 

  // set locals, only providing error in development 

  res.locals.message = err.message;

  res.locals.error = req.app.get('env') === 'development' ? err : {};




  // render the error page 

  res.status(err.status || 500);

  res.render('error');

});




export default app; 

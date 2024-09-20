This file contains a curd operation on registering the user and implementation of application logs using winston.
In this simple project we created a logger.js file into util folder.
The logger file is imported into controller.
While testing the instead of using console.log(), Here we are using logger.error(),or logger.warn(), or logger.info().
to fetch the details of the server error we will be using logError(error) in catch.

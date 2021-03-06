var inspect = require('util').inspect;
var Client = require('mariasql');

// Declare a method to query the database.
exports.query = function(res, query, params, callback) {
    // Create the database client.
    var c = new Client();
    // Initialize the array to store the people.
    var queryResults = [];

    // Connect to the database containing the data we want.
    c.connect({
        host: 'localhost',
        user: 'mrcalder',
        password: 'mrcalder_pw',
        db: 'mrcalder_db'
    });

    // Log when we connect to the database.
    c.on('connect', function () {
        console.log('Client connected');
    })
        // Log if an error occurs.
        .on('error', function (err) {
            console.log('Client error: ' + err);
        })
        // Log when we close the connection.
        .on('close', function (hadError) {
            console.log('Client closed');
        });

    // Create a prepared query to prevent SQL injection.
    var preparedQuery = c.prepare(query);

    // Execute the query and send the results to the callback.
    c.query(preparedQuery(params))
        // On success, iterate through the rows.
        .on('result', function (res) {
            // Add each row to the result array, log the row as well.
            res.on('row', function (row) {
                queryResults.push(row);
                console.log('Result row: ' + inspect(row));
            })
                // Log if an error occurs.
                .on('error', function (err) {
                    console.log('Result error: ' + inspect(err));
                })
                // Log when we finish the final row.
                .on('end', function (info) {
                    console.log('Result finished successfully');
                });
        })
        // Log when we finish all the results.
        .on('end', function () {
            console.log('Done with all results');
            // Give the results to the callback.
            callback(res, queryResults);
        });

    // Wait until all queries have completed successfully, then close the connection.
    c.end();
};
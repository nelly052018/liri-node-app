require("dotenv").config();
var Spotify = require('node-spotify-api');
var moment = require("moment");
var keys = require("./keys.js");
var fs = require("fs");
var command = process.argv[2];
var query = process.argv.slice(3).join(" ");

var spotify = new Spotify(keys.spotify);

var axios = require("axios");
var artist = "nickelback"
// Run the axios.get function...
// The axios.get function takes in a URL and returns a promise (just like $.ajax)
function concertThis(artist) {
    axios.get("https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp").then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            console.log(response.data[0].venue.name);
            console.log(response.data[0].venue.city);
            console.log(moment(response.data[0].datetime).format("MM/DD/YYYY"));
        },

        function (error) {
            if (error) {
                console.log(error)


            }
        }
    );
}
function spotifyThis(song) {
    spotify.search({ type: 'track', query: song }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        //console.log(JSON.stringify(data.tracks.items[0]));
        console.log("Artist:", data.tracks.items[0].artists[0].name);
        console.log("Song:", data.tracks.items[0].name);
        console.log("Link:", data.tracks.items[0].preview_url);
        console.log("Album:", data.tracks.items[0].album.name);
    });

}
function movieThis(movie) {
    if (movie === "") {
        movie = "Mr. Nobody"
        console.log(movie)
    }
    axios.get("http://www.omdbapi.com/?apikey=trilogy&t=" + movie).then(
        function (response) {
            // If the axios was successful...
            // Then log the body from the site!
            // console.log(response.data);
            console.log("Title of the movie:", response.data.Title);
            console.log("Year the movie came out", response.data.Year);
            console.log("IMDB Rating of the movie:", response.data.Rated);
            console.log("Rotten Tomatoes Rating of the movie:", response.data.Rated);
            console.log("Country where the movie was produced:", response.data.Country);
            console.log("Language of the movie:", response.data.Language);
            console.log("Plot of the movie:", response.data.Plot);
            console.log("Actors in the movie:", response.data.Actors);

        },

        function (error) {
            if (error) {
                console.log(error)


            }
        }
    );
}

function doThis() {
    fs.readFile("random.txt", "utf8", function (error, data) {

        // If the code experiences any errors it will log the error to the console.
        if (error) {
            return console.log(error);
        }


        // Then split it by commas (to make it more readable)
        var dataArr = data.split(",");

        // We will then re-display the content as an array for later use.
        console.log(dataArr);
        switchCommand(dataArr[0], dataArr[1])

        //     switch (dataArr[0]) {
        //         case "concert-this":
        //             concertThis(dataArr[1])
        //             break;
        //         case "spotify-this-song":
        //             spotifyThis(dataArr[1])
        //             break;
        //         case "movie-this":
        //             movieThis(dataArr[1])
        //             break;
        //         case "do-what-it-says":
        //             doThis()
        //             break;
        //         default:
        //             console.log("Please enter a valid command")
        //             break;
        //     }

    });

}
function switchCommand(command, query) {
    switch (command) {
        case "concert-this":
            concertThis(query)
            break;
        case "spotify-this-song":
            spotifyThis(query)
            break;
        case "movie-this":
            movieThis(query)
            break;
        case "do-what-it-says":
            doThis()
            break;
        default:
            console.log("Please enter a valid command")
            break;
    }
}
switchCommand(command, query)

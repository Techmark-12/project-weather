import React, { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";

const Weather = () => {
  const [location, setLocation] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "VY7AWFQJR4Q24GMTV23BBNRD4"; // Replace with your Visual Crossing API key

  const getWeather = async (e) => {
    e.preventDefault();
    setError("");

    // Clear the weather data if all input fields are empty
    if (!location && !latitude && !longitude) {
      setWeather(null);
      setError("Please enter a location or coordinates");
      return;
    }

    // Construct the query parameter based on the inputs
    let query = location;
    if (latitude && longitude) {
      query = `${latitude},${longitude}`;
    }

    try {
      const response = await axios.get(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${query}?unitGroup=metric&key=${apiKey}&contentType=json`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Location not found");
    }
  };

  return (
    <div
      style={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <h1>Weather App</h1>
      <form onSubmit={getWeather}>
        <Box
          component="div"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          noValidate
          autoComplete="off"
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              "& > :not(style)": { m: 1 },
            }}
          >
            <TextField
              id="latitude"
              label="Enter latitude"
              variant="outlined"
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
            />
            <TextField
              id="longitude"
              label="Enter longitude"
              variant="outlined"
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
            />
          </Box>
          <div style={{ margin: "1rem", fontWeight: "bold" }}>OR</div>
          <TextField
            id="location"
            label="Enter location"
            variant="outlined"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Box>
        <Button variant="contained" type="submit" sx={{ mt: 2 }}>
          Get Weather
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {weather && (
        <Card variant="outlined" sx={{ maxWidth: 360, mt: 3 }}>
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h5" component="div">
                Location:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.resolvedAddress}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h7" component="div">
                Report Time:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.currentConditions.datetime}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h7" component="div">
                Temperature:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.currentConditions.temp} °C
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h7" component="div">
                Weather:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.currentConditions.conditions}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h7" component="div">
                Humidity:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.currentConditions.humidity} %
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h7" component="div">
                Wind Speed:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.currentConditions.windspeed} m/s
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h7" component="div">
                Conditions:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.currentConditions.conditions}
            </Typography>
          </Box>
          <Divider />
          <Box sx={{ p: 2 }}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography gutterBottom variant="h7" component="div">
                Description:
              </Typography>
            </Stack>
            <Typography color="text.secondary" variant="body2">
              {weather.description}
            </Typography>
          </Box>
        </Card>
      )}
    </div>
  );
};

export default Weather;

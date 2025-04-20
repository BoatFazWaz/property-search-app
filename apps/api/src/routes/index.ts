import express, { Router } from 'express';
import { Octokit } from '@octokit/rest';
import axios from 'axios';
import { GithubCommit, WeatherData, DailyQuote } from '../types';

const router: Router = express.Router();
const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

// GitHub Commits
router.get('/github/commits', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const events = await octokit.activity.listPublicEventsForUser({
      username: username as string,
      per_page: 10
    });

    const commits: GithubCommit[] = events.data
      .filter(event => event.type === 'PushEvent')
      .flatMap(event => {
        const pushEvent = event.payload as any;
        return pushEvent.commits.map((commit: any) => ({
          sha: commit.sha,
          message: commit.message,
          date: event.created_at,
          author: event.actor.login,
          repo: event.repo.name
        }));
      });

    res.json(commits);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub commits' });
  }
});

// GitHub Issues
router.get('/github/issues', async (req, res) => {
  try {
    const { username } = req.query;
    if (!username) {
      return res.status(400).json({ error: 'Username is required' });
    }

    const { data: issues } = await octokit.issues.list({
      filter: 'all',
      state: 'open',
      per_page: 10,
      sort: 'updated',
      direction: 'desc'
    });

    const formattedIssues = issues.map(issue => ({
      id: issue.id.toString(),
      title: issue.title,
      number: issue.number,
      state: issue.state,
      repository: issue.repository_url.split('/').slice(-1)[0],
      url: issue.html_url,
      created_at: issue.created_at
    }));

    res.json(formattedIssues);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch GitHub issues' });
  }
});

// Weather Data
router.get('/weather', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API_KEY}&units=metric`
    );

    const weatherData: WeatherData = {
      temperature: response.data.main.temp,
      condition: response.data.weather[0].main,
      location: response.data.name,
      icon: response.data.weather[0].icon
    };

    res.json(weatherData);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch weather data' });
  }
});

// Daily Quote
router.get('/quote', async (req, res) => {
  try {
    const response = await axios.get('https://api.quotable.io/random');
    const quote: DailyQuote = {
      text: response.data.content,
      author: response.data.author
    };
    res.json(quote);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch daily quote' });
  }
});

export default router; 
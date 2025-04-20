export interface GithubCommit {
  sha: string;
  message: string;
  date: string;
  author: string;
  repo: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'completed' | 'planned';
  lastUpdated: string;
}

export interface LearningGoal {
  id: string;
  title: string;
  progress: number;
  deadline?: string;
  category: string;
}

export interface WeatherData {
  temperature: number;
  condition: string;
  location: string;
  icon: string;
}

export interface DailyQuote {
  text: string;
  author: string;
}

export interface Bookmark {
  id: string;
  url: string;
  title: string;
  category: string;
  addedAt: string;
} 
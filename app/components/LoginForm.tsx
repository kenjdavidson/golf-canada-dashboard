import { useState } from 'react';
import { Input, Button } from '@material-tailwind/react';

interface LoginFormProps {
  onSubmit: (username: string, password: string) => void;
  onClear?: () => void;
  errorMessages?: string[];
}

export function LoginForm({ onSubmit, onClear, errorMessages = [] }: LoginFormProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(username, password);
  };

  const handleClear = () => {
    setUsername('');
    setPassword('');
    if (onClear) {
      onClear();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      {errorMessages.length > 0 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3">
          <ul className="list-none space-y-1">
            {errorMessages.map((error, index) => (
              <li key={index} className="text-sm text-red-600 dark:text-red-400">
                {error}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          type="submit"
          color="primary"
          className="flex-1"
        >
          Login
        </Button>
        <Button
          type="button"
          variant="outline"
          color="primary"
          onClick={handleClear}
          className="flex-1"
        >
          Clear
        </Button>
      </div>
    </form>
  );
}

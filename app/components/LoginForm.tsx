import { useState } from 'react';
import * as MaterialTailwind from '@material-tailwind/react';
const { Input, Button } = MaterialTailwind;

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
        <Input
          type="text"
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full"
          labelProps={{ className: "dark:text-gray-300" }}
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full"
          labelProps={{ className: "dark:text-gray-300" }}
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
          color="blue"
          className="flex-1"
        >
          Login
        </Button>
        <Button
          type="button"
          variant="outlined"
          color="blue"
          onClick={handleClear}
          className="flex-1"
        >
          Clear
        </Button>
      </div>
    </form>
  );
}

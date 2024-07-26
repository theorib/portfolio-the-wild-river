// 'use client';
import { Progress } from '@/components/ui/progress';
import { getPasswordScore } from '@/lib/auth/passwordScore';

type PasswordStrengthProps = {
  password: string;
};

type Score = 0 | 25 | 50 | 75 | 100;

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const { score, feedback } = getPasswordScore(password);

  const scoreStyleLookup = {
    0: 'bg-red-500',
    25: 'bg-red-500',
    50: 'bg-yellow-500',
    75: 'bg-green-500',
    100: 'bg-green-500',
  };

  let adjustedScore: Score;
  if (score === 0 && password.length >= 1) {
    adjustedScore = 25;
  } else {
    adjustedScore = (score * 25) as Score;
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-muted-foreground">
        Password Strength: {adjustedScore / 25} of 4
      </p>
      <Progress
        indicatorColor={scoreStyleLookup[adjustedScore]}
        value={adjustedScore}
        className="text-red-300"
        aria-label="Password strength"
      />
      <ul
        className="text-sm text-muted-foreground"
        aria-label="Password suggestions"
      >
        {feedback.suggestions.map((suggestion, i) => {
          return <li key={`${suggestion}-i`}>{suggestion}</li>;
        })}
      </ul>
    </div>
  );
}

import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
}

const LoadingSpinner = ({
  size = 'medium',
  color = 'text-primary-500',
}: LoadingSpinnerProps) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-10 h-10',
  };

  return (
    <div className="flex justify-center items-center">
      <Loader2 className={`${sizeMap[size]} ${color} animate-spin`} />
    </div>
  );
};

export default LoadingSpinner;
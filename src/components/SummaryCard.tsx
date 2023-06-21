import { ReactNode } from 'react';

export interface SummaryCardProps {
  title: string;
  value: string;
  icon: ReactNode;
}

const SummaryCard = (props: SummaryCardProps) => {
  return (
    <div className='card card-compact bg-white max-w-xs w-full'>
      <div className='card-body'>
        <div className='flex w-full items-center space-x-3'>
          <div className='flex-shrink-0 text-3xl text-primary'>
            {props.icon}
          </div>
          <div>
            <h2 className='text-lg font-bold'>{props.title}</h2>
            <p>{props.value}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
